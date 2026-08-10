import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  clearDiagnosticRecords,
  loadDiagnosticRecords,
  saveDiagnosticRecord,
} from '../../features/diagnostics/services/diagnostic-record.service';
import type { NewDiagnosticRecord } from '../../features/diagnostics/types/diagnostic-record';

type MockedAsyncStorage = {
  getItem: jest.Mock;
  setItem: jest.Mock;
  removeItem: jest.Mock;
  __reset: () => void;
  __seed: (key: string, value: string) => void;
};

jest.mock('@react-native-async-storage/async-storage', () => {
  const store: Record<string, string> = {};
  return {
    getItem: jest.fn(async (key: string) => (key in store ? store[key] : null)),
    setItem: jest.fn(async (key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn(async (key: string) => {
      delete store[key];
    }),
    __reset: jest.fn(() => {
      Object.keys(store).forEach((key) => delete store[key]);
    }),
    __seed: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
  };
});

const mockStorage = AsyncStorage as unknown as MockedAsyncStorage;

const baseInput: NewDiagnosticRecord = {
  timestamp: '2026-08-10T06:00:00.000Z',
  checkedItemIds: ['tyres', 'brakes', 'lights'],
  wearGauges: {
    currentKm: 12000,
    cumulativeMileage: 12000,
    serviceIntervalKm: 5000,
    lastServiceKm: 9000,
    kmToNextService: 2000,
    serviceProgress: 0.6,
  },
  timerSession: null,
};

beforeEach(() => {
  mockStorage.__reset();
  jest.clearAllMocks();
});

describe('diagnostic-record.service', () => {
  it('returns an empty list when nothing has been stored', async () => {
    await expect(loadDiagnosticRecords()).resolves.toEqual([]);
  });

  it('saves a record and assigns it an id', async () => {
    const record = await saveDiagnosticRecord(baseInput);

    expect(record).toMatchObject(baseInput);
    expect(record.id).toEqual(expect.any(String));
    expect(record.id.length).toBeGreaterThan(0);

    const storedRaw = await AsyncStorage.getItem('motomedic-diagnostic-records');
    const stored = JSON.parse(storedRaw ?? '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(record.id);
  });

  it('returns records ordered newest first', async () => {
    await saveDiagnosticRecord({ ...baseInput, timestamp: '2026-08-01T00:00:00.000Z' });
    await saveDiagnosticRecord({ ...baseInput, timestamp: '2026-08-10T00:00:00.000Z' });
    await saveDiagnosticRecord({ ...baseInput, timestamp: '2026-08-05T00:00:00.000Z' });

    const records = await loadDiagnosticRecords();

    expect(records.map((r) => r.timestamp)).toEqual([
      '2026-08-10T00:00:00.000Z',
      '2026-08-05T00:00:00.000Z',
      '2026-08-01T00:00:00.000Z',
    ]);
  });

  it('stores wear gauge values and a linked timer session on the record', async () => {
    const record = await saveDiagnosticRecord({
      ...baseInput,
      timerSession: {
        rideId: 'ride-123',
        riderName: 'Joey',
        startTimestamp: '2026-08-10T05:55:00.000Z',
        endTimestamp: null,
        durationSeconds: null,
      },
    });

    expect(record.wearGauges).toEqual(baseInput.wearGauges);
    expect(record.timerSession).toEqual({
      rideId: 'ride-123',
      riderName: 'Joey',
      startTimestamp: '2026-08-10T05:55:00.000Z',
      endTimestamp: null,
      durationSeconds: null,
    });
  });

  it('migrates legacy Sprint 4 snapshot data into diagnostic records', async () => {
    const legacyPayload = JSON.stringify({
      state: {
        history: [
          {
            id: 'legacy-1',
            timestamp: '2026-08-01T00:00:00.000Z',
            checkedItemIds: ['tyres', 'engine-oil'],
            wearGauges: {
              currentKm: 5000,
              cumulativeMileage: 5000,
              serviceIntervalKm: 5000,
              lastServiceKm: 0,
              kmToNextService: 0,
              serviceProgress: 1,
            },
          },
        ],
      },
      version: 0,
    });
    mockStorage.__seed('diagnostic-history', legacyPayload);

    const records = await loadDiagnosticRecords();

    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      id: 'legacy-1',
      timestamp: '2026-08-01T00:00:00.000Z',
      checkedItemIds: ['tyres', 'engine-oil'],
      timerSession: null,
    });
    expect(records[0].wearGauges?.currentKm).toBe(5000);
  });

  it('removes the legacy store key after migration and does not duplicate', async () => {
    const legacyPayload = JSON.stringify({
      state: {
        history: [
          {
            id: 'legacy-1',
            timestamp: '2026-08-01T00:00:00.000Z',
            checkedItemIds: ['tyres'],
            wearGauges: null,
          },
        ],
      },
      version: 0,
    });
    mockStorage.__seed('diagnostic-history', legacyPayload);

    await loadDiagnosticRecords();
    await loadDiagnosticRecords();

    expect(await AsyncStorage.getItem('diagnostic-history')).toBeNull();
    const records = await loadDiagnosticRecords();
    expect(records).toHaveLength(1);
  });

  it('keeps new records when migrating legacy history alongside them', async () => {
    mockStorage.__seed(
      'diagnostic-history',
      JSON.stringify({
        state: {
          history: [
            {
              id: 'legacy-1',
              timestamp: '2026-08-01T00:00:00.000Z',
              checkedItemIds: ['tyres'],
              wearGauges: null,
            },
          ],
        },
        version: 0,
      }),
    );
    mockStorage.__seed(
      'motomedic-diagnostic-records',
      JSON.stringify([
        {
          id: 'diag-1',
          timestamp: '2026-08-09T00:00:00.000Z',
          checkedItemIds: ['brakes'],
          wearGauges: null,
          timerSession: null,
        },
      ]),
    );

    const records = await loadDiagnosticRecords();

    expect(records.map((r) => r.id)).toEqual(['diag-1', 'legacy-1']);
  });

  it('tolerates corrupt stored data without throwing', async () => {
    mockStorage.__seed('motomedic-diagnostic-records', '{not-json');
    mockStorage.__seed('diagnostic-history', 'also-not-json');

    await expect(loadDiagnosticRecords()).resolves.toEqual([]);
  });

  it('clears all diagnostic data including legacy data', async () => {
    await saveDiagnosticRecord(baseInput);
    mockStorage.__seed('diagnostic-history', '{"state":{"history":[]},"version":0}');

    await clearDiagnosticRecords();

    expect(await AsyncStorage.getItem('motomedic-diagnostic-records')).toBeNull();
    expect(await AsyncStorage.getItem('diagnostic-history')).toBeNull();
    await expect(loadDiagnosticRecords()).resolves.toEqual([]);
  });
});

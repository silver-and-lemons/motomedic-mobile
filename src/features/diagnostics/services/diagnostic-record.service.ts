import AsyncStorage from '@react-native-async-storage/async-storage';
import type {
  DiagnosticRecord,
  NewDiagnosticRecord,
} from '../types/diagnostic-record';

const RECORDS_KEY = 'motomedic-diagnostic-records';
const LEGACY_HISTORY_KEY = 'diagnostic-history';

export async function saveDiagnosticRecord(
  input: NewDiagnosticRecord,
): Promise<DiagnosticRecord> {
  const records = await loadDiagnosticRecords();
  const record: DiagnosticRecord = {
    ...input,
    id: generateRecordId(),
  };
  records.push(record);
  await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  return record;
}

export async function loadDiagnosticRecords(): Promise<DiagnosticRecord[]> {
  const [recordsRaw, legacyRaw] = await Promise.all([
    AsyncStorage.getItem(RECORDS_KEY),
    AsyncStorage.getItem(LEGACY_HISTORY_KEY),
  ]);

  const records = parseStoredRecords(recordsRaw);

  if (legacyRaw !== null) {
    const legacyRecords = parseLegacyHistory(legacyRaw);
    if (legacyRecords.length > 0) {
      records.push(...legacyRecords);
      await AsyncStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    }
    await AsyncStorage.removeItem(LEGACY_HISTORY_KEY);
  }

  return dedupeRecords(records).sort(byNewestFirst);
}

export async function clearDiagnosticRecords(): Promise<void> {
  await AsyncStorage.removeItem(RECORDS_KEY);
  await AsyncStorage.removeItem(LEGACY_HISTORY_KEY);
}

function parseStoredRecords(raw: string | null): DiagnosticRecord[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DiagnosticRecord[]) : [];
  } catch {
    return [];
  }
}

function parseLegacyHistory(raw: string): DiagnosticRecord[] {
  try {
    const parsed = JSON.parse(raw) as {
      state?: { history?: LegacySnapshot[] };
    };
    const history = parsed?.state?.history;
    if (!Array.isArray(history)) return [];
    return history.map(toDiagnosticRecord);
  } catch {
    return [];
  }
}

function toDiagnosticRecord(snapshot: LegacySnapshot): DiagnosticRecord {
  return {
    id: snapshot.id,
    timestamp: snapshot.timestamp,
    checkedItemIds: snapshot.checkedItemIds,
    wearGauges: snapshot.wearGauges,
    timerSession: null,
  };
}

function dedupeRecords(records: DiagnosticRecord[]): DiagnosticRecord[] {
  const seen = new Map<string, DiagnosticRecord>();
  for (const record of records) {
    seen.set(record.id, record);
  }
  return Array.from(seen.values());
}

function byNewestFirst(a: DiagnosticRecord, b: DiagnosticRecord): number {
  return b.timestamp.localeCompare(a.timestamp);
}

function generateRecordId(): string {
  return `diag-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 10)}`;
}

type LegacySnapshot = {
  id: string;
  timestamp: string;
  checkedItemIds: string[];
  wearGauges: LegacyWearGaugeSnapshot | null;
};

type LegacyWearGaugeSnapshot = {
  currentKm: number;
  cumulativeMileage: number;
  serviceIntervalKm: number;
  lastServiceKm: number;
  kmToNextService: number;
  serviceProgress: number;
};

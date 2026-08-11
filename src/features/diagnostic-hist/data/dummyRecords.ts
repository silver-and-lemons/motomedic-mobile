import { DiagnosticRecord } from '../types/diagnostic-record';

export const dummyDiagnosticRecords: DiagnosticRecord[] = [
  {
    id: 'rec-1',
    timestamp: '2026-08-11T10:30:00Z',
    checkedItemIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'],
    wearGauges: {
      currentKm: 5200,
      cumulativeMileage: 12400,
      serviceIntervalKm: 5000,
      lastServiceKm: 10000,
      kmToNextService: -200,
      serviceProgress: 1.04,
    },
    timerSession: null,
  },
  {
    id: 'rec-2',
    timestamp: '2026-08-04T09:15:00Z',
    checkedItemIds: ['item-1', 'item-2', 'item-3'],
    wearGauges: {
      currentKm: 4800,
      cumulativeMileage: 12000,
      serviceIntervalKm: 5000,
      lastServiceKm: 10000,
      kmToNextService: 200,
      serviceProgress: 0.88,
    },
    timerSession: null,
  },
  {
    id: 'rec-3',
    timestamp: '2026-07-28T14:00:00Z',
    checkedItemIds: ['item-1', 'item-2', 'item-3', 'item-4'],
    wearGauges: {
      currentKm: 4100,
      cumulativeMileage: 11300,
      serviceIntervalKm: 5000,
      lastServiceKm: 10000,
      kmToNextService: 900,
      serviceProgress: 0.45,
    },
    timerSession: null,
  },
];
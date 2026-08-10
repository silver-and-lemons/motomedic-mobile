export type DiagnosticWearGauges = {
  currentKm: number;
  cumulativeMileage: number;
  serviceIntervalKm: number;
  lastServiceKm: number;
  kmToNextService: number;
  serviceProgress: number;
};

export type DiagnosticTimerSession = {
  rideId: string | null;
  riderName: string | null;
  startTimestamp: string;
  endTimestamp: string | null;
  durationSeconds: number | null;
};

export type DiagnosticRecord = {
  id: string;
  timestamp: string;
  checkedItemIds: string[];
  wearGauges: DiagnosticWearGauges | null;
  timerSession: DiagnosticTimerSession | null;
};

export type NewDiagnosticRecord = Omit<DiagnosticRecord, 'id'>;

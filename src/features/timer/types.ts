export type TimerStatus = 'idle' | 'running' | 'paused' | 'stopped';

export type TimerSession = {
  startTimestamp: string;
  endTimestamp: string;
  durationSeconds: number;
};

export type TimerState = {
  status: TimerStatus;
  startedAt: number | null;
  stoppedAt: number | null;
  pausedAt: number | null;
  totalPausedMs: number;
  riderName: string | null;
  rideId: string | null;
};

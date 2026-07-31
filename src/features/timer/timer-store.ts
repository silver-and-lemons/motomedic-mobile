import { create } from 'zustand';
import type { TimerState } from './types';
import { saveTimerSession } from './services/timer-storage';

type TimerStore = TimerState & {
  startTimer: (meta?: { riderName?: string; rideId?: string }) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: () => Promise<void>;
  resetTimer: () => void;
};

export const useTimerStore = create<TimerStore>((set, get) => ({
  status: 'idle',
  startedAt: null,
  stoppedAt: null,
  pausedAt: null,
  totalPausedMs: 0,
  riderName: null,
  rideId: null,

  startTimer: (meta) => {
    const now = Date.now();
    set({
      status: 'running',
      startedAt: now,
      stoppedAt: null,
      pausedAt: null,
      totalPausedMs: 0,
      riderName: meta?.riderName ?? null,
      rideId: meta?.rideId ?? null,
    });
  },

  pauseTimer: () => {
    const { status } = get();
    if (status !== 'running') return;
    set({ status: 'paused', pausedAt: Date.now() });
  },

  resumeTimer: () => {
    const { status, pausedAt, totalPausedMs } = get();
    if (status !== 'paused' || !pausedAt) return;
    const pauseDuration = Date.now() - pausedAt;
    set({
      status: 'running',
      pausedAt: null,
      totalPausedMs: totalPausedMs + pauseDuration,
    });
  },

  stopTimer: async () => {
    const { startedAt, status, pausedAt, totalPausedMs } = get();
    if (status !== 'running' && status !== 'paused') return;
    if (!startedAt) return;

    const endedAt = Date.now();
    const pausedMs = status === 'paused' && pausedAt
      ? totalPausedMs + (endedAt - pausedAt)
      : totalPausedMs;
    const activeMs = endedAt - startedAt - pausedMs;
    const durationSeconds = Math.max(0, Math.floor(activeMs / 1000));

    const session = {
      startTimestamp: new Date(startedAt).toISOString(),
      endTimestamp: new Date(endedAt).toISOString(),
      durationSeconds,
    };

    set({ status: 'stopped', stoppedAt: endedAt });

    await saveTimerSession(session);
  },

  resetTimer: () =>
    set({
      status: 'idle',
      startedAt: null,
      stoppedAt: null,
      pausedAt: null,
      totalPausedMs: 0,
      riderName: null,
      rideId: null,
    }),
}));

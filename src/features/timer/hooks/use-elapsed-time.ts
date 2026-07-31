import { useEffect, useRef, useState } from 'react';
import { useTimerStore } from '../timer-store';

function formatElapsed(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function computeElapsed(
  startedAt: number,
  status: string,
  pausedAt: number | null,
  totalPausedMs: number,
): number {
  const now = status === 'paused' && pausedAt ? pausedAt : Date.now();
  const pauseMs = status === 'paused' && pausedAt
    ? totalPausedMs + (now - pausedAt)
    : totalPausedMs;
  return Math.max(0, now - startedAt - pauseMs);
}

export function useElapsedTime() {
  const status = useTimerStore((s) => s.status);
  const startedAt = useTimerStore((s) => s.startedAt);
  const pausedAt = useTimerStore((s) => s.pausedAt);
  const totalPausedMs = useTimerStore((s) => s.totalPausedMs);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedAtRef = useRef(startedAt);
  const pausedAtRef = useRef(pausedAt);
  const totalPausedMsRef = useRef(totalPausedMs);

  useEffect(() => { startedAtRef.current = startedAt; }, [startedAt]);
  useEffect(() => { pausedAtRef.current = pausedAt; }, [pausedAt]);
  useEffect(() => { totalPausedMsRef.current = totalPausedMs; }, [totalPausedMs]);

  useEffect(() => {
    if (status === 'running' && startedAtRef.current) {
      const tick = () => {
        if (startedAtRef.current) {
          setElapsed(
            computeElapsed(startedAtRef.current, 'running', null, totalPausedMsRef.current)
          );
        }
      };
      tick();
      intervalRef.current = setInterval(tick, 1000);
    } else if (status === 'paused' && startedAtRef.current) {
      setElapsed(
        computeElapsed(startedAtRef.current, 'paused', pausedAtRef.current, totalPausedMsRef.current)
      );
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status]);

  return {
    elapsed,
    formatted: formatElapsed(elapsed),
    durationSeconds: Math.floor(elapsed / 1000),
  };
}

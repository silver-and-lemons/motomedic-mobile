import { useEffect, useState, useCallback } from 'react';
import { loadTimerSessions, clearTimerSessions } from '../services/timer-storage';
import type { TimerSession } from '../types';

export function useRideSessions() {
  const [sessions, setSessions] = useState<TimerSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        const data = await loadTimerSessions();
        if (!cancelled) {
          setSessions(data);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  async function clearAll() {
    await clearTimerSessions();
    setSessions([]);
  }

  const totalDurationSeconds = sessions.reduce(
    (sum, s) => sum + s.durationSeconds,
    0
  );

  return {
    sessions,
    isLoading,
    refresh,
    clearAll,
    totalCount: sessions.length,
    totalDurationSeconds,
  };
}

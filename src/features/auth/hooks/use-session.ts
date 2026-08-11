import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../../store/auth.store';
import { refreshAccessToken } from '../services/auth.service';
import {
  clearTokens,
  getTokens,
  isTokenExpired,
  saveTokens,
  shouldRefreshToken,
} from '../services/token-storage';
import type { AuthTokens } from '../types/auth';

const REFRESH_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes

export function useSession() {
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const updateTokens = useAuthStore((s) => s.updateTokens);
  const setLoading = useAuthStore((s) => s.setLoading);
  const user = useAuthStore((s) => s.user);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const tokens = await getTokens();

        if (!tokens) {
          if (!cancelled) setLoading(false);
          return;
        }

        if (isTokenExpired(tokens)) {
          const refreshed = await attemptRefresh(tokens.refreshToken);
          if (!cancelled && refreshed && user) {
            setSession(user, refreshed);
          } else if (!cancelled) {
            await clearTokens();
            clearSession();
          }
          return;
        }

        if (!cancelled && user) {
          setSession(user, tokens);
        } else if (!cancelled) {
          // no persisted user
          await clearTokens();
          clearSession();
        }
      } catch {
        if (!cancelled) {
          await clearTokens().catch(() => {});
          clearSession();
        }
      }
    }

    async function attemptRefresh(
      refreshToken: string,
    ): Promise<AuthTokens | null> {
      try {
        const response = await refreshAccessToken(refreshToken);
        const newTokens: AuthTokens = {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresAt: Date.now() + response.expiresIn * 1000,
        };
        await saveTokens(newTokens);
        return newTokens;
      } catch {
        return null;
      }
    }

    restoreSession();

    intervalRef.current = setInterval(async () => {
      const tokens = await getTokens();
      if (!tokens) return;

      if (shouldRefreshToken(tokens)) {
        const refreshed = await attemptRefresh(tokens.refreshToken);
        if (refreshed) {
          updateTokens(refreshed);
        } else {
          await clearTokens().catch(() => {});
          clearSession();
        }
      }
    }, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

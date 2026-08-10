import { refreshAccessToken } from '../features/auth/services/auth.service';
import {
  clearTokens,
  getTokens,
  isTokenExpired,
  saveTokens,
} from '../features/auth/services/token-storage';
import type { AuthTokens } from '../features/auth/types/auth';
import { useAuthStore } from '../store/auth.store';

let refreshPromise: Promise<AuthTokens | null> | null = null;

async function performTokenRefresh(): Promise<AuthTokens | null> {
  const tokens = await getTokens();
  if (!tokens) return null;

  try {
    const response = await refreshAccessToken(tokens.refreshToken);
    const newTokens: AuthTokens = {
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
      expiresAt: Date.now() + response.expiresIn * 1000,
    };
    await saveTokens(newTokens);
    useAuthStore.getState().updateTokens(newTokens);
    return newTokens;
  } catch {
    await clearTokens();
    useAuthStore.getState().clearSession();
    return null;
  }
}

async function getValidTokens(): Promise<AuthTokens | null> {
  const tokens = await getTokens();
  if (!tokens) return null;

  if (!isTokenExpired(tokens)) {
    return tokens;
  }

  if (!refreshPromise) {
    refreshPromise = performTokenRefresh().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function authenticatedFetch(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<Response> {
  const tokens = await getValidTokens();

  if (!tokens) {
    throw new Error('Not authenticated');
  }

  const headers = new Headers(init?.headers);
  headers.set('Authorization', `Bearer ${tokens.accessToken}`);

  const response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    const refreshedTokens = await performTokenRefresh();

    if (!refreshedTokens) {
      throw new Error('Session expired');
    }

    const retryHeaders = new Headers(init?.headers);
    retryHeaders.set('Authorization', `Bearer ${refreshedTokens.accessToken}`);

    return fetch(input, { ...init, headers: retryHeaders });
  }

  return response;
}

import * as SecureStore from 'expo-secure-store';
import type { AuthTokens } from '../types/auth';

const ACCESS_TOKEN_KEY = 'motomedic-access-token';
const REFRESH_TOKEN_KEY = 'motomedic-refresh-token';
const EXPIRES_AT_KEY = 'motomedic-token-expires-at';

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken),
    SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken),
    SecureStore.setItemAsync(EXPIRES_AT_KEY, String(tokens.expiresAt)),
  ]);
}

export async function getTokens(): Promise<AuthTokens | null> {
  const [accessToken, refreshToken, expiresAtStr] = await Promise.all([
    SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
    SecureStore.getItemAsync(EXPIRES_AT_KEY),
  ]);

  if (!accessToken || !refreshToken || !expiresAtStr) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
    expiresAt: Number(expiresAtStr),
  };
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),
    SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),
    SecureStore.deleteItemAsync(EXPIRES_AT_KEY),
  ]);
}

const REFRESH_BUFFER_MS = 60_000; // Refresh 60s before expiry

export function isTokenExpired(tokens: AuthTokens): boolean {
  return Date.now() >= tokens.expiresAt;
}

export function shouldRefreshToken(tokens: AuthTokens): boolean {
  return Date.now() >= tokens.expiresAt - REFRESH_BUFFER_MS;
}

import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthTokens } from '../types/auth';

const ACCESS_TOKEN_KEY = 'motomedic-access-token';
const REFRESH_TOKEN_KEY = 'motomedic-refresh-token';
const EXPIRES_AT_KEY = 'motomedic-token-expires-at';

const isWeb = Platform.OS === 'web';

async function getItem(key: string): Promise<string | null> {
  if (isWeb) return AsyncStorage.getItem(key);
  return SecureStore.getItemAsync(key);
}

async function setItem(key: string, value: string): Promise<void> {
  if (isWeb) {
    await AsyncStorage.setItem(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

async function removeItem(key: string): Promise<void> {
  if (isWeb) {
    await AsyncStorage.removeItem(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}

export async function saveTokens(tokens: AuthTokens): Promise<void> {
  await Promise.all([
    setItem(ACCESS_TOKEN_KEY, tokens.accessToken),
    setItem(REFRESH_TOKEN_KEY, tokens.refreshToken),
    setItem(EXPIRES_AT_KEY, String(tokens.expiresAt)),
  ]);
}

export async function getTokens(): Promise<AuthTokens | null> {
  const [accessToken, refreshToken, expiresAtStr] = await Promise.all([
    getItem(ACCESS_TOKEN_KEY),
    getItem(REFRESH_TOKEN_KEY),
    getItem(EXPIRES_AT_KEY),
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
    removeItem(ACCESS_TOKEN_KEY),
    removeItem(REFRESH_TOKEN_KEY),
    removeItem(EXPIRES_AT_KEY),
  ]);
}

const REFRESH_BUFFER_MS = 60_000;

export function isTokenExpired(tokens: AuthTokens): boolean {
  return Date.now() >= tokens.expiresAt;
}

export function shouldRefreshToken(tokens: AuthTokens): boolean {
  return Date.now() >= tokens.expiresAt - REFRESH_BUFFER_MS;
}
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const API_PORT = 3000;
const LOCALHOST = 'localhost';
const ANDROID_EMULATOR_HOST = '10.0.2.2';

const ENV_API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

function getDevServerHost(): string | null {
  const hostUri = Constants.expoConfig?.hostUri;
  if (!hostUri) return null;
  const host = hostUri.split(':')[0];
  return host || null;
}

function mapLocalhostForAndroid(baseUrl: string): string {
  if (Platform.OS !== 'android') return baseUrl;
  return baseUrl.replace('localhost', ANDROID_EMULATOR_HOST).replace('127.0.0.1', ANDROID_EMULATOR_HOST);
}

function resolveApiBaseUrl(): string {
  if (ENV_API_BASE_URL) {
    return mapLocalhostForAndroid(ENV_API_BASE_URL);
  }

  const devServerHost = getDevServerHost();
  if (devServerHost) {
    const host = mapLocalhostForAndroid(devServerHost);
    return `http://${host}:${API_PORT}`;
  }

  return `http://${LOCALHOST}:${API_PORT}`;
}

export const API_BASE_URL = resolveApiBaseUrl();

import { API_BASE_URL } from '../../../config/api';
import type {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from '../types/auth';

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw new Error(errorBody?.message ?? `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export async function loginUser(input: LoginRequest): Promise<LoginResponse> {
  return postJson<LoginResponse>('/api/v1/auth/login', input);
}

export async function registerUser(input: RegisterRequest): Promise<RegisterResponse> {
  return postJson<RegisterResponse>('/api/v1/auth/register', input);
}

export async function verifyLoginOtp(input: VerifyOtpRequest): Promise<VerifyOtpResponse> {
  return postJson<VerifyOtpResponse>('/api/v1/auth/verify-login', input);
}

export async function verifyRegistrationOtp(
  input: VerifyOtpRequest,
): Promise<VerifyOtpResponse> {
  return postJson<VerifyOtpResponse>('/api/v1/auth/verify-otp', input);
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
  return postJson<RefreshResponse>('/api/v1/auth/refresh', { refreshToken });
}

export async function logoutUser(refreshToken: string): Promise<void> {
  await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  }).catch(() => {
    // Logout is best-effort; token revocation failure must not block local cleanup.
  });
}
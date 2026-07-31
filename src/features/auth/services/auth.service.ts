import { API_BASE_URL } from '../../../config/api';
import type { LoginRequest, LoginResponse, RefreshResponse } from '../types/auth';

export async function loginUser(credentials: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Login failed with status ${res.status}`);
  }

  return res.json() as Promise<LoginResponse>;
}

export async function refreshAccessToken(refreshToken: string): Promise<RefreshResponse> {
  const res = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error(`Token refresh failed with status ${res.status}`);
  }

  return res.json() as Promise<RefreshResponse>;
}

export async function logoutUser(refreshToken: string): Promise<void> {
  await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  }).catch(() => {
    
  });
}

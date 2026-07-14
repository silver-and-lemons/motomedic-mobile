import { API_BASE_URL } from '../../../config/api';
import type { DashboardData } from '../types/dashboard';
import type { RiderProfile } from '../../../types/rider';
import { MOCK_DASHBOARD_DATA, MOCK_RIDER_PROFILE } from '../data/dashboard.mock';

export async function fetchRiderProfile(): Promise<RiderProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/rider/profile`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to fetch rider profile: ${res.status}`);
    return res.json() as Promise<RiderProfile>;
  } catch {
    return MOCK_RIDER_PROFILE;
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/dashboard`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to fetch dashboard: ${res.status}`);
    return res.json() as Promise<DashboardData>;
  } catch {
    return MOCK_DASHBOARD_DATA;
  }
}

export async function fetchLastChecklistCompletion(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/checklist/history/latest`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to fetch checklist history: ${res.status}`);
    const data = (await res.json()) as { completedAt: string };
    return data.completedAt;
  } catch {
    return null;
  }
}

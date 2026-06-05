import { API_BASE_URL } from '../../../config/api';
import type { MotorcycleQuestionnaire, ChecklistResult } from '../../../types/api';

export async function generateChecklist(
  data: MotorcycleQuestionnaire
): Promise<ChecklistResult> {
  const res = await fetch(`${API_BASE_URL}/api/checklist/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Request failed with status ${res.status}`);
  }

  return res.json() as Promise<ChecklistResult>;
}

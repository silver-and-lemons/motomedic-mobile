import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChecklistResult } from '../types/api';

const CHECKLIST_KEY = 'motomedic-checklist';

export async function saveChecklist(checklist: ChecklistResult): Promise<void> {
  await AsyncStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
}

export async function loadChecklist(): Promise<ChecklistResult | null> {
  const raw = await AsyncStorage.getItem(CHECKLIST_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as ChecklistResult;
}

export async function clearChecklist(): Promise<void> {
  await AsyncStorage.removeItem(CHECKLIST_KEY);
}

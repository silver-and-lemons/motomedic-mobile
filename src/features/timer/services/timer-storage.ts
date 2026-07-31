import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TimerSession } from '../types';

const SESSIONS_KEY = 'rider_timer_sessions';

export async function saveTimerSession(session: TimerSession): Promise<void> {
  const raw = await AsyncStorage.getItem(SESSIONS_KEY);
  const sessions: TimerSession[] = raw ? JSON.parse(raw) : [];
  sessions.push(session);
  await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

export async function loadTimerSessions(): Promise<TimerSession[]> {
  const raw = await AsyncStorage.getItem(SESSIONS_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as TimerSession[];
}

export async function clearTimerSessions(): Promise<void> {
  await AsyncStorage.removeItem(SESSIONS_KEY);
}

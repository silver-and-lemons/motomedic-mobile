import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WearGaugeSnapshot = {
  currentKm: number;
  cumulativeMileage: number;
  serviceIntervalKm: number;
  lastServiceKm: number;
  kmToNextService: number;
  serviceProgress: number;
};

export type DiagnosticSnapshot = {
  id: string;
  timestamp: string;
  checkedItemIds: string[];
  wearGauges: WearGaugeSnapshot | null;
};

type DiagnosticHistoryStore = {
  history: DiagnosticSnapshot[];
  addSnapshot: (snapshot: Omit<DiagnosticSnapshot, 'id'>) => void;
  clearHistory: () => void;
};

export const useDiagnosticHistoryStore = create<DiagnosticHistoryStore>()(
  persist(
    (set) => ({
      history: [],
      addSnapshot: (snapshot) =>
        set((state) => ({
          history: [
            ...state.history,
            { ...snapshot, id: Math.random().toString(36).substring(2, 15) },
          ],
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'diagnostic-history',
      storage: {
        getItem: async (name) => {
          const raw = await AsyncStorage.getItem(name);
          return raw ? JSON.parse(raw) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: async (name) => {
          await AsyncStorage.removeItem(name);
        },
      },
    },
  ),
);

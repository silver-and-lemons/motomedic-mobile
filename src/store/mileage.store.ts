import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { OdometerReading } from '../features/mileage/types/mileage';

type MileageStore = {
  reading: OdometerReading | null;
  isComplete: boolean;
  saveReading: (reading: OdometerReading) => void;
  updateOdometer: (currentKm: number) => void;
  recordService: (currentKm: number) => void;
  clearReading: () => void;
};

export const useMileageStore = create<MileageStore>()(
  persist(
    (set, get) => ({
      reading: null,
      isComplete: false,

      saveReading: (reading) => set({ reading, isComplete: true }),

      updateOdometer: (currentKm) => {
        const { reading } = get();
        if (!reading) return;
        set({ reading: { ...reading, currentKm } });
      },

      recordService: (currentKm) => {
        const { reading } = get();
        if (!reading) return;
        set({
          reading: {
            ...reading,
            lastServiceKm: currentKm,
            currentKm,
          },
        });
      },

      clearReading: () => set({ reading: null, isComplete: false }),
    }),
    {
      name: 'motomedic-mileage',
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
      partialize: (state) => ({
        reading: state.reading,
        isComplete: state.isComplete,
      }) as MileageStore,
    },
  ),
);

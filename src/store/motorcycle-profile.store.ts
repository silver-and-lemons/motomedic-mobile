import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MotorcycleProfile } from '../features/motorcycle-profile/types/motorcycle-profile';

type MotorcycleProfileStore = {
  profile: MotorcycleProfile | null;
  isComplete: boolean;
  saveProfile: (profile: MotorcycleProfile) => void;
  clearProfile: () => void;
};

export const useMotorcycleProfileStore = create<MotorcycleProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      isComplete: false,
      saveProfile: (profile) => set({ profile, isComplete: true }),
      clearProfile: () => set({ profile: null, isComplete: false }),
    }),
    {
      name: 'motorcycle-profile',
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
        profile: state.profile,
        isComplete: state.isComplete,
      }) as MotorcycleProfileStore,
    },
  ),
);

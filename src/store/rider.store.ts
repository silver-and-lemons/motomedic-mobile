import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RiderProfile } from '../types/rider';

type RiderStore = {
  rider: RiderProfile | null;
  isLoggedIn: boolean;
  setRider: (rider: RiderProfile) => void;
  clearRider: () => void;
};

export const useRiderStore = create<RiderStore>()(
  persist(
    (set) => ({
      rider: null,
      isLoggedIn: false,
      setRider: (rider) => set({ rider, isLoggedIn: true }),
      clearRider: () => set({ rider: null, isLoggedIn: false }),
    }),
    {
      name: 'rider-storage',
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
        rider: state.rider,
        isLoggedIn: state.isLoggedIn,
      }) as RiderStore,
    },
  ),
);

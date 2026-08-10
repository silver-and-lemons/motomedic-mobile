import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthUser, AuthTokens } from '../features/auth/types/auth';

type AuthStore = {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: AuthUser, tokens: AuthTokens) => void;
  clearSession: () => void;
  updateTokens: (tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: true,
      setSession: (user, tokens) =>
        set({ user, tokens, isAuthenticated: true, isLoading: false }),
      clearSession: () =>
        set({ user: null, tokens: null, isAuthenticated: false, isLoading: false }),
      updateTokens: (tokens) => set({ tokens }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-store',
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
      partialize: (state) =>
        ({ user: state.user }) as unknown as AuthStore,
    },
  ),
);

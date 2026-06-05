import { create } from 'zustand';
import type { MotorcycleProfile } from '../features/motorcycle-profile/types/motorcycle-profile';

type MotorcycleProfileStore = {
  profile: MotorcycleProfile | null;
  isComplete: boolean;
  saveProfile: (profile: MotorcycleProfile) => void;
  clearProfile: () => void;
};

export const useMotorcycleProfileStore = create<MotorcycleProfileStore>((set) => ({
  profile: null,
  isComplete: false,
  saveProfile: (profile) => set({ profile, isComplete: true }),
  clearProfile: () => set({ profile: null, isComplete: false }),
}));

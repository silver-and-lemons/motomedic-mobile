import { create } from 'zustand';
import { TOTAL_ONBOARDING_STEPS } from '../features/pre-trip-checklist/data/checklist-onboarding.data';

type ChecklistOnboardingStore = {
  hasCompletedOnboarding: boolean;
  currentStep: number;
  startOnboarding: () => void;
  nextStep: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useChecklistOnboardingStore = create<ChecklistOnboardingStore>(
  (set) => ({
    hasCompletedOnboarding: false,
    currentStep: 0,
    startOnboarding: () => set({ currentStep: 1 }),
    nextStep: () =>
      set((state) => {
        const next = state.currentStep + 1;
        if (next > TOTAL_ONBOARDING_STEPS) {
          return { currentStep: 0, hasCompletedOnboarding: true };
        }
        return { currentStep: next };
      }),
    skipOnboarding: () =>
      set({ currentStep: 0, hasCompletedOnboarding: true }),
    resetOnboarding: () =>
      set({ currentStep: 0, hasCompletedOnboarding: false }),
  })
);

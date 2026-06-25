import { create } from 'zustand';

type PreTripChecklistStore = {
  checkedItemIds: string[];
  lastCompletedAt: string | null;
  toggleItem: (itemId: string) => void;
  setCheckedItemIds: (itemIds: string[]) => void;
  markCompleted: () => void;
  clearCompleted: () => void;
};

export const usePreTripChecklistStore = create<PreTripChecklistStore>((set) => ({
  checkedItemIds: [],
  lastCompletedAt: null,
  toggleItem: (itemId) =>
    set((state) => ({
      checkedItemIds: state.checkedItemIds.includes(itemId)
        ? state.checkedItemIds.filter((currentItemId) => currentItemId !== itemId)
        : [...state.checkedItemIds, itemId],
    })),
  setCheckedItemIds: (itemIds) => set({ checkedItemIds: itemIds }),
  markCompleted: () => set({ lastCompletedAt: new Date().toISOString() }),
  clearCompleted: () => set({ lastCompletedAt: null }),
}));

import { create } from 'zustand';

type PreTripChecklistStore = {
  checkedItemIds: string[];
  toggleItem: (itemId: string) => void;
  setCheckedItemIds: (itemIds: string[]) => void;
};

export const usePreTripChecklistStore = create<PreTripChecklistStore>((set) => ({
  checkedItemIds: [],
  toggleItem: (itemId) =>
    set((state) => ({
      checkedItemIds: state.checkedItemIds.includes(itemId)
        ? state.checkedItemIds.filter((currentItemId) => currentItemId !== itemId)
        : [...state.checkedItemIds, itemId],
    })),
  setCheckedItemIds: (itemIds) => set({ checkedItemIds: itemIds }),
}));

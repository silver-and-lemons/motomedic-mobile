import { create } from 'zustand';

type PreTripChecklistStore = {
  checkedItemIds: string[];
  diagnosticConfirmed: boolean;
  toggleItem: (itemId: string) => void;
  setDiagnosticConfirmed: (confirmed: boolean) => void;
  setCheckedItemIds: (itemIds: string[]) => void;
  reset: () => void;
};

export const usePreTripChecklistStore = create<PreTripChecklistStore>((set) => ({
  checkedItemIds: [],
  diagnosticConfirmed: false,
  toggleItem: (itemId) =>
    set((state) => ({
      checkedItemIds: state.checkedItemIds.includes(itemId)
        ? state.checkedItemIds.filter((currentItemId) => currentItemId !== itemId)
        : [...state.checkedItemIds, itemId],
    })),
  setDiagnosticConfirmed: (confirmed) => set({ diagnosticConfirmed: confirmed }),
  setCheckedItemIds: (itemIds) => set({ checkedItemIds: itemIds }),
  reset: () => set({ checkedItemIds: [], diagnosticConfirmed: false }),
}));

export const dashboardKeys = {
  all: ['dashboard'] as const,
  data: () => [...dashboardKeys.all, 'data'] as const,
  rider: () => [...dashboardKeys.all, 'rider'] as const,
  checklistHistory: () => [...dashboardKeys.all, 'checklist-history'] as const,
};

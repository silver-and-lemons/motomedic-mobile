export const preTripChecklistKeys = {
  all: ['pre-trip-checklist'] as const,
  list: () => [...preTripChecklistKeys.all, 'list'] as const,
};

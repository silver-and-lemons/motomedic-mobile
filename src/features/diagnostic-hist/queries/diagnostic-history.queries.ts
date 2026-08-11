export const diagnosticHistoryKeys = {
  all: ['diagnostic-history'] as const,
  list: () => [...diagnosticHistoryKeys.all, 'list'] as const,
};
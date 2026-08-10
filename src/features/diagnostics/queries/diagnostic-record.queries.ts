export const diagnosticRecordKeys = {
  all: ['diagnostic-records'] as const,
  list: () => [...diagnosticRecordKeys.all, 'list'] as const,
};

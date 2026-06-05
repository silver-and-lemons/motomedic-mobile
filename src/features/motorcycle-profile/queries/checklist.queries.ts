export const checklistKeys = {
  all: ['checklist'] as const,
  generate: () => ['checklist', 'generate'] as const,
  cached: () => ['checklist', 'cached'] as const,
};

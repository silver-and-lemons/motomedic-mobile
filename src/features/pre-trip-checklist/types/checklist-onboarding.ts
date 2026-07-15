export type TooltipPointerDirection = 'up' | 'down' | 'right' | 'none';

export type ChecklistOnboardingStepId =
  | 'welcome'
  | 'health-score'
  | 'smart-scheduling'
  | 'component-checklist'
  | 'log-status'
  | 'log-status-good'
  | 'log-status-bad';

export type ChecklistOnboardingStep = {
  id: ChecklistOnboardingStepId;
  title: string;
  body: string;
  pointerDirection: TooltipPointerDirection;
  ctaLabel?: string;
};

/** Y-coordinate + height of a measured target element (absolute screen coords) */
export type OnboardingTargetLayout = {
  y: number;
  height: number;
};

/** Map from step id → measured layout of the element that step points to */
export type OnboardingTargetLayouts = Partial<
  Record<ChecklistOnboardingStepId, OnboardingTargetLayout>
>;

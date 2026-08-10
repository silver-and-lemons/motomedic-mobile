export type TooltipPointerDirection = 'up' | 'down' | 'right' | 'none';

export type ChecklistOnboardingStepId =
  | 'welcome'
  | 'health-score'
  | 'status-summary'
  | 'log-status-good'
  | 'log-status-bad'
  | 'checklist-overview'
  | 'tyre-pressure'
  | 'engine-oil'
  | 'front-rear-brakes'
  | 'lights'
  | 'fuel-level'
  | 'additional-checklist'
  | 'get-diagnosis';

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

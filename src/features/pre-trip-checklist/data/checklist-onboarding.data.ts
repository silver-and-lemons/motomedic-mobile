import type { ChecklistOnboardingStep } from '../types/checklist-onboarding';

export const CHECKLIST_ONBOARDING_STEPS: ChecklistOnboardingStep[] = [
  {
    id: 'welcome',
    title: "Let's Check Your Ride!",
    body: 'This tool helps you diagnose your bike\'s condition and gives you a clear roadmap for keeping it running perfectly.\n\nWhat you\'ll do:\n1. Inspect: Follow a simple part-by-part visual guide of the checklist.\n2. Rate: Mark components as Good, Needs Attention, or Critical.\n3. Pro tip: Get a tailored maintenance plan based entirely on your results.',
    pointerDirection: 'none',
    ctaLabel: 'PROCEED →',
  },
  {
    id: 'health-score',
    title: 'Understand Your Bike Health',
    body: 'At the top of the screen you\'ll see your overall Bike Health Score, calculated as a percentage. This score gives you an at-a-glance summary of your bike\'s current condition.',
    pointerDirection: 'up',
    ctaLabel: 'PROCEED →',
  },
  {
    id: 'smart-scheduling',
    title: 'Smart Scheduling',
    body: 'It will also recommend the absolute best time for your next scheduled service based on your bike\'s current condition.',
    pointerDirection: 'up',
    ctaLabel: 'PROCEED →',
  },
  {
    id: 'component-checklist',
    title: 'Component Checklist',
    body: 'Each item shows a specific part of your bike which you could check. Tap a component to view its details.',
    pointerDirection: 'down',
    ctaLabel: 'PROCEED →',
  },
  {
    id: 'log-status-good',
    title: 'Log Status',
    body: '**Tap Once** if the part is in good condition. A green check mark will appear.',
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'log-status-bad',
    title: 'Log Status',
    body: '**Tap Twice** if the part is in bad condition. An error icon will appear, signaling that this part needs attention.',
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
];

export const TOTAL_ONBOARDING_STEPS = CHECKLIST_ONBOARDING_STEPS.length;

import type { ChecklistOnboardingStep } from '../types/checklist-onboarding';

export const CHECKLIST_ONBOARDING_STEPS: ChecklistOnboardingStep[] = [
  {
    id: 'welcome',
    title: "Let's Check Your Ride!",
    body: "Welcome! This tool helps you diagnose your bike's condition and gives you a clear roadmap for keeping it running perfectly.\n\nWhat you'll do:\n1. Inspect: Follow a simple, part-by-part visual guide of the checklist.\n2. Rate: Mark components as Good, Needs Attention, or Critical.\n3. Fix: Get a tailored maintenance plan based entirely on your results.\n\nTap Proceed to see how it works!",
    pointerDirection: 'none',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'health-score',
    title: 'Understand Your Bike Health',
    body: "At the top of the screen, you'll see your overall Bike Health Score displayed as a percentage.",
    pointerDirection: 'up',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'status-summary',
    title: 'Status Summary',
    body: "Right below the score, the app provides a quick breakdown of your bike's current condition.",
    pointerDirection: 'up',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'log-status-good',
    title: 'Log Status',
    body: 'Tap Once if the part is in good condition. A green check mark will appear.',
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'log-status-bad',
    title: 'Log Status',
    body: 'Tap Twice if the part is in bad condition. An error icon will appear, signaling that this part needs attention.',
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'checklist-overview',
    title: 'Complete Each Part',
    body: 'Now that you know how to log status, work through the checklist below. Mark each component as Good or Needs Attention before moving on.',
    pointerDirection: 'none',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'tyre-pressure',
    title: 'Tyre Pressure & Condition',
    body: "Good Condition: Both tires feel completely firm, have deep tread, and show a clean surface.\n\nNeeds Attention: You spot visible cuts, deep cracks in the sidewalls, or the tires feel noticeably soft or low on pressure.",
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'engine-oil',
    title: 'Engine Oil Level',
    body: "Good Condition: When checking the sight glass or pulling the dipstick, the oil level sits safely above the minimum line.\n\nNeeds Attention: The oil level is below the minimum line.",
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'front-rear-brakes',
    title: 'Front & Rear Brakes',
    body: "Good Condition: Squeezing the hand levers and pressing the foot brake gives you firm, immediate resistance.\n\nNeeds Attention: The levers or foot pedal feel spongy, loose, or pull all the way down without stopping firmly.",
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'lights',
    title: 'Lights',
    body: "Good Condition: Your headlight, brake light, and all indicator signal lights are bright and fully working.\n\nNeeds Attention: Any single bulb is burned out, dim, or flickering when activated.",
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'fuel-level',
    title: 'Fuel Level',
    body: "Good Condition: You have plenty of fuel in the tank to comfortably finish your entire trip.\n\nNeeds Attention: Your tank is running low, forcing you to rely on your reserve fuel to get by.",
    pointerDirection: 'right',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'additional-checklist',
    title: 'Additional Checklist',
    body: 'Check these if you have them.',
    pointerDirection: 'down',
    ctaLabel: 'PROCEED >',
  },
  {
    id: 'get-diagnosis',
    title: 'Get Your Diagnosis',
    body: 'Tap Confirm to submit your choices and instantly view your personalized Bike Diagnosis.',
    pointerDirection: 'none',
    ctaLabel: 'PROCEED >',
  },
];

export const TOTAL_ONBOARDING_STEPS = CHECKLIST_ONBOARDING_STEPS.length;

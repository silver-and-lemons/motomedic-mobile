import { View, StyleSheet } from 'react-native';
import OnboardingOverlay from '../atoms/OnboardingOverlay';
import OnboardingWelcomeCard from '../molecules/OnboardingWelcomeCard';
import TooltipBubble from '../atoms/TooltipBubble';
import { CHECKLIST_ONBOARDING_STEPS } from '../../data/checklist-onboarding.data';
import type { ChecklistOnboardingStepId, OnboardingTargetLayouts } from '../../types/checklist-onboarding';

type ChecklistOnboardingProps = {
  currentStep: number;
  onNext: () => void;
  onSkip: () => void;
  targetLayouts: OnboardingTargetLayouts;
  scrollOffsetY: number;
};

export default function ChecklistOnboarding({
  currentStep,
  onNext,
  onSkip,
  targetLayouts,
  scrollOffsetY,
}: ChecklistOnboardingProps) {
  const isVisible = currentStep > 0;

  const stepIndex = currentStep - 1;
  const step = CHECKLIST_ONBOARDING_STEPS[stepIndex];

  if (!step || !isVisible) {
    return null;
  }

  const isCentered = step.id === 'welcome' || step.id === 'checklist-overview' || step.id === 'get-diagnosis';

  return (
    <View style={styles.container} pointerEvents="box-none">
      <OnboardingOverlay />

      <View
        style={[
          styles.tooltipContainer,
          isCentered
            ? { justifyContent: 'center' }
            : getTooltipPosition(step.id, step.pointerDirection, targetLayouts, scrollOffsetY),
        ]}
        pointerEvents="box-none"
      >
        {isCentered && step.id === 'welcome' ? (
          <OnboardingWelcomeCard onProceed={onNext} />
        ) : (
          <TooltipBubble
            title={step.title}
            body={step.body}
            pointerDirection={step.pointerDirection}
            ctaLabel={step.ctaLabel}
            onCtaPress={onNext}
          />
        )}
      </View>
    </View>
  );
}

function getTooltipPosition(
  stepId: ChecklistOnboardingStepId,
  pointerDirection: string,
  layouts: OnboardingTargetLayouts,
  scrollOffsetY: number,
): Record<string, string | number | undefined> {
  const layout = layouts[stepId];

  if (!layout) {
    return { justifyContent: 'center' };
  }

  const adjustedY = layout.y - scrollOffsetY;

  if (pointerDirection === 'right') {
    return {
      top: Math.max(0, adjustedY),
      bottom: undefined,
      height: layout.height,
      justifyContent: 'center',
    };
  }

  if (pointerDirection === 'up') {
    return {
      justifyContent: 'flex-start',
      paddingTop: Math.max(0, adjustedY + layout.height),
    };
  }

  // pointerDirection === 'down'
  return {
    justifyContent: 'flex-start',
    paddingTop: Math.max(0, adjustedY - 180),
  };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    zIndex: 50,
  },
  tooltipContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
});

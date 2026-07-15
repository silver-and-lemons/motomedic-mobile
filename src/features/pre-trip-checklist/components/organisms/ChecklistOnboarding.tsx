import { Modal, View, StyleSheet } from 'react-native';
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
};

export default function ChecklistOnboarding({
  currentStep,
  onNext,
  onSkip,
  targetLayouts,
}: ChecklistOnboardingProps) {
  const isVisible = currentStep > 0;

  const stepIndex = currentStep - 1;
  const step = CHECKLIST_ONBOARDING_STEPS[stepIndex];

  if (!step) {
    return null;
  }

  const isWelcome = step.id === 'welcome';

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Dark overlay background — tap anywhere to advance */}
        <OnboardingOverlay onPress={onNext} />

        {/* Tooltip positioned based on measured target element */}
        <View
          style={[
            styles.tooltipContainer,
            isWelcome
              ? { justifyContent: 'center' }
              : getTooltipPosition(step.id, step.pointerDirection, targetLayouts),
          ]}
          pointerEvents="box-none"
        >
          {isWelcome ? (
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
    </Modal>
  );
}

/**
 * Position the tooltip so its connector line touches the target element.
 *
 * - pointer "up" → tooltip sits BELOW the target element.
 *   Top of the tooltip container = bottom edge of the target.
 *
 * - pointer "down" → tooltip sits ABOVE the target element.
 *   We use paddingTop so the bottom of the tooltip lands near the top
 *   of the target. This is approximate since we don't know the tooltip
 *   height, but placing it with justifyContent flex-end and paddingBottom
 *   from the bottom of the screen achieves the same effect.
 */
function getTooltipPosition(
  stepId: ChecklistOnboardingStepId,
  pointerDirection: string,
  layouts: OnboardingTargetLayouts,
): Record<string, string | number | undefined> {
  const layout = layouts[stepId];

  if (!layout) {
    // Fallback if not yet measured
    return { justifyContent: 'center' };
  }

  if (pointerDirection === 'right') {
    return {
      top: layout.y,
      bottom: undefined,
      height: layout.height,
      justifyContent: 'center',
    };
  }

  if (pointerDirection === 'up') {
    // Tooltip appears below the target element
    // Position at the bottom edge of the target
    return {
      justifyContent: 'flex-start',
      paddingTop: layout.y + layout.height,
    };
  }

  // pointerDirection === 'down'
  // Tooltip appears above the target element
  // Position so the tooltip + connector ends right at the target's top edge
  return {
    justifyContent: 'flex-start',
    paddingTop: Math.max(0, layout.y - 180),
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tooltipContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
  },
});

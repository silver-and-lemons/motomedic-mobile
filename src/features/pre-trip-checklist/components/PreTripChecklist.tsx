import { useCallback, useState } from 'react';
import { ScrollView } from 'react-native';
import PreTripChecklistContent from './organisms/PreTripChecklistContent';
import ChecklistOnboarding from './organisms/ChecklistOnboarding';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection,
  PreTripChecklistStats,
} from '../types/pre-trip-checklist';
import type {
  ChecklistOnboardingStepId,
  OnboardingTargetLayout,
  OnboardingTargetLayouts,
} from '../types/checklist-onboarding';

type PreTripChecklistProps = {
  sections: PreTripChecklistSection[];
  checkedItemIds: Set<string>;
  mode: PreTripChecklistMode;
  canProceedToDiagnostic: boolean;
  stats: PreTripChecklistStats;
  isLoading: boolean;
  errorMessage?: string;
  expandedGuideItemId: string | null;
  onboardingStep: number;
  onNextOnboardingStep: () => void;
  onSkipOnboarding: () => void;
  onBack: () => void;
  onRunDiagnostic: () => void;
  onToggleItem: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
  onSetOdometer?: () => void;
  onGoToDashboard?: () => void;
};

export default function PreTripChecklist({
  sections,
  checkedItemIds,
  mode,
  canProceedToDiagnostic,
  stats,
  isLoading,
  errorMessage,
  expandedGuideItemId,
  onboardingStep,
  onNextOnboardingStep,
  onSkipOnboarding,
  onBack,
  onRunDiagnostic,
  onToggleItem,
  onToggleGuide,
  onSetOdometer,
  onGoToDashboard,
}: PreTripChecklistProps) {
  const [targetLayouts, setTargetLayouts] = useState<OnboardingTargetLayouts>({});

  const handleTargetLayout = useCallback(
    (stepId: ChecklistOnboardingStepId, layout: OnboardingTargetLayout) => {
      setTargetLayouts((prev) => ({ ...prev, [stepId]: layout }));
    },
    []
  );

  return (
    <>
      <ScrollView
        className="flex-1 bg-[#0b171b]"
        contentContainerStyle={{ gap: 24, padding: 20, paddingBottom: 34 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <PreTripChecklistContent
          sections={sections}
          checkedItemIds={checkedItemIds}
          mode={mode}
          canProceedToDiagnostic={canProceedToDiagnostic}
          stats={stats}
          isLoading={isLoading}
          errorMessage={errorMessage}
          expandedGuideItemId={expandedGuideItemId}
          onBack={onBack}
          onRunDiagnostic={onRunDiagnostic}
          onToggleItem={onToggleItem}
          onToggleGuide={onToggleGuide}
          onSetOdometer={onSetOdometer}
          onGoToDashboard={onGoToDashboard}
          onTargetLayout={handleTargetLayout}
        />
      </ScrollView>

      <ChecklistOnboarding
        currentStep={onboardingStep}
        onNext={onNextOnboardingStep}
        onSkip={onSkipOnboarding}
        targetLayouts={targetLayouts}
      />
    </>
  );
}

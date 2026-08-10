import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { ScrollView, type NativeSyntheticEvent, type NativeScrollEvent } from 'react-native';
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
import type { TimerStatus } from '../../timer/types';

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
  onStartRide?: () => void;
  timerStatus?: TimerStatus;
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
  onStartRide,
  timerStatus,
}: PreTripChecklistProps) {
  const [targetLayouts, setTargetLayouts] = useState<OnboardingTargetLayouts>({});
  const [scrollOffsetY, setScrollOffsetY] = useState(0);

  const handleTargetLayout = useCallback(
    (stepId: ChecklistOnboardingStepId, layout: OnboardingTargetLayout) => {
      setTargetLayouts((prev) => ({ ...prev, [stepId]: layout }));
    },
    []
  );

  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setScrollOffsetY(e.nativeEvent.contentOffset.y);
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        className="flex-1 bg-[#0b171b]"
        contentContainerStyle={{ gap: 24, padding: 20, paddingBottom: 34 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
          onStartRide={onStartRide}
          timerStatus={timerStatus}
          onTargetLayout={handleTargetLayout}
        />
      </ScrollView>

      <ChecklistOnboarding
        currentStep={onboardingStep}
        onNext={onNextOnboardingStep}
        onSkip={onSkipOnboarding}
        targetLayouts={targetLayouts}
        scrollOffsetY={scrollOffsetY}
      />
    </View>
  );
}

import { View } from 'react-native';
import { ArrowLeft, MoreHorizontal } from 'lucide-react-native';
import { Button } from '../../../../components/atoms/Button';
import ChecklistHeaderCard from '../molecules/ChecklistHeaderCard';
import ChecklistIconButton from '../atoms/ChecklistIconButton';
import ChecklistSection from './ChecklistSection';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistText from '../atoms/ChecklistText';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection as PreTripChecklistSectionType,
  PreTripChecklistStats,
} from '../../types/pre-trip-checklist';
import type { ChecklistOnboardingStepId, OnboardingTargetLayout } from '../../types/checklist-onboarding';

type PreTripChecklistContentProps = {
  sections: PreTripChecklistSectionType[];
  checkedItemIds: Set<string>;
  mode: PreTripChecklistMode;
  canProceedToDiagnostic: boolean;
  stats: PreTripChecklistStats;
  isLoading: boolean;
  errorMessage?: string;
  expandedGuideItemId: string | null;
  onBack: () => void;
  onRunDiagnostic: () => void;
  onToggleItem: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
  onSetOdometer?: () => void;
  onGoToDashboard?: () => void;
  onTargetLayout?: (stepId: ChecklistOnboardingStepId, layout: OnboardingTargetLayout) => void;
};

export default function PreTripChecklistContent({
  sections,
  checkedItemIds,
  mode,
  canProceedToDiagnostic,
  stats,
  isLoading,
  errorMessage,
  expandedGuideItemId,
  onBack,
  onRunDiagnostic,
  onToggleItem,
  onToggleGuide,
  onSetOdometer,
  onGoToDashboard,
  onTargetLayout,
}: PreTripChecklistContentProps) {
  const isStatusMode = mode === 'status';

  /**
   * Measure the absolute screen position of a target element.
   * Uses the native `measure()` API which returns pageY (absolute Y on screen).
   */
  function handleMeasure(stepId: ChecklistOnboardingStepId) {
    return (ref: View | null) => {
      if (!ref || !onTargetLayout) return;
      // Small delay to let layout settle
      setTimeout(() => {
        ref.measure((_x, _y, _w, h, _pageX, pageY) => {
          if (typeof pageY === 'number' && typeof h === 'number') {
            onTargetLayout(stepId, { y: pageY, height: h });
          }
        });
      }, 300);
    };
  }

  if (isLoading) {
    return (
      <ChecklistSurface className="gap-3">
        <ChecklistText className="font-semibold">Loading bike checklist...</ChecklistText>
        <ChecklistText tone="muted">Running the pre-trip diagnostic.</ChecklistText>
      </ChecklistSurface>
    );
  }

  if (errorMessage) {
    return (
      <ChecklistSurface className="gap-3 border-red-500">
        <ChecklistText className="font-semibold">Checklist unavailable</ChecklistText>
        <ChecklistText tone="muted">{errorMessage}</ChecklistText>
      </ChecklistSurface>
    );
  }

  return (
    <>
      <ChecklistSurface className="flex-row items-center justify-between border-0 border-b border-[#1e3035] bg-transparent px-0 pb-5 pt-1">
        <ChecklistIconButton icon={ArrowLeft} onPress={onBack} accessibilityLabel="Go back" />
        <ChecklistText className="flex-1 text-xs font-semibold">
          Bike checklist
        </ChecklistText>
        <ChecklistIconButton icon={MoreHorizontal} accessibilityLabel="Checklist options" />
      </ChecklistSurface>

      {/* health-score target: the whole header card with the ring + scheduling text */}
      <View ref={handleMeasure('health-score')} collapsable={false}>
        <ChecklistHeaderCard
          stats={stats}
          onHealthScoreLayout={(layout) => onTargetLayout?.('health-score', layout)}
          onSchedulingLayout={(layout) => onTargetLayout?.('smart-scheduling', layout)}
        />
      </View>

      {sections.map((section, index) => (
        <View
          key={section.id}
          ref={index === 0 ? handleMeasure('component-checklist') : undefined}
          collapsable={false}
        >
          <ChecklistSection
            section={section}
            checkedItemIds={checkedItemIds}
            mode={mode}
            expandedGuideItemId={expandedGuideItemId}
            onToggleItem={onToggleItem}
            onToggleGuide={onToggleGuide}
            onFirstItemLayout={index === 0
              ? (layout) => {
                  onTargetLayout?.('log-status', layout);
                  onTargetLayout?.('log-status-good', layout);
                  onTargetLayout?.('log-status-bad', layout);
                }
              : undefined
            }
          />
        </View>
      ))}

      {!isStatusMode && !canProceedToDiagnostic && (
        <ChecklistText tone="muted" className="text-center text-xs">
          Check all non-optional boxes before proceeding.
        </ChecklistText>
      )}

      {(isStatusMode || canProceedToDiagnostic) && (
        <Button
          variant="primary"
          className="mt-2 h-14 rounded-md bg-[#21f4b7]"
          textClassName="text-xs font-black text-[#061314]"
          onPress={onRunDiagnostic}
        >
          {isStatusMode ? 'RE-RUN SELF DIAGNOSTIC' : 'RUN SELF DIAGNOSTIC'}
        </Button>
      )}

      {isStatusMode && onSetOdometer && (
        <Button
          variant="outline"
          className="mt-2 h-14 rounded-md border-[#21f4b7]"
          textClassName="text-xs font-black text-[#21f4b7]"
          onPress={onSetOdometer}
        >
          SET ODOMETER
        </Button>
      )}

      {isStatusMode && onGoToDashboard && (
        <Button
          variant="primary"
          className="mt-2 h-14 rounded-md bg-[#0ea5e9]"
          textClassName="text-xs font-black text-white"
          onPress={onGoToDashboard}
        >
          GO TO DASHBOARD
        </Button>
      )}
    </>
  );
}

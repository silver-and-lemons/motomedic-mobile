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

  function handleMeasure(stepId: ChecklistOnboardingStepId) {
    return (ref: View | null) => {
      if (!ref || !onTargetLayout) return;
      setTimeout(() => {
        ref.measure((_x, _y, _w, h, _pageX, pageY) => {
          if (typeof pageY === 'number' && typeof h === 'number') {
            onTargetLayout(stepId, { y: pageY, height: h });
          }
        });
      }, 300);
    };
  }

  const ITEM_ID_TO_STEP_ID: Record<string, ChecklistOnboardingStepId> = {
    'tyre-pressure-condition': 'tyre-pressure',
    'engine-oil-level': 'engine-oil',
    'front-rear-brakes': 'front-rear-brakes',
    'lights': 'lights',
    'fuel-level': 'fuel-level',
  };

  function handleRowLayout(itemId: string, layout: OnboardingTargetLayout) {
    const stepId = ITEM_ID_TO_STEP_ID[itemId];
    if (stepId) {
      onTargetLayout?.(stepId, layout);
    }
  }

  function handleItemCheckboxLayout(itemId: string, layout: OnboardingTargetLayout) {
    if (itemId === 'tyre-pressure-condition') {
      onTargetLayout?.('log-status-good', layout);
      onTargetLayout?.('log-status-bad', layout);
    }
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

      <View ref={handleMeasure('health-score')} collapsable={false}>
        <ChecklistHeaderCard
          stats={stats}
          onHealthScoreLayout={(layout) => onTargetLayout?.('health-score', layout)}
          onStatusSummaryLayout={(layout) => onTargetLayout?.('status-summary', layout)}
        />
      </View>

      {sections.map((section) => (
        <View key={section.id} collapsable={false}>
          <ChecklistSection
            section={section}
            checkedItemIds={checkedItemIds}
            mode={mode}
            expandedGuideItemId={expandedGuideItemId}
            onToggleItem={onToggleItem}
            onToggleGuide={onToggleGuide}
            onFirstItemLayout={section.id === 'bike-health'
              ? (layout) => {
                  onTargetLayout?.('log-status-good', layout);
                  onTargetLayout?.('log-status-bad', layout);
                }
              : undefined
            }
            onSectionHeaderLayout={section.id === 'additional'
              ? (layout) => onTargetLayout?.('additional-checklist', layout)
              : undefined
            }
            onRowLayout={handleRowLayout}
            onItemCheckboxLayout={handleItemCheckboxLayout}
          />
        </View>
      ))}

      {!isStatusMode && !canProceedToDiagnostic && (
        <ChecklistText tone="muted" className="text-center text-xs">
          Check all non-optional boxes before proceeding.
        </ChecklistText>
      )}

      {(isStatusMode || canProceedToDiagnostic) && (
        <View ref={isStatusMode ? undefined : handleMeasure('get-diagnosis')}>
          <Button
            variant="primary"
            className="mt-2 h-14 rounded-md bg-[#21f4b7]"
            textClassName="text-xs font-black text-[#061314]"
            onPress={onRunDiagnostic}
          >
            {isStatusMode ? 'RE-RUN SELF DIAGNOSTIC' : 'RUN SELF DIAGNOSTIC'}
          </Button>
        </View>
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

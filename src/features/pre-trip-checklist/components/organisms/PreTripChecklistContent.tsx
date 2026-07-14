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

type PreTripChecklistContentProps = {
  sections: PreTripChecklistSectionType[];
  checkedItemIds: Set<string>;
  mode: PreTripChecklistMode;
  canProceedToDiagnostic: boolean;
  stats: PreTripChecklistStats;
  isLoading: boolean;
  errorMessage?: string;
  onBack: () => void;
  onRunDiagnostic: () => void;
  onToggleItem: (itemId: string) => void;
  onSetOdometer?: () => void;
  onGoToDashboard?: () => void;
};

export default function PreTripChecklistContent({
  sections,
  checkedItemIds,
  mode,
  canProceedToDiagnostic,
  stats,
  isLoading,
  errorMessage,
  onBack,
  onRunDiagnostic,
  onToggleItem,
  onSetOdometer,
  onGoToDashboard,
}: PreTripChecklistContentProps) {
  const isStatusMode = mode === 'status';

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

      <ChecklistHeaderCard stats={stats} />

      {sections.map((section) => (
        <ChecklistSection
          key={section.id}
          section={section}
          checkedItemIds={checkedItemIds}
          mode={mode}
          onToggleItem={onToggleItem}
        />
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

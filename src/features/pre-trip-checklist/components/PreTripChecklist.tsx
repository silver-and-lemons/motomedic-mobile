import { ScrollView } from 'react-native';
import PreTripChecklistContent from './organisms/PreTripChecklistContent';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection,
  PreTripChecklistStats,
} from '../types/pre-trip-checklist';

type PreTripChecklistProps = {
  sections: PreTripChecklistSection[];
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
  onBack,
  onRunDiagnostic,
  onToggleItem,
  onToggleGuide,
}: PreTripChecklistProps) {
  return (
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
      />
    </ScrollView>
  );
}

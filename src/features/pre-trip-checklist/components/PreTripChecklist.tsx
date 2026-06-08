import { ScrollView } from 'react-native';
import PreTripChecklistContent from './organisms/PreTripChecklistContent';
import type {
  PreTripChecklistSection,
  PreTripChecklistStats,
} from '../types/pre-trip-checklist';

type PreTripChecklistProps = {
  sections: PreTripChecklistSection[];
  checkedItemIds: Set<string>;
  diagnosticConfirmed: boolean;
  canProceedToDiagnostic: boolean;
  stats: PreTripChecklistStats;
  isLoading: boolean;
  errorMessage?: string;
  onBack: () => void;
  onRunDiagnostic: () => void;
  onToggleItem: (itemId: string) => void;
};

export default function PreTripChecklist({
  sections,
  checkedItemIds,
  diagnosticConfirmed,
  canProceedToDiagnostic,
  stats,
  isLoading,
  errorMessage,
  onBack,
  onRunDiagnostic,
  onToggleItem,
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
        diagnosticConfirmed={diagnosticConfirmed}
        canProceedToDiagnostic={canProceedToDiagnostic}
        stats={stats}
        isLoading={isLoading}
        errorMessage={errorMessage}
        onBack={onBack}
        onRunDiagnostic={onRunDiagnostic}
        onToggleItem={onToggleItem}
      />
    </ScrollView>
  );
}

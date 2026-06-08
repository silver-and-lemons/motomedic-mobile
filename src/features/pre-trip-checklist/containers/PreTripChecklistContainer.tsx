import { useMemo } from 'react';
import { router } from 'expo-router';
import PreTripChecklist from '../components/PreTripChecklist';
import { usePreTripChecklist } from '../hooks/use-pre-trip-checklist';
import type { PreTripChecklistSection } from '../types/pre-trip-checklist';
import { usePreTripChecklistStore } from '../../../store/pre-trip-checklist.store';

export default function PreTripChecklistContainer() {
  const { data: sections, isLoading, error } = usePreTripChecklist();
  const checkedItemIds = usePreTripChecklistStore((state) => state.checkedItemIds);
  const diagnosticConfirmed = usePreTripChecklistStore((state) => state.diagnosticConfirmed);
  const toggleItem = usePreTripChecklistStore((state) => state.toggleItem);
  const setDiagnosticConfirmed = usePreTripChecklistStore(
    (state) => state.setDiagnosticConfirmed
  );
  const setCheckedItemIds = usePreTripChecklistStore((state) => state.setCheckedItemIds);
  const requiredItemIds = sections
    .flatMap((section) => section.items)
    .filter((item) => item.priority === 'required')
    .map((item) => item.id);
  const checkedItemIdSet = new Set(checkedItemIds);
  const canProceedToDiagnostic = requiredItemIds.every((itemId) =>
    checkedItemIdSet.has(itemId)
  );

  const stats = useMemo(() => {
    const items = sections.flatMap((section) => section.items);
    const completedCount = items.filter((item) => checkedItemIdSet.has(item.id)).length;
    const attentionCount = items.filter((item) => item.state === 'attention').length;
    const requiredRemainingCount = items.filter(
      (item) => item.priority === 'required' && item.state === 'attention'
    ).length;
    const healthScore = Math.max(0, 100 - attentionCount * 12);

    return {
      completedCount,
      totalCount: items.length,
      requiredRemainingCount,
      healthScore,
    };
  }, [checkedItemIds, checkedItemIdSet, sections]);

  function handleToggleItem(itemId: string): void {
    toggleItem(itemId);
  }

  function handleRunDiagnostic(): void {
    setDiagnosticConfirmed(true);
    if (checkedItemIds.length === 0) {
      setCheckedItemIds(getDefaultCheckedItemIds(sections));
    }
  }

  return (
    <PreTripChecklist
      sections={sections}
      checkedItemIds={checkedItemIdSet}
      diagnosticConfirmed={diagnosticConfirmed}
      canProceedToDiagnostic={canProceedToDiagnostic}
      stats={stats}
      isLoading={isLoading}
      errorMessage={error?.message}
      onBack={() => router.back()}
      onRunDiagnostic={handleRunDiagnostic}
      onToggleItem={handleToggleItem}
    />
  );
}

function getDefaultCheckedItemIds(sections: PreTripChecklistSection[]): string[] {
  return (
    sections
      .flatMap((section) => section.items)
      .filter((item) => item.completed)
      .map((item) => item.id)
  );
}

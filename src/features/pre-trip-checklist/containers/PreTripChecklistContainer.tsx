import { useMemo } from 'react';
import { router, type Href } from 'expo-router';
import PreTripChecklist from '../components/PreTripChecklist';
import { usePreTripChecklist } from '../hooks/use-pre-trip-checklist';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection,
} from '../types/pre-trip-checklist';
import { usePreTripChecklistStore } from '../../../store/pre-trip-checklist.store';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import { useMileageStore } from '../../../store/mileage.store';

type PreTripChecklistContainerProps = {
  mode: PreTripChecklistMode;
};

const CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;
const CHECKLIST_STATUS_ROUTE = '/pre-trip-checklist-status' as Href;
const ODOMETER_INPUT_ROUTE = '/odometer-input' as Href;
const DASHBOARD_ROUTE = '/dashboard' as Href;

export default function PreTripChecklistContainer({
  mode,
}: PreTripChecklistContainerProps) {
  const { data, isLoading, error } = usePreTripChecklist();
  const profile = useMotorcycleProfileStore((state) => state.profile);
  const checkedItemIds = usePreTripChecklistStore((state) => state.checkedItemIds);
  const toggleItem = usePreTripChecklistStore((state) => state.toggleItem);
  const setCheckedItemIds = usePreTripChecklistStore((state) => state.setCheckedItemIds);
  const isMileageComplete = useMileageStore((state) => state.isComplete);
  const sections = useMemo(
    () => filterRelevantSections(data, profile),
    [data, profile]
  );
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
    if (mode === 'status') {
      router.replace(CHECKLIST_ROUTE);
      return;
    }

    if (checkedItemIds.length === 0) {
      setCheckedItemIds(getDefaultCheckedItemIds(sections));
    }
    router.push(CHECKLIST_STATUS_ROUTE);
  }

  function handleSetOdometer(): void {
    router.push(ODOMETER_INPUT_ROUTE);
  }

  function handleGoToDashboard(): void {
    router.push(DASHBOARD_ROUTE);
  }

  return (
    <PreTripChecklist
      sections={sections}
      checkedItemIds={checkedItemIdSet}
      mode={mode}
      canProceedToDiagnostic={canProceedToDiagnostic}
      stats={stats}
      isLoading={isLoading}
      errorMessage={error?.message}
      onBack={() => router.back()}
      onRunDiagnostic={handleRunDiagnostic}
      onToggleItem={handleToggleItem}
      onSetOdometer={isMileageComplete ? undefined : handleSetOdometer}
      onGoToDashboard={handleGoToDashboard}
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

function filterRelevantSections(
  sections: PreTripChecklistSection[],
  profile: ReturnType<typeof useMotorcycleProfileStore.getState>['profile']
): PreTripChecklistSection[] {
  if (!profile) {
    return sections;
  }

  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        switch (item.id) {
          case 'chain-tension-lubrication':
          case 'sprocket-condition':
            return profile.vehicleType !== 'automatic-scooter';
          case 'choke-warm-up':
            return profile.fuelType === 'carbureted';
          case 'fi-warning-light':
            return profile.fuelType === 'fuel-injected';
          case 'coolant-level':
            return profile.coolingType === 'liquid-cooled';
          case 'battery-electricals':
            return profile.bikeAge <= 2014;
          case 'brake-fluid-level':
            return profile.engineSizeCc >= 156;
          case 'abs-self-check':
            return profile.engineSizeCc >= 156 && profile.fuelType === 'fuel-injected';
          default:
            return true;
        }
      }),
    }))
    .filter((section) => section.items.length > 0);
}

import { useQuery } from '@tanstack/react-query';
import { PRE_TRIP_CHECKLIST_SECTIONS } from '../data/pre-trip-checklist.mock';
import { preTripChecklistKeys } from '../queries/pre-trip-checklist.queries';
import { fetchPreTripChecklist } from '../services/pre-trip-checklist.service';

export function usePreTripChecklist() {
  return useQuery({
    queryKey: preTripChecklistKeys.list(),
    queryFn: fetchPreTripChecklist,
    initialData: PRE_TRIP_CHECKLIST_SECTIONS,
  });
}

import { PRE_TRIP_CHECKLIST_SECTIONS } from '../data/pre-trip-checklist.mock';
import type { PreTripChecklistSection } from '../types/pre-trip-checklist';

export async function fetchPreTripChecklist(): Promise<PreTripChecklistSection[]> {
  return PRE_TRIP_CHECKLIST_SECTIONS;
}

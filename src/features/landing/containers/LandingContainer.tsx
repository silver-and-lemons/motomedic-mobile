import { router, type Href } from 'expo-router';
import LandingScreen from '../components/LandingScreen';

const QUESTIONNAIRE_ROUTE = '/questionnaire' as Href;
const PRE_TRIP_CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;

export default function LandingContainer() {
  return (
    <LandingScreen
      onStartQuestionnaire={() => router.push(QUESTIONNAIRE_ROUTE)}
      onOpenPreTripChecklist={() => router.push(PRE_TRIP_CHECKLIST_ROUTE)}
    />
  );
}

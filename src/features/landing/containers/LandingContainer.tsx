import { router, type Href } from 'expo-router';
import LandingScreen from '../components/LandingScreen';

const QUESTIONNAIRE_ROUTE = '/questionnaire' as Href;

export default function LandingContainer() {
  return (
    <LandingScreen
      onStartQuestionnaire={() => router.push(QUESTIONNAIRE_ROUTE)}
    />
  );
}

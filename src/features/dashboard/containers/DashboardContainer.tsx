import { useEffect } from 'react';
import { router, type Href } from 'expo-router';
import DashboardScreen from '../components/DashboardScreen';
import { useDashboard } from '../hooks/use-dashboard';
import { useRiderStore } from '../../../store/rider.store';

const CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;

export default function DashboardContainer() {
  const {
    rider,
    riderLoading,
    dashboard,
    dashboardLoading,
    maintenanceBanner,
    bannerLoading,
    error,
  } = useDashboard();

  const setRider = useRiderStore((state) => state.setRider);

  useEffect(() => {
    if (rider) {
      setRider(rider);
    }
  }, [rider, setRider]);

  function handleStartCheck(): void {
    router.push(CHECKLIST_ROUTE);
  }

  return (
    <DashboardScreen
      rider={rider ?? null}
      dashboard={dashboard ?? null}
      maintenanceBanner={maintenanceBanner}
      isLoading={riderLoading || dashboardLoading || bannerLoading}
      error={error}
      onStartCheck={handleStartCheck}
      onNotificationPress={() => {}}
      onChangeVehicle={() => {}}
      onActivityPress={(id) => {}}
    />
  );
}

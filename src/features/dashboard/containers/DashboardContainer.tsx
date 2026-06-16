import { useCallback } from 'react';
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
    booking,
    bannerLoading,
    error,
  } = useDashboard();

  const setRider = useRiderStore((state) => state.setRider);

  if (rider) {
    setRider(rider);
  }

  const handleBannerAction = useCallback((): void => {
    router.push(CHECKLIST_ROUTE);
  }, []);

  const handleBookService = useCallback((): void => {
  }, []);

  return (
    <DashboardScreen
      rider={rider ?? null}
      dashboard={dashboard ?? null}
      maintenanceBanner={maintenanceBanner}
      booking={booking}
      isLoading={riderLoading || dashboardLoading || bannerLoading}
      error={error}
      onBannerAction={handleBannerAction}
      onBookService={handleBookService}
      onNotificationPress={() => {}}
      onChangeVehicle={() => {}}
      onActivityPress={(id) => {}}
    />
  );
}

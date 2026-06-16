import { useQuery } from '@tanstack/react-query';
import { dashboardKeys } from '../queries/dashboard.queries';
import {
  fetchRiderProfile,
  fetchDashboardData,
  fetchLastChecklistCompletion,
} from '../services/dashboard.service';
import { MOCK_DASHBOARD_DATA, MOCK_RIDER_PROFILE } from '../data/dashboard.mock';
import { buildMonitorBanner } from '../data/dashboard.mock';
import type {
  DashboardData,
  MaintenanceBannerData,
  BookingData,
} from '../types/dashboard';
import type { RiderProfile } from '../../../types/rider';
import { usePreTripChecklistStore } from '../../../store/pre-trip-checklist.store';

export function useRiderProfile() {
  return useQuery({
    queryKey: dashboardKeys.rider(),
    queryFn: fetchRiderProfile,
    initialData: MOCK_RIDER_PROFILE,
  });
}

export function useDashboardData() {
  return useQuery({
    queryKey: dashboardKeys.data(),
    queryFn: fetchDashboardData,
    initialData: MOCK_DASHBOARD_DATA,
  });
}

export function useChecklistHistory() {
  return useQuery({
    queryKey: dashboardKeys.checklistHistory(),
    queryFn: fetchLastChecklistCompletion,
    initialData: null as string | null,
  });
}

export function useMaintenanceBanner(): {
  banner: MaintenanceBannerData;
  isLoading: boolean;
  error?: string;
} {
  const { data: lastChecked, isLoading, error } = useChecklistHistory();
  const completedAt = usePreTripChecklistStore((state) => state.lastCompletedAt);
  return {
    banner: buildMonitorBanner(lastChecked ?? null, completedAt),
    isLoading,
    error: error?.message,
  };
}

export function useBooking(): {
  booking: BookingData | null;
} {
  const { data: dashboard } = useDashboardData();
  return {
    booking: dashboard?.booking ?? null,
  };
}

export function useDashboard(): {
  rider: RiderProfile | undefined;
  riderLoading: boolean;
  dashboard: DashboardData | undefined;
  dashboardLoading: boolean;
  maintenanceBanner: MaintenanceBannerData;
  booking: BookingData | null;
  bannerLoading: boolean;
  error?: string;
} {
  const { data: rider, isLoading: riderLoading } = useRiderProfile();
  const { data: dashboard, isLoading: dashboardLoading } = useDashboardData();
  const { banner, isLoading: bannerLoading, error } = useMaintenanceBanner();
  const { booking } = useBooking();

  return {
    rider,
    riderLoading,
    dashboard,
    dashboardLoading,
    maintenanceBanner: banner,
    booking,
    bannerLoading,
    error,
  };
}

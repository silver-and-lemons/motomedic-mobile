import type { LucideIcon } from 'lucide-react-native';
import type { RiderProfile } from '../../../types/rider';

export type OilLifeMetric = {
  percentage: number;
  trend: number;
};

export type TirePressureMetric = {
  frontPsi: number;
  rearPsi: number;
};

export type BatteryMetric = {
  voltage: number;
  status: 'optimal' | 'low' | 'critical';
};

export type TelemetryData = {
  oilLife: OilLifeMetric;
  tirePressure: TirePressureMetric;
  battery: BatteryMetric;
};

export type MaintenanceState = 'action-required' | 'monitor' | 'up-to-date';

export type MaintenanceBannerData = {
  state: MaintenanceState;
  title: string;
  subtitle: string;
  buttonLabel: string;
  deadlineDays?: number;
  deadlineMiles?: number;
  lastCheckedAgo?: string;
  lastCheckedDate?: string;
  bikeName?: string;
};

export type RecentActivityItem = {
  id: string;
  title: string;
  shopName: string;
  date: string;
};

export type QuickAccessLink = {
  id: string;
  label: string;
  icon: LucideIcon;
  route: string;
};

export type BookingData = {
  deadlineDays: number;
  deadlineMiles: number;
  bikeName: string;
};

export type DashboardData = {
  telemetry: TelemetryData;
  maintenanceBanner: MaintenanceBannerData;
  booking: BookingData | null;
  quickAccessLinks: QuickAccessLink[];
  recentActivities: RecentActivityItem[];
};

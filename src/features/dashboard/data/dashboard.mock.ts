import {
  Car,
  History,
  ScrollText,
  Wrench,
} from 'lucide-react-native';
import type { DashboardData } from '../types/dashboard';
import type { RiderProfile } from '../../../types/rider';

export const MOCK_RIDER_PROFILE: RiderProfile = {
  id: 'rider-001',
  firstName: 'Alex',
  lastName: 'Rossi',
  displayName: 'Alex Rossi',
  bikeName: 'Yamaha MT-07',
  bikePlateNumber: 'ABC 1234',
};

export const MOCK_DASHBOARD_DATA: DashboardData = {
  telemetry: {
    oilLife: {
      percentage: 85,
      trend: -2,
    },
    tirePressure: {
      frontPsi: 32,
      rearPsi: 36,
    },
    battery: {
      voltage: 12.6,
      status: 'optimal',
    },
  },
  maintenanceBanner: {
    state: 'monitor',
    title: 'Monitor Your Bike',
    subtitle: '1 day 16 hrs ago',
    buttonLabel: "START TODAY'S CHECK",
  },
  quickAccessLinks: [
    { id: 'garage', label: 'MY GARAGE', icon: Car, route: '/garage' },
    { id: 'history', label: 'HISTORY', icon: History, route: '/history' },
    { id: 'plan', label: 'HMO PLAN', icon: ScrollText, route: '/plan' },
  ],
  recentActivities: [
    {
      id: 'act-1',
      title: 'Front Brake Pad Replacement',
      shopName: 'MotoShop Central',
      date: '12 Oct 2023',
    },
    {
      id: 'act-2',
      title: 'Oil Change',
      shopName: 'Speedy MotoServ',
      date: '28 Sep 2023',
    },
    {
      id: 'act-3',
      title: 'Chain & Sprocket Kit',
      shopName: 'Rider\'s Hub',
      date: '15 Aug 2023',
    },
  ],
};

export function buildMonitorBanner(
  lastCheckedDate: string | null,
  completedAt?: string | null,
): DashboardData['maintenanceBanner'] {
  const completed = completedAt ?? lastCheckedDate;

  if (!completed) {
    return {
      state: 'monitor',
      title: 'Monitor Your Bike',
      subtitle: 'Not checked today',
      buttonLabel: "START TODAY'S CHECK",
    };
  }

  const now = new Date();
  const checked = new Date(completed);
  const diffMs = now.getTime() - checked.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  const remainingHours = diffHours % 24;

  const isToday =
    now.getDate() === checked.getDate() &&
    now.getMonth() === checked.getMonth() &&
    now.getFullYear() === checked.getFullYear();

  if (isToday) {
    const timeStr = checked.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return {
      state: 'up-to-date',
      title: 'Maintenance Up To Date',
      subtitle: `Today's Check Complete`,
      buttonLabel: 'CHECK AGAIN',
      lastCheckedDate: `Today ${timeStr}`,
    };
  }

  const agoStr =
    diffDays > 0
      ? `${diffDays}d ${remainingHours}hrs ago`
      : `${diffHours} hrs ago`;

  return {
    state: 'monitor',
    title: 'Monitor Your Bike',
    subtitle: agoStr,
    buttonLabel: "START TODAY'S CHECK",
    lastCheckedAgo: agoStr,
  };
}

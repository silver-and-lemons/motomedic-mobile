import { View, Text, ScrollView, Pressable } from 'react-native';
import HeaderSection from './HeaderSection';
import BikeHealthSection from './BikeHealthSection';
import MaintenanceBanner from './MaintenanceBanner';
import BookingSection from './BookingSection';
import QuickAccessGrid from './QuickAccessGrid';
import NavigationBar from './NavigationBar';
import type { RiderProfile } from '../../../types/rider';
import type {
  DashboardData,
  MaintenanceBannerData,
  RecentActivityItem,
  BookingData,
} from '../types/dashboard';
import { Wrench, ChevronRight } from 'lucide-react-native';

type DashboardScreenProps = {
  rider: RiderProfile | null;
  dashboard: DashboardData | null;
  maintenanceBanner: MaintenanceBannerData;
  booking: BookingData | null;
  isLoading: boolean;
  error?: string;
  onBannerAction: () => void;
  onBookService: () => void;
  onNotificationPress?: () => void;
  onChangeVehicle?: () => void;
  onQuickAccessPress?: (route: string) => void;
  onActivityPress?: (id: string) => void;
};

export default function DashboardScreen({
  rider,
  dashboard,
  maintenanceBanner,
  booking,
  isLoading,
  error,
  onBannerAction,
  onBookService,
  onNotificationPress,
  onChangeVehicle,
  onActivityPress,
}: DashboardScreenProps) {
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <Text className="text-muted">Loading dashboard...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-surface px-6">
        <Text className="mb-2 text-lg font-bold text-white">Something went wrong</Text>
        <Text className="text-center text-muted">{error}</Text>
      </View>
    );
  }

  const activities = dashboard?.recentActivities ?? [];

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <HeaderSection
          rider={rider}
          onNotificationPress={onNotificationPress}
          onChangeVehicle={onChangeVehicle}
        />

        <View className="mt-6">
          <BikeHealthSection
            telemetry={
              dashboard?.telemetry ?? {
                oilLife: { percentage: 0, trend: 0 },
                tirePressure: { frontPsi: 0, rearPsi: 0 },
                battery: { voltage: 0, status: 'optimal' },
              }
            }
          />
        </View>

        <View className="mt-5">
          <MaintenanceBanner data={maintenanceBanner} onAction={onBannerAction} />
        </View>

        {booking && (
          <View className="mt-5">
            <BookingSection booking={booking} onBookService={onBookService} />
          </View>
        )}

        <View className="mt-6">
          <QuickAccessGrid links={dashboard?.quickAccessLinks ?? []} />
        </View>

        {activities.length > 0 && (
          <View className="mt-6 px-5">
            <Text className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
              RECENT ACTIVITY
            </Text>
            <View className="rounded-2xl bg-surface-card overflow-hidden">
              {activities.map((activity, index) => (
                <RecentActivityRow
                  key={activity.id}
                  activity={activity}
                  isLast={index === activities.length - 1}
                  onPress={() => onActivityPress?.(activity.id)}
                />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <NavigationBar activeTab="home" />
    </View>
  );
}

function RecentActivityRow({
  activity,
  isLast,
  onPress,
}: {
  activity: RecentActivityItem;
  isLast: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-4 py-3.5 ${
        !isLast ? 'border-b border-surface-light' : ''
      }`}
    >
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-xl bg-surface-light">
        <Wrench size={18} color="#94a3b8" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-white" numberOfLines={1}>
          {activity.title}
        </Text>
        <Text className="text-xs text-muted">
          {activity.shopName} • {activity.date}
        </Text>
      </View>
      <ChevronRight size={16} color="#94a3b8" />
    </Pressable>
  );
}

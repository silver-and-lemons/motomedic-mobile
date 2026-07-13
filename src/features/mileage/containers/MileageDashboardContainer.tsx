import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, type Href } from 'expo-router';
import { Bike, ChevronRight, Settings } from 'lucide-react-native';
import MileageCard from '../components/MileageCard';
import ServiceCountdown from '../components/ServiceCountdown';
import { useMileage } from '../hooks/use-mileage';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import {
  VEHICLE_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  COOLING_TYPE_LABELS,
} from '../../motorcycle-profile/types/motorcycle-profile';

const ODOMETER_EDIT_ROUTE = '/odometer-input' as Href;
const SETTINGS_ROUTE = '/settings' as Href;
const CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;

export default function MileageDashboardContainer() {
  const {
    currentKm,
    cumulativeMileage,
    serviceIntervalKm,
    kmToNextService,
    serviceProgress,
  } = useMileage();
  const profile = useMotorcycleProfileStore((s) => s.profile);

  return (
    <ScrollView className="flex-1 bg-[#0b171b]">
      <View className="gap-5 px-5 pt-12 pb-10">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold text-muted">Dashboard</Text>
            <Text className="text-2xl font-extrabold text-white">My Bike</Text>
          </View>
          <Pressable
            onPress={() => router.push(SETTINGS_ROUTE)}
            className="h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-surface-card active:opacity-70"
          >
            <Settings size={18} color="#94a3b8" />
          </Pressable>
        </View>

        {profile && (
          <View className="rounded-xl border border-slate-700 bg-surface-card p-5">
            <View className="mb-3 flex-row items-center gap-2">
              <Bike size={20} color="#0ea5e9" />
              <Text className="text-sm font-medium text-muted">Bike Info</Text>
            </View>

            <Text className="text-lg font-bold text-white">
              {VEHICLE_TYPE_LABELS[profile.vehicleType] ?? profile.vehicleType}
            </Text>

            <View className="mt-3 gap-2">
              <InfoRow label="Engine" value={`${profile.engineSizeCc}cc`} />
              <InfoRow label="Fuel" value={FUEL_TYPE_LABELS[profile.fuelType] ?? profile.fuelType} />
              <InfoRow label="Cooling" value={COOLING_TYPE_LABELS[profile.coolingType] ?? profile.coolingType} />
              <InfoRow label="Year" value={String(profile.bikeAge)} />
            </View>
          </View>
        )}

        <MileageCard
          currentKm={currentKm}
          cumulativeMileage={cumulativeMileage}
          onEdit={() => router.push(ODOMETER_EDIT_ROUTE)}
        />

        <ServiceCountdown
          kmToNextService={kmToNextService}
          serviceIntervalKm={serviceIntervalKm}
          serviceProgress={serviceProgress}
        />

        <Pressable
          onPress={() => router.push(CHECKLIST_ROUTE)}
          className="flex-row items-center justify-between rounded-xl border border-slate-700 bg-surface-card p-5 active:opacity-70"
        >
          <View>
            <Text className="text-sm font-medium text-muted">Pre-Trip Check</Text>
            <Text className="text-base font-bold text-white">Run self-diagnostic</Text>
          </View>
          <ChevronRight size={20} color="#94a3b8" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className="text-xs font-semibold text-white">{value}</Text>
    </View>
  );
}

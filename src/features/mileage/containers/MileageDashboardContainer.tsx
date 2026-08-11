import { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { router, type Href } from 'expo-router';
import { Bike, ChevronRight, Settings, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react-native';
import WearGaugeBoard from '../components/WearGaugeBoard';
import RideCard from '../../timer/components/RideCard';
import RideRecordings from '../../timer/components/RideRecordings';
import { useMileage } from '../hooks/use-mileage';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import { useDiagnosticRecords } from '../../diagnostics/hooks/use-diagnostic-records';
import { getDiagnosticStaleness } from '../utils/staleness';
import {
  VEHICLE_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  COOLING_TYPE_LABELS,
} from '../../motorcycle-profile/types/motorcycle-profile';

const ODOMETER_ROUTE = '/odometer-input' as Href;
const SETTINGS_ROUTE = '/settings' as Href;
const CHECKLIST_ROUTE = '/pre-trip-checklist' as Href;

export default function MileageDashboardContainer() {
  const { currentKm } = useMileage();
  const profile = useMotorcycleProfileStore((s) => s.profile);
  const [recordingsVisible, setRecordingsVisible] = useState(false);
  const { data: records, isLoading: isHistoryLoading } = useDiagnosticRecords();

  const lastRecord = records && records.length > 0 ? records[0] : null;

  let stalenessConfig = {
    borderColor: 'border-[#1e2d33]',
    titleColor: 'text-[#8A999E]',
    subtitleColor: 'text-white',
    subtitleText: 'Run self-diagnostic',
    icon: <ChevronRight size={20} color="#8A999E" />
  };

  if (isHistoryLoading) {
    stalenessConfig = { ...stalenessConfig, subtitleText: 'Checking status...' };
  } else if (lastRecord) {
    const stalenessResult = getDiagnosticStaleness(lastRecord.timestamp);
    if (stalenessResult.state === 'fresh') {
      stalenessConfig = {
        borderColor: 'border-[#10b981]',
        titleColor: 'text-[#10b981]',
        subtitleColor: 'text-[#10b981]',
        subtitleText: 'Checked Today',
        icon: <CheckCircle size={20} color="#10b981" />
      };
    } else if (stalenessResult.state === 'aging') {
      stalenessConfig = {
        borderColor: 'border-[#f59e0b]',
        titleColor: 'text-[#f59e0b]',
        subtitleColor: 'text-[#f59e0b]',
        subtitleText: stalenessResult.days === 1 ? 'Checked Yesterday' : `Checked ${stalenessResult.days} days ago`,
        icon: <AlertTriangle size={20} color="#f59e0b" />
      };
    } else if (stalenessResult.state === 'overdue') {
      stalenessConfig = {
        borderColor: 'border-[#ef4444]',
        titleColor: 'text-[#ef4444]',
        subtitleColor: 'text-[#ef4444]',
        subtitleText: stalenessResult.days ? `Overdue (${stalenessResult.days} days)` : 'Overdue',
        icon: <AlertCircle size={20} color="#ef4444" />
      };
    }
  } else {
    stalenessConfig = {
      borderColor: 'border-[#ef4444]',
      titleColor: 'text-[#ef4444]',
      subtitleColor: 'text-[#ef4444]',
      subtitleText: 'Not Checked Yet',
      icon: <AlertCircle size={20} color="#ef4444" />
    };
  }

  return (
    <>
    <ScrollView className="flex-1 bg-[#0b171b]">
      <View className="gap-5 px-5 pt-12 pb-10">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs font-semibold text-[#8A999E]">Dashboard</Text>
            <Text className="text-2xl font-extrabold text-white">My Bike</Text>
          </View>
          <Pressable
            onPress={() => router.push(SETTINGS_ROUTE)}
            className="h-10 w-10 items-center justify-center rounded-full border border-[#1e2d33] bg-[#121B1E] active:opacity-70"
          >
            <Settings size={18} color="#8A999E" />
          </Pressable>
        </View>

        {profile && (
          <View className="rounded-2xl border border-[#1e2d33] bg-[#121B1E] p-5">
            <View className="mb-3 flex-row items-center gap-2">
              <Bike size={20} color="#16FFB0" />
              <Text className="text-sm font-medium text-[#8A999E]">Bike Info</Text>
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
            {currentKm > 0 && (
              <View className="mt-3 flex-row items-center justify-between border-t border-[#1e2d33] pt-3">
                <Text className="text-xs text-[#8A999E]">Odometer</Text>
                <Text className="text-xs font-bold text-[#16FFB0]">
                  {currentKm.toLocaleString()} km
                </Text>
              </View>
            )}
          </View>
        )}

        <WearGaugeBoard onCheckOdometer={() => router.push(ODOMETER_ROUTE)} />

        <RideCard onViewRecordings={() => setRecordingsVisible(true)} />

        <Pressable
          onPress={() => router.push(CHECKLIST_ROUTE)}
          className={`flex-row items-center justify-between rounded-2xl border ${stalenessConfig.borderColor} bg-[#121B1E] p-5 active:opacity-70`}
        >
          <View>
            <Text className={`text-sm font-medium ${stalenessConfig.titleColor}`}>Pre-Trip Check</Text>
            <Text className={`text-base font-bold ${stalenessConfig.subtitleColor}`}>{stalenessConfig.subtitleText}</Text>
          </View>
          {stalenessConfig.icon}
        </Pressable>
      </View>
    </ScrollView>

    <RideRecordings
      visible={recordingsVisible}
      onClose={() => setRecordingsVisible(false)}
    />
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xs text-[#8A999E]">{label}</Text>
      <Text className="text-xs font-semibold text-white">{value}</Text>
    </View>
  );
}

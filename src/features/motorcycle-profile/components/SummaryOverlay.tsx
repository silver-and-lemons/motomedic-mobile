import { View, Text, ScrollView } from 'react-native';
import { Bike, Cog, Wrench, Wind, Calendar } from 'lucide-react-native';
import { Button } from '../../../components/atoms/Button';
import type { MotorcycleProfile } from '../types/motorcycle-profile';
import {
  VEHICLE_TYPE_LABELS,
  FUEL_TYPE_LABELS,
  COOLING_TYPE_LABELS,
} from '../types/motorcycle-profile';

type SummaryOverlayProps = {
  profile: MotorcycleProfile;
  onAgree: () => void;
  onDecline: () => void;
};

const SUMMARY_ITEMS: {
  key: keyof MotorcycleProfile;
  label: string;
  icon: React.ElementType;
  format: (val: any) => string;
}[] = [
  {
    key: 'vehicleType',
    label: 'Vehicle Type',
    icon: Bike,
    format: (v) => VEHICLE_TYPE_LABELS[v] ?? v,
  },
  {
    key: 'engineSizeCc',
    label: 'Engine Size',
    icon: Cog,
    format: (v) => `${v} cc`,
  },
  {
    key: 'fuelType',
    label: 'Fuel System',
    icon: Wrench,
    format: (v) => FUEL_TYPE_LABELS[v] ?? v,
  },
  {
    key: 'coolingType',
    label: 'Cooling System',
    icon: Wind,
    format: (v) => COOLING_TYPE_LABELS[v] ?? v,
  },
  {
    key: 'bikeAge',
    label: 'Bike Age',
    icon: Calendar,
    format: (v) => v,
  },
];

export default function SummaryOverlay({
  profile,
  onAgree,
  onDecline,
}: SummaryOverlayProps) {
  return (
    <View className="flex-1">
      <View className="mb-4">
        <Text className="text-lg font-bold text-white">
          Please check the following before confirming:
        </Text>
        <Text className="text-sm text-[#94a3b8] mt-1">
          Policies and agreement
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-2 mb-6">
          {SUMMARY_ITEMS.map(({ key, label, icon: Icon, format }) => (
            <View
              key={key}
              className="flex-row items-center gap-3 rounded-xl border border-slate-700 bg-[#1b232c] px-4 py-3"
            >
              <View className="h-10 w-10 items-center justify-center rounded-lg bg-[#11161a]">
                <Icon size={20} color="#10b981" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-[#94a3b8]">{label}</Text>
                <Text className="text-base font-semibold text-white">
                  {format(profile[key])}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="gap-3 pt-2">
        <Button variant="primary" className="w-full rounded-full py-4" onPress={onAgree}>
          I Agree
        </Button>
        <Button variant="outline" className="w-full rounded-full py-4" onPress={onDecline}>
          Decline
        </Button>
      </View>
    </View>
  );
}

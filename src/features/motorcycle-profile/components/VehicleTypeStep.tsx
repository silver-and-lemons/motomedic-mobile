import { View, Text, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Bike, Gauge, Flame } from 'lucide-react-native';
import {
  VEHICLE_TYPES,
  VEHICLE_TYPE_LABELS,
  VEHICLE_TYPE_SUBTITLES,
} from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const VEHICLE_ICONS: Record<string, React.ElementType> = {
  'automatic-scooter': Gauge,
  'underbone': Bike,
  'sport-naked-big-bike': Flame,
};

export default function VehicleTypeStep() {
  const { control } = useFormContext<MotorcycleProfile>();

  return (
    <View className="gap-3">
      <Controller
        control={control}
        name="vehicleType"
        render={({ field: { value, onChange } }) => (
          <>
            {VEHICLE_TYPES.map((type) => {
              const Icon = VEHICLE_ICONS[type];
              const selected = value === type;
              return (
                <Pressable
                  key={type}
                  onPress={() => onChange(type)}
                  className={`rounded-xl border-2 p-4 flex-row items-center gap-4 ${
                    selected
                      ? 'border-[#0ea5e9] bg-[#1b232c]'
                      : 'border-slate-700 bg-[#1b232c]'
                  }`}
                >
                  <View className="h-12 w-12 items-center justify-center rounded-lg bg-[#11161a]">
                    <Icon size={24} color="#10b981" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-white">
                      {VEHICLE_TYPE_LABELS[type]}
                    </Text>
                    <Text className="text-sm text-[#94a3b8]">
                      {VEHICLE_TYPE_SUBTITLES[type]}
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-[#0ea5e9]">
                    {selected ? 'Selected' : 'Choose this bike type'}
                  </Text>
                </Pressable>
              );
            })}
          </>
        )}
      />
    </View>
  );
}

import { View, Text, Pressable } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Wrench, Zap } from 'lucide-react-native';
import { FUEL_TYPES, FUEL_TYPE_LABELS } from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const FUEL_ICONS: Record<string, React.ElementType> = {
  carbureted: Wrench,
  'fuel-injected': Zap,
};

const FUEL_DESCRIPTIONS: Record<string, string> = {
  carbureted: 'Traditional fuel delivery system with carburetor',
  'fuel-injected': 'Modern electronic fuel injection system',
};

export default function FuelTypeStep() {
  const { control } = useFormContext<MotorcycleProfile>();

  return (
    <View className="gap-3">
      <Controller
        control={control}
        name="fuelType"
        render={({ field: { value, onChange } }) => (
          <>
            {FUEL_TYPES.map((type) => {
              const Icon = FUEL_ICONS[type];
              const selected = value === type;
              return (
                <Pressable
                  key={type}
                  onPress={() => onChange(type)}
                  className={`rounded-xl border-2 p-5 ${
                    selected
                      ? 'border-[#0ea5e9] bg-[#1b232c]'
                      : 'border-slate-700 bg-[#1b232c]'
                  }`}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="h-14 w-14 items-center justify-center rounded-xl bg-[#11161a]">
                      <Icon size={28} color="#10b981" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-white">
                        {FUEL_TYPE_LABELS[type]}
                      </Text>
                      <Text className="text-sm text-[#94a3b8]">
                        {FUEL_DESCRIPTIONS[type]}
                      </Text>
                    </View>
                  </View>
                  <View className="mt-3 flex-row items-center gap-2">
                    <View
                      className={`h-5 w-5 items-center justify-center rounded-full border-2 ${
                        selected
                          ? 'border-[#0ea5e9]'
                          : 'border-slate-600'
                      }`}
                    >
                      {selected && (
                        <View className="h-2.5 w-2.5 rounded-full bg-[#0ea5e9]" />
                      )}
                    </View>
                    <Text
                      className={`text-sm ${
                        selected ? 'text-[#0ea5e9]' : 'text-[#94a3b8]'
                      }`}
                    >
                      {selected ? 'Selected' : 'Tap to select'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}
      />
    </View>
  );
}

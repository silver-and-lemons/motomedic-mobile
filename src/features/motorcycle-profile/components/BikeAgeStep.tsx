import { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Calendar } from 'lucide-react-native';
import { Input } from '../../../components/atoms/Input';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

function getAgeCategory(year: number): string {
  const currentYear = new Date().getFullYear();
  if (year >= currentYear - 3) return `Current model (${currentYear - 3}+)`;
  if (year >= currentYear - 7) return `Recent model (${currentYear - 7}-${currentYear - 4})`;
  if (year >= currentYear - 12) return `Mid age (${currentYear - 12}-${currentYear - 8})`;
  return `Classic / Older (${currentYear - 13} and older)`;
}

export default function BikeAgeStep() {
  const { control, watch, formState: { errors } } = useFormContext<MotorcycleProfile>();
  const bikeAge = watch('bikeAge');
  const yearNum = typeof bikeAge === 'number' ? bikeAge : parseInt(String(bikeAge), 10);
  const isValidYear = !isNaN(yearNum) && yearNum >= 1900 && yearNum <= new Date().getFullYear();
  const category = isValidYear ? getAgeCategory(yearNum) : '';

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <View className="items-center gap-8">
      <View className="h-24 w-24 items-center justify-center rounded-full border-[3px] border-slate-700 bg-[#1b232c]">
        <Calendar size={44} color="#10b981" />
      </View>

      <View className="w-full">
        <Controller
          control={control}
          name="bikeAge"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Year of Manufacture"
              placeholder={`e.g. ${currentYear}`}
              value={value ? String(value) : ''}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, '');
                onChange(cleaned ? Number(cleaned) : '');
              }}
              onBlur={onBlur}
              keyboardType="number-pad"
              error={errors.bikeAge?.message}
              maxLength={4}
            />
          )}
        />
      </View>

      {category ? (
        <View className="items-center gap-1">
          <Text className="text-lg font-bold text-white">{category}</Text>
          <Text className="text-sm text-[#94a3b8]">Age category</Text>
        </View>
      ) : (
        <View className="items-center gap-1">
          <Text className="text-sm text-[#94a3b8]">Enter a valid year (1900 - {currentYear})</Text>
        </View>
      )}
    </View>
  );
}

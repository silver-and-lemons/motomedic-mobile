import { View, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Calendar } from 'lucide-react-native';
import { Input } from '../../../components/atoms/Input';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

function getAgeCategory(year: number): string {
  const currentYear = new Date().getFullYear();
  if (year >= currentYear - 3) return 'Current model (2023+)';
  if (year >= currentYear - 7) return 'Recent model (2017-2022)';
  if (year >= currentYear - 12) return 'Mid age (2012-2016)';
  return 'Classic / Older (2011 and older)';
}

export default function BikeAgeStep() {
  const { control, watch } = useFormContext<MotorcycleProfile>();
  const bikeAge = watch('bikeAge');
  const yearNum = parseInt(bikeAge, 10);
  const category = !isNaN(yearNum) && yearNum > 1900 ? getAgeCategory(yearNum) : '';

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
              placeholder="e.g. 2020"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="number-pad"
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
          <Text className="text-sm text-[#94a3b8]">Enter the year to see age category</Text>
        </View>
      )}
    </View>
  );
}

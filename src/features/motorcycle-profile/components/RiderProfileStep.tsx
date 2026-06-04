import { View, Text } from 'react-native';
import { useFormContext, useWatch, Controller } from 'react-hook-form';
import { Card } from '../../../components/atoms/Card';
import { PRIMARY_USES, EXPERIENCE_LEVELS } from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const USE_LABELS: Record<string, string> = {
  commuting: 'Commuting',
  touring: 'Touring',
  track: 'Track / Sport',
  offroad: 'Off-road',
  cruising: 'Cruising',
  other: 'Other',
};

const EXP_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

const USE_SUBTITLES: Record<string, string> = {
  commuting: 'Daily transportation',
  touring: 'Long distance rides',
  track: 'Performance riding',
  offroad: 'Dirt and trails',
  cruising: 'Leisurely rides',
  other: 'Other purposes',
};

export default function RiderProfileStep() {
  const { control } = useFormContext<MotorcycleProfile>();
  const selectedUse = useWatch({ control, name: 'primaryUse' });
  const selectedExp = useWatch({ control, name: 'experienceLevel' });

  return (
    <View className="gap-6">
      <View className="gap-2">
        <Text className="text-sm font-medium text-slate-700">Primary Use</Text>
        <View className="flex-row flex-wrap gap-2">
          <Controller
            control={control}
            name="primaryUse"
            render={({ field: { onChange } }) => (
              <>
                {PRIMARY_USES.map((use) => (
                  <View key={use} className="w-[48%]">
                    <Card
                      title={USE_LABELS[use]}
                      subtitle={USE_SUBTITLES[use]}
                      selected={selectedUse === use}
                      onPress={() => onChange(use)}
                    />
                  </View>
                ))}
              </>
            )}
          />
        </View>
      </View>

      <View className="gap-2">
        <Text className="text-sm font-medium text-slate-700">Experience Level</Text>
        <View className="flex-row flex-wrap gap-2">
          <Controller
            control={control}
            name="experienceLevel"
            render={({ field: { onChange } }) => (
              <>
                {EXPERIENCE_LEVELS.map((level) => (
                  <View key={level} className="w-[48%]">
                    <Card
                      title={EXP_LABELS[level]}
                      selected={selectedExp === level}
                      onPress={() => onChange(level)}
                    />
                  </View>
                ))}
              </>
            )}
          />
        </View>
      </View>
    </View>
  );
}

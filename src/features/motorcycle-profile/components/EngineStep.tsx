import { View, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../../../components/atoms/Input';
import { Card } from '../../../components/atoms/Card';
import { ENGINE_TYPES } from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const ENGINE_LABELS: Record<string, string> = {
  'single-cylinder': 'Single Cylinder',
  'parallel-twin': 'Parallel Twin',
  'v-twin': 'V-Twin',
  'inline-three': 'Inline Three',
  'inline-four': 'Inline Four',
  'inline-six': 'Inline Six',
  electric: 'Electric',
  other: 'Other',
};

export default function EngineStep() {
  const { control, watch, formState: { errors } } = useFormContext<MotorcycleProfile>();
  const selectedEngineType = watch('engineType');

  return (
    <View className="gap-5">
      <View className="gap-2">
        <Text className="text-sm font-medium text-slate-700">Engine Type</Text>
        <View className="flex-row flex-wrap gap-2">
          <Controller
            control={control}
            name="engineType"
            render={({ field: { onChange } }) => (
              <>
                {ENGINE_TYPES.map((type) => (
                  <View key={type} className="w-[48%]">
                    <Card
                      title={ENGINE_LABELS[type]}
                      selected={selectedEngineType === type}
                      onPress={() => onChange(type)}
                    />
                  </View>
                ))}
              </>
            )}
          />
        </View>
        {errors.engineType && (
          <Text className="text-sm text-red-500">{errors.engineType.message}</Text>
        )}
      </View>

      <Controller
        control={control}
        name="displacementCc"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Displacement (cc)"
            placeholder="e.g. 600"
            value={value ? String(value) : ''}
            onChangeText={(text) => onChange(text ? Number(text) : '')}
            onBlur={onBlur}
            error={errors.displacementCc?.message}
            keyboardType="number-pad"
          />
        )}
      />
    </View>
  );
}

import { View } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '../../../components/atoms/Input';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

export default function BasicInfoStep() {
  const { control, formState: { errors } } = useFormContext<MotorcycleProfile>();

  return (
    <View className="gap-5">
      <Controller
        control={control}
        name="make"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Make"
            placeholder="e.g. Honda, Yamaha, Kawasaki"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.make?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="model"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Model"
            placeholder="e.g. CBR600RR, Ninja 400"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={errors.model?.message}
            autoCapitalize="words"
          />
        )}
      />

      <Controller
        control={control}
        name="year"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Year"
            placeholder="e.g. 2020"
            value={value ? String(value) : ''}
            onChangeText={(text) => onChange(text ? Number(text) : '')}
            onBlur={onBlur}
            error={errors.year?.message}
            keyboardType="number-pad"
          />
        )}
      />
    </View>
  );
}

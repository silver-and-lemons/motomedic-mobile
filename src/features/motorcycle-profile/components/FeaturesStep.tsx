import { View, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Checkbox } from '../../../components/atoms/Checkbox';
import { CUSTOM_FEATURES_OPTIONS } from '../types/motorcycle-profile';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

const FEATURE_LABELS: Record<string, string> = {
  'aftermarket-exhaust': 'Aftermarket Exhaust',
  'power-commander': 'Power Commander / ECU Tune',
  'aftermarket-suspension': 'Aftermarket Suspension',
  'led-lighting': 'LED Lighting',
  'custom-seat': 'Custom Seat',
  'luggage-system': 'Luggage System',
  'windshield-upgrade': 'Windshield Upgrade',
  'crash-guards': 'Crash Guards / Frame Sliders',
  'aftermarket-brakes': 'Aftermarket Brakes',
};

export default function FeaturesStep() {
  const { control } = useFormContext<MotorcycleProfile>();

  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-slate-700">Custom Features</Text>
      <Text className="text-sm text-slate-500 mb-2">
        Select any customizations your motorcycle has
      </Text>
      <Controller
        control={control}
        name="customFeatures"
        render={({ field: { value, onChange } }) => (
          <View>
            {CUSTOM_FEATURES_OPTIONS.map((feature) => (
              <Checkbox
                key={feature}
                label={FEATURE_LABELS[feature]}
                checked={value.includes(feature)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onChange([...value, feature]);
                  } else {
                    onChange(value.filter((f) => f !== feature));
                  }
                }}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
}

import { View, Text } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import { Cog } from 'lucide-react-native';
import { CircularProgress } from '../../../components/atoms/CircularProgress';
import { StepperInput } from '../../../components/atoms/StepperInput';
import type { MotorcycleProfile } from '../types/motorcycle-profile';

function getEngineCategory(cc: number): { label: string; range: string } {
  if (cc <= 100) return { label: 'Lightweight', range: '50-100 cc' };
  if (cc <= 125) return { label: 'Standard', range: '100-125 cc' };
  if (cc <= 250) return { label: 'Mid-range', range: '125-250 cc' };
  if (cc <= 500) return { label: 'Performance', range: '250-500 cc' };
  if (cc <= 1000) return { label: 'High Performance', range: '500-1000 cc' };
  return { label: 'Superbike', range: '1000+ cc' };
}

export default function EngineSizeStep() {
  const { control, watch } = useFormContext<MotorcycleProfile>();
  const engineSize = watch('engineSizeCc');
  const category = getEngineCategory(engineSize);
  const progress = (engineSize - 50) / (2500 - 50);

  return (
    <View className="items-center gap-8">
      <CircularProgress progress={progress}>
        <Cog size={48} color="#10b981" />
      </CircularProgress>

      <Controller
        control={control}
        name="engineSizeCc"
        render={({ field: { value, onChange } }) => (
          <StepperInput value={value} onChange={onChange} step={10} suffix="cc" />
        )}
      />

      <View className="items-center gap-1">
        <Text className="text-lg font-bold text-white">{category.range}</Text>
        <Text className="text-sm text-[#94a3b8]">{category.label}</Text>
      </View>
    </View>
  );
}

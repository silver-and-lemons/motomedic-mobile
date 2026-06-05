import { View, Text, Pressable } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';

type StepperInputProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
};

export function StepperInput({
  value,
  onChange,
  min = 50,
  max = 2500,
  step = 10,
  suffix = 'cc',
}: StepperInputProps) {
  const decrement = () => {
    const next = value - step;
    if (next >= min) onChange(next);
  };

  const increment = () => {
    const next = value + step;
    if (next <= max) onChange(next);
  };

  return (
    <View className="flex-row items-center gap-4">
      <Pressable
        onPress={decrement}
        disabled={value <= min}
        className="h-12 w-12 items-center justify-center rounded-full border border-slate-600 active:opacity-60 disabled:opacity-30"
      >
        <Minus size={22} color="#94a3b8" />
      </Pressable>

      <View className="min-w-[100px] items-center">
        <Text className="text-3xl font-bold text-white">
          {value}
        </Text>
        <Text className="text-sm text-[#94a3b8]">{suffix}</Text>
      </View>

      <Pressable
        onPress={increment}
        disabled={value >= max}
        className="h-12 w-12 items-center justify-center rounded-full border border-slate-600 active:opacity-60 disabled:opacity-30"
      >
        <Plus size={22} color="#94a3b8" />
      </Pressable>
    </View>
  );
}

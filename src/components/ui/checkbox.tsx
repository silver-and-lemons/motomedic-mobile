import { Pressable, View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export type CheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
};

export function Checkbox({ checked, onCheckedChange, label, disabled }: CheckboxProps) {
  return (
    <Pressable
      className={cn('flex-row items-center gap-3 py-2', disabled && 'opacity-50')}
      onPress={() => onCheckedChange(!checked)}
      disabled={disabled}
    >
      <View
        className={cn(
          'h-5 w-5 items-center justify-center rounded border-2',
          checked ? 'border-[#0ea5e9] bg-[#0ea5e9]' : 'border-slate-600 bg-transparent'
        )}
      >
        {checked && <Text className="text-xs font-bold text-white">✓</Text>}
      </View>
      <Text className="text-base text-[#94a3b8]">{label}</Text>
    </Pressable>
  );
}

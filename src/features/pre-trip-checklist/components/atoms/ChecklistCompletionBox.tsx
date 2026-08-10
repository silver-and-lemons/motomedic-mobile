import { Text, View } from 'react-native';
import { cn } from '../../../../lib/utils';

type ChecklistCompletionBoxProps = {
  checked: boolean;
};

export default function ChecklistCompletionBox({
  checked,
}: ChecklistCompletionBoxProps) {
  return (
    <View
      className={cn(
        'h-[19px] w-[19px] items-center justify-center rounded-[2px] border',
        checked ? 'border-[#21f4b7] bg-[#21f4b7]' : 'border-[#4f626a] bg-transparent'
      )}
    >
      {checked && <Text className="text-[11px] font-bold text-white">✓</Text>}
    </View>
  );
}

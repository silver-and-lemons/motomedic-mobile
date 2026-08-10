import { Pressable } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

type ChecklistIconButtonProps = {
  icon: LucideIcon;
  accessibilityLabel: string;
  onPress?: () => void;
};

export default function ChecklistIconButton({
  icon: Icon,
  accessibilityLabel,
  onPress,
}: ChecklistIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className="h-10 w-10 items-center justify-center rounded-full active:opacity-80 disabled:opacity-100"
      disabled={!onPress}
      onPress={onPress}
    >
      <Icon size={22} color="#94a3b8" />
    </Pressable>
  );
}

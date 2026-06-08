import { View } from 'react-native';
import { CircleCheck, Square, TriangleAlert } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import type { PreTripChecklistItemState } from '../../types/pre-trip-checklist';

type ChecklistStatusMarkProps = {
  checked: boolean;
  state: PreTripChecklistItemState;
  icon?: LucideIcon;
  variant?: 'status' | 'line';
};

export default function ChecklistStatusMark({
  checked,
  state,
  icon: Icon,
  variant = 'status',
}: ChecklistStatusMarkProps) {
  if (state === 'attention') {
    return <TriangleAlert size={28} color="#facc15" strokeWidth={2.5} />;
  }

  if (variant === 'line' && Icon) {
    return <Icon size={25} color={checked ? '#21f4b7' : '#4f626a'} strokeWidth={2.2} />;
  }

  if (checked) {
    return (
      <View
        className="h-7 w-7 items-center justify-center rounded-full border-2 border-[#21f4b7]"
        style={{ boxShadow: '0 0 8px rgba(33, 244, 183, 0.65)' }}
      >
        <CircleCheck size={20} color="#21f4b7" strokeWidth={3} />
      </View>
    );
  }

  return <Square size={19} color="#4f626a" strokeWidth={2} />;
}

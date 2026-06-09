import type { LucideIcon } from 'lucide-react-native';
import { CircleCheck, Square } from 'lucide-react-native';
import { View } from 'react-native';
import Svg, { Circle, Line, Polygon } from 'react-native-svg';
import type { PreTripChecklistItemState } from '../../types/pre-trip-checklist';

type ChecklistStatusMarkProps = {
  checked: boolean;
  state: PreTripChecklistItemState;
  icon?: LucideIcon;
  variant?: 'status' | 'line';
};

function WarningTriangleMark() {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32">
      <Polygon
        points="16,3 30,29 2,29"
        fill="none"
        stroke="rgba(250, 204, 21, 0.16)"
        strokeLinejoin="round"
        strokeWidth={8}
      />
      <Polygon
        points="16,3 30,29 2,29"
        fill="none"
        stroke="rgba(250, 204, 21, 0.3)"
        strokeLinejoin="round"
        strokeWidth={5}
      />
      <Polygon
        points="16,3 30,29 2,29"
        fill="none"
        stroke="#facc15"
        strokeLinejoin="round"
        strokeWidth={2.6}
      />
      <Line
        x1={16}
        x2={16}
        y1={12}
        y2={20}
        stroke="#facc15"
        strokeLinecap="round"
        strokeWidth={2.6}
      />
      <Circle cx={16} cy={24} fill="#facc15" r={1.4} />
    </Svg>
  );
}

export default function ChecklistStatusMark({
  checked,
  state,
  icon: Icon,
  variant = 'status',
}: ChecklistStatusMarkProps) {
  if (state === 'attention') {
    return (
      <View className="h-8 w-8 items-center justify-center">
        <WarningTriangleMark />
      </View>
    );
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

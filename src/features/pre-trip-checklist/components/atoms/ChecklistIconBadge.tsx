import { View } from 'react-native';
import type { LucideIcon } from 'lucide-react-native';

type ChecklistIconBadgeProps = {
  icon: LucideIcon;
  tone?: 'blue' | 'green' | 'slate';
  size?: 'small' | 'default';
};

const toneClassNames: Record<NonNullable<ChecklistIconBadgeProps['tone']>, string> = {
  blue: 'border-[#0ea5e9] bg-[#0b2430]',
  green: 'border-[#10b981] bg-[#0d2a23]',
  slate: 'border-slate-700 bg-[#11161a]',
};

const toneColors: Record<NonNullable<ChecklistIconBadgeProps['tone']>, string> = {
  blue: '#0ea5e9',
  green: '#10b981',
  slate: '#94a3b8',
};

export default function ChecklistIconBadge({
  icon: Icon,
  tone = 'slate',
  size = 'default',
}: ChecklistIconBadgeProps) {
  const isSmall = size === 'small';

  return (
    <View
      className={`${isSmall ? 'h-5 w-5 rounded-sm' : 'h-12 w-12 rounded-xl'} items-center justify-center border ${toneClassNames[tone]}`}
    >
      <Icon size={isSmall ? 12 : 22} color={toneColors[tone]} />
    </View>
  );
}

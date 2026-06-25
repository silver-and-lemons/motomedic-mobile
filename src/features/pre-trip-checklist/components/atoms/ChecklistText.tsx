import { Text, type TextProps } from 'react-native';
import { cn } from '../../../../lib/utils';

type ChecklistTextTone = 'primary' | 'secondary' | 'muted' | 'success' | 'warning';
type ChecklistTextSize = 'caption' | 'body' | 'title' | 'hero';

type ChecklistTextProps = TextProps & {
  tone?: ChecklistTextTone;
  size?: ChecklistTextSize;
  children: React.ReactNode;
  className?: string;
};

const toneClassNames: Record<ChecklistTextTone, string> = {
  primary: 'text-white',
  secondary: 'text-[#cbd5e1]',
  muted: 'text-[#94a3b8]',
  success: 'text-[#10b981]',
  warning: 'text-[#f59e0b]',
};

const sizeClassNames: Record<ChecklistTextSize, string> = {
  caption: 'text-xs',
  body: 'text-sm',
  title: 'text-base',
  hero: 'text-3xl',
};

export default function ChecklistText({
  tone = 'primary',
  size = 'body',
  children,
  className,
  ...props
}: ChecklistTextProps) {
  return (
    <Text className={cn(sizeClassNames[size], toneClassNames[tone], className)} {...props}>
      {children}
    </Text>
  );
}

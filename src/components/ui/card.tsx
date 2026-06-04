import { Pressable, Text, type PressableProps, type ViewStyle } from 'react-native';
import { cn } from '../../lib/utils';

export type CardProps = PressableProps & {
  selected?: boolean;
  title: string;
  subtitle?: string;
  className?: string;
};

export function Card({
  selected,
  title,
  subtitle,
  className,
  ...props
}: CardProps) {
  return (
    <Pressable
      className={cn(
        'rounded-xl border-2 p-4',
        selected
          ? 'border-blue-600 bg-blue-50'
          : 'border-slate-200 bg-white',
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-base font-semibold',
          selected ? 'text-blue-700' : 'text-slate-900'
        )}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className={cn(
            'mt-1 text-sm',
            selected ? 'text-blue-600' : 'text-slate-500'
          )}
        >
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

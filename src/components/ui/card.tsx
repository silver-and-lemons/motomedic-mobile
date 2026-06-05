import { Pressable, Text, type PressableProps } from 'react-native';
import { cn } from '../../lib/utils';

export type CardProps = PressableProps & {
  selected?: boolean;
  title: string;
  subtitle?: string;
  className?: string;
  selectedClassName?: string;
};

export function Card({
  selected,
  title,
  subtitle,
  className,
  selectedClassName,
  ...props
}: CardProps) {
  return (
    <Pressable
      className={cn(
        'rounded-xl border-2 p-4',
        selected
          ? 'border-[#0ea5e9] bg-[#1b232c]'
          : 'border-slate-700 bg-[#1b232c]',
        selected && selectedClassName,
        className
      )}
      {...props}
    >
      <Text
        className={cn(
          'text-base font-semibold',
          selected ? 'text-white' : 'text-white'
        )}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          className={cn(
            'mt-1 text-sm',
            selected ? 'text-[#94a3b8]' : 'text-[#94a3b8]'
          )}
        >
          {subtitle}
        </Text>
      )}
    </Pressable>
  );
}

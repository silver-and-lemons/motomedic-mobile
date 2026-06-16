import { Pressable, View, type PressableProps } from 'react-native';
import { cn } from '../../../../lib/utils';

type ChecklistSurfaceProps = PressableProps & {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
};

export default function ChecklistSurface({
  children,
  className,
  interactive,
  disabled,
  ...props
}: ChecklistSurfaceProps) {
  if (interactive) {
    return (
      <Pressable
        className={cn(
          'rounded-xl border border-slate-700 bg-[#1b232c] p-4',
          !disabled && 'active:opacity-80',
          disabled && 'opacity-50',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View className={cn('rounded-xl border border-slate-700 bg-[#1b232c] p-4', className)}>
      {children}
    </View>
  );
}

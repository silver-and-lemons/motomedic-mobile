import { View } from 'react-native';
import { cn } from '../../lib/utils';

export type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <View
      className={cn('h-2 w-full overflow-hidden rounded-full bg-slate-200', className)}
    >
      <View
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${clamped}%` }}
      />
    </View>
  );
}

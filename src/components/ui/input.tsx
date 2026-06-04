import { forwardRef } from 'react';
import { TextInput, type TextInputProps, View, Text } from 'react-native';
import { cn } from '../../lib/utils';

export type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const Input = forwardRef<typeof TextInput, InputProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <View className={cn('gap-1.5', containerClassName)}>
        {label && (
          <Text className="text-sm font-medium text-slate-700">{label}</Text>
        )}
        <TextInput
          ref={ref as any}
          className={cn(
            'h-12 rounded-lg border border-slate-300 bg-white px-4 text-base text-slate-900',
            'focus:border-blue-500 focus:border-2',
            error && 'border-red-500',
            className
          )}
          placeholderTextColor="#94a3b8"
          {...props}
        />
        {error && (
          <Text className="text-sm text-red-500">{error}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

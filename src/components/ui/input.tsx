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
          <Text className="text-sm font-medium text-[#94a3b8]">{label}</Text>
        )}
        <TextInput
          ref={ref as any}
          className={cn(
            'h-12 rounded-lg border border-slate-700 bg-[#1b232c] px-4 text-base text-white',
            'focus:border-[#0ea5e9]',
            error && 'border-red-500',
            className
          )}
          placeholderTextColor="#64748b"
          {...props}
        />
        {error && <Text className="text-sm text-red-500">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';

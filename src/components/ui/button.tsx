import { cva, type VariantProps } from 'class-variance-authority';
import { Pressable, Text, type PressableProps } from 'react-native';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'items-center justify-center rounded-lg px-4 py-3 active:opacity-80 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-blue-600',
        primary: 'bg-[#0ea5e9]',
        secondary: 'bg-slate-200',
        outline: 'border border-slate-600 bg-transparent',
        'outline-light': 'border border-slate-300 bg-transparent',
        ghost: 'bg-transparent',
        destructive: 'bg-red-600',
      },
      size: {
        default: 'h-12',
        sm: 'h-9 px-3',
        lg: 'h-14 px-6',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const textVariants = cva('font-semibold', {
  variants: {
    variant: {
      default: 'text-white',
      primary: 'text-white',
      secondary: 'text-slate-900',
      outline: 'text-white',
      'outline-light': 'text-slate-900',
      ghost: 'text-white',
      destructive: 'text-white',
    },
    size: {
      default: 'text-base',
      sm: 'text-sm',
      lg: 'text-lg',
      icon: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonProps = PressableProps &
  VariantProps<typeof buttonVariants> & {
    title: string;
    className?: string;
    textClassName?: string;
  };

export function Button({
  title,
  variant,
  size,
  className,
  textClassName,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled}
      {...props}
    >
      <Text className={cn(textVariants({ variant, size }), textClassName)}>
        {title}
      </Text>
    </Pressable>
  );
}

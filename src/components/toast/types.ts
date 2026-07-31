import type { LucideIcon } from 'lucide-react-native';

export type ToastVariant = 'success' | 'warning' | 'error' | 'info';

export type ToastAction = {
  label: string;
  onPress: () => void;
};

export type ToastData = {
  id: string;
  variant: ToastVariant;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  dismissible?: boolean;
  duration?: number;
  actions?: ToastAction[];
};

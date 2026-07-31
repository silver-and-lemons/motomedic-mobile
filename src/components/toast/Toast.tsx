import { useEffect, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { X } from 'lucide-react-native';
import type { ToastData } from './types';

const VARIANT_STYLES: Record<
  ToastData['variant'],
  { border: string; iconBg: string; iconColor: string; actionColor: string }
> = {
  success: {
    border: 'border-l-[#00d4aa]',
    iconBg: 'bg-[#00d4aa]/20',
    iconColor: '#00d4aa',
    actionColor: 'text-[#00d4aa]',
  },
  warning: {
    border: 'border-l-[#f5a623]',
    iconBg: 'bg-[#f5a623]/20',
    iconColor: '#f5a623',
    actionColor: 'text-[#f5a623]',
  },
  error: {
    border: 'border-l-[#e74c3c]',
    iconBg: 'bg-[#e74c3c]/20',
    iconColor: '#e74c3c',
    actionColor: 'text-[#e74c3c]',
  },
  info: {
    border: 'border-l-[#0ea5e9]',
    iconBg: 'bg-[#0ea5e9]/20',
    iconColor: '#0ea5e9',
    actionColor: 'text-[#0ea5e9]',
  },
};

const DEFAULT_ICONS: Record<ToastData['variant'], string> = {
  success: '\u2713',
  warning: '\u26A0',
  error: '\u2717',
  info: 'i',
};

type ToastProps = {
  toast: ToastData;
  onDismiss: () => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(60));

  const styles = VARIANT_STYLES[toast.variant];
  const duration = toast.duration ?? (toast.variant === 'success' ? 3500 : 5000);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (toast.dismissible !== false && toast.variant !== 'info') {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, slideAnim, toast.dismissible, toast.variant, onDismiss, duration]);

  function handleDismiss() {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 40,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  }

  const IconComponent = toast.icon;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="mx-4 mb-2"
    >
      <View
        className={`flex-row items-start rounded-lg border-l-4 border-r border-t border-b border-r-[#2a3345] border-t-[#2a3345] border-b-[#2a3345] bg-[#1e2435] p-3 ${styles.border}`}
      >
        <View
          className={`mr-3 h-8 w-8 items-center justify-center rounded-full ${styles.iconBg}`}
        >
          {IconComponent ? (
            <IconComponent size={16} color={styles.iconColor} />
          ) : (
            <Text className="text-sm font-bold" style={{ color: styles.iconColor }}>
              {DEFAULT_ICONS[toast.variant]}
            </Text>
          )}
        </View>

        <View className="flex-1">
          <Text className="text-sm font-semibold text-white">{toast.title}</Text>
          {toast.subtitle && (
            <Text className="mt-0.5 text-xs text-[#8a9bb0]">{toast.subtitle}</Text>
          )}
        </View>

        <View className="flex-row items-center gap-2">
          {toast.actions?.map((action) => (
            <Pressable
              key={action.label}
              onPress={action.onPress}
              className="px-2 py-1"
            >
              <Text className={`text-xs font-semibold ${styles.actionColor}`}>
                {action.label}
              </Text>
            </Pressable>
          ))}

          {toast.dismissible !== false && (
            <Pressable onPress={handleDismiss} className="p-1">
              <X size={14} color="#8a9bb0" />
            </Pressable>
          )}
        </View>
      </View>
    </Animated.View>
  );
}

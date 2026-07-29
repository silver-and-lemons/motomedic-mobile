import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Toast } from './Toast';
import { useToastStore } from './toast-store';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      className="absolute inset-0"
      style={{ paddingBottom: insets.bottom + 16 }}
    >
      <View pointerEvents="box-none" className="absolute bottom-0 left-0 right-0">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onDismiss={() => removeToast(toast.id)}
          />
        ))}
      </View>
    </View>
  );
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '../components/toast/ToastProvider';
import { TimerRunningToast } from '../features/timer/components/TimerRunningToast';

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          {children}
          <TimerRunningToast />
        </ToastProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

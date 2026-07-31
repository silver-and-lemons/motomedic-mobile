import { useCallback } from 'react';
import { useTimerStore } from '../timer-store';
import { useToastStore } from '../../../components/toast/toast-store';
import { useRiderStore } from '../../../store/rider.store';
import { useElapsedTime } from './use-elapsed-time';
import { CircleCheck, CircleX } from 'lucide-react-native';

export function useTimerActions() {
  const startTimer = useTimerStore((s) => s.startTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);
  const resetTimer = useTimerStore((s) => s.resetTimer);
  const status = useTimerStore((s) => s.status);
  const rider = useRiderStore((s) => s.rider);
  const addToast = useToastStore((s) => s.addToast);
  const elapsed = useElapsedTime();

  const handleStart = useCallback(() => {
    if (status !== 'idle') return;

    startTimer({
      riderName: rider?.displayName,
      rideId: `ride-${Date.now()}`,
    });

    addToast({
      variant: 'success',
      title: 'Timer Started',
      subtitle: rider?.displayName ? `Riding as ${rider.displayName}` : undefined,
      icon: CircleCheck,
      duration: 3500,
    });
  }, [status, rider, startTimer, addToast]);

  const handleStop = useCallback(async () => {
    if (status !== 'running' && status !== 'paused') return;

    await stopTimer();

    addToast({
      variant: 'success',
      title: 'Ride Complete',
      subtitle: `Duration: ${elapsed.formatted}`,
      icon: CircleCheck,
      duration: 5000,
    });

    setTimeout(() => resetTimer(), 5000);
  }, [status, stopTimer, addToast, resetTimer, elapsed.formatted]);

  const handleError = useCallback(() => {
    addToast({
      variant: 'error',
      title: 'Timer Error',
      subtitle: 'Failed to start timer. Please try again.',
      icon: CircleX,
      dismissible: true,
      actions: [
        {
          label: 'Retry',
          onPress: () => handleStart(),
        },
      ],
    });
  }, [addToast, handleStart]);

  return {
    handleStart,
    handleStop,
    handleError,
    status,
  };
}

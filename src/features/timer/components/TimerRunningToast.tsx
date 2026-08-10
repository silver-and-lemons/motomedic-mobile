import { useEffect, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Square, Pause, Play } from 'lucide-react-native';
import { useTimerStore } from '../timer-store';
import { useElapsedTime } from '../hooks/use-elapsed-time';
import { useToastStore } from '../../../components/toast/toast-store';

const STATUS_CONFIG = {
  running: { color: '#00d4aa', bg: 'bg-[#00d4aa]/10', label: 'Ride is Ongoing' },
  paused: { color: '#3b82f6', bg: 'bg-[#3b82f6]/10', label: 'Rider has paused the timer' },
  stopped: { color: '#e74c3c', bg: 'bg-[#e74c3c]/10', label: 'Ride has been completed' },
} as const;

export function TimerRunningToast() {
  const status = useTimerStore((s) => s.status);
  const riderName = useTimerStore((s) => s.riderName);
  const pauseTimer = useTimerStore((s) => s.pauseTimer);
  const resumeTimer = useTimerStore((s) => s.resumeTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);
  const resetTimer = useTimerStore((s) => s.resetTimer);
  const elapsed = useElapsedTime();
  const addToast = useToastStore((s) => s.addToast);
  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [slideAnim] = useState(() => new Animated.Value(-80));
  const insets = useSafeAreaInsets();

  const isActive = status === 'running' || status === 'paused';
  const isStopped = status === 'stopped';
  const cfg = STATUS_CONFIG[status === 'stopped' ? 'stopped' : status === 'paused' ? 'paused' : 'running'];

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -80,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive, fadeAnim, slideAnim]);

  useEffect(() => {
    if (isStopped) {
      addToast({
        variant: 'success',
        title: 'Ride Complete',
        subtitle: `Duration: ${elapsed.formatted}`,
        duration: 5000,
      });
      const timer = setTimeout(() => resetTimer(), 5000);
      return () => clearTimeout(timer);
    }
  }, [isStopped, addToast, elapsed.formatted, resetTimer]);

  async function handleStop() {
    await stopTimer();
  }

  if (!isActive && !isStopped) return null;

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        position: 'absolute',
        top: insets.top + 8,
        left: 16,
        right: 16,
        zIndex: 50,
      }}
      pointerEvents={isActive ? 'auto' : 'none'}
    >
      <View className={`overflow-hidden rounded-lg border-r border-t border-b border-r-[#2a3345] border-t-[#2a3345] border-b-[#2a3345] bg-[#1e2435]`}>
        <View className={`border-l-4 border-l-[${cfg.color}] p-3`}>
          <View className="flex-row items-center gap-2 mb-2">
            <View className={`h-2 w-2 rounded-full`} style={{ backgroundColor: cfg.color }} />
            <Text className="text-xs font-semibold" style={{ color: cfg.color }}>
              {cfg.label}
            </Text>
          </View>

          <View className="flex-row items-center">
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-xl font-bold tabular-nums text-white"
                  style={{ fontVariant: ['tabular-nums'] }}
                >
                  {elapsed.formatted}
                </Text>
                {riderName && (
                  <Text className="text-xs text-[#8a9bb0]">{riderName}</Text>
                )}
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              {status === 'running' && (
                <Pressable
                  onPress={pauseTimer}
                  className="flex-row items-center gap-1.5 rounded-md bg-[#3b82f6]/10 px-3 py-2"
                >
                  <Pause size={12} color="#3b82f6" />
                  <Text className="text-xs font-bold text-[#3b82f6]">PAUSE</Text>
                </Pressable>
              )}

              {status === 'paused' && (
                <Pressable
                  onPress={resumeTimer}
                  className="flex-row items-center gap-1.5 rounded-md bg-[#00d4aa]/10 px-3 py-2"
                >
                  <Play size={12} color="#00d4aa" fill="#00d4aa" />
                  <Text className="text-xs font-bold text-[#00d4aa]">RESUME</Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleStop}
                className="flex-row items-center gap-1.5 rounded-md bg-[#e74c3c]/10 px-3 py-2"
              >
                <Square size={12} color="#e74c3c" fill="#e74c3c" />
                <Text className="text-xs font-bold text-[#e74c3c]">STOP</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

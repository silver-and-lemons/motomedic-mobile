import { View, Text, Pressable } from 'react-native';
import { Play, Square, Pause, Timer } from 'lucide-react-native';
import { useTimerStore } from '../timer-store';
import { useElapsedTime } from '../hooks/use-elapsed-time';
import { useRiderStore } from '../../../store/rider.store';

type RideCardProps = {
  onViewRecordings: () => void;
};

const STATUS_BAR = {
  running: { color: '#00d4aa', label: 'Ride is Ongoing' },
  paused: { color: '#3b82f6', label: 'Rider has paused the timer' },
} as const;

export default function RideCard({ onViewRecordings }: RideCardProps) {
  const status = useTimerStore((s) => s.status);
  const startTimer = useTimerStore((s) => s.startTimer);
  const pauseTimer = useTimerStore((s) => s.pauseTimer);
  const resumeTimer = useTimerStore((s) => s.resumeTimer);
  const stopTimer = useTimerStore((s) => s.stopTimer);
  const riderName = useRiderStore((s) => s.rider?.displayName);
  const elapsed = useElapsedTime();

  const isActive = status === 'running' || status === 'paused';
  const cfg = status === 'paused' ? STATUS_BAR.paused : STATUS_BAR.running;

  function handleStart() {
    startTimer({
      riderName,
      rideId: `ride-${Date.now()}`,
    });
  }

  async function handleStop() {
    await stopTimer();
  }

  return (
    <View className="rounded-2xl border border-[#1e2d33] bg-[#121B1E] p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Timer size={18} color={isActive ? cfg.color : '#8A999E'} />
          <Text className="text-sm font-medium text-[#8A999E]">Ride Session</Text>
        </View>
        <Pressable onPress={onViewRecordings} className="active:opacity-70">
          <Text className="text-xs font-bold text-[#00d4aa]">View Recordings</Text>
        </Pressable>
      </View>

      {isActive ? (
        <View>
          <View
            className="items-center rounded-xl border py-4"
            style={{
              borderColor: `${cfg.color}30`,
              backgroundColor: `${cfg.color}08`,
            }}
          >
            <View className="flex-row items-center gap-2">
              <View className="h-2 w-2 rounded-full" style={{ backgroundColor: cfg.color }} />
              <Text className="text-xs font-semibold" style={{ color: cfg.color }}>
                {cfg.label}
              </Text>
            </View>
            <Text
              className="mt-2 text-4xl font-bold text-white"
              style={{ fontVariant: ['tabular-nums'] }}
            >
              {elapsed.formatted}
            </Text>
            {riderName && (
              <Text className="mt-1 text-xs text-[#8A999E]">{riderName}</Text>
            )}
          </View>

          <View className="mt-3 flex-row gap-3">
            {status === 'running' && (
              <Pressable
                onPress={pauseTimer}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-[#3b82f6] py-3.5 active:opacity-80"
              >
                <Pause size={14} color="#FFFFFF" fill="#FFFFFF" />
                <Text className="text-sm font-bold text-white">PAUSE</Text>
              </Pressable>
            )}

            {status === 'paused' && (
              <Pressable
                onPress={resumeTimer}
                className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-[#00d4aa] py-3.5 active:opacity-80"
              >
                <Play size={14} color="#0D1518" fill="#0D1518" />
                <Text className="text-sm font-bold text-[#0D1518]">RESUME</Text>
              </Pressable>
            )}

            <Pressable
              onPress={handleStop}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-full bg-[#e74c3c] py-3.5 active:opacity-80"
            >
              <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
              <Text className="text-sm font-bold text-white">STOP</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={handleStart}
          className="flex-row items-center justify-center gap-2 rounded-full bg-[#00d4aa] py-3.5 active:opacity-80"
        >
          <Play size={16} color="#0D1518" fill="#0D1518" />
          <Text className="text-sm font-bold text-[#0D1518]">START RIDE</Text>
        </Pressable>
      )}
    </View>
  );
}

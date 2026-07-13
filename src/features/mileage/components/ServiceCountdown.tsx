import { View, Text } from 'react-native';
import { Wrench } from 'lucide-react-native';
import { CircularProgress } from '../../../components/atoms/CircularProgress';

type ServiceCountdownProps = {
  kmToNextService: number;
  serviceIntervalKm: number;
  serviceProgress: number;
};

function getProgressColor(progress: number): string {
  if (progress >= 0.75) return '#ef4444';
  if (progress >= 0.5) return '#eab308';
  return '#10b981';
}

function getStatusLabel(kmToNextService: number): string {
  if (kmToNextService <= 0) return 'Service due!';
  if (kmToNextService <= 500) return 'Service soon';
  return 'On track';
}

export default function ServiceCountdown({
  kmToNextService,
  serviceIntervalKm,
  serviceProgress,
}: ServiceCountdownProps) {
  const color = getProgressColor(serviceProgress);
  const statusLabel = getStatusLabel(kmToNextService);
  const displayProgress = Math.min(serviceProgress, 1);

  return (
    <View className="rounded-xl border border-slate-700 bg-surface-card p-5">
      <View className="mb-4 flex-row items-center gap-2">
        <Wrench size={20} color="#0ea5e9" />
        <Text className="text-sm font-medium text-muted">Next Oil Change</Text>
      </View>

      <View className="flex-row items-center gap-6">
        <CircularProgress progress={displayProgress} size={120} strokeWidth={6}>
          <View className="items-center">
            <Text className="text-xl font-bold" style={{ color }}>
              {kmToNextService.toLocaleString()}
            </Text>
            <Text className="text-xs text-muted">km left</Text>
          </View>
        </CircularProgress>

        <View className="flex-1 gap-3">
          <Text className="text-lg font-semibold text-white">
            {statusLabel}
          </Text>
          <Text className="text-sm text-muted">
            {kmToNextService.toLocaleString()} km remaining
          </Text>
          <Text className="text-xs text-muted">
            Interval: {serviceIntervalKm.toLocaleString()} km
          </Text>
        </View>
      </View>
    </View>
  );
}

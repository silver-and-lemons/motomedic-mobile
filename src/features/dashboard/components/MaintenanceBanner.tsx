import { View, Text, Pressable } from 'react-native';
import {
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  Bike,
} from 'lucide-react-native';
import { Button } from '../../../components/atoms/Button';
import type { MaintenanceBannerData } from '../types/dashboard';

type MaintenanceBannerProps = {
  data: MaintenanceBannerData;
  onAction: () => void;
};

export default function MaintenanceBanner({
  data,
  onAction,
}: MaintenanceBannerProps) {
  const isActionRequired = data.state === 'action-required';
  const isMonitor = data.state === 'monitor';
  const isUpToDate = data.state === 'up-to-date';

  const iconColor = isActionRequired
    ? '#D95420'
    : isMonitor
      ? '#94a3b8'
      : '#10b981';

  const borderColor = isActionRequired
    ? 'border-orange-500/30'
    : isMonitor
      ? 'border-surface-card'
      : 'border-mint/20';

  const badgeBg = isActionRequired
    ? 'bg-orange-500/15'
    : isMonitor
      ? 'bg-surface-card'
      : 'bg-mint/15';

  const badgeText = isActionRequired
    ? 'text-orange-500'
    : isMonitor
      ? 'text-muted'
      : 'text-mint';

  const buttonVariant = isActionRequired
    ? 'primary'
    : 'primary';

  return (
    <View className={`mx-5 overflow-hidden rounded-3xl border ${borderColor} bg-surface-card`}>
      <View className="relative px-5 pb-5 pt-4">
        <View className="absolute bottom-0 right-0 opacity-[0.04]">
          <Bike size={180} color="#FFFFFF" />
        </View>

        <View className="flex-row items-center gap-2">
          <View className={`rounded-lg p-1.5 ${badgeBg}`}>
            {isActionRequired && <AlertTriangle size={16} color="#D95420" />}
            {isMonitor && <AlertTriangle size={16} color="#94a3b8" />}
            {isUpToDate && <ShieldCheck size={16} color="#10b981" />}
          </View>
          <Text className={`text-xs font-bold tracking-wider uppercase ${badgeText}`}>
            {isActionRequired
              ? 'ROUTINE MAINTENANCE'
              : isMonitor
                ? 'MONITOR YOUR BIKE'
                : 'MAINTENANCE UP TO DATE'}
          </Text>
        </View>

        {isActionRequired && (
          <Text className="mt-3 text-2xl font-bold text-white">
            {data.deadlineDays ?? 15} Days or {data.deadlineMiles ?? 450} mi
          </Text>
        )}

        {isMonitor && (
          <Text className="mt-3 text-2xl font-bold text-white">
            {data.subtitle}
          </Text>
        )}

        {isUpToDate && (
          <View className="mt-3 flex-row items-center gap-2">
            <ShieldCheck size={22} color="#10b981" />
            <Text className="text-2xl font-bold text-white">Today</Text>
          </View>
        )}

        <Text className="mt-1 text-sm text-muted">
          {isActionRequired
            ? 'Schedule your service to keep your bike in top condition.'
            : isMonitor
              ? 'Run a quick check before your next ride.'
              : 'Your bike was checked today and is ready to ride.'}
        </Text>

        <Button
          variant={buttonVariant}
          className="mt-4 rounded-xl py-3.5"
          onPress={onAction}
        >
          {data.buttonLabel}
        </Button>
      </View>
    </View>
  );
}

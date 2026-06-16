import { View, Text } from 'react-native';
import {
  ShieldCheck,
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
  const isMonitor = data.state === 'monitor';
  const isUpToDate = data.state === 'up-to-date';

  return (
    <View className="mx-5 overflow-hidden rounded-[20px] border border-surface-card bg-surface-card">
      <View className="relative flex-row">
        <View className="flex-1 px-5 pb-5 pt-4">
          {isUpToDate && (
            <View className="mt-3 flex-row items-center gap-2">
              <ShieldCheck size={22} color="#10b981" />
              <Text className="text-2xl font-bold text-white">Today</Text>
            </View>
          )}

          {isMonitor && (
            <Text className="mt-3 text-2xl font-bold text-white">
              {data.subtitle}
            </Text>
          )}

          <Text className="mt-1 text-sm text-muted">
            {isMonitor
              ? 'Run a quick check before your next ride.'
              : 'Your bike was checked today and is ready to ride.'}
          </Text>

          <Button
            variant="primary"
            className="mt-4 rounded-xl py-3.5"
            onPress={onAction}
          >
            {data.buttonLabel}
          </Button>
        </View>
      </View>
    </View>
  );
}

import { View, Text } from 'react-native';
import { ChevronRight, Droplet, Gauge, Zap } from 'lucide-react-native';
import type { TelemetryData } from '../types/dashboard';

type BikeHealthSectionProps = {
  telemetry: TelemetryData;
};

function MetricCard({
  icon,
  label,
  children,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`rounded-2xl bg-surface-card p-4 ${className ?? ''}`}>
      <View className="mb-3 flex-row items-center gap-2">
        {icon}
        <Text className="text-xs font-semibold tracking-wider text-muted uppercase">
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
}

export default function BikeHealthSection({
  telemetry,
}: BikeHealthSectionProps) {
  return (
    <View className="px-5">
      <Text className="mb-3 text-xs font-semibold tracking-wider text-muted uppercase">
        BIKE HEALTH
      </Text>

      <View className="flex-row gap-3">
        <MetricCard
          icon={<Droplet size={16} color="#ef4444" />}
          label="Oil Life"
          className="flex-1"
        >
          <View className="flex-row items-baseline gap-1.5">
            <Text className="text-3xl font-bold text-white">
              {telemetry.oilLife.percentage}%
            </Text>
            <Text className="text-sm font-semibold text-red-500">
              {telemetry.oilLife.trend >= 0 ? '+' : ''}
              {telemetry.oilLife.trend}%
            </Text>
          </View>
          <View className="mt-2 flex-row items-center">
            <Text className="text-xs text-muted">CHECK WEEKLY RECORD</Text>
            <ChevronRight size={12} color="#94a3b8" className="ml-0.5" />
          </View>
        </MetricCard>

        <MetricCard
          icon={<Gauge size={16} color="#10b981" />}
          label="PSI"
          className="flex-1"
        >
          <View className="flex-row items-baseline gap-2">
            <View className="relative">
              <Text className="text-3xl font-bold text-white">
                {telemetry.tirePressure.frontPsi}
                <Text className="text-lg text-muted">/</Text>
                {telemetry.tirePressure.rearPsi}
              </Text>
              <View className="absolute -right-1.5 -top-0.5 h-2 w-2 rounded-full bg-mint" />
            </View>
          </View>
          <View className="mt-2 flex-row items-center">
            <Text className="text-xs text-muted">Front/Rear</Text>
          </View>
        </MetricCard>
      </View>

      <View className="mt-3 flex-row items-center justify-between rounded-2xl bg-surface-card px-4 py-3.5">
        <View className="flex-row items-center gap-2.5">
          <Zap size={18} color="#10b981" />
          <View>
            <Text className="text-xs text-muted">Battery Voltage</Text>
            <Text className="text-base font-bold text-white">
              {telemetry.battery.voltage}V
            </Text>
          </View>
        </View>
        <View className="rounded-full bg-mint/20 px-3 py-1">
          <Text className="text-xs font-bold text-mint uppercase">
            {telemetry.battery.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

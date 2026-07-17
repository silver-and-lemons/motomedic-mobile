import { View, Text, Pressable } from 'react-native';
import { Droplet, CircleDot, Link2, CircleAlert } from 'lucide-react-native';
import GlowingGauge from './GlowingGauge';
import StatusRing from './StatusRing';
import { useMileage } from '../hooks/use-mileage';

type WearGaugeBoardProps = {
  onCheckOdometer: () => void;
};

function getTyreStatus(): { color: string; label: string } {
  return { color: '#FF6B4A', label: 'needs maintenance' };
}

export default function WearGaugeBoard({ onCheckOdometer }: WearGaugeBoardProps) {
  const { currentKm } = useMileage();
  const tyre = getTyreStatus();

  return (
    <View className="rounded-2xl border border-[#1e2d33] bg-[#121B1E] p-5">
      <Text className="mb-5 text-center text-base font-bold text-white">
        Wear gauge board
      </Text>

      <View className="items-center">
        <View className="relative mb-4 items-center">
          <GlowingGauge
            size={180}
            color="#16FFB0"
            value={currentKm > 0 ? `${currentKm.toLocaleString()} km` : 'nn km'}
          >
            <View className="items-center">
              <Text style={{ color: '#16FFB0', fontSize: 28 }}>Motorcycle</Text>
            </View>
          </GlowingGauge>
        </View>

        <View className="mb-6 flex-row flex-wrap items-start justify-center gap-4">
          <StatusRing
            color="#16FFB0"
            label="Oil"
            status="nn units"
            icon={<Droplet size={18} color="#16FFB0" />}
          />
          <StatusRing
            color="#16FFB0"
            label="Brake"
            status="Optimal condition"
            icon={<CircleDot size={18} color="#16FFB0" />}
          />
          <StatusRing
            color="#16FFB0"
            label="Chains"
            status="Optimal condition"
            icon={<Link2 size={18} color="#16FFB0" />}
          />
          <StatusRing
            color={tyre.color}
            label="Tyre"
            status={tyre.label}
            icon={<CircleAlert size={18} color={tyre.color} />}
          />
        </View>

        <Pressable
          onPress={onCheckOdometer}
          className="w-full items-center rounded-full bg-[#16FFB0] py-3.5 active:opacity-80"
        >
          <Text className="text-sm font-bold text-[#0D1518]">Check Odometer</Text>
        </Pressable>
      </View>
    </View>
  );
}

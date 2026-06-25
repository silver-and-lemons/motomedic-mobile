import { View, Text, Pressable } from 'react-native';
import { Bell, ChevronRight, User } from 'lucide-react-native';
import type { RiderProfile } from '../../../types/rider';

type HeaderSectionProps = {
  rider: RiderProfile | null;
  onNotificationPress?: () => void;
  onChangeVehicle?: () => void;
};

export default function HeaderSection({
  rider,
  onNotificationPress,
  onChangeVehicle,
}: HeaderSectionProps) {
  return (
    <View className="px-5 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-surface-card">
            <User size={22} color="#94a3b8" />
          </View>
          <View>
            <Text className="text-xs font-medium tracking-wider text-muted">
              WELCOME BACK
            </Text>
            <Text className="text-lg font-bold text-white">
              {rider?.displayName ?? 'Rider'}
            </Text>
          </View>
        </View>

        <Pressable
          onPress={onNotificationPress}
          className="relative h-12 w-12 items-center justify-center rounded-full bg-surface-card"
        >
          <Bell size={20} color="#94a3b8" />
          <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-primary" />
        </Pressable>
      </View>

      <View className="mt-6 border-t border-surface-light pt-4 pb-4 border-b border-surface-light">
        <Text className="text-2xl font-bold text-white">
          {rider?.bikeName ?? 'My Motorcycle'}
        </Text>
        <Pressable onPress={onChangeVehicle} className="mt-1 flex-row items-center">
          <Text className="text-sm font-medium text-primary">CHANGE VEHICLE</Text>
          <ChevronRight size={14} color="#0ea5e9" className="ml-0.5" />
        </Pressable>
      </View>
    </View>
  );
}

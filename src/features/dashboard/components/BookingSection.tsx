import { View, Text } from 'react-native';
import { CalendarClock, Bike, Calendar } from 'lucide-react-native';
import { Button } from '../../../components/atoms/Button';
import type { BookingData } from '../types/dashboard';

type BookingSectionProps = {
  booking: BookingData;
  onBookService: () => void;
};

export default function BookingSection({
  booking,
  onBookService,
}: BookingSectionProps) {
  return (
    <View className="mx-5 overflow-hidden rounded-[20px] border border-[#2a3a3f] bg-surface-card">
      <View className="relative flex-row">
        <View className="flex-1 px-5 pb-5 pt-4">
          <View className="absolute bottom-0 right-0 opacity-[0.06]">
            <Bike size={220} color="#FFFFFF" />
          </View>

          <View className="flex-row items-center gap-2">
            <CalendarClock size={16} color="#D95420" />
            <Text className="text-xs font-bold tracking-wider uppercase text-orange-500">
              ROUTINE MAINTENANCE
            </Text>
          </View>

          <Text className="mt-3 leading-none">
            <Text className="text-2xl font-bold text-white">
              {booking.deadlineDays} Days{' '}
            </Text>
            <Text className="text-base font-bold text-muted uppercase">OR</Text>
            <Text className="text-2xl font-bold text-white">
              {' '}{booking.deadlineMiles} mi
            </Text>
          </Text>

          <Text className="mt-1 text-sm text-muted">
            Don't wait until it's overdue. Book early to keep your ride running smoothly.
          </Text>

          <View className="mt-1">
            <Text className="text-sm text-muted">
              Schedule service for your
            </Text>
            <Text className="text-sm font-bold text-white">
              {booking.bikeName}
            </Text>
          </View>

          <Button
            variant="primary"
            className="mt-4 rounded-xl py-3.5"
            onPress={onBookService}
          >
            Book Now
          </Button>
        </View>
      </View>
    </View>
  );
}

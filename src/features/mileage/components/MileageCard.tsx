import { View, Text, Pressable } from 'react-native';
import { Gauge, Pencil } from 'lucide-react-native';

type MileageCardProps = {
  currentKm: number;
  cumulativeMileage: number;
  onEdit?: () => void;
};

export default function MileageCard({
  currentKm,
  cumulativeMileage,
  onEdit,
}: MileageCardProps) {
  return (
    <View className="rounded-xl border border-slate-700 bg-surface-card p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Gauge size={20} color="#0ea5e9" />
          <Text className="text-sm font-medium text-muted">Mileage</Text>
        </View>
        {onEdit && (
          <Pressable
            onPress={onEdit}
            className="flex-row items-center gap-1 rounded-lg px-3 py-1.5 active:opacity-70"
          >
            <Pencil size={14} color="#0ea5e9" />
            <Text className="text-sm font-medium text-primary">Edit</Text>
          </Pressable>
        )}
      </View>

      <View className="flex-row items-baseline gap-1">
        <Text className="text-4xl font-bold text-white">
          {currentKm.toLocaleString()}
        </Text>
        <Text className="text-lg text-muted">km</Text>
      </View>

      <Text className="mt-2 text-sm text-muted">
        Cumulative mileage: {cumulativeMileage.toLocaleString()} km
      </Text>
    </View>
  );
}

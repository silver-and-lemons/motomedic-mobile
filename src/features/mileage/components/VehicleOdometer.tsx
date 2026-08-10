import { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { ArrowLeft, MoreHorizontal, Minus, Plus, Droplet, CircleDot, Link2, CircleAlert } from 'lucide-react-native';

type VehicleOdometerProps = {
  initialKm: number;
  onSave: (km: number) => void;
  onBack: () => void;
  onGoToMaintenance: () => void;
  onBackToHome: () => void;
};

const NEON = '#16FFB0';
const BG = '#0D1518';
const STEP = 100;

export default function VehicleOdometer({
  initialKm,
  onSave,
  onBack,
  onGoToMaintenance,
  onBackToHome,
}: VehicleOdometerProps) {
  const [km, setKm] = useState(initialKm);
  const [hasReading, setHasReading] = useState(initialKm > 0);

  function handleConfirm() {
    if (km <= 0) return;
    setHasReading(true);
    onSave(km);
  }

  function handleIncrement() {
    setKm((prev) => prev + STEP);
  }

  function handleDecrement() {
    setKm((prev) => Math.max(0, prev - STEP));
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 px-5 pt-12 pb-8">
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable
            onPress={onBack}
            className="flex-row items-center gap-2 active:opacity-70"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text className="text-sm font-semibold text-white">Mileage</Text>
          </Pressable>
          <MoreHorizontal size={20} color="#FFFFFF" />
        </View>

        <Text className="mb-8 text-center text-xl font-extrabold uppercase tracking-wide text-white">
          Vehicle Odometer
        </Text>

        <View className="items-center">
          <View
            className="items-center justify-center rounded-full border-[3px]"
            style={{ width: 180, height: 180, borderColor: NEON }}
          >
            <Text className="text-xs font-semibold text-[#8A999E]">
              {hasReading ? 'Current Mileage' : 'Motorcycle'}
            </Text>
            <Text
              className="text-2xl font-extrabold"
              style={{ color: NEON }}
            >
              {km.toLocaleString()}
            </Text>
            <Text className="text-xs text-[#8A999E]">km</Text>
          </View>
        </View>

        {/* +/- Buttons */}
        <View className="mt-8 items-center gap-4">
          {!hasReading && (
            <Text className="text-sm text-[#8A999E]">
              Set your starting mileage
            </Text>
          )}

          <View className="flex-row items-center gap-6">
            <Pressable
              onPress={handleDecrement}
              disabled={km <= 0}
              className="h-14 w-14 items-center justify-center rounded-full border-2 border-[#1e2d33] active:opacity-70 disabled:opacity-30"
            >
              <Minus size={22} color="#FFFFFF" />
            </Pressable>

            <TextInput
              keyboardType="numeric"
              value={km > 0 ? String(km) : ''}
              onChangeText={(text) => {
                const parsed = parseInt(text.replace(/[^0-9]/g, ''), 10);
                setKm(isNaN(parsed) ? 0 : Math.max(0, parsed));
              }}
              placeholder="0"
              placeholderTextColor="#3a4a50"
              className="w-36 rounded-xl border border-[#1e2d33] bg-[#1b232c] px-4 py-3 text-center text-xl font-bold text-white"
            />

            <Pressable
              onPress={handleIncrement}
              className="h-14 w-14 items-center justify-center rounded-full border-2 border-[#1e2d33] active:opacity-70"
            >
              <Plus size={22} color="#FFFFFF" />
            </Pressable>
          </View>

          <Text className="text-xs text-[#8A999E]">
            Tap +/- for {STEP} km or type directly
          </Text>

          <Pressable
            onPress={handleConfirm}
            disabled={km <= 0}
            className="w-full items-center rounded-full bg-[#16FFB0] py-4 active:opacity-80 disabled:opacity-40"
          >
            <Text className="text-base font-bold text-[#0D1518]">
              {hasReading ? 'SAVE' : 'CONFIRM'}
            </Text>
          </Pressable>
        </View>

        {hasReading && (
          <View className="mt-8 gap-3">
            <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
              <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-[#16FFB0]">
                <Droplet size={16} color="#16FFB0" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-white">Oil</Text>
                <Text className="text-xs text-[#8A999E]">nn units</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
              <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-[#16FFB0]">
                <CircleDot size={16} color="#16FFB0" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-white">Break</Text>
                <Text className="text-xs text-[#8A999E]">In optimal condition</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
              <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-[#16FFB0]">
                <Link2 size={16} color="#16FFB0" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-white">Chain</Text>
                <Text className="text-xs text-[#8A999E]">In optimal condition</Text>
              </View>
            </View>

            <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
              <View className="h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF6B4A]">
                <CircleAlert size={16} color="#FF6B4A" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-semibold text-white">Tyre</Text>
                <Text className="text-xs text-[#FF6B4A]">Needs Maintenance</Text>
              </View>
            </View>

            <View className="mt-4 gap-3">
              <Pressable
                onPress={onGoToMaintenance}
                className="w-full items-center rounded-full bg-[#FF6B4A] py-4 active:opacity-80"
              >
                <Text className="text-base font-bold text-white">
                  Go to Maintenance
                </Text>
              </Pressable>

              <Pressable
                onPress={onBackToHome}
                className="w-full items-center rounded-full bg-[#16FFB0] py-4 active:opacity-80"
              >
                <Text className="text-base font-bold text-[#0D1518]">
                  Back to home
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

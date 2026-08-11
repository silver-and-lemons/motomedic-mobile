import { View, Text, ScrollView, Alert, Pressable } from 'react-native';
import { router, type Href } from 'expo-router';
import { ArrowLeft, MoreHorizontal, Droplet, CircleDot, Link2, CircleAlert } from 'lucide-react-native';
import { Button } from '../../../components/ui/button';
import { useMileageStore } from '../../../store/mileage.store';
import { useMileage } from '../hooks/use-mileage';

const DASHBOARD_ROUTE = '/dashboard' as Href;
const BG = '#0D1518';
const CARD = '#121B1E';
const BORDER = '#1e2d33';
const NEON = '#16FFB0';
const CORAL = '#FF6B4A';

export default function OdometerSettingsContainer() {
  const reading = useMileageStore((s) => s.reading);
  const recordService = useMileageStore((s) => s.recordService);
  const clearReading = useMileageStore((s) => s.clearReading);
  const { serviceIntervalKm, kmToNextService } = useMileage();

  function handleRecordService() {
    if (!reading) return;
    Alert.alert(
      'Record Oil Change',
      `This will reset the service countdown from ${reading.currentKm.toLocaleString()} km. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            recordService(reading.currentKm);
            Alert.alert('Done', 'Service has been recorded.');
          },
        },
      ],
    );
  }

  function handleClearReading() {
    Alert.alert(
      'Clear Odometer Data',
      'This will remove all mileage data. You will need to set the odometer again.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            clearReading();
            router.replace(DASHBOARD_ROUTE);
          },
        },
      ],
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: BG }}>
      <View className="px-5 pt-12 pb-8">
        <View className="mb-6 flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            className="flex-row items-center gap-2 active:opacity-70"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
            <Text className="text-sm font-semibold text-white">Settings</Text>
          </Pressable>
          <MoreHorizontal size={20} color="#FFFFFF" />
        </View>

        <Text className="mb-6 text-center text-xl font-extrabold uppercase tracking-wide text-white">
          Maintenance Status
        </Text>

        {reading ? (
          <View className="gap-4">
            <View className="items-center rounded-2xl border border={BORDER} bg-card p-6">
              <Text className="mb-1 text-4xl font-bold text-white">
                {reading.currentKm.toLocaleString()}
              </Text>
              <Text className="text-sm text-[#8A999E]">Current Odometer (km)</Text>

              <View className="mt-4 w-full gap-2 border-t border-[#1e2d33] pt-4">
                <InfoRow label="Service interval" value={`${serviceIntervalKm.toLocaleString()} km`} />
                <InfoRow label="Last service" value={`${reading.lastServiceKm.toLocaleString()} km`} />
                <InfoRow label="Next service in" value={`${kmToNextService.toLocaleString()} km`} />
              </View>
            </View>

            <Text className="mt-2 text-center text-sm font-bold uppercase text-white">
              Wear Details
            </Text>

            <View className="gap-3">
              <StatusCard
                icon={<Droplet size={16} color={NEON} />}
                iconBorder={NEON}
                title="Oil"
                subtitle={`${serviceIntervalKm.toLocaleString()} km interval`}
              />
              <StatusCard
                icon={<CircleDot size={16} color={NEON} />}
                iconBorder={NEON}
                title="Brake"
                subtitle="In optimal condition"
              />
              <StatusCard
                icon={<Link2 size={16} color={NEON} />}
                iconBorder={NEON}
                title="Chain"
                subtitle="In optimal condition"
              />
              <StatusCard
                icon={<CircleAlert size={16} color={CORAL} />}
                iconBorder={CORAL}
                title="Tyre"
                subtitle="Needs maintenance"
                subtitleColor={CORAL}
              />
            </View>

            <View className="mt-2 gap-3">
              <Button
                title="Record Oil Change"
                variant="outline"
                onPress={handleRecordService}
                className="rounded-full border-[#1e2d33] py-4"
                textClassName="text-[#16FFB0]"
              />
              <Button
                title="Clear All Mileage Data"
                variant="destructive"
                onPress={handleClearReading}
                className="rounded-full py-4"
              />
            </View>
          </View>
        ) : (
          <View className="items-center gap-4 rounded-2xl border border={BORDER} bg-card p-8">
            <Text className="text-center text-sm text-[#8A999E]">
              No odometer reading set yet.
            </Text>
            <Button
              title="Set Odometer"
              variant="primary"
              onPress={() => router.push('/odometer-input' as Href)}
              className="rounded-full bg-[#16FFB0] py-4"
              textClassName="text-[#0D1518] font-bold"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-xs text-[#8A999E]">{label}</Text>
      <Text className="text-xs font-semibold text-white">{value}</Text>
    </View>
  );
}

function StatusCard({
  icon,
  iconBorder,
  title,
  subtitle,
  subtitleColor = '#8A999E',
}: {
  icon: React.ReactNode;
  iconBorder: string;
  title: string;
  subtitle: string;
  subtitleColor?: string;
}) {
  return (
    <View className="flex-row items-center gap-4 rounded-xl border border-[#1e2d33] bg-[#121B1E] p-4">
      <View
        className="h-10 w-10 items-center justify-center rounded-full border-2"
        style={{ borderColor: iconBorder }}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-white">{title}</Text>
        <Text className="text-xs" style={{ color: subtitleColor }}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

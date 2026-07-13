import { View, Text, ScrollView, Alert } from 'react-native';
import { router, type Href } from 'expo-router';
import OdometerInputForm from '../components/OdometerInputForm';
import { Button } from '../../../components/ui/button';
import { useMileageStore } from '../../../store/mileage.store';
import { useMileage } from '../hooks/use-mileage';

const DASHBOARD_ROUTE = '/dashboard' as Href;

export default function OdometerSettingsContainer() {
  const reading = useMileageStore((s) => s.reading);
  const updateOdometer = useMileageStore((s) => s.updateOdometer);
  const recordService = useMileageStore((s) => s.recordService);
  const clearReading = useMileageStore((s) => s.clearReading);
  const { serviceIntervalKm } = useMileage();

  function handleSave(value: number) {
    updateOdometer(value);
    router.replace(DASHBOARD_ROUTE);
  }

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
    <ScrollView className="flex-1 bg-surface">
      <View className="gap-6 px-6 pt-12 pb-8">
        <OdometerInputForm
          initialValue={reading?.currentKm ?? 0}
          onSave={handleSave}
          title="Edit Odometer"
          submitLabel="Update Reading"
        />

        <View className="gap-3 rounded-xl border border-slate-700 bg-surface-card p-5">
          <Text className="text-sm font-medium text-muted">
            Service interval: {serviceIntervalKm.toLocaleString()} km
          </Text>
          {reading && (
            <Text className="text-sm text-muted">
              Last service at: {reading.lastServiceKm.toLocaleString()} km
            </Text>
          )}

          <Button
            title="Record Oil Change"
            variant="outline"
            onPress={handleRecordService}
            disabled={!reading}
          />

          <Button
            title="Clear All Mileage Data"
            variant="destructive"
            onPress={handleClearReading}
            disabled={!reading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

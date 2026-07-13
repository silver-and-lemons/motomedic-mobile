import { View } from 'react-native';
import { router, type Href } from 'expo-router';
import OdometerInputForm from '../components/OdometerInputForm';
import { useMileageStore } from '../../../store/mileage.store';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import { getDefaultServiceInterval } from '../../../config/constants';

const DASHBOARD_ROUTE = '/dashboard' as Href;

export default function OdometerInputContainer() {
  const saveReading = useMileageStore((s) => s.saveReading);
  const reading = useMileageStore((s) => s.reading);
  const profile = useMotorcycleProfileStore((s) => s.profile);

  const serviceInterval = profile
    ? getDefaultServiceInterval(profile.engineSizeCc)
    : 5000;

  function handleSave(value: number) {
    saveReading({
      currentKm: value,
      lastServiceKm: value,
      serviceIntervalKm: serviceInterval,
    });
    router.replace(DASHBOARD_ROUTE);
  }

  return (
    <View className="flex-1 bg-surface px-6 pt-12">
      <OdometerInputForm
        initialValue={reading?.currentKm ?? 0}
        onSave={handleSave}
        title="Set Odometer Reading"
        submitLabel="Save & Continue"
      />
    </View>
  );
}

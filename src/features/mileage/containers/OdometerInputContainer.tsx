import { router, type Href } from 'expo-router';
import VehicleOdometer from '../components/VehicleOdometer';
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
  }

  return (
    <VehicleOdometer
      initialKm={reading?.currentKm ?? 0}
      onSave={handleSave}
      onBack={() => router.back()}
      onGoToMaintenance={() => router.replace('/settings' as Href)}
      onBackToHome={() => router.replace(DASHBOARD_ROUTE)}
    />
  );
}

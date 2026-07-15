import { useMemo } from 'react';
import { useMileageStore } from '../../../store/mileage.store';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';
import { getDefaultServiceInterval } from '../../../config/constants';

export function useMileage() {
  const reading = useMileageStore((s) => s.reading);
  const isComplete = useMileageStore((s) => s.isComplete);
  const profile = useMotorcycleProfileStore((s) => s.profile);

  const computed = useMemo(() => {
    if (!reading) {
      return {
        currentKm: 0,
        cumulativeMileage: 0,
        serviceIntervalKm: profile ? getDefaultServiceInterval(profile.engineSizeCc) : 5000,
        lastServiceKm: 0,
        kmToNextService: profile ? getDefaultServiceInterval(profile.engineSizeCc) : 5000,
        serviceProgress: 0,
      };
    }

    const kmSinceLastService = reading.currentKm - reading.lastServiceKm;
    const kmToNextService = Math.max(0, reading.serviceIntervalKm - kmSinceLastService);
    const serviceProgress = Math.min(1, kmSinceLastService / reading.serviceIntervalKm);

    return {
      currentKm: reading.currentKm,
      cumulativeMileage: reading.currentKm,
      serviceIntervalKm: reading.serviceIntervalKm,
      lastServiceKm: reading.lastServiceKm,
      kmToNextService,
      serviceProgress,
    };
  }, [reading, profile]);

  return {
    ...computed,
    isComplete,
  };
}

import BikeCatalogueContainer from '../features/bike-catalogue/containers/BikeCatalogueContainer';
import MileageDashboardContainer from '../features/mileage/containers/MileageDashboardContainer';
import { useMotorcycleProfileStore } from '../store/motorcycle-profile.store';
import { useMileageStore } from '../store/mileage.store';

export default function Index() {
  const isProfileComplete = useMotorcycleProfileStore((s) => s.isComplete);
  const isMileageComplete = useMileageStore((s) => s.isComplete);

  if (isProfileComplete && isMileageComplete) {
    return <MileageDashboardContainer />;
  }

  return <BikeCatalogueContainer />;
}

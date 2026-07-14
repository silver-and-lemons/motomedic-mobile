import { useMemo, useState } from 'react';
import { router, type Href } from 'expo-router';
import BikeCatalogueScreen from '../components/BikeCatalogueScreen';
import { useBikeCatalogue } from '../hooks/use-bike-catalogue';
import { mapCatalogueBikeToProfile } from '../services/catalogue-bike.mapper';
import type { BikeBrandFilter } from '../types/catalogue-bike';
import { useMotorcycleProfileStore } from '../../../store/motorcycle-profile.store';

const QUESTIONNAIRE_ROUTE = '/questionnaire' as Href;

export default function BikeCatalogueContainer() {
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<BikeBrandFilter>('all');
  const [selectedBikeId, setSelectedBikeId] = useState<number>();
  const saveProfile = useMotorcycleProfileStore((state) => state.saveProfile);
  const catalogue = useBikeCatalogue();
  const bikes = catalogue.data ?? [];
  const brandFilters = useMemo(
    () => ['all', ...new Set(bikes.map((bike) => bike.brand))],
    [bikes]
  );

  const filteredBikes = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return bikes.filter((bike) => {
      const matchesBrand =
        selectedBrand === 'all' || bike.brand === selectedBrand;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${bike.brand} ${bike.model}`.toLowerCase().includes(normalizedSearch);

      return matchesBrand && matchesSearch;
    });
  }, [bikes, search, selectedBrand]);

  function handleProceed(): void {
    const selectedBike = bikes.find(
      (bike) => bike.id === selectedBikeId
    );
    if (!selectedBike) return;

    const profile = mapCatalogueBikeToProfile(selectedBike);
    saveProfile(profile);
    router.push(QUESTIONNAIRE_ROUTE);
  }

  return (
    <BikeCatalogueScreen
      bikes={filteredBikes}
      brandFilters={brandFilters}
      selectedBikeId={selectedBikeId}
      selectedBrand={selectedBrand}
      search={search}
      isLoading={catalogue.isLoading}
      errorMessage={catalogue.error?.message}
      onBack={() => router.back()}
      onBrandChange={setSelectedBrand}
      onFallback={() => router.push(QUESTIONNAIRE_ROUTE)}
      onProceed={handleProceed}
      onSearchChange={setSearch}
      onSelectBike={setSelectedBikeId}
    />
  );
}

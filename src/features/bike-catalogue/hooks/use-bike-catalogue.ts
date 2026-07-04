import { useQuery } from '@tanstack/react-query';
import { bikeCatalogueKeys } from '../queries/bike-catalogue.queries';
import { fetchBikeCatalogue } from '../services/bike-catalogue.service';

export function useBikeCatalogue() {
  return useQuery({
    queryKey: bikeCatalogueKeys.list(),
    queryFn: fetchBikeCatalogue,
  });
}

import { CATALOGUE_BIKES } from '../data/catalogue-bikes';
import type { CatalogueBike } from '../types/catalogue-bike';

export async function fetchBikeCatalogue(): Promise<CatalogueBike[]> {
  return CATALOGUE_BIKES;
}

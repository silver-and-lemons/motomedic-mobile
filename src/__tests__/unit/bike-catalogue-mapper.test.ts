import { CATALOGUE_BIKES } from '../../features/bike-catalogue/data/catalogue-bikes';
import { mapCatalogueBikeToProfile } from '../../features/bike-catalogue/services/catalogue-bike.mapper';

describe('mapCatalogueBikeToProfile', () => {
  it('maps catalogue attributes into the existing questionnaire profile shape', () => {
    expect(mapCatalogueBikeToProfile(CATALOGUE_BIKES[1])).toEqual({
      vehicleType: 'automatic-scooter',
      engineSizeCc: 157,
      fuelType: 'fuel-injected',
      coolingType: 'liquid-cooled',
      bikeAge: 2022,
      agreedToPolicies: true,
    });
  });
});

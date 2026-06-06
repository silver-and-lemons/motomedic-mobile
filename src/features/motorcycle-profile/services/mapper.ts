import type { MotorcycleProfile } from '../types/motorcycle-profile';
import type { MotorcycleQuestionnaire, EngineSize, BikeAge } from '../../../types/api';

function mapEngineSize(cc: number): EngineSize {
  if (cc <= 125) return '100-125cc';
  if (cc <= 155) return '126-155cc';
  return '156cc-above';
}

function mapBikeAge(year: number): BikeAge {
  if (year <= 2014) return '2014-and-older';
  if (year <= 2019) return '2015-2019';
  return '2020-present';
}

export function mapProfileToApiRequest(profile: MotorcycleProfile): MotorcycleQuestionnaire {
  return {
    bikeType: profile.vehicleType,
    engineSize: mapEngineSize(profile.engineSizeCc),
    fuelSystem: profile.fuelType,
    cooling: profile.coolingType,
    bikeAge: mapBikeAge(profile.bikeAge),
  };
}

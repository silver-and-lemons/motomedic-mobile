import type { MotorcycleProfile } from '../../motorcycle-profile/types/motorcycle-profile';
import type { CatalogueBike } from '../types/catalogue-bike';

export function mapCatalogueBikeToProfile(
  bike: CatalogueBike
): MotorcycleProfile {
  return {
    vehicleType: mapBikeType(bike.type),
    engineSizeCc: bike.engineSize ?? 110,
    fuelType: bike.fuelSys === 'fuel_injected' ? 'fuel-injected' : 'carbureted',
    coolingType: bike.coolSys === 'liquid' ? 'liquid-cooled' : 'air-cooled',
    bikeAge: bike.year,
    agreedToPolicies: true,
  };
}

function mapBikeType(type: CatalogueBike['type']): MotorcycleProfile['vehicleType'] {
  switch (type) {
    case 'Auto Scooter':
      return 'automatic-scooter';
    case 'Underbone':
      return 'underbone';
    case 'Sport/Naked/Big Bike':
      return 'sport-naked-big-bike';
  }
}

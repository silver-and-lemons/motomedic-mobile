export type BikeBrandFilter = 'all' | string;

export type CatalogueBikeType =
  | 'Auto Scooter'
  | 'Underbone'
  | 'Sport/Naked/Big Bike';

export type CatalogueFuelSystem = 'carbureted' | 'fuel_injected';

export type CatalogueCoolingSystem = 'air' | 'liquid';

export type CatalogueBike = {
  id: number;
  brand: string;
  model: string;
  type: CatalogueBikeType;
  year: number;
  engineSize: number | null;
  fuelSys: CatalogueFuelSystem;
  coolSys: CatalogueCoolingSystem;
  transmission: string;
  imagePlaceholder?: string;
};

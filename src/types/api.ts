export type BikeType = 'automatic-scooter' | 'underbone' | 'sport-naked-big-bike';

export type EngineSize = '100-125cc' | '126-155cc' | '156cc-above';

export type FuelSystem = 'carbureted' | 'fuel-injected';

export type Cooling = 'air-cooled' | 'liquid-cooled';

export type BikeAge = '2014-and-older' | '2015-2019' | '2020-present';

export interface MotorcycleQuestionnaire {
  bikeType: BikeType;
  engineSize: EngineSize;
  fuelSystem: FuelSystem;
  cooling: Cooling;
  bikeAge: BikeAge;
}

export type ChecklistCategory = 'engine' | 'brakes' | 'suspension' | 'drivetrain' | 'electrical' | 'tires';

export type ChecklistStatus = 'pending' | 'pass' | 'fail' | 'skipped';

export interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  category: ChecklistCategory;
  condition: string;
  required: boolean;
  status: ChecklistStatus;
}

export interface ChecklistResult {
  profile: MotorcycleQuestionnaire;
  items: ChecklistItem[];
  generatedAt: string;
}

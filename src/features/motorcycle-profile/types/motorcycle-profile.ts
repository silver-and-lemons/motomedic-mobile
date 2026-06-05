import { z } from 'zod';

export const VEHICLE_TYPES = [
  'automatic-scooter',
  'underbone',
  'sport-naked-big-bike',
] as const;

export const FUEL_TYPES = ['carbureted', 'fuel-injected'] as const;

export const COOLING_TYPES = ['air-cooled', 'liquid-cooled'] as const;

export const VEHICLE_TYPE_LABELS: Record<string, string> = {
  'automatic-scooter': 'Automatic Scooter',
  'underbone': 'Underbone',
  'sport-naked-big-bike': 'Sport / Naked / Big Bike',
};

export const VEHICLE_TYPE_SUBTITLES: Record<string, string> = {
  'automatic-scooter': 'Easy handling, city-friendly',
  'underbone': 'Lightweight, fuel-efficient',
  'sport-naked-big-bike': 'High performance, powerful',
};

export const FUEL_TYPE_LABELS: Record<string, string> = {
  'carbureted': 'Carbureted',
  'fuel-injected': 'Fuel Injected',
};

export const COOLING_TYPE_LABELS: Record<string, string> = {
  'air-cooled': 'Air Cooled',
  'liquid-cooled': 'Liquid Cooled',
};

export type VehicleType = (typeof VEHICLE_TYPES)[number];
export type FuelType = (typeof FUEL_TYPES)[number];
export type CoolingType = (typeof COOLING_TYPES)[number];

export const motorcycleProfileSchema = z.object({
  vehicleType: z.enum(VEHICLE_TYPES, { message: 'Vehicle type is required' }),
  engineSizeCc: z
    .number({ message: 'Engine size is required' })
    .int()
    .min(50, 'Must be at least 50cc')
    .max(2500, 'Must be at most 2500cc'),
  fuelType: z.enum(FUEL_TYPES, { message: 'Fuel type is required' }),
  coolingType: z.enum(COOLING_TYPES, { message: 'Cooling type is required' }),
  bikeAge: z.string().min(1, 'Bike age is required'),
  agreedToPolicies: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the policies',
  }),
});

export type MotorcycleProfile = z.infer<typeof motorcycleProfileSchema>;

export const questionnaireDefaultValues: MotorcycleProfile = {
  vehicleType: 'automatic-scooter',
  engineSizeCc: 110,
  fuelType: 'carbureted',
  coolingType: 'air-cooled',
  bikeAge: '',
  agreedToPolicies: false,
};

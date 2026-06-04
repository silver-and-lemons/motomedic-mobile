import { z } from 'zod';

export const ENGINE_TYPES = [
  'single-cylinder',
  'parallel-twin',
  'v-twin',
  'inline-three',
  'inline-four',
  'inline-six',
  'electric',
  'other',
] as const;

export const PRIMARY_USES = [
  'commuting',
  'touring',
  'track',
  'offroad',
  'cruising',
  'other',
] as const;

export const EXPERIENCE_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
  'expert',
] as const;

export const CUSTOM_FEATURES_OPTIONS = [
  'aftermarket-exhaust',
  'power-commander',
  'aftermarket-suspension',
  'led-lighting',
  'custom-seat',
  'luggage-system',
  'windshield-upgrade',
  'crash-guards',
  'aftermarket-brakes',
] as const;

export type EngineType = (typeof ENGINE_TYPES)[number];
export type PrimaryUse = (typeof PRIMARY_USES)[number];
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];
export type CustomFeature = (typeof CUSTOM_FEATURES_OPTIONS)[number];

export const motorcycleProfileSchema = z.object({
  make: z.string().min(1, 'Make is required').max(50),
  model: z.string().min(1, 'Model is required').max(50),
  year: z
    .number({ message: 'Year is required' })
    .int('Year must be a whole number')
    .min(1970, 'Year must be 1970 or later')
    .max(new Date().getFullYear() + 1, 'Year cannot be in the distant future'),
  engineType: z.enum(ENGINE_TYPES, { message: 'Engine type is required' }),
  displacementCc: z
    .number({ message: 'Displacement is required' })
    .int('Displacement must be a whole number')
    .min(50, 'Displacement must be at least 50cc')
    .max(2500, 'Displacement must be at most 2500cc'),
  customFeatures: z.array(z.string()),
  primaryUse: z.enum(PRIMARY_USES, { message: 'Primary use is required' }),
  experienceLevel: z.enum(EXPERIENCE_LEVELS, { message: 'Experience level is required' }),
});

export type MotorcycleProfile = z.infer<typeof motorcycleProfileSchema>;

export const questionnaireDefaultValues: MotorcycleProfile = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  engineType: 'inline-four',
  displacementCc: 600,
  customFeatures: [],
  primaryUse: 'commuting',
  experienceLevel: 'intermediate',
};

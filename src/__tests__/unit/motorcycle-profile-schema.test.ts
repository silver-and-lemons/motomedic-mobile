import { motorcycleProfileSchema, questionnaireDefaultValues } from '../../features/motorcycle-profile/types/motorcycle-profile';

const validProfile = {
  make: 'Honda',
  model: 'CBR600RR',
  year: 2020,
  engineType: 'inline-four' as const,
  displacementCc: 600,
  customFeatures: ['led-lighting', 'aftermarket-exhaust'],
  primaryUse: 'track' as const,
  experienceLevel: 'advanced' as const,
};

describe('motorcycleProfileSchema', () => {
  it('passes with a fully valid profile', () => {
    const result = motorcycleProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('passes with no custom features (optional field)', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, customFeatures: [] });
    expect(result.success).toBe(true);
  });

  it('rejects default values (empty make/model are invalid)', () => {
    const result = motorcycleProfileSchema.safeParse(questionnaireDefaultValues);
    expect(result.success).toBe(false);
  });

  it('rejects empty make', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, make: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('make');
    }
  });

  it('rejects make exceeding 50 characters', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, make: 'A'.repeat(51) });
    expect(result.success).toBe(false);
  });

  it('rejects empty model', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, model: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('model');
    }
  });

  it('rejects year before 1970', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, year: 1969 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/1970/);
    }
  });

  it('rejects year beyond current year + 1', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, year: new Date().getFullYear() + 2 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/distant future/);
    }
  });

  it('rejects non-integer year', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, year: 2020.5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/whole number/);
    }
  });

  it('accepts boundary year 1970', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, year: 1970 });
    expect(result.success).toBe(true);
  });

  it('accepts boundary year current + 1', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, year: new Date().getFullYear() + 1 });
    expect(result.success).toBe(true);
  });

  it('rejects invalid engineType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineType: 'rotary' });
    expect(result.success).toBe(false);
  });

  it('rejects displacement below 50', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, displacementCc: 49 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/50cc/);
    }
  });

  it('rejects displacement above 2500', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, displacementCc: 2501 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/2500cc/);
    }
  });

  it('accepts boundary displacement 50', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, displacementCc: 50 });
    expect(result.success).toBe(true);
  });

  it('accepts boundary displacement 2500', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, displacementCc: 2500 });
    expect(result.success).toBe(true);
  });

  it('rejects displacement non-integer', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, displacementCc: 600.5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/whole number/);
    }
  });

  it('rejects invalid primaryUse', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, primaryUse: 'flying' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid experienceLevel', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, experienceLevel: 'god' });
    expect(result.success).toBe(false);
  });

  it('accepts all valid engineType values', () => {
    const types = ['single-cylinder', 'parallel-twin', 'v-twin', 'inline-three', 'inline-four', 'inline-six', 'electric', 'other'] as const;
    for (const engineType of types) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineType });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid primaryUse values', () => {
    const uses = ['commuting', 'touring', 'track', 'offroad', 'cruising', 'other'] as const;
    for (const primaryUse of uses) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, primaryUse });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid experienceLevel values', () => {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'] as const;
    for (const experienceLevel of levels) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, experienceLevel });
      expect(result.success).toBe(true);
    }
  });
});

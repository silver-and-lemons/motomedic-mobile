import { motorcycleProfileSchema, questionnaireDefaultValues } from '../../features/motorcycle-profile/types/motorcycle-profile';

const validProfile = {
  vehicleType: 'sport-naked-big-bike' as const,
  engineSizeCc: 600,
  fuelType: 'fuel-injected' as const,
  coolingType: 'liquid-cooled' as const,
  bikeAge: 2020,
  agreedToPolicies: true,
};

describe('motorcycleProfileSchema', () => {
  it('passes with a fully valid profile', () => {
    const result = motorcycleProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('passes with boundary default values (valid base fields)', () => {
    const result = motorcycleProfileSchema.safeParse({
      ...questionnaireDefaultValues,
      agreedToPolicies: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing vehicleType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, vehicleType: undefined });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('vehicleType');
    }
  });

  it('rejects invalid vehicleType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, vehicleType: 'flying-car' });
    expect(result.success).toBe(false);
  });

  it('rejects engineSizeCc below 50', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineSizeCc: 49 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/50cc/);
    }
  });

  it('rejects engineSizeCc above 2500', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineSizeCc: 2501 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/2500cc/);
    }
  });

  it('accepts boundary engineSizeCc 50', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineSizeCc: 50 });
    expect(result.success).toBe(true);
  });

  it('accepts boundary engineSizeCc 2500', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineSizeCc: 2500 });
    expect(result.success).toBe(true);
  });

  it('rejects non-integer engineSizeCc', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, engineSizeCc: 600.5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/expected int/);
    }
  });

  it('rejects missing fuelType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, fuelType: undefined });
    expect(result.success).toBe(false);
  });

  it('rejects invalid fuelType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, fuelType: 'diesel' });
    expect(result.success).toBe(false);
  });

  it('rejects missing coolingType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, coolingType: undefined });
    expect(result.success).toBe(false);
  });

  it('rejects invalid coolingType', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, coolingType: 'water' });
    expect(result.success).toBe(false);
  });

  it('rejects bikeAge before 1900', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, bikeAge: 1899 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/1900/);
    }
  });

  it('rejects bikeAge beyond current year', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, bikeAge: new Date().getFullYear() + 1 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(new RegExp(String(new Date().getFullYear())));
    }
  });

  it('rejects non-integer bikeAge', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, bikeAge: 2020.5 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toMatch(/whole number/);
    }
  });

  it('accepts boundary bikeAge 1900', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, bikeAge: 1900 });
    expect(result.success).toBe(true);
  });

  it('accepts boundary bikeAge current year', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, bikeAge: new Date().getFullYear() });
    expect(result.success).toBe(true);
  });

  it('rejects not agreeing to policies', () => {
    const result = motorcycleProfileSchema.safeParse({ ...validProfile, agreedToPolicies: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe('agreedToPolicies');
    }
  });

  it('accepts all valid vehicleType values', () => {
    const types = ['automatic-scooter', 'underbone', 'sport-naked-big-bike'] as const;
    for (const vehicleType of types) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, vehicleType });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid fuelType values', () => {
    const types = ['carbureted', 'fuel-injected'] as const;
    for (const fuelType of types) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, fuelType });
      expect(result.success).toBe(true);
    }
  });

  it('accepts all valid coolingType values', () => {
    const types = ['air-cooled', 'liquid-cooled'] as const;
    for (const coolingType of types) {
      const result = motorcycleProfileSchema.safeParse({ ...validProfile, coolingType });
      expect(result.success).toBe(true);
    }
  });
});

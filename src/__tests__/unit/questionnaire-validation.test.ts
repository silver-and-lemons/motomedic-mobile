import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { renderHook } from '@testing-library/react-native';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../features/motorcycle-profile/types/motorcycle-profile';

function getStepFields(step: number): (keyof MotorcycleProfile)[] {
  switch (step) {
    case 0: return ['vehicleType'];
    case 1: return ['engineSizeCc'];
    case 2: return ['fuelType'];
    case 3: return ['coolingType'];
    case 4: return ['bikeAge'];
    case 5: return ['agreedToPolicies'];
    default: return [];
  }
}

function setupForm(fields?: Partial<MotorcycleProfile>) {
  return renderHook(() =>
    useForm<MotorcycleProfile>({
      resolver: zodResolver(motorcycleProfileSchema),
      defaultValues: { ...questionnaireDefaultValues, ...fields },
      mode: 'onChange',
    })
  );
}

describe('getStepFields', () => {
  it('returns vehicleType field for step 0', () => {
    expect(getStepFields(0)).toEqual(['vehicleType']);
  });

  it('returns engineSizeCc field for step 1', () => {
    expect(getStepFields(1)).toEqual(['engineSizeCc']);
  });

  it('returns fuelType field for step 2', () => {
    expect(getStepFields(2)).toEqual(['fuelType']);
  });

  it('returns coolingType field for step 3', () => {
    expect(getStepFields(3)).toEqual(['coolingType']);
  });

  it('returns bikeAge field for step 4', () => {
    expect(getStepFields(4)).toEqual(['bikeAge']);
  });

  it('returns agreedToPolicies field for step 5', () => {
    expect(getStepFields(5)).toEqual(['agreedToPolicies']);
  });

  it('returns empty array for invalid step index -1', () => {
    expect(getStepFields(-1)).toEqual([]);
  });

  it('returns empty array for out-of-range step 99', () => {
    expect(getStepFields(99)).toEqual([]);
  });
});

describe('Step field validation', () => {
  it('step 0 passes with default vehicleType', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(0));
    expect(valid).toBe(true);
  });

  it('step 1 passes with default engineSizeCc', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(1));
    expect(valid).toBe(true);
  });

  it('step 2 passes with default fuelType', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(2));
    expect(valid).toBe(true);
  });

  it('step 3 passes with default coolingType', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(3));
    expect(valid).toBe(true);
  });

  it('step 4 passes with default bikeAge', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(4));
    expect(valid).toBe(true);
  });

  it('step 5 fails when not agreed to policies', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(5));
    expect(valid).toBe(false);
  });

  it('step 5 passes when agreed to policies', async () => {
    const { result } = setupForm({ agreedToPolicies: true });
    const valid = await result.current.trigger(getStepFields(5));
    expect(valid).toBe(true);
  });

  it('step 0 rejects invalid vehicleType', async () => {
    const { result } = setupForm({ vehicleType: undefined as unknown as MotorcycleProfile['vehicleType'] });
    const valid = await result.current.trigger(getStepFields(0));
    expect(valid).toBe(false);
  });

  it('step 1 rejects engineSizeCc below minimum', async () => {
    const { result } = setupForm({ engineSizeCc: 49 });
    const valid = await result.current.trigger(getStepFields(1));
    expect(valid).toBe(false);
  });

  it('step 1 accepts boundary engineSizeCc 50', async () => {
    const { result } = setupForm({ engineSizeCc: 50 });
    const valid = await result.current.trigger(getStepFields(1));
    expect(valid).toBe(true);
  });

  it('step 2 rejects invalid fuelType', async () => {
    const { result } = setupForm({ fuelType: undefined as unknown as MotorcycleProfile['fuelType'] });
    const valid = await result.current.trigger(getStepFields(2));
    expect(valid).toBe(false);
  });

  it('step 3 rejects invalid coolingType', async () => {
    const { result } = setupForm({ coolingType: undefined as unknown as MotorcycleProfile['coolingType'] });
    const valid = await result.current.trigger(getStepFields(3));
    expect(valid).toBe(false);
  });

  it('step 4 rejects bikeAge below 1900', async () => {
    const { result } = setupForm({ bikeAge: 1899 });
    const valid = await result.current.trigger(getStepFields(4));
    expect(valid).toBe(false);
  });

  it('step 4 accepts boundary bikeAge 1900', async () => {
    const { result } = setupForm({ bikeAge: 1900 });
    const valid = await result.current.trigger(getStepFields(4));
    expect(valid).toBe(true);
  });

  it('form keeps values across re-triggers', async () => {
    const { result } = setupForm({ engineSizeCc: 400 });
    await result.current.trigger(getStepFields(1));
    const values = result.current.getValues();
    expect(values.engineSizeCc).toBe(400);
    expect(values.vehicleType).toBe('automatic-scooter');
  });
});

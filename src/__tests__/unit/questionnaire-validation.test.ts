import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { renderHook } from '@testing-library/react-native';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../features/motorcycle-profile/types/motorcycle-profile';

jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return { ...actual };
});

function getStepFields(step: number): (keyof MotorcycleProfile)[] {
  switch (step) {
    case 0: return ['make', 'model', 'year'];
    case 1: return ['engineType', 'displacementCc'];
    case 2: return ['customFeatures'];
    case 3: return ['primaryUse', 'experienceLevel'];
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
  it('returns basic info fields for step 0', () => {
    expect(getStepFields(0)).toEqual(['make', 'model', 'year']);
  });

  it('returns engine fields for step 1', () => {
    expect(getStepFields(1)).toEqual(['engineType', 'displacementCc']);
  });

  it('returns features field for step 2', () => {
    expect(getStepFields(2)).toEqual(['customFeatures']);
  });

  it('returns rider profile fields for step 3', () => {
    expect(getStepFields(3)).toEqual(['primaryUse', 'experienceLevel']);
  });

  it('returns empty array for invalid step index -1', () => {
    expect(getStepFields(-1)).toEqual([]);
  });

  it('returns empty array for out-of-range step 99', () => {
    expect(getStepFields(99)).toEqual([]);
  });
});

describe('Step field validation', () => {
  it('step 0 validates: empty fields fail', async () => {
    const { result } = setupForm({ make: '', model: '', year: 0 });
    const valid = await result.current.trigger(getStepFields(0));
    expect(valid).toBe(false);
  });

  it('step 0 validates: valid fields pass', async () => {
    const { result } = setupForm({ make: 'Honda', model: 'CBR', year: 2020 });
    const valid = await result.current.trigger(getStepFields(0));
    expect(valid).toBe(true);
  });

  it('step 1 validates: missing engineType fails', async () => {
    const { result } = setupForm({ engineType: undefined as any, displacementCc: 600 });
    const valid = await result.current.trigger(getStepFields(1));
    expect(valid).toBe(false);
  });

  it('step 1 validates: valid fields pass', async () => {
    const { result } = setupForm({ engineType: 'v-twin', displacementCc: 1200 });
    const valid = await result.current.trigger(getStepFields(1));
    expect(valid).toBe(true);
  });

  it('step 2 always passes (optional array)', async () => {
    const { result } = setupForm({ customFeatures: [] });
    const valid = await result.current.trigger(getStepFields(2));
    expect(valid).toBe(true);
  });

  it('step 2 passes with features selected', async () => {
    const { result } = setupForm({ customFeatures: ['led-lighting'] });
    const valid = await result.current.trigger(getStepFields(2));
    expect(valid).toBe(true);
  });

  it('step 3 validates: missing primaryUse fails', async () => {
    const { result } = setupForm({ primaryUse: undefined as any, experienceLevel: 'beginner' });
    const valid = await result.current.trigger(getStepFields(3));
    expect(valid).toBe(false);
  });

  it('step 3 validates: missing experienceLevel fails', async () => {
    const { result } = setupForm({ primaryUse: 'touring', experienceLevel: undefined as any });
    const valid = await result.current.trigger(getStepFields(3));
    expect(valid).toBe(false);
  });

  it('step 3 validates: valid fields pass', async () => {
    const { result } = setupForm({ primaryUse: 'offroad', experienceLevel: 'expert' });
    const valid = await result.current.trigger(getStepFields(3));
    expect(valid).toBe(true);
  });

  it('default values fail step 0 (empty make/model)', async () => {
    const { result } = setupForm();
    const valid = await result.current.trigger(getStepFields(0));
    expect(valid).toBe(false);
  });

  it('default values pass steps 1-3 (valid engine, features, rider)', async () => {
    const { result } = setupForm();
    for (let step = 1; step < 4; step++) {
      const valid = await result.current.trigger(getStepFields(step));
      expect(valid).toBe(true);
    }
  });

  it('form keeps values across re-triggers', async () => {
    const { result } = setupForm({ make: 'Suzuki', model: 'GSX-R750', year: 2021 });
    await result.current.trigger(getStepFields(0));
    const values = result.current.getValues();
    expect(values.make).toBe('Suzuki');
    expect(values.model).toBe('GSX-R750');
    expect(values.year).toBe(2021);
  });
});

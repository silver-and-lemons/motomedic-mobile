import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BasicInfoStep from '../../../features/motorcycle-profile/components/BasicInfoStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

function renderWithForm(defaults?: Partial<MotorcycleProfile>) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<MotorcycleProfile>({
      resolver: zodResolver(motorcycleProfileSchema),
      defaultValues: { ...questionnaireDefaultValues, ...defaults },
      mode: 'onChange',
    });
    return <FormProvider {...form}>{children}</FormProvider>;
  };
  return render(<BasicInfoStep />, { wrapper: Wrapper });
}

describe('BasicInfoStep', () => {
  it('renders make, model, and year inputs', () => {
    renderWithForm();
    expect(screen.getByText('Make')).toBeTruthy();
    expect(screen.getByText('Model')).toBeTruthy();
    expect(screen.getByText('Year')).toBeTruthy();
  });

  it('renders placeholders', () => {
    renderWithForm();
    expect(screen.getByPlaceholderText('e.g. Honda, Yamaha, Kawasaki')).toBeTruthy();
    expect(screen.getByPlaceholderText('e.g. CBR600RR, Ninja 400')).toBeTruthy();
    expect(screen.getByPlaceholderText('e.g. 2020')).toBeTruthy();
  });

  it('shows default values', () => {
    renderWithForm({ make: 'Honda', model: 'CBR', year: 2020 });
    expect(screen.getByDisplayValue('Honda')).toBeTruthy();
    expect(screen.getByDisplayValue('CBR')).toBeTruthy();
    expect(screen.getByDisplayValue('2020')).toBeTruthy();
  });

  it('renders year input with number-pad keyboard', () => {
    renderWithForm();
    const yearInput = screen.getByPlaceholderText('e.g. 2020');
    expect(yearInput.props.keyboardType).toBe('number-pad');
  });
});

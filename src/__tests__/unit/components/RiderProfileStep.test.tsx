import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import RiderProfileStep from '../../../features/motorcycle-profile/components/RiderProfileStep';
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
  return render(<RiderProfileStep />, { wrapper: Wrapper });
}

describe('RiderProfileStep', () => {
  it('renders section headers', () => {
    renderWithForm();
    expect(screen.getByText('Primary Use')).toBeTruthy();
    expect(screen.getByText('Experience Level')).toBeTruthy();
  });

  it('renders all 6 primary use cards with subtitles', () => {
    renderWithForm();
    expect(screen.getByText('Commuting')).toBeTruthy();
    expect(screen.getByText('Daily transportation')).toBeTruthy();
    expect(screen.getByText('Touring')).toBeTruthy();
    expect(screen.getByText('Long distance rides')).toBeTruthy();
    expect(screen.getByText('Track / Sport')).toBeTruthy();
    expect(screen.getByText('Performance riding')).toBeTruthy();
    expect(screen.getByText('Off-road')).toBeTruthy();
    expect(screen.getByText('Dirt and trails')).toBeTruthy();
    expect(screen.getByText('Cruising')).toBeTruthy();
    expect(screen.getByText('Leisurely rides')).toBeTruthy();
    expect(screen.getByText('Other')).toBeTruthy();
    expect(screen.getByText('Other purposes')).toBeTruthy();
  });

  it('renders all 4 experience level cards', () => {
    renderWithForm();
    expect(screen.getByText('Beginner')).toBeTruthy();
    expect(screen.getByText('Intermediate')).toBeTruthy();
    expect(screen.getByText('Advanced')).toBeTruthy();
    expect(screen.getByText('Expert')).toBeTruthy();
  });

  it('shows default primary use selection', () => {
    renderWithForm();
    expect(screen.getByText('Commuting')).toBeTruthy();
  });

  it('shows default experience level selection', () => {
    renderWithForm();
    expect(screen.getByText('Intermediate')).toBeTruthy();
  });
});

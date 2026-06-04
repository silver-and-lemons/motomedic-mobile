import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EngineStep from '../../../features/motorcycle-profile/components/EngineStep';
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
  return render(<EngineStep />, { wrapper: Wrapper });
}

describe('EngineStep', () => {
  it('renders engine type label', () => {
    renderWithForm();
    expect(screen.getByText('Engine Type')).toBeTruthy();
  });

  it('renders all 8 engine type cards', () => {
    renderWithForm();
    expect(screen.getByText('Single Cylinder')).toBeTruthy();
    expect(screen.getByText('Parallel Twin')).toBeTruthy();
    expect(screen.getByText('V-Twin')).toBeTruthy();
    expect(screen.getByText('Inline Three')).toBeTruthy();
    expect(screen.getByText('Inline Four')).toBeTruthy();
    expect(screen.getByText('Inline Six')).toBeTruthy();
    expect(screen.getByText('Electric')).toBeTruthy();
    expect(screen.getByText('Other')).toBeTruthy();
  });

  it('renders displacement input', () => {
    renderWithForm();
    expect(screen.getByText('Displacement (cc)')).toBeTruthy();
    expect(screen.getByPlaceholderText('e.g. 600')).toBeTruthy();
  });

  it('shows default engine type selection', () => {
    renderWithForm();
    expect(screen.getByText('Inline Four')).toBeTruthy();
  });

  it('shows default displacement value', () => {
    renderWithForm();
    expect(screen.getByDisplayValue('600')).toBeTruthy();
  });

  it('renders displacement input with number-pad', () => {
    renderWithForm();
    expect(screen.getByPlaceholderText('e.g. 600').props.keyboardType).toBe('number-pad');
  });
});

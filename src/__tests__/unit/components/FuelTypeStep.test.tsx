import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FuelTypeStep from '../../../features/motorcycle-profile/components/FuelTypeStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

function renderWithForm() {
  let form: UseFormReturn<MotorcycleProfile>;
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    form = useForm<MotorcycleProfile>({
      resolver: zodResolver(motorcycleProfileSchema),
      defaultValues: questionnaireDefaultValues,
      mode: 'onChange',
    });
    return <FormProvider {...form}>{children}</FormProvider>;
  };
  render(
    <Wrapper>
      <FuelTypeStep />
    </Wrapper>
  );
  return {
    getValues: () => form.getValues(),
  };
}

describe('FuelTypeStep', () => {
  it('renders both fuel type options', () => {
    renderWithForm();
    expect(screen.getByText('Carbureted')).toBeTruthy();
    expect(screen.getByText('Fuel Injected')).toBeTruthy();
  });

  it('shows default fuel type as selected', () => {
    renderWithForm();
    expect(screen.getAllByText('Selected')).toHaveLength(1);
  });

  it('updates the form value when an option is pressed', () => {
    const { getValues } = renderWithForm();
    fireEvent.press(screen.getByText('Fuel Injected'));
    expect(getValues().fuelType).toBe('fuel-injected');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import VehicleTypeStep from '../../../features/motorcycle-profile/components/VehicleTypeStep';
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
      <VehicleTypeStep />
    </Wrapper>
  );
  return {
    getValues: () => form.getValues(),
  };
}

describe('VehicleTypeStep', () => {
  it('renders all three vehicle type cards', () => {
    renderWithForm();
    expect(screen.getByText('Automatic Scooter')).toBeTruthy();
    expect(screen.getByText('Underbone')).toBeTruthy();
    expect(screen.getByText('Sport / Naked / Big Bike')).toBeTruthy();
  });

  it('shows default vehicle type as selected', () => {
    renderWithForm();
    expect(screen.getAllByText('Selected')).toHaveLength(1);
  });

  it('updates the form value when a type is pressed', () => {
    const { getValues } = renderWithForm();
    fireEvent.press(screen.getByText('Underbone'));
    expect(getValues().vehicleType).toBe('underbone');
  });

  it('moves the selected indicator when switching types', () => {
    renderWithForm();
    fireEvent.press(screen.getByText('Sport / Naked / Big Bike'));
    expect(screen.getAllByText('Selected')).toHaveLength(1);
  });
});

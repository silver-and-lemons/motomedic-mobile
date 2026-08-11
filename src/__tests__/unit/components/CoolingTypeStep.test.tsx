import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CoolingTypeStep from '../../../features/motorcycle-profile/components/CoolingTypeStep';
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
      <CoolingTypeStep />
    </Wrapper>
  );
  return {
    getValues: () => form.getValues(),
  };
}

describe('CoolingTypeStep', () => {
  it('renders both cooling type options', () => {
    renderWithForm();
    expect(screen.getByText('Air Cooled')).toBeTruthy();
    expect(screen.getByText('Liquid Cooled')).toBeTruthy();
  });

  it('shows default cooling type as selected', () => {
    renderWithForm();
    expect(screen.getAllByText('Selected')).toHaveLength(1);
  });

  it('updates the form value when an option is pressed', () => {
    const { getValues } = renderWithForm();
    fireEvent.press(screen.getByText('Liquid Cooled'));
    expect(getValues().coolingType).toBe('liquid-cooled');
  });
});

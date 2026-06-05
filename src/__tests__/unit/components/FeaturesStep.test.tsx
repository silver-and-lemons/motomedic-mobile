import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FeaturesStep from '../../../features/motorcycle-profile/components/FeaturesStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

function renderWithForm(defaults?: Partial<MotorcycleProfile>) {
  let formRef: ReturnType<typeof useForm<MotorcycleProfile>> | null = null;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<MotorcycleProfile>({
      resolver: zodResolver(motorcycleProfileSchema),
      defaultValues: { ...questionnaireDefaultValues, ...defaults },
      mode: 'onChange',
    });
    formRef = form;
    return <FormProvider {...form}>{children}</FormProvider>;
  };

  const view = render(<FeaturesStep />, { wrapper: Wrapper });
  return { ...view, getForm: () => formRef! };
}

describe('FeaturesStep', () => {
  it('renders title and description', () => {
    renderWithForm();
    expect(screen.getByText('Custom Features')).toBeTruthy();
    expect(screen.getByText('Select any customizations your motorcycle has')).toBeTruthy();
  });

  it('renders all 9 feature checkboxes', () => {
    renderWithForm();
    expect(screen.getByText('Aftermarket Exhaust')).toBeTruthy();
    expect(screen.getByText('Power Commander / ECU Tune')).toBeTruthy();
    expect(screen.getByText('Aftermarket Suspension')).toBeTruthy();
    expect(screen.getByText('LED Lighting')).toBeTruthy();
    expect(screen.getByText('Custom Seat')).toBeTruthy();
    expect(screen.getByText('Luggage System')).toBeTruthy();
    expect(screen.getByText('Windshield Upgrade')).toBeTruthy();
    expect(screen.getByText('Crash Guards / Frame Sliders')).toBeTruthy();
    expect(screen.getByText('Aftermarket Brakes')).toBeTruthy();
  });

  it('starts with no features selected by default', () => {
    const { getForm } = renderWithForm({ customFeatures: [] });
    const { customFeatures } = getForm().getValues();
    expect(customFeatures).toEqual([]);
  });

  it('toggles a feature on and off via press', () => {
    const { getForm } = renderWithForm({ customFeatures: [] });

    const checkbox = screen.getByText('LED Lighting');
    fireEvent.press(checkbox);

    let features = getForm().getValues('customFeatures');
    expect(features).toContain('led-lighting');

    fireEvent.press(checkbox);
    features = getForm().getValues('customFeatures');
    expect(features).not.toContain('led-lighting');
  });

  it('can have multiple features selected simultaneously', () => {
    const { getForm } = renderWithForm({ customFeatures: [] });

    fireEvent.press(screen.getByText('LED Lighting'));
    fireEvent.press(screen.getByText('Aftermarket Exhaust'));

    const features = getForm().getValues('customFeatures');
    expect(features).toContain('led-lighting');
    expect(features).toContain('aftermarket-exhaust');
    expect(features.length).toBe(2);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import BikeAgeStep from '../../../features/motorcycle-profile/components/BikeAgeStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

const CURRENT_YEAR = new Date().getFullYear();

function renderWithForm(defaults?: Partial<MotorcycleProfile>) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<MotorcycleProfile>({
      resolver: zodResolver(motorcycleProfileSchema),
      defaultValues: { ...questionnaireDefaultValues, ...defaults },
      mode: 'onChange',
    });
    return <FormProvider {...form}>{children}</FormProvider>;
  };
  return render(
    <Wrapper>
      <BikeAgeStep />
    </Wrapper>
  );
}

describe('BikeAgeStep', () => {
  it('renders a year input with the current year as placeholder', () => {
    renderWithForm();
    const input = screen.getByPlaceholderText(`e.g. ${CURRENT_YEAR}`);
    expect(input).toBeTruthy();
    expect(input.props.keyboardType).toBe('number-pad');
  });

  it('shows the current model category for the default year', () => {
    renderWithForm();
    expect(screen.getByText(`Current model (${CURRENT_YEAR - 3}+)`)).toBeTruthy();
  });

  it('shows the classic category for an old year', () => {
    renderWithForm();
    fireEvent.changeText(
      screen.getByPlaceholderText(`e.g. ${CURRENT_YEAR}`),
      '2000'
    );
    expect(
      screen.getByText(`Classic / Older (${CURRENT_YEAR - 13} and older)`)
    ).toBeTruthy();
  });

  it('prompts for a valid year when the value is out of range', () => {
    renderWithForm();
    fireEvent.changeText(
      screen.getByPlaceholderText(`e.g. ${CURRENT_YEAR}`),
      '1200'
    );
    expect(
      screen.getByText(`Enter a valid year (1900 - ${CURRENT_YEAR})`)
    ).toBeTruthy();
  });

  it('strips non-numeric characters from input', () => {
    renderWithForm();
    fireEvent.changeText(
      screen.getByPlaceholderText(`e.g. ${CURRENT_YEAR}`),
      '20a5!'
    );
    expect(screen.getByDisplayValue('205')).toBeTruthy();
  });
});

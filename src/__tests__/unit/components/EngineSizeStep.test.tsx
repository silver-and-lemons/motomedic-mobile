import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import EngineSizeStep from '../../../features/motorcycle-profile/components/EngineSizeStep';
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
  return render(
    <Wrapper>
      <EngineSizeStep />
    </Wrapper>
  );
}

describe('EngineSizeStep', () => {
  it('renders the default engine size with cc suffix', () => {
    renderWithForm();
    expect(screen.getByText('110')).toBeTruthy();
    expect(screen.getByText('cc')).toBeTruthy();
  });

  it('shows the lightweight category for the default size', () => {
    renderWithForm();
    expect(screen.getByText('100-125 cc')).toBeTruthy();
    expect(screen.getByText('Standard')).toBeTruthy();
  });

  it('shows superbike category for a large engine size', () => {
    renderWithForm({ engineSizeCc: 1200 });
    expect(screen.getByText('1000+ cc')).toBeTruthy();
    expect(screen.getByText('Superbike')).toBeTruthy();
  });

  it('shows mid-range category for a mid engine size', () => {
    renderWithForm({ engineSizeCc: 200 });
    expect(screen.getByText('125-250 cc')).toBeTruthy();
    expect(screen.getByText('Mid-range')).toBeTruthy();
  });
});

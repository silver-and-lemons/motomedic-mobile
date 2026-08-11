import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormProvider, useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PoliciesAgreementStep from '../../../features/motorcycle-profile/components/PoliciesAgreementStep';
import {
  motorcycleProfileSchema,
  questionnaireDefaultValues,
} from '../../../features/motorcycle-profile/types/motorcycle-profile';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

const POLICY_SECTION_TITLES = [
  'Scope of Services',
  'User Accounts',
  'User Conduct',
  'Intellectual Property',
  'Limitation of Liability',
  'Privacy Policy',
];

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
      <PoliciesAgreementStep />
    </Wrapper>
  );
  return {
    getValues: () => form.getValues(),
  };
}

describe('PoliciesAgreementStep', () => {
  it('renders all six policy sections', () => {
    renderWithForm();
    for (const title of POLICY_SECTION_TITLES) {
      expect(screen.getByText(title)).toBeTruthy();
    }
  });

  it('does not agree when only some sections are checked', () => {
    const { getValues } = renderWithForm();
    fireEvent.press(screen.getByText('Privacy Policy'));
    expect(getValues().agreedToPolicies).toBe(false);
  });

  it('agrees when all sections are checked', () => {
    const { getValues } = renderWithForm();
    for (const title of POLICY_SECTION_TITLES) {
      fireEvent.press(screen.getByText(title));
    }
    expect(getValues().agreedToPolicies).toBe(true);
  });

  it('un-agrees when a previously checked section is unchecked', () => {
    const { getValues } = renderWithForm();
    for (const title of POLICY_SECTION_TITLES) {
      fireEvent.press(screen.getByText(title));
    }
    fireEvent.press(screen.getByText('Privacy Policy'));
    expect(getValues().agreedToPolicies).toBe(false);
  });
});

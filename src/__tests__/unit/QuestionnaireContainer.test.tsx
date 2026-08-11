import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import QuestionnaireContainer from '../../features/motorcycle-profile/containers/QuestionnaireContainer';
import type { MotorcycleProfile } from '../../features/motorcycle-profile/types/motorcycle-profile';

const mockSaveProfile = jest.fn();
const mockMutate = jest.fn();

type MotorcycleStoreState = {
  profile: MotorcycleProfile | null;
  isComplete: boolean;
  saveProfile: typeof mockSaveProfile;
  clearProfile: () => void;
};

jest.mock('../../store/motorcycle-profile.store', () => ({
  useMotorcycleProfileStore: (
    selector: (state: MotorcycleStoreState) => unknown
  ) =>
    selector({
      profile: null,
      isComplete: false,
      saveProfile: mockSaveProfile,
      clearProfile: jest.fn(),
    }),
}));

jest.mock('../../features/motorcycle-profile/hooks/use-checklist', () => ({
  useGenerateChecklist: () => ({
    isPending: false,
    mutate: mockMutate,
  }),
}));

const POLICY_SECTION_TITLES = [
  'Scope of Services',
  'User Accounts',
  'User Conduct',
  'Intellectual Property',
  'Limitation of Liability',
  'Privacy Policy',
];

async function proceedThroughSteps(): Promise<void> {
  await waitFor(() => expect(screen.getByText('Step 1 of 6')).toBeTruthy());
  for (let step = 1; step <= 4; step++) {
    fireEvent.press(screen.getByText('PROCEED >'));
    await waitFor(() =>
      expect(screen.getByText(`Step ${step + 1} of 6`)).toBeTruthy()
    );
  }
}

async function reachPoliciesStep(): Promise<void> {
  await proceedThroughSteps();
  fireEvent.press(screen.getByText('PROCEED >'));
  await waitFor(() =>
    expect(screen.getByText('Please check the following before confirming:')).toBeTruthy()
  );
  fireEvent.press(screen.getByText('I Agree'));
  await waitFor(() => expect(screen.getByText('Step 6 of 6')).toBeTruthy());
}

async function agreeToAllPolicies(): Promise<void> {
  for (const title of POLICY_SECTION_TITLES) {
    fireEvent.press(screen.getByText(title));
  }
}

describe('QuestionnaireContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders step 1 of 6 initially', () => {
    render(<QuestionnaireContainer />);
    expect(screen.getByText('Step 1 of 6')).toBeTruthy();
    expect(screen.getByText('Automatic Scooter')).toBeTruthy();
    expect(screen.getByText('Underbone')).toBeTruthy();
    expect(screen.getByText('Sport / Naked / Big Bike')).toBeTruthy();
  });

  it('does not show back button on step 1', () => {
    render(<QuestionnaireContainer />);
    expect(screen.queryByText('< GO BACK')).toBeNull();
  });

  it('shows only a single PROCEED button on step 1', () => {
    render(<QuestionnaireContainer />);
    expect(screen.getByText('PROCEED >')).toBeTruthy();
    expect(screen.queryByText('< GO BACK')).toBeNull();
  });

  it('advances through all 6 steps', async () => {
    render(<QuestionnaireContainer />);
    await proceedThroughSteps();
    expect(screen.getByText('Step 5 of 6')).toBeTruthy();
  });

  it('shows the summary overlay after the bike age step', async () => {
    render(<QuestionnaireContainer />);
    await proceedThroughSteps();
    fireEvent.press(screen.getByText('PROCEED >'));
    await waitFor(() =>
      expect(screen.getByText('Please check the following before confirming:')).toBeTruthy()
    );
    expect(screen.getByText('I Agree')).toBeTruthy();
    expect(screen.getByText('Decline')).toBeTruthy();
  });

  it('does not confirm when policies are not agreed', async () => {
    render(<QuestionnaireContainer />);
    await reachPoliciesStep();
    fireEvent.press(screen.getByText('CONFIRM'));
    expect(mockSaveProfile).not.toHaveBeenCalled();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('confirms profile, saves, and navigates to pre-trip checklist', async () => {
    mockMutate.mockImplementation((_profile, options) => {
      options.onSuccess();
    });
    render(<QuestionnaireContainer />);
    await reachPoliciesStep();
    await agreeToAllPolicies();
    fireEvent.press(screen.getByText('CONFIRM'));

    await waitFor(() => expect(mockSaveProfile).toHaveBeenCalledTimes(1));
    expect(mockSaveProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        vehicleType: 'automatic-scooter',
        engineSizeCc: 110,
        fuelType: 'carbureted',
        coolingType: 'air-cooled',
        agreedToPolicies: true,
      })
    );
    await waitFor(() => expect(mockMutate).toHaveBeenCalledTimes(1));
    expect(router.replace).toHaveBeenCalledWith('/pre-trip-checklist');
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import QuestionnaireContainer from '../../features/motorcycle-profile/containers/QuestionnaireContainer';

const mockSaveProfile = jest.fn();
const mockRouterBack = jest.fn();

jest.mock('../../store/motorcycle-profile.store', () => ({
  useMotorcycleProfileStore: (selector: any) =>
    selector({ saveProfile: mockSaveProfile, profile: null, isComplete: false, clearProfile: jest.fn() }),
}));

jest.mock('expo-router', () => ({
  router: { back: (...args: any[]) => mockRouterBack(...args) },
}));

function fillStep1() {
  const makeInput = screen.getByPlaceholderText('e.g. Honda, Yamaha, Kawasaki');
  const modelInput = screen.getByPlaceholderText('e.g. CBR600RR, Ninja 400');
  const yearInput = screen.getByPlaceholderText('e.g. 2020');
  fireEvent.changeText(makeInput, 'Honda');
  fireEvent.changeText(modelInput, 'CBR600RR');
  fireEvent.changeText(yearInput, '2020');
}

function fillStep2() {
  const dispInput = screen.getByPlaceholderText('e.g. 600');
  fireEvent.changeText(dispInput, '600');
}

describe('QuestionnaireContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders step 1 of 4 initially', () => {
    render(<QuestionnaireContainer />);
    expect(screen.getByText('Step 1 of 4')).toBeTruthy();
    expect(screen.getByText('25%')).toBeTruthy();
    expect(screen.getByText('Basic Info')).toBeTruthy();
  });

  it('does not show back button on step 1', () => {
    render(<QuestionnaireContainer />);
    expect(screen.queryByText('Back')).toBeNull();
  });

  it('shows "Next" button on step 1', () => {
    render(<QuestionnaireContainer />);
    expect(screen.getByText('Next')).toBeTruthy();
  });

  it('renders Make, Model, Year inputs on step 1', () => {
    render(<QuestionnaireContainer />);
    expect(screen.getByText('Make')).toBeTruthy();
    expect(screen.getByText('Model')).toBeTruthy();
    expect(screen.getByText('Year')).toBeTruthy();
  });

  it('stays on step 1 when Next pressed with empty fields', () => {
    render(<QuestionnaireContainer />);
    fireEvent.press(screen.getByText('Next'));
    expect(screen.getByText('Step 1 of 4')).toBeTruthy();
    expect(screen.getByText('Basic Info')).toBeTruthy();
  });

  it('advances to step 2 when Next pressed with valid step 1 data', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 4')).toBeTruthy();
      expect(screen.getByText('Engine')).toBeTruthy();
    });
  });

  it('shows Back button on step 2', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Back')).toBeTruthy();
    });
  });

  it('goes back to step 1 when Back pressed on step 2', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fireEvent.press(screen.getByText('Back'));

    await waitFor(() => {
      expect(screen.getByText('Basic Info')).toBeTruthy();
      expect(screen.queryByText('Back')).toBeNull();
    });
  });

  it('data persists when navigating back then forward', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fireEvent.press(screen.getByText('Back'));
    await waitFor(() => expect(screen.getByText('Basic Info')).toBeTruthy());

    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => {
      expect(screen.getByText('Engine')).toBeTruthy();
    });
  });

  it('progress bar shows 50% on step 2', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('50%')).toBeTruthy();
    });
  });

  it('shows "Review" button text on step 4', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fillStep2();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Custom Features')).toBeTruthy());

    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Rider Profile')).toBeTruthy());

    expect(screen.getByText('Review')).toBeTruthy();
  });

  it('shows ProfileSummary after completing all 4 steps', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fillStep2();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Custom Features')).toBeTruthy());

    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Rider Profile')).toBeTruthy());

    fireEvent.press(screen.getByText('Review'));

    await waitFor(() => {
      expect(screen.getByText('Motorcycle Details')).toBeTruthy();
      expect(screen.getByText('Confirm Profile')).toBeTruthy();
      expect(screen.getByText('Edit')).toBeTruthy();
    });
  });

  it('Confirm Profile saves to Zustand store and navigates back', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fillStep2();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Custom Features')).toBeTruthy());

    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Rider Profile')).toBeTruthy());

    fireEvent.press(screen.getByText('Review'));
    await waitFor(() => expect(screen.getByText('Confirm Profile')).toBeTruthy());

    fireEvent.press(screen.getByText('Confirm Profile'));

    expect(mockSaveProfile).toHaveBeenCalledTimes(1);
    expect(mockSaveProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        make: 'Honda',
        model: 'CBR600RR',
        year: 2020,
        displacementCc: 600,
      })
    );
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });

  it('Edit returns from summary back to step view', async () => {
    render(<QuestionnaireContainer />);
    fillStep1();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Engine')).toBeTruthy());

    fillStep2();
    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Custom Features')).toBeTruthy());

    fireEvent.press(screen.getByText('Next'));
    await waitFor(() => expect(screen.getByText('Rider Profile')).toBeTruthy());

    fireEvent.press(screen.getByText('Review'));
    await waitFor(() => expect(screen.getByText('Motorcycle Details')).toBeTruthy());

    fireEvent.press(screen.getByText('Edit'));

    await waitFor(() => {
      expect(screen.getByText('Step 4 of 4')).toBeTruthy();
      expect(screen.getByText('Rider Profile')).toBeTruthy();
    });
  });
});

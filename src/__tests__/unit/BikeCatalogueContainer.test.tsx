import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { router } from 'expo-router';
import BikeCatalogueContainer from '../../features/bike-catalogue/containers/BikeCatalogueContainer';

const mockSaveProfile = jest.fn();

type MotorcycleStoreState = {
  saveProfile: typeof mockSaveProfile;
};

jest.mock('../../store/motorcycle-profile.store', () => ({
  useMotorcycleProfileStore: (
    selector: (state: MotorcycleStoreState) => unknown
  ) => selector({ saveProfile: mockSaveProfile }),
}));

jest.mock('../../features/bike-catalogue/hooks/use-bike-catalogue', () => ({
  useBikeCatalogue: () => ({
    data: jest.requireActual('../../features/bike-catalogue/data/catalogue-bikes')
      .CATALOGUE_BIKES,
    isLoading: false,
    error: null,
  }),
}));

describe('BikeCatalogueContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders mocked bike cards', () => {
    render(<BikeCatalogueContainer />);

    expect(screen.getByText('Honda Rebel 500')).toBeTruthy();
    expect(screen.getByText('Kawasaki Ninja 500')).toBeTruthy();
  });

  it('filters by model search', async () => {
    render(<BikeCatalogueContainer />);

    fireEvent.changeText(screen.getByLabelText('Search bikes by model'), 'nmax');

    await waitFor(() => {
      expect(screen.getByText('Yamaha NMAX 155')).toBeTruthy();
      expect(screen.queryByText('Honda Rebel 500')).toBeNull();
    });
  });

  it('filters by brand', async () => {
    render(<BikeCatalogueContainer />);

    fireEvent.press(screen.getByText('Select Motor'));
    fireEvent.press(screen.getByText('Kawasaki'));

    await waitFor(() => {
      expect(screen.getByText('Kawasaki Ninja 500')).toBeTruthy();
      expect(screen.queryByText('Honda Rebel 500')).toBeNull();
    });
  });

  it('saves the selected bike and routes to the questionnaire', () => {
    render(<BikeCatalogueContainer />);

    fireEvent.press(screen.getByText('Honda ADV 160'));
    fireEvent.press(screen.getByText('PROCEED >'));

    expect(mockSaveProfile).toHaveBeenCalledWith(
      expect.objectContaining({
        vehicleType: 'automatic-scooter',
        engineSizeCc: 157,
        fuelType: 'fuel-injected',
      })
    );
    expect(router.push).toHaveBeenCalledWith('/questionnaire');
  });

  it('routes fallback riders to the questionnaire', () => {
    render(<BikeCatalogueContainer />);

    fireEvent.press(screen.getByText('My bike is NOT in the list'));

    expect(router.push).toHaveBeenCalledWith('/questionnaire');
  });
});

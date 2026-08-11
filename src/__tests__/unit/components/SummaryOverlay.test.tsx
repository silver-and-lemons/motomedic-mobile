import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import SummaryOverlay from '../../../features/motorcycle-profile/components/SummaryOverlay';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

const validProfile: MotorcycleProfile = {
  vehicleType: 'sport-naked-big-bike',
  engineSizeCc: 600,
  fuelType: 'fuel-injected',
  coolingType: 'liquid-cooled',
  bikeAge: 2020,
  agreedToPolicies: true,
};

describe('SummaryOverlay', () => {
  it('renders all summary fields with formatted values', () => {
    render(
      <SummaryOverlay profile={validProfile} onAgree={() => {}} onDecline={() => {}} />
    );
    expect(screen.getByText('Vehicle Type')).toBeTruthy();
    expect(screen.getByText('Sport / Naked / Big Bike')).toBeTruthy();
    expect(screen.getByText('Engine Size')).toBeTruthy();
    expect(screen.getByText('600 cc')).toBeTruthy();
    expect(screen.getByText('Fuel System')).toBeTruthy();
    expect(screen.getByText('Fuel Injected')).toBeTruthy();
    expect(screen.getByText('Cooling System')).toBeTruthy();
    expect(screen.getByText('Liquid Cooled')).toBeTruthy();
    expect(screen.getByText('Bike Age')).toBeTruthy();
    expect(screen.getByText('2020')).toBeTruthy();
  });

  it('calls onAgree when I Agree is pressed', () => {
    const onAgree = jest.fn();
    render(
      <SummaryOverlay profile={validProfile} onAgree={onAgree} onDecline={() => {}} />
    );
    fireEvent.press(screen.getByText('I Agree'));
    expect(onAgree).toHaveBeenCalledTimes(1);
  });

  it('calls onDecline when Decline is pressed', () => {
    const onDecline = jest.fn();
    render(
      <SummaryOverlay profile={validProfile} onAgree={() => {}} onDecline={onDecline} />
    );
    fireEvent.press(screen.getByText('Decline'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});

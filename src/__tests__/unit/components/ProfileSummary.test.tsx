import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileSummary from '../../../features/motorcycle-profile/components/ProfileSummary';
import type { MotorcycleProfile } from '../../../features/motorcycle-profile/types/motorcycle-profile';

const mockProfile: MotorcycleProfile = {
  make: 'Yamaha',
  model: 'MT-07',
  year: 2022,
  engineType: 'parallel-twin',
  displacementCc: 689,
  customFeatures: ['aftermarket-exhaust', 'crash-guards'],
  primaryUse: 'commuting',
  experienceLevel: 'intermediate',
};

const mockProfileNoFeatures: MotorcycleProfile = {
  ...mockProfile,
  customFeatures: [],
};

describe('ProfileSummary', () => {
  it('renders all detail rows', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('Make')).toBeTruthy();
    expect(screen.getByText('Yamaha')).toBeTruthy();
    expect(screen.getByText('Model')).toBeTruthy();
    expect(screen.getByText('MT-07')).toBeTruthy();
    expect(screen.getByText('Year')).toBeTruthy();
    expect(screen.getByText('2022')).toBeTruthy();
  });

  it('renders engine type formatted', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('Parallel Twin')).toBeTruthy();
  });

  it('renders displacement with cc suffix', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('689cc')).toBeTruthy();
  });

  it('renders primary use capitalized', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('Commuting')).toBeTruthy();
  });

  it('renders experience level capitalized', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('Intermediate')).toBeTruthy();
  });

  it('renders custom features list', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText(/Aftermarket Exhaust/)).toBeTruthy();
    expect(screen.getByText(/Crash Guards \/ Frame Sliders/)).toBeTruthy();
  });

  it('renders Custom Features section header', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.getByText('Custom Features')).toBeTruthy();
  });

  it('hides feature section when no custom features', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfileNoFeatures} onConfirm={onConfirm} onEdit={onEdit} />);

    expect(screen.queryByText('Custom Features')).toBeNull();
  });

  it('calls onEdit when Edit button pressed', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    fireEvent.press(screen.getByText('Edit'));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('calls onConfirm when Confirm Profile button pressed', () => {
    const onConfirm = jest.fn();
    const onEdit = jest.fn();
    render(<ProfileSummary profile={mockProfile} onConfirm={onConfirm} onEdit={onEdit} />);

    fireEvent.press(screen.getByText('Confirm Profile'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onEdit).not.toHaveBeenCalled();
  });
});

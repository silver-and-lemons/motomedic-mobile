import React from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ChecklistItemRow from '../../../features/pre-trip-checklist/components/molecules/ChecklistItemRow';
import type { PreTripChecklistItem } from '../../../features/pre-trip-checklist/types/pre-trip-checklist';

const checklistItem: PreTripChecklistItem = {
  id: 'engine-oil-level',
  title: 'Engine oil level',
  description: 'Check the sight glass or dipstick before riding.',
  guideSteps: [
    'Park the motorcycle on level ground.',
    'Inspect the sight glass or dipstick.',
  ],
  whyThisMatters: 'Low oil can overheat the engine and increase wear.',
  priority: 'required',
  state: 'attention',
  completed: true,
};

describe('ChecklistItemRow', () => {
  it('keeps guide details hidden while collapsed', () => {
    render(
      <ChecklistItemRow
        item={checklistItem}
        checked={false}
        mode="checklist"
        isGuideExpanded={false}
        onToggle={jest.fn()}
        onToggleGuide={jest.fn()}
      />,
    );

    expect(screen.getByText('Engine oil level')).toBeTruthy();
    expect(screen.queryByText('How to check')).toBeNull();
    expect(screen.queryByText('Why this matters')).toBeNull();
  });

  it('asks the parent to toggle guide expansion', () => {
    const onToggle = jest.fn();
    const onToggleGuide = jest.fn();

    render(
      <ChecklistItemRow
        item={checklistItem}
        checked={false}
        mode="checklist"
        isGuideExpanded={false}
        onToggle={onToggle}
        onToggleGuide={onToggleGuide}
      />,
    );

    fireEvent.press(screen.getByLabelText('Toggle guide for Engine oil level'));

    expect(onToggleGuide).toHaveBeenCalledWith('engine-oil-level');
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('renders guide steps and why text while expanded', () => {
    render(
      <ChecklistItemRow
        item={checklistItem}
        checked={false}
        mode="checklist"
        isGuideExpanded
        onToggle={jest.fn()}
        onToggleGuide={jest.fn()}
      />,
    );

    expect(screen.getByText('How to check')).toBeTruthy();
    expect(screen.getByText('- Park the motorcycle on level ground.')).toBeTruthy();
    expect(screen.getByText('- Inspect the sight glass or dipstick.')).toBeTruthy();
    expect(screen.getByText('Why this matters')).toBeTruthy();
    expect(screen.getByText('Low oil can overheat the engine and increase wear.')).toBeTruthy();
  });

  it('falls back to the item description when guide steps are not available', () => {
    const itemWithoutSteps = {
      ...checklistItem,
      guideSteps: undefined,
      whyThisMatters: undefined,
    };

    render(
      <ChecklistItemRow
        item={itemWithoutSteps}
        checked={false}
        mode="status"
        isGuideExpanded
        onToggle={jest.fn()}
        onToggleGuide={jest.fn()}
      />,
    );

    expect(
      screen.getAllByText('Check the sight glass or dipstick before riding.')
    ).toHaveLength(2);
    expect(screen.queryByText('Why this matters')).toBeNull();
  });
});

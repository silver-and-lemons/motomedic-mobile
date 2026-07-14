import React from 'react';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ChecklistItemRow from '../../../features/pre-trip-checklist/components/molecules/ChecklistItemRow';
import type { PreTripChecklistItem } from '../../../features/pre-trip-checklist/types/pre-trip-checklist';

const checklistItem: PreTripChecklistItem = {
  id: 'engine-oil-level',
  title: 'Engine oil level',
  description: 'Check the sight glass or dipstick before riding.',
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

  it('renders the item description as guide text while expanded', () => {
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
    expect(
      screen.getAllByText('Check the sight glass or dipstick before riding.')
    ).toHaveLength(2);
  });
});

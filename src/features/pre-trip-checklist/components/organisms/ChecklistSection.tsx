import { View } from 'react-native';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistItemRow from '../molecules/ChecklistItemRow';
import ChecklistSectionHeader from '../molecules/ChecklistSectionHeader';
import { useState } from 'react';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection as PreTripChecklistSectionType,
} from '../../types/pre-trip-checklist';
import type { OnboardingTargetLayout } from '../../types/checklist-onboarding';

type ChecklistSectionProps = {
  section: PreTripChecklistSectionType;
  checkedItemIds: Set<string>;
  mode: PreTripChecklistMode;
  expandedGuideItemId: string | null;
  onToggleItem: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
  onFirstItemLayout?: (layout: OnboardingTargetLayout) => void;
  onSectionHeaderLayout?: (layout: OnboardingTargetLayout) => void;
  onRowLayout?: (itemId: string, layout: OnboardingTargetLayout) => void;
  onItemCheckboxLayout?: (itemId: string, layout: OnboardingTargetLayout) => void;
};

export default function ChecklistSection({
  section,
  checkedItemIds,
  mode,
  expandedGuideItemId,
  onToggleItem,
  onToggleGuide,
  onFirstItemLayout,
  onSectionHeaderLayout,
  onRowLayout,
  onItemCheckboxLayout,
}: ChecklistSectionProps) {
  const [expanded, setExpanded] = useState(mode === 'status' || section.id === 'bike-health');
  const variant = section.id === 'additional' ? 'line' : 'status';

  function measureFirstItem(ref: View | null) {
    if (!ref || !onFirstItemLayout) return;
    setTimeout(() => {
      ref.measure((_x, _y, _w, h, _pageX, pageY) => {
        if (typeof pageY === 'number' && typeof h === 'number') {
          onFirstItemLayout({ y: pageY, height: h });
        }
      });
    }, 300);
  }

  function measureSectionHeader(ref: View | null) {
    if (!ref || !onSectionHeaderLayout) return;
    setTimeout(() => {
      ref.measure((_x, _y, _w, h, _pageX, pageY) => {
        if (typeof pageY === 'number' && typeof h === 'number') {
          onSectionHeaderLayout({ y: pageY, height: h });
        }
      });
    }, 300);
  }

  function measureRow(itemId: string) {
    return (ref: View | null) => {
      if (!ref || !onRowLayout) return;
      setTimeout(() => {
        ref.measure((_x, _y, _w, h, _pageX, pageY) => {
          if (typeof pageY === 'number' && typeof h === 'number') {
            onRowLayout(itemId, { y: pageY, height: h });
          }
        });
      }, 300);
    };
  }

  function measureItemCheckbox(itemId: string) {
    return (ref: View | null) => {
      if (!ref || !onItemCheckboxLayout) return;
      setTimeout(() => {
        ref.measure((_x, _y, _w, h, _pageX, pageY) => {
          if (typeof pageY === 'number' && typeof h === 'number') {
            onItemCheckboxLayout(itemId, { y: pageY, height: h });
          }
        });
      }, 300);
    };
  }

  return (
    <ChecklistSurface className="gap-3 border-0 bg-transparent p-0">
      <View ref={onSectionHeaderLayout ? measureSectionHeader : undefined} collapsable={false}>
        <ChecklistSectionHeader
          section={section}
          expanded={expanded}
          onToggle={() => setExpanded((currentExpanded) => !currentExpanded)}
        />
      </View>
      {expanded && (
        <ChecklistSurface className="overflow-hidden rounded-lg border border-[#314148] bg-[#101b1f] p-0">
          {section.items.map((item, index) => (
            <View
              key={item.id}
              ref={index === 0 ? measureFirstItem : undefined}
              collapsable={false}
            >
              <ChecklistItemRow
                item={item}
                checked={checkedItemIds.has(item.id)}
                mode={mode}
                variant={variant}
                isGuideExpanded={expandedGuideItemId === item.id}
                onToggle={onToggleItem}
                onToggleGuide={onToggleGuide}
                onRowLayout={onRowLayout ? measureRow(item.id) : undefined}
                onCheckboxLayout={onItemCheckboxLayout ? measureItemCheckbox(item.id) : undefined}
              />
            </View>
          ))}
        </ChecklistSurface>
      )}
    </ChecklistSurface>
  );
}

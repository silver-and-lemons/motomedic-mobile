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
};

export default function ChecklistSection({
  section,
  checkedItemIds,
  mode,
  expandedGuideItemId,
  onToggleItem,
  onToggleGuide,
  onFirstItemLayout,
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

  return (
    <ChecklistSurface className="gap-3 border-0 bg-transparent p-0">
      <ChecklistSectionHeader
        section={section}
        expanded={expanded}
        onToggle={() => setExpanded((currentExpanded) => !currentExpanded)}
      />
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
              />
            </View>
          ))}
        </ChecklistSurface>
      )}
    </ChecklistSurface>
  );
}

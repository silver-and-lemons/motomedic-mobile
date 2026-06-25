import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistItemRow from '../molecules/ChecklistItemRow';
import ChecklistSectionHeader from '../molecules/ChecklistSectionHeader';
import { useState } from 'react';
import type {
  PreTripChecklistMode,
  PreTripChecklistSection as PreTripChecklistSectionType,
} from '../../types/pre-trip-checklist';

type ChecklistSectionProps = {
  section: PreTripChecklistSectionType;
  checkedItemIds: Set<string>;
  mode: PreTripChecklistMode;
  expandedGuideItemId: string | null;
  onToggleItem: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
};

export default function ChecklistSection({
  section,
  checkedItemIds,
  mode,
  expandedGuideItemId,
  onToggleItem,
  onToggleGuide,
}: ChecklistSectionProps) {
  const [expanded, setExpanded] = useState(mode === 'status' || section.id === 'bike-health');
  const variant = section.id === 'additional' ? 'line' : 'status';

  return (
    <ChecklistSurface className="gap-3 border-0 bg-transparent p-0">
      <ChecklistSectionHeader
        section={section}
        expanded={expanded}
        onToggle={() => setExpanded((currentExpanded) => !currentExpanded)}
      />
      {expanded && (
        <ChecklistSurface className="overflow-hidden rounded-lg border border-[#314148] bg-[#101b1f] p-0">
          {section.items.map((item) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              checked={checkedItemIds.has(item.id)}
              mode={mode}
              variant={variant}
              isGuideExpanded={expandedGuideItemId === item.id}
              onToggle={onToggleItem}
              onToggleGuide={onToggleGuide}
            />
          ))}
        </ChecklistSurface>
      )}
    </ChecklistSurface>
  );
}

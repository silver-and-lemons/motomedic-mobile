import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistItemRow from '../molecules/ChecklistItemRow';
import ChecklistSectionHeader from '../molecules/ChecklistSectionHeader';
import type { PreTripChecklistSection as PreTripChecklistSectionType } from '../../types/pre-trip-checklist';

type ChecklistSectionProps = {
  section: PreTripChecklistSectionType;
  checkedItemIds: Set<string>;
  diagnosticConfirmed: boolean;
  onToggleItem: (itemId: string) => void;
};

export default function ChecklistSection({
  section,
  checkedItemIds,
  diagnosticConfirmed,
  onToggleItem,
}: ChecklistSectionProps) {
  const variant = section.id === 'additional' ? 'line' : 'status';

  return (
    <ChecklistSurface className="gap-3 border-0 bg-transparent p-0">
      <ChecklistSectionHeader section={section} />
      <ChecklistSurface className="overflow-hidden rounded-lg border border-[#314148] bg-[#101b1f] p-0">
        {section.items.map((item) => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            checked={checkedItemIds.has(item.id)}
            diagnosticConfirmed={diagnosticConfirmed}
            variant={variant}
            onToggle={onToggleItem}
          />
        ))}
      </ChecklistSurface>
    </ChecklistSurface>
  );
}

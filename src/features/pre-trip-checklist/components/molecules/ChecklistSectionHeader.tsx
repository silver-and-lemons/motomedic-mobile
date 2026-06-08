import ChecklistIconBadge from '../atoms/ChecklistIconBadge';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistText from '../atoms/ChecklistText';
import type { PreTripChecklistSection } from '../../types/pre-trip-checklist';

type ChecklistSectionHeaderProps = {
  section: PreTripChecklistSection;
};

export default function ChecklistSectionHeader({
  section,
}: ChecklistSectionHeaderProps) {
  return (
    <ChecklistSurface className="flex-row items-center gap-3 border-0 bg-transparent p-0">
      <ChecklistIconBadge icon={section.icon} tone="slate" size="small" />
      <ChecklistSurface className="flex-1 border-0 bg-transparent p-0">
        <ChecklistText className="text-sm font-bold">
          {section.title}
        </ChecklistText>
      </ChecklistSurface>
      <ChecklistText tone="success" className="text-xs">
        Status: Optimal
      </ChecklistText>
    </ChecklistSurface>
  );
}

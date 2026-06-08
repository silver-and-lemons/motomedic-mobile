import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistCompletionBox from '../atoms/ChecklistCompletionBox';
import ChecklistStatusMark from '../atoms/ChecklistStatusMark';
import ChecklistText from '../atoms/ChecklistText';
import type { PreTripChecklistItem } from '../../types/pre-trip-checklist';

type ChecklistItemRowProps = {
  item: PreTripChecklistItem;
  checked: boolean;
  diagnosticConfirmed: boolean;
  variant?: 'status' | 'line';
  onToggle: (itemId: string) => void;
};

export default function ChecklistItemRow({
  item,
  checked,
  diagnosticConfirmed,
  variant = 'status',
  onToggle,
}: ChecklistItemRowProps) {
  return (
    <ChecklistSurface
      interactive={!diagnosticConfirmed}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={diagnosticConfirmed ? undefined : () => onToggle(item.id)}
      className="min-h-[78px] flex-row items-center gap-4 rounded-none border-0 border-b border-[#2a3a42] bg-transparent px-5 py-4"
    >
      {diagnosticConfirmed && (
        <ChecklistSurface className="w-8 items-center border-0 bg-transparent p-0">
          <ChecklistStatusMark
            checked={checked}
            state={item.state}
            icon={item.icon}
            variant={variant}
          />
        </ChecklistSurface>
      )}
      <ChecklistSurface className="flex-1 border-0 bg-transparent p-0">
        <ChecklistText className="text-[15px] font-bold leading-5">
          {item.title}
        </ChecklistText>
        <ChecklistText tone="muted" className="mt-1 text-[10px] leading-3">
          {item.description}
        </ChecklistText>
      </ChecklistSurface>
      {!diagnosticConfirmed && <ChecklistCompletionBox checked={checked} />}
    </ChecklistSurface>
  );
}

import { Pressable, type GestureResponderEvent } from 'react-native';
import { ChevronDown, ChevronUp, Info } from 'lucide-react-native';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistCompletionBox from '../atoms/ChecklistCompletionBox';
import ChecklistStatusMark from '../atoms/ChecklistStatusMark';
import ChecklistText from '../atoms/ChecklistText';
import type {
  PreTripChecklistItem,
  PreTripChecklistMode,
} from '../../types/pre-trip-checklist';

type ChecklistItemRowProps = {
  item: PreTripChecklistItem;
  checked: boolean;
  mode: PreTripChecklistMode;
  variant?: 'status' | 'line';
  isGuideExpanded: boolean;
  onToggle: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
};

export default function ChecklistItemRow({
  item,
  checked,
  mode,
  variant = 'status',
  isGuideExpanded,
  onToggle,
  onToggleGuide,
}: ChecklistItemRowProps) {
  const isStatusMode = mode === 'status';
  const guideSteps = item.guideSteps?.length ? item.guideSteps : [item.description];
  const GuideIcon = isGuideExpanded ? ChevronUp : ChevronDown;

  function handleGuidePress(event?: GestureResponderEvent): void {
    event?.stopPropagation();
    onToggleGuide(item.id);
  }

  return (
    <ChecklistSurface
      interactive={!isStatusMode}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={isStatusMode ? undefined : () => onToggle(item.id)}
      className="min-h-[78px] gap-4 rounded-none border-0 border-b border-[#2a3a42] bg-transparent px-5 py-4"
    >
      <ChecklistSurface className="flex-row items-center gap-4 border-0 bg-transparent p-0">
        {isStatusMode && (
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
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ expanded: isGuideExpanded }}
          accessibilityLabel={`Toggle guide for ${item.title}`}
          className="h-9 w-9 items-center justify-center rounded-full bg-[#17262b] active:opacity-80"
          onPress={handleGuidePress}
        >
          <GuideIcon size={18} color="#94a3b8" />
        </Pressable>
        {!isStatusMode && <ChecklistCompletionBox checked={checked} />}
      </ChecklistSurface>

      {isGuideExpanded && (
        <ChecklistSurface className="gap-3 rounded-md border border-[#314148] bg-[#101b1f] p-4">
          <ChecklistSurface className="flex-row items-center gap-2 border-0 bg-transparent p-0">
            <Info size={16} color="#21f4b7" />
            <ChecklistText className="text-xs font-black uppercase text-[#21f4b7]">
              How to check
            </ChecklistText>
          </ChecklistSurface>
          <ChecklistSurface className="gap-2 border-0 bg-transparent p-0">
            {guideSteps.map((step) => (
              <ChecklistText key={step} tone="secondary" className="text-xs leading-5">
                {guideSteps.length > 1 ? `- ${step}` : step}
              </ChecklistText>
            ))}
          </ChecklistSurface>
          {item.whyThisMatters && (
            <ChecklistSurface className="gap-1 border-0 bg-transparent p-0">
              <ChecklistText className="text-xs font-black uppercase text-[#21f4b7]">
                Why this matters
              </ChecklistText>
              <ChecklistText tone="muted" className="text-xs leading-5">
                {item.whyThisMatters}
              </ChecklistText>
            </ChecklistSurface>
          )}
        </ChecklistSurface>
      )}
    </ChecklistSurface>
  );
}

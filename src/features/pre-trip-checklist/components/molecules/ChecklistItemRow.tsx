import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { ChevronDown, ChevronUp, Info } from 'lucide-react-native';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistCompletionBox from '../atoms/ChecklistCompletionBox';
import ChecklistStatusMark from '../atoms/ChecklistStatusMark';
import ChecklistText from '../atoms/ChecklistText';
import type {
  PreTripChecklistItem,
  PreTripChecklistMode,
} from '../../types/pre-trip-checklist';
import { useChecklistOnboardingStore } from '../../../../store/checklist-onboarding.store';

type ChecklistItemRowProps = {
  item: PreTripChecklistItem;
  checked: boolean;
  mode: PreTripChecklistMode;
  variant?: 'status' | 'line';
  isGuideExpanded: boolean;
  onToggle: (itemId: string) => void;
  onToggleGuide: (itemId: string) => void;
  onRowLayout?: (ref: View | null) => void;
  onCheckboxLayout?: (ref: View | null) => void;
};

export default function ChecklistItemRow({
  item,
  checked,
  mode,
  variant = 'status',
  isGuideExpanded,
  onToggle,
  onToggleGuide,
  onRowLayout,
  onCheckboxLayout,
}: ChecklistItemRowProps) {
  const isStatusMode = mode === 'status';
  const GuideIcon = isGuideExpanded ? ChevronUp : ChevronDown;
  const onboardingStep = useChecklistOnboardingStore((state) => state.currentStep);

  const isStep4Good = onboardingStep === 4 && item.id === 'tyre-pressure-condition';
  const isStep5Bad = onboardingStep === 5 && item.id === 'tyre-pressure-condition';

  function handleGuidePress(event?: GestureResponderEvent): void {
    event?.stopPropagation();
    onToggleGuide(item.id);
  }

  return (
    <View ref={onRowLayout}>
      <ChecklistSurface
        interactive={!isStatusMode}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isStep4Good ? true : checked }}
        onPress={isStatusMode ? undefined : () => onToggle(item.id)}
        className="min-h-[78px] gap-4 rounded-none border-0 border-b border-[#2a3a42] bg-transparent px-5 py-4"
      >
        <ChecklistSurface className="flex-row items-center gap-4 border-0 bg-transparent p-0">
          {isStatusMode && (
            <ChecklistSurface className="w-8 items-center border-0 bg-transparent p-0">
              <ChecklistStatusMark
                checked={isStep4Good ? true : checked}
                state={isStep5Bad ? 'attention' : item.state}
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
          {!isStatusMode && isStep5Bad ? (
            <View ref={onCheckboxLayout} className="h-[19px] w-[19px] items-center justify-center overflow-visible">
              <ChecklistStatusMark checked={false} state="attention" />
            </View>
          ) : !isStatusMode ? (
            <View ref={onCheckboxLayout}>
              <ChecklistCompletionBox checked={isStep4Good ? true : checked} />
            </View>
          ) : null}
        </ChecklistSurface>

        {isGuideExpanded && (
          <ChecklistSurface className="gap-3 rounded-md border border-[#314148] bg-[#101b1f] p-4">
            <ChecklistSurface className="flex-row items-center gap-2 border-0 bg-transparent p-0">
              <Info size={16} color="#21f4b7" />
              <ChecklistText className="text-xs font-black uppercase text-[#21f4b7]">
                How to check
              </ChecklistText>
            </ChecklistSurface>
            <ChecklistText tone="secondary" className="text-xs leading-5">
              {item.description}
            </ChecklistText>
          </ChecklistSurface>
        )}
      </ChecklistSurface>
    </View>
  );
}

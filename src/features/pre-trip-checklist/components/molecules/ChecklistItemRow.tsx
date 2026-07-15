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
  const GuideIcon = isGuideExpanded ? ChevronUp : ChevronDown;
  const onboardingStep = useChecklistOnboardingStore((state) => state.currentStep);

  const isStep5Good = onboardingStep === 5 && item.id === 'tyre-pressure';
  const isStep6Bad = onboardingStep === 6 && item.id === 'tyre-pressure';

  function handleGuidePress(event?: GestureResponderEvent): void {
    event?.stopPropagation();
    onToggleGuide(item.id);
  }

  return (
    <ChecklistSurface
      interactive={!isStatusMode}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isStep5Good ? true : checked }}
      onPress={isStatusMode ? undefined : () => onToggle(item.id)}
      className="min-h-[78px] gap-4 rounded-none border-0 border-b border-[#2a3a42] bg-transparent px-5 py-4"
    >
      <ChecklistSurface className="flex-row items-center gap-4 border-0 bg-transparent p-0">
        {isStatusMode && (
          <ChecklistSurface className="w-8 items-center border-0 bg-transparent p-0">
            <ChecklistStatusMark
              checked={isStep5Good ? true : checked}
              state={isStep6Bad ? 'attention' : item.state}
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
        {!isStatusMode && isStep6Bad ? (
          <View className="h-[19px] w-[19px] items-center justify-center overflow-visible">
            <ChecklistStatusMark checked={false} state="attention" />
          </View>
        ) : !isStatusMode ? (
          <ChecklistCompletionBox checked={isStep5Good ? true : checked} />
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
  );
}

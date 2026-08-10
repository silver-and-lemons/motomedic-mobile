import { View } from 'react-native';
import ChecklistSurface from '../atoms/ChecklistSurface';
import ChecklistText from '../atoms/ChecklistText';
import type { PreTripChecklistSection } from '../../types/pre-trip-checklist';

type ChecklistSectionHeaderProps = {
  section: PreTripChecklistSection;
  expanded: boolean;
  onToggle: () => void;
};

export default function ChecklistSectionHeader({
  section,
  expanded,
  onToggle,
}: ChecklistSectionHeaderProps) {
  return (
    <ChecklistSurface
      interactive
      onPress={onToggle}
      className="flex-row items-center gap-3 border-0 bg-transparent p-0"
    >
      <ChecklistSurface className="h-10 w-10 items-center justify-center rounded-[4px] border border-[#44545b] bg-[#152126] p-0">
        {expanded ? (
          <View className="h-[3px] w-[15px] rounded-full bg-[#5b6a72]" />
        ) : (
          <View className="items-center justify-center">
            <View className="absolute h-[15px] w-[3px] rounded-full bg-[#5b6a72]" />
            <View className="h-[3px] w-[15px] rounded-full bg-[#5b6a72]" />
          </View>
        )}
      </ChecklistSurface>
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

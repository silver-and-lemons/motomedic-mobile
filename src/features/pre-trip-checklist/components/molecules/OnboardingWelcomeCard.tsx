import { View, Pressable } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import ChecklistText from '../atoms/ChecklistText';

type OnboardingWelcomeCardProps = {
  onProceed: () => void;
};

export default function OnboardingWelcomeCard({
  onProceed,
}: OnboardingWelcomeCardProps) {
  return (
    <Animated.View
      entering={SlideInDown.duration(400).springify()}
      style={{ width: '100%', paddingHorizontal: 20 }}
    >
      <View
        className="rounded-lg px-6 py-6"
        style={{
          backgroundColor: '#111111',
          borderWidth: 1,
          borderColor: '#21f4b7',
        }}
      >
      {/* Title */}
      <ChecklistText className="mb-4 text-xl font-black text-white">
        Let's Check Your Ride!
      </ChecklistText>

      {/* Welcome label — underlined */}
      <ChecklistText
        className="mb-2 text-sm font-bold text-white"
        style={{ textDecorationLine: 'underline' }}
      >
        Welcome!
      </ChecklistText>

      {/* Intro copy */}
      <ChecklistText className="mb-4 text-sm leading-5 text-[#b0b8bc]">
        This tool helps you diagnose your bike's condition and gives you a clear
        roadmap for keeping it running perfectly.
      </ChecklistText>

      {/* What you'll do header */}
      <ChecklistText className="mb-2 text-sm text-[#b0b8bc]">
        What you'll do:
      </ChecklistText>

      {/* Numbered list */}
      <View className="mb-5 gap-2 pl-2">
        <View className="flex-row">
          <ChecklistText className="text-sm font-bold text-white">
            {'1.  '}
          </ChecklistText>
          <ChecklistText className="flex-1 text-sm leading-5 text-[#b0b8bc]">
            <ChecklistText className="text-sm font-bold text-white">
              Inspect:
            </ChecklistText>
            {' '}Follow a simple, part-by-part visual guide of the checklist.
          </ChecklistText>
        </View>

        <View className="flex-row">
          <ChecklistText className="text-sm font-bold text-white">
            {'2.  '}
          </ChecklistText>
          <ChecklistText className="flex-1 text-sm leading-5 text-[#b0b8bc]">
            <ChecklistText className="text-sm font-bold text-white">
              Rate:
            </ChecklistText>
            {' '}Mark components as Good, Needs Attention, or Critical.
          </ChecklistText>
        </View>

        <View className="flex-row">
          <ChecklistText className="text-sm font-bold text-white">
            {'3.  '}
          </ChecklistText>
          <ChecklistText className="flex-1 text-sm leading-5 text-[#b0b8bc]">
            <ChecklistText className="text-sm font-bold text-white">
              Fix:
            </ChecklistText>
            {' '}Get a{' '}
            <ChecklistText className="text-sm font-bold text-white">
              tailored maintenance plan
            </ChecklistText>
            {' '}based entirely on your results.
          </ChecklistText>
        </View>
      </View>

      {/* Footer hint */}
      <ChecklistText className="mb-3 text-sm text-[#b0b8bc]">
        Tap Proceed to see how it works!
      </ChecklistText>

      {/* PROCEED link — bottom right */}
      <Pressable
        onPress={onProceed}
        className="self-end"
        hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
      >
        <ChecklistText className="text-base font-bold text-[#21f4b7]">
          PROCEED &gt;
        </ChecklistText>
      </Pressable>
      </View>
    </Animated.View>
  );
}

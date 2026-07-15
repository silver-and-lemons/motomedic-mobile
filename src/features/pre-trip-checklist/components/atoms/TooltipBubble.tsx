import { View, Pressable } from 'react-native';
import Animated, { SlideInDown, SlideInUp } from 'react-native-reanimated';
import ChecklistText from './ChecklistText';
import type { TooltipPointerDirection } from '../../types/checklist-onboarding';

type TooltipBubbleProps = {
  title: string;
  body: string;
  pointerDirection: TooltipPointerDirection;
  ctaLabel?: string;
  onCtaPress?: () => void;
};

/**
 * A circle-with-stem connector that visually points to
 * the relevant UI element behind the overlay.
 */
function TooltipConnector({ direction }: { direction: 'up' | 'down' | 'right' }) {
  if (direction === 'right') {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {/* Stem line stretching across remaining space to the target dot */}
        <View
          style={{
            flex: 1,
            height: 1.5,
            backgroundColor: 'rgba(33, 244, 183, 0.65)',
          }}
        />
        {/* Circle dot pointing directly at checkbox / warning icon */}
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: '#21f4b7',
            borderWidth: 2,
            borderColor: '#ffffff',
            shadowColor: '#21f4b7',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.85,
            shadowRadius: 6,
            elevation: 4,
          }}
        />
      </View>
    );
  }

  const isUp = direction === 'up';

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Stem line */}
      {isUp && (
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      )}

      {/* Circle dot */}
      <View
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: '#21f4b7',
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.6)',
        }}
      />

      {/* Stem line */}
      {!isUp && (
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      )}
    </View>
  );
}

function renderFormattedBody(body: string, isCompact?: boolean) {
  const parts = body.split('**');
  const bodyClassName = isCompact
    ? 'text-xs leading-4 text-[#b0b8bc]'
    : 'text-sm leading-5 text-[#b0b8bc]';
  const boldClassName = isCompact
    ? 'font-bold text-white text-xs leading-4'
    : 'font-bold text-white';

  if (parts.length === 1) {
    return body;
  }
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <ChecklistText key={idx} className={boldClassName}>
          {part}
        </ChecklistText>
      );
    }
    return (
      <ChecklistText key={idx} className={bodyClassName}>
        {part}
      </ChecklistText>
    );
  });
}

export default function TooltipBubble({
  title,
  body,
  pointerDirection,
  ctaLabel,
  onCtaPress,
}: TooltipBubbleProps) {
  const entering =
    pointerDirection === 'down'
      ? SlideInDown.duration(350).springify()
      : SlideInUp.duration(350).springify();

  if (pointerDirection === 'right') {
    return (
      <Animated.View
        entering={entering}
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 16,
          paddingRight: 40,
        }}
      >
        <View
          className="rounded-lg px-3.5 py-3"
          style={{
            width: 196,
            backgroundColor: '#111111',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.25)',
          }}
        >
          <ChecklistText className="mb-1 text-sm font-extrabold text-white">
            {title}
          </ChecklistText>
          <ChecklistText className="text-xs leading-4 text-[#b0b8bc]">
            {renderFormattedBody(body, true)}
          </ChecklistText>

          {ctaLabel && onCtaPress && (
            <Pressable
              onPress={onCtaPress}
              className="mt-2 self-end"
              hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
            >
              <ChecklistText className="text-xs font-bold text-[#21f4b7]">
                {ctaLabel}
              </ChecklistText>
            </Pressable>
          )}
        </View>

        <TooltipConnector direction="right" />
      </Animated.View>
    );
  }

  return (
    <Animated.View
      entering={entering}
      style={{ width: '100%', paddingHorizontal: 20 }}
    >
      {pointerDirection === 'up' && <TooltipConnector direction="up" />}

      <View
        className="rounded-lg px-5 py-4"
        style={{
          backgroundColor: '#111111',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
        }}
      >
        <ChecklistText className="mb-2 text-base font-extrabold text-white">
          {title}
        </ChecklistText>
        <ChecklistText className="text-sm leading-5 text-[#b0b8bc]">
          {renderFormattedBody(body)}
        </ChecklistText>

        {ctaLabel && onCtaPress && (
          <Pressable
            onPress={onCtaPress}
            className="mt-3 self-end"
            hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
          >
            <ChecklistText className="text-sm font-bold text-[#21f4b7]">
              {ctaLabel}
            </ChecklistText>
          </Pressable>
        )}
      </View>

      {pointerDirection === 'down' && <TooltipConnector direction="down" />}
    </Animated.View>
  );
}

import { View, Pressable, useWindowDimensions } from 'react-native';
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
        <View
          style={{
            flex: 1,
            height: 1.5,
            backgroundColor: 'rgba(33, 244, 183, 0.65)',
          }}
        />
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
      {isUp && (
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        />
      )}

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
  const bodyStyle = isCompact
    ? { fontSize: 12, lineHeight: 16, color: '#ffffff' }
    : { fontSize: 14, lineHeight: 20, color: '#ffffff' };
  const boldStyle = isCompact
    ? { fontSize: 12, lineHeight: 16, color: '#ffffff', fontWeight: 'bold' as const }
    : { fontSize: 14, lineHeight: 20, color: '#ffffff', fontWeight: 'bold' as const };

  if (parts.length === 1) {
    return (
      <ChecklistText style={bodyStyle}>
        {body}
      </ChecklistText>
    );
  }
  return parts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <ChecklistText key={idx} style={boldStyle}>
          {part}
        </ChecklistText>
      );
    }
    return (
      <ChecklistText key={idx} style={bodyStyle}>
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
  const { width: screenWidth } = useWindowDimensions();
  const isCompact = pointerDirection === 'right';
  const entering =
    pointerDirection === 'down'
      ? SlideInDown.duration(350).springify()
      : SlideInUp.duration(350).springify();

  if (isCompact) {
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
          style={{
            flexShrink: 1,
            maxWidth: screenWidth * 0.6,
            borderRadius: 8,
            paddingHorizontal: 14,
            paddingVertical: 12,
            backgroundColor: '#111111',
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.25)',
          }}
        >
          <ChecklistText style={{ fontSize: 14, fontWeight: '800', color: '#ffffff', marginBottom: 4 }}>
            {title}
          </ChecklistText>
          <View style={{ flexShrink: 1 }}>
            {renderFormattedBody(body, true)}
          </View>

          {ctaLabel && onCtaPress && (
            <Pressable
              onPress={onCtaPress}
              style={{ marginTop: 8, alignSelf: 'flex-end' }}
              hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
            >
              <ChecklistText style={{ fontSize: 12, fontWeight: 'bold', color: '#21f4b7' }}>
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
        style={{
          alignSelf: 'center',
          maxWidth: screenWidth * 0.85,
          borderRadius: 8,
          paddingHorizontal: 20,
          paddingVertical: 16,
          backgroundColor: '#111111',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
        }}
      >
        <ChecklistText style={{ fontSize: 16, fontWeight: '800', color: '#ffffff', marginBottom: 8 }}>
          {title}
        </ChecklistText>
        <View>
          {renderFormattedBody(body)}
        </View>

        {ctaLabel && onCtaPress && (
          <Pressable
            onPress={onCtaPress}
            style={{ marginTop: 12, alignSelf: 'flex-end' }}
            hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
          >
            <ChecklistText style={{ fontSize: 14, fontWeight: 'bold', color: '#21f4b7' }}>
              {ctaLabel}
            </ChecklistText>
          </Pressable>
        )}
      </View>

      {pointerDirection === 'down' && <TooltipConnector direction="down" />}
    </Animated.View>
  );
}

import { View } from 'react-native';
import type { ReactNode } from 'react';

type CircularProgressProps = {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
};

export function CircularProgress({
  progress = 0.15,
  size = 160,
  strokeWidth = 6,
  children,
}: CircularProgressProps) {
  const half = size / 2;
  const innerSize = size - strokeWidth * 4;
  const clamped = Math.min(1, Math.max(0, progress));

  const rightRotation = clamped <= 0.5
    ? -180 + (clamped / 0.5) * 180
    : 0;

  const leftRotation = clamped > 0.5
    ? ((clamped - 0.5) / 0.5) * 180
    : -180;

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: strokeWidth,
          borderColor: '#2a3a4a',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize / 2,
            backgroundColor: '#11161a',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          width: half,
          height: size,
          right: 0,
          top: 0,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: strokeWidth,
            borderColor: '#10b981',
            left: -half,
            transform: [{ rotate: `${rightRotation}deg` }],
          }}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          width: half,
          height: size,
          left: 0,
          top: 0,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            width: size,
            height: size,
            borderRadius: half,
            borderWidth: strokeWidth,
            borderColor: '#10b981',
            left: 0,
            transform: [{ rotate: `${leftRotation}deg` }],
          }}
        />
      </View>
    </View>
  );
}

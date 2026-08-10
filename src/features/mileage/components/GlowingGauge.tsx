import { View, Text } from 'react-native';

type GlowingGaugeProps = {
  size?: number;
  color?: string;
  label?: string;
  value?: string;
  children?: React.ReactNode;
};

export default function GlowingGauge({
  size = 200,
  color = '#16FFB0',
  label,
  value,
  children,
}: GlowingGaugeProps) {
  const half = size / 2;
  const strokeW = 4;
  const gap = 12;
  const arcRadius = half - strokeW;

  return (
    <View className="items-center" style={{ width: size, height: size }}>
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: strokeW,
          borderColor: '#1e2d33',
        }}
      />

      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: strokeW,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
        }}
      />

      <View
        style={{
          width: size - gap,
          height: size - gap,
          borderRadius: half - gap / 2,
          borderWidth: strokeW,
          borderColor: color,
          transform: [{ rotate: '-45deg' }],
          opacity: 0.3,
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: half * 0.28,
          width: size * 0.44,
          height: size * 0.44,
          borderRadius: size * 0.22,
          backgroundColor: '#121B1E',
          borderWidth: 1,
          borderColor: '#1e2d33',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>

      {value !== undefined && (
        <View
          style={{
            position: 'absolute',
            bottom: size * 0.12,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: size * 0.1, fontWeight: '700' }}>
            {value}
          </Text>
        </View>
      )}

      {label && (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#8A999E', fontSize: 11 }}>{label}</Text>
        </View>
      )}
    </View>
  );
}

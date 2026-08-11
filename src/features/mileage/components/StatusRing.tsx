import { View, Text } from 'react-native';

type StatusRingProps = {
  color?: string;
  label: string;
  status: string;
  size?: number;
  icon?: React.ReactNode;
};

export default function StatusRing({
  color = '#16FFB0',
  label,
  status,
  size = 68,
  icon,
}: StatusRingProps) {
  const half = size / 2;
  const strokeW = 3;

  return (
    <View className="items-center gap-1.5" style={{ width: size + 20 }}>
      <View style={{ width: size, height: size }}>
        <View
          style={{
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
            transform: [{ rotate: '-90deg' }],
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: strokeW + 4,
            left: strokeW + 4,
            width: size - (strokeW + 4) * 2,
            height: size - (strokeW + 4) * 2,
            borderRadius: half - strokeW - 4,
            backgroundColor: '#121B1E',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </View>
      </View>

      <Text
        numberOfLines={1}
        style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600', textAlign: 'center' }}
      >
        {label}
      </Text>
      <Text
        numberOfLines={1}
        style={{ color: '#8A999E', fontSize: 9, textAlign: 'center' }}
      >
        {status}
      </Text>
    </View>
  );
}

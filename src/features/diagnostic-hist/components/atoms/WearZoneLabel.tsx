import React from 'react';
import { Text } from 'react-native';
import { WearZone } from '../../types/diagnostic-record';

interface WearZoneLabelProps {
  progress: number;
}

export const WearZoneLabel: React.FC<WearZoneLabelProps> = ({ progress }) => {
  let label: WearZone = 'Green Zone';
  let color = '#00FF66'; // Green

  if (progress >= 1.0) {
    label = 'Red Zone';
    color = '#FF3B30'; // Red
  } else if (progress >= 0.8) {
    label = 'Yellow Zone';
    color = '#FFCC00'; // Yellow
  }

  return (
    <Text style={{ color, fontWeight: '700', fontSize: 16 }}>
      {label}
    </Text>
  );
};
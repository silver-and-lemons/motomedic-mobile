import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const EmptyHistoryState: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No records found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  title: {
    color: '#4F5E66',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    letterSpacing: 0.5,
  },
});
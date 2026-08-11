import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { DiagnosticHistoryList } from './organisms/DiagnosticHistoryList';
import type { DiagnosticRecord } from '../types/diagnostic-record';

type DiagnosticHistoryProps = {
  records: DiagnosticRecord[];
  onBack: () => void;
  onOptionsPress?: () => void;
};

export default function DiagnosticHistory({
  records,
  onBack,
  onOptionsPress,
}: DiagnosticHistoryProps) {
  return (
    <View className="flex-1 bg-[#0b171b]">
      {/* App Bar Navigation UI Header */}
      <View className="flex-row justify-between items-center px-5 pt-14 pb-4 border-b border-[#1a2226]">
        <Pressable onPress={onBack} className="flex-row items-center p-1">
          <Text className="text-[#e5e9eb] text-2xl font-light">‹</Text>
          <Text className="text-[#e5e9eb] text-lg font-medium ml-1.5">History</Text>
        </Pressable>
        
        <Pressable onPress={onOptionsPress} className="p-1">
          <Text className="text-[#e5e9eb] text-lg tracking-widest font-bold">•••</Text>
        </Pressable>
      </View>

      {/* Main Content View Container */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 24, paddingBottom: 34 }}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-white text-3xl font-extrabold tracking-wide mb-6">
          DIAGNOSTIC HISTORY
        </Text>

        {/* Passes organized presentation items into the performance list layer */}
        <DiagnosticHistoryList records={records} />
      </ScrollView>
    </View>
  );
}
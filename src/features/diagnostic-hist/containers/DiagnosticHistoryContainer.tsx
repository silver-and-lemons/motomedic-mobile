import React, { useMemo } from 'react';
import { router } from 'expo-router';
import { ActivityIndicator, View, Text } from 'react-native';
import DiagnosticHistory from '../components/DiagnosticHistory';
import { useDiagnosticHistory } from '../hooks/use-diagnostic-history';

export default function DiagnosticHistoryContainer() {
  // Pulling real data, loading state, and error handling via the new query layer
  const { data: records = [], isLoading, error } = useDiagnosticHistory();

  // Acceptance Criteria: Entries are sorted newest-first
  const sortedRecords = useMemo(() => {
    return [...records].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [records]);

  function handleBack() {
    router.back();
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#0b171b] justify-center items-center">
        <ActivityIndicator size="large" color="#00FF66" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-[#0b171b] justify-center items-center p-5">
        <Text className="text-[#ff3b30] text-lg font-medium text-center">
          {error.message || 'Failed to load history items.'}
        </Text>
      </View>
    );
  }

  return (
    <DiagnosticHistory
      records={sortedRecords}
      onBack={handleBack}
    />
  );
}
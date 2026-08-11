import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { DiagnosticRecord } from '../../types/diagnostic-record';
import { EmptyHistoryState } from '../molecules/EmptyHistoryState';
import { HistoryRow } from '../molecules/HistoryRow';

interface DiagnosticHistoryListProps {
  records: DiagnosticRecord[];
}

export const DiagnosticHistoryList: React.FC<DiagnosticHistoryListProps> = ({ records }) => {
  if (records.length === 0) return <EmptyHistoryState />;

  return (
    <View style={styles.listContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Date | Time</Text>
        <Text style={styles.headerText}>No. Items Checked</Text>
        <Text style={styles.headerText}>Wear gauge value</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryRow record={item} />}
        contentContainerStyle={styles.scrollArea}
        initialNumToRender={10}
        windowSize={11}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'column',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#34495E',
    marginTop: 24,
  },
  headerText: {
    flex: 1,
    color: '#E5E9EB',
    fontWeight: '700',
    fontSize: 16,
  },
  scrollArea: {
    paddingTop: 8,
    paddingBottom: 34,
  },
});
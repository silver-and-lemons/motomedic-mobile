import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DiagnosticRecord } from '../../types/diagnostic-record';
import { WearZoneLabel } from '../atoms/WearZoneLabel';

interface HistoryRowProps {
  record: DiagnosticRecord;
}

export const HistoryRow: React.FC<HistoryRowProps> = ({ record }) => {
  const dateObj = new Date(record.timestamp);
  const formattedDate = dateObj.toLocaleDateString('en-GB');
  const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const isOverdue = record.wearGauges ? record.wearGauges.serviceProgress >= 1.0 : false;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {isOverdue && <Text style={styles.overdueBadge}>Overdue</Text>}
        <Text style={styles.text}>{`${formattedDate} | ${formattedTime}`}</Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.text}>{`${record.checkedItemIds.length} Items Checked`}</Text>
      </View>

      <View style={styles.column}>
        {record.wearGauges ? (
          <>
            <WearZoneLabel progress={record.wearGauges.serviceProgress} />
            <Text style={styles.smallText}>{`Km: ${record.wearGauges.currentKm}  Next: ${record.wearGauges.kmToNextService}  ${Math.round(record.wearGauges.serviceProgress * 100)}%`}</Text>
          </>
        ) : (
          <Text style={styles.naText}>N/A</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#232D34',
    minHeight: 65,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  overdueBadge: {
    color: '#FF3B30',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase' as any,
    marginBottom: 2,
  },
  text: {
    color: '#E5E9EB',
    fontSize: 15,
  },
  smallText: {
    color: '#B0BFC6',
    fontSize: 12,
    marginTop: 4,
  },
  naText: {
    color: '#7F8C8D',
  },
});
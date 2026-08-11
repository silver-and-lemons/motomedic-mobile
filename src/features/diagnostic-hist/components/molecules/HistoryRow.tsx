import React from 'react';
import { DiagnosticRecord } from '../../types/diagnostic-record';
import { WearZoneLabel } from '../atoms/WearZoneLabel';

interface HistoryRowProps {
  record: DiagnosticRecord;
}

export const HistoryRow: React.FC<HistoryRowProps> = ({ record }) => {
  const dateObj = new Date(record.timestamp);
  
  // Format matching structural layout: XX/XX/XXXX | XX:XX
  const formattedDate = dateObj.toLocaleDateString('en-GB'); 
  const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  
  const isOverdue = record.wearGauges ? record.wearGauges.serviceProgress >= 1.0 : false;

  return (
    <div style={styles.container}>
      <div style={styles.column}>
        {isOverdue && <div style={styles.overdueBadge}>Overdue</div>}
        <span style={styles.text}>{`${formattedDate} | ${formattedTime}`}</span>
      </div>
      <div style={styles.column}>
        <span style={styles.text}>{`${record.checkedItemIds.length} Items Checked`}</span>
      </div>
      <div style={styles.column}>
        {record.wearGauges ? (
          <WearZoneLabel progress={record.wearGauges.serviceProgress} />
        ) : (
          <span style={{ color: '#7F8C8D' }}>N/A</span>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #232D34',
    minHeight: '65px',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  overdueBadge: {
    color: '#FF3B30',
    fontSize: '11px',
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const,
    marginBottom: '2px',
  },
  text: {
    color: '#E5E9EB',
    fontSize: '15px',
  },
};
import React from 'react';
import { DiagnosticRecord } from '../../types/diagnostic-record';
import { HistoryRow } from '../molecules/HistoryRow';
import { EmptyHistoryState } from '../molecules/EmptyHistoryState';

interface DiagnosticHistoryListProps {
  records: DiagnosticRecord[];
}

export const DiagnosticHistoryList: React.FC<DiagnosticHistoryListProps> = ({ records }) => {
  if (records.length === 0) {
    return <EmptyHistoryState />;
  }

  return (
    <div style={styles.listContainer}>
      {/* Table Subheaders */}
      <div style={styles.headerRow}>
        <span style={styles.headerText}>Date | Time</span>
        <span style={styles.headerText}>No. Items Checked</span>
        <span style={styles.headerText}>Wear gauge value</span>
      </div>

      {/* Optimized rendering context for performance scales */}
      <div style={styles.scrollArea}>
        {records.map((record) => (
          <HistoryRow key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: '12px',
    borderBottom: '1px solid #34495E',
    marginTop: '24px',
  },
  headerText: {
    flex: 1,
    color: '#E5E9EB',
    fontWeight: 'bold' as const,
    fontSize: '16px',
  },
  scrollArea: {
    display: 'flex',
    flexDirection: 'column' as const,
    overflowY: 'auto' as const,
    maxHeight: 'calc(100vh - 220px)', // Preserves performance/viewport optimization
    WebkitOverflowScrolling: 'touch' as const,
  },
};
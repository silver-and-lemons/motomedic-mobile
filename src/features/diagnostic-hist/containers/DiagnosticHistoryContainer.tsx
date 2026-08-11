import React, { useMemo, useState } from 'react';
import { router } from 'expo-router';
import DiagnosticHistory from '../components/DiagnosticHistory';
import { dummyDiagnosticRecords } from '../data/dummyRecords';

export default function DiagnosticHistoryContainer() {
  // Initial implementation works with structural dummy mock records
  const [records] = useState(dummyDiagnosticRecords);

  // Acceptance Criteria: Entries are sorted newest-first
  const sortedRecords = useMemo(() => {
    return [...records].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [records]);

  function handleBack() {
    router.back();
  }

  function handleOpenOptions() {
    console.log('Options context menu pressed');
  }

  return (
    <DiagnosticHistory
      records={sortedRecords}
      onBack={handleBack}
      onOptionsPress={handleOpenOptions}
    />
  );
}
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { diagnosticRecordKeys } from '../queries/diagnostic-record.queries';
import {
  loadDiagnosticRecords,
  saveDiagnosticRecord,
} from '../services/diagnostic-record.service';
import type { NewDiagnosticRecord } from '../types/diagnostic-record';

export function useDiagnosticRecords() {
  return useQuery({
    queryKey: diagnosticRecordKeys.list(),
    queryFn: loadDiagnosticRecords,
  });
}

export function useSaveDiagnosticRecord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewDiagnosticRecord) => saveDiagnosticRecord(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: diagnosticRecordKeys.all });
    },
  });
}

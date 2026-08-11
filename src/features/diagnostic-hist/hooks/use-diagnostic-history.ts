import { useQuery } from '@tanstack/react-query';
import { diagnosticHistoryService } from '../services/diagnostic-history.service';
import { diagnosticHistoryKeys } from '../queries/diagnostic-history.queries';
import { DiagnosticRecord } from '../types/diagnostic-record';

export function useDiagnosticHistory() {
  return useQuery<DiagnosticRecord[], Error>({
    queryKey: diagnosticHistoryKeys.list(),
    queryFn: () => diagnosticHistoryService.getHistory(),
    refetchOnWindowFocus: true,
  });
}
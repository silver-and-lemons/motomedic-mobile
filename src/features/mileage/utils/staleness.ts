export type StalenessState = 'fresh' | 'aging' | 'overdue';
export type StalenessResult = { state: StalenessState; days: number | null };

export function getDiagnosticStaleness(lastTimestamp: string | null): StalenessResult {
  if (!lastTimestamp) {
    return { state: 'overdue', days: null };
  }

  const lastDate = new Date(lastTimestamp);
  const now = new Date();
  
  // Set both to midnight to compare just the dates accurately
  const lastDateMidnight = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = nowMidnight.getTime() - lastDateMidnight.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return { state: 'fresh', days: diffDays };
  } else if (diffDays >= 1 && diffDays <= 6) {
    return { state: 'aging', days: diffDays };
  } else {
    return { state: 'overdue', days: diffDays };
  }
}

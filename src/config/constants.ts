export const SERVICE_INTERVALS = {
  small: 3000,
  medium: 4000,
  large: 5000,
} as const;

export function getDefaultServiceInterval(engineSizeCc: number): number {
  if (engineSizeCc <= 125) return SERVICE_INTERVALS.small;
  if (engineSizeCc <= 155) return SERVICE_INTERVALS.medium;
  return SERVICE_INTERVALS.large;
}

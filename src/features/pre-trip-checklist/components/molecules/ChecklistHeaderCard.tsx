import { View } from 'react-native';
import { CircularProgress } from '../../../../components/atoms/CircularProgress';
import ChecklistText from '../atoms/ChecklistText';
import type { PreTripChecklistStats } from '../../types/pre-trip-checklist';

type ChecklistHeaderCardProps = {
  stats: PreTripChecklistStats;
};

export default function ChecklistHeaderCard({ stats }: ChecklistHeaderCardProps) {
  const statusLabel = stats.healthScore >= 80 ? 'STATUS: GOOD' : 'STATUS: NEEDS CHECK';

  return (
    <View className="items-center gap-8 py-8">
      <View
        className="items-center justify-center rounded-full"
        style={{ boxShadow: '0 0 28px rgba(33, 244, 183, 0.45)' }}
      >
        <CircularProgress progress={stats.healthScore / 100} size={226} strokeWidth={5}>
          <View className="items-center">
            <View className="flex-row items-start">
              <ChecklistText className="text-[52px] font-bold leading-[58px]">
                {stats.healthScore}
              </ChecklistText>
              <ChecklistText className="pt-4 text-xl font-bold">%</ChecklistText>
            </View>
            <ChecklistText tone="success" className="text-[10px] font-bold">
              {statusLabel}
            </ChecklistText>
          </View>
        </CircularProgress>
      </View>

      <View className="items-center gap-2 px-5">
        <ChecklistText tone="muted" className="text-center text-xs">
          Your bike is in optimal condition. Next scheduled service in
        </ChecklistText>
        <ChecklistText className="text-center text-base font-bold">
          Month Day, Year
        </ChecklistText>
      </View>
    </View>
  );
}

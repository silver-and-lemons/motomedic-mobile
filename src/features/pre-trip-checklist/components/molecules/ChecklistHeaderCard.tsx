import { View } from 'react-native';
import { CircularProgress } from '../../../../components/atoms/CircularProgress';
import ChecklistText from '../atoms/ChecklistText';
import type { PreTripChecklistStats } from '../../types/pre-trip-checklist';
import type { OnboardingTargetLayout } from '../../types/checklist-onboarding';

type ChecklistHeaderCardProps = {
  stats: PreTripChecklistStats;
  onHealthScoreLayout?: (layout: OnboardingTargetLayout) => void;
  onSchedulingLayout?: (layout: OnboardingTargetLayout) => void;
};

export default function ChecklistHeaderCard({
  stats,
  onHealthScoreLayout,
  onSchedulingLayout,
}: ChecklistHeaderCardProps) {
  const statusLabel = stats.healthScore >= 80 ? 'STATUS: GOOD' : 'STATUS: NEEDS CHECK';

  function measureRef(
    callback?: (layout: OnboardingTargetLayout) => void
  ) {
    return (ref: View | null) => {
      if (!ref || !callback) return;
      setTimeout(() => {
        ref.measure((_x, _y, _w, h, _pageX, pageY) => {
          if (typeof pageY === 'number' && typeof h === 'number') {
            callback({ y: pageY, height: h });
          }
        });
      }, 300);
    };
  }

  return (
    <View className="items-center gap-8 py-8">
      <View
        ref={measureRef(onHealthScoreLayout)}
        collapsable={false}
        className="items-center justify-center rounded-full"
        style={{ shadowColor: '#21f4b7', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.45, shadowRadius: 28, elevation: 8 }}
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

      <View
        ref={measureRef(onSchedulingLayout)}
        collapsable={false}
        className="items-center gap-2 px-5"
      >
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

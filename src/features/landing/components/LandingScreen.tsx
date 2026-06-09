import { View, Text } from 'react-native';
import { Bike, ClipboardCheck } from 'lucide-react-native';
import { Button } from '../../../components/atoms/Button';

type LandingScreenProps = {
  onStartQuestionnaire: () => void;
};

export default function LandingScreen({
  onStartQuestionnaire,
}: LandingScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-[#11161a] gap-6 px-6">
      <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-[#0ea5e9] bg-[#1b232c]">
        <Bike size={40} color="#10b981" />
      </View>

      <View className="items-center">
        <Text className="text-3xl font-bold text-white">Motomedic</Text>
        <Text className="mt-2 text-base text-[#94a3b8]">
          Motorcycle Profile Setup
        </Text>
      </View>

      <View className="w-full gap-3">
        <Button
          variant="primary"
          className="w-full rounded-full py-4"
          onPress={onStartQuestionnaire}
        >
          Start Questionnaire
        </Button>
      </View>

      <View className="flex-row items-center gap-2">
        <ClipboardCheck size={16} color="#10b981" />
        <Text className="text-sm text-[#94a3b8]">
          Build your bike profile, then review the pre-trip checklist
        </Text>
      </View>
    </View>
  );
}

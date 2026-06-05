import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Bike } from 'lucide-react-native';

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-[#11161a] gap-6 px-6">
      <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-[#0ea5e9] bg-[#1b232c]">
        <Bike size={40} color="#10b981" />
      </View>

      <View className="items-center">
        <Text className="text-3xl font-bold text-white">Motomedic</Text>
        <Text className="text-base text-[#94a3b8] mt-2">
          Motorcycle Profile Setup
        </Text>
      </View>

      <Pressable
        className="w-full rounded-full bg-[#0ea5e9] px-6 py-4 active:opacity-80"
        onPress={() => router.push('/questionnaire')}
      >
        <Text className="text-center text-base font-semibold text-white">
          Start Questionnaire
        </Text>
      </Pressable>
    </View>
  );
}

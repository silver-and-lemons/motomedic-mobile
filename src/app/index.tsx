import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 gap-6">
      <View className="items-center">
        <Text className="text-3xl font-bold text-slate-900">Motomedic</Text>
        <Text className="text-base text-slate-500 mt-2">Mobile Architecture Scaffolded</Text>
      </View>

      <Pressable
        className="rounded-xl bg-blue-600 px-6 py-4 active:opacity-80"
        onPress={() => router.push("/questionnaire")}
      >
        <Text className="text-base font-semibold text-white">Motorcycle Profile Questionnaire</Text>
      </Pressable>
    </View>
  );
}

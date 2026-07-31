import '../styles/global.css';
import { Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { AppProviders } from '../providers/AppProviders';
import { useSession } from '../features/auth/hooks/use-session';
import { useAuthStore } from '../store/auth.store';

function RootNavigator() {
  useSession();
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#11161a]">
        <ActivityIndicator size="large" color="#0ea5e9" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

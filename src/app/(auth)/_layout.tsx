import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '../../store/auth.store';

export default function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasBikeProfile = useAuthStore((s) => s.hasBikeProfile);

  if (isAuthenticated) {
    return <Redirect href={hasBikeProfile ? '/dashboard' : '/'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
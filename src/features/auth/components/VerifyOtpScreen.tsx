import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { Button } from '../../../components/atoms/Button';

type VerifyOtpScreenProps = {
  otp: string;
  onOtpChange: (value: string) => void;
  onSubmit: () => void;
  onGoBack: () => void;
  isLoading: boolean;
  errorMessage?: string;
  hintLabel?: string;
};

export default function VerifyOtpScreen({
  otp,
  onOtpChange,
  onSubmit,
  onGoBack,
  isLoading,
  errorMessage,
  hintLabel,
}: VerifyOtpScreenProps) {
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#11161a]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8 items-center gap-2">
          <Text className="text-3xl font-extrabold text-white">Verify OTP</Text>
          <Text className="text-center text-sm font-semibold text-[#94a3b8]">
            {hintLabel ?? 'Enter the 6-digit code sent to your account'}
          </Text>
        </View>

        <View className="gap-4">
          <TextInput
            accessibilityLabel="OTP code"
            className="h-14 rounded-lg border border-slate-700 bg-[#1b232c] text-center text-2xl tracking-[8px] text-white focus:border-[#0ea5e9]"
            keyboardType="number-pad"
            maxLength={6}
            placeholder="000000"
            placeholderTextColor="#64748b"
            value={otp}
            onChangeText={(text) => onOtpChange(text.replace(/[^0-9]/g, ''))}
          />

          {errorMessage && (
            <Text className="text-center text-sm text-red-500">{errorMessage}</Text>
          )}

          <Button
            variant="primary"
            className="w-full rounded-full py-4"
            onPress={onSubmit}
            disabled={isLoading || otp.length < 6}
          >
            {isLoading ? 'VERIFYING...' : 'VERIFY'}
          </Button>

          <Pressable onPress={onGoBack} className="items-center active:opacity-70">
            <Text className="text-sm font-semibold text-[#94a3b8]">
              {'< GO BACK'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
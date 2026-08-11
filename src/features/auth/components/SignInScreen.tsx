import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';

const signInSchema = z.object({
  identifier: z.string().min(1, 'Enter your email or phone number'),
});

type SignInFormValues = z.infer<typeof signInSchema>;

type SignInScreenProps = {
  onSubmit: (identifier: string) => void;
  onGoToSignUp: () => void;
  isLoading: boolean;
  errorMessage?: string;
};

export default function SignInScreen({
  onSubmit,
  onGoToSignUp,
  isLoading,
  errorMessage,
}: SignInScreenProps) {
  const { control, handleSubmit } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { identifier: '' },
  });

  const submit = (values: SignInFormValues) => onSubmit(values.identifier);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#11161a]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8 items-center gap-2">
          <Text className="text-3xl font-extrabold text-white">MotoMedic</Text>
          <Text className="text-base font-semibold text-[#94a3b8]">
            Sign in to your account
          </Text>
        </View>

        <View className="gap-4">
          <Controller
            control={control}
            name="identifier"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                accessibilityLabel="Email or phone number"
                label="Email or phone number"
                placeholder="e.g. rider@example.com or +639123456789"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />

          {errorMessage && (
            <Text className="text-center text-sm text-red-500">{errorMessage}</Text>
          )}

          <Button
            variant="primary"
            className="w-full rounded-full py-4"
            onPress={handleSubmit(submit)}
            disabled={isLoading}
          >
            {isLoading ? 'SENDING OTP...' : 'SEND OTP'}
          </Button>

          <Pressable onPress={onGoToSignUp} className="items-center active:opacity-70">
            <Text className="text-sm font-semibold text-[#94a3b8]">
              No account yet?{' '}
              <Text className="text-[#0ea5e9]">Sign up</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
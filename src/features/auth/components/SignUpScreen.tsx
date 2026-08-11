import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../../components/atoms/Button';
import { Input } from '../../../components/atoms/Input';

const PHONE_REGEX = /^\+?[0-9]{7,15}$/;

const signUpSchema = z.object({
  fullName: z.string().min(1, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().regex(PHONE_REGEX, 'Enter a valid phone number'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

type SignUpScreenProps = {
  onSubmit: (values: SignUpFormValues) => void;
  onGoToSignIn: () => void;
  isLoading: boolean;
  errorMessage?: string;
};

export default function SignUpScreen({
  onSubmit,
  onGoToSignIn,
  isLoading,
  errorMessage,
}: SignUpScreenProps) {
  const { control, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: '', email: '', phone: '' },
  });

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#11161a]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8 items-center gap-2">
          <Text className="text-3xl font-extrabold text-white">MotoMedic</Text>
          <Text className="text-base font-semibold text-[#94a3b8]">
            Create your rider account
          </Text>
        </View>

        <View className="gap-4">
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                accessibilityLabel="Full name"
                label="Full name"
                placeholder="Juan Dela Cruz"
                autoCapitalize="words"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                accessibilityLabel="Email"
                label="Email address"
                placeholder="rider@example.com"
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

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <Input
                accessibilityLabel="Phone number"
                label="Phone number"
                placeholder="+639123456789"
                autoCapitalize="none"
                keyboardType="phone-pad"
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
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? 'SENDING OTP...' : 'CREATE ACCOUNT'}
          </Button>

          <Pressable onPress={onGoToSignIn} className="items-center active:opacity-70">
            <Text className="text-sm font-semibold text-[#94a3b8]">
              Already have an account?{' '}
              <Text className="text-[#0ea5e9]">Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
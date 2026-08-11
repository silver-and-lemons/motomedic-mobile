import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import VerifyOtpScreen from '../components/VerifyOtpScreen';
import { useVerifyLogin } from '../hooks/use-verify-login';
import { useVerifyRegistration } from '../hooks/use-verify-registration';

export default function VerifyOtpContainer() {
  const params = useLocalSearchParams<{ userId?: string; purpose?: string }>();
  const userId = params.userId ?? '';
  const purpose = params.purpose === 'register' ? 'register' : 'login';

  const [otp, setOtp] = useState('');

  const verifyLogin = useVerifyLogin();
  const verifyRegistration = useVerifyRegistration();

  const isPending = purpose === 'register' ? verifyRegistration.isPending : verifyLogin.isPending;
  const mutationError = purpose === 'register'
    ? verifyRegistration.error
    : verifyLogin.error;

  const handleSubmit = () => {
    if (!userId || otp.length < 6) return;

    const onSuccess = () => {
      // Navigation is handled by (auth)/_layout — it checks
      // isAuthenticated + hasBikeProfile to redirect after auth.
    };

    if (purpose === 'register') {
      verifyRegistration.mutate({ userId, otp }, { onSuccess });
    } else {
      verifyLogin.mutate({ userId, otp }, { onSuccess });
    }
  };

  return (
    <VerifyOtpScreen
      otp={otp}
      onOtpChange={setOtp}
      onSubmit={handleSubmit}
      onGoBack={() => router.back()}
      isLoading={isPending}
      errorMessage={mutationError ? mutationError.message : undefined}
      hintLabel={
        purpose === 'register'
          ? 'Enter the 6-digit code sent to your phone to finish creating your account'
          : 'Enter the 6-digit code sent to your email or phone to sign in'
      }
    />
  );
}
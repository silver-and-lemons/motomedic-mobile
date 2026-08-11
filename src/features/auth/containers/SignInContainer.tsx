import { router, type Href } from 'expo-router';
import SignInScreen from '../components/SignInScreen';
import { useLogin } from '../hooks/use-login';

const VERIFY_OTP_ROUTE = '/verify-otp' as Href;

export default function SignInContainer() {
  const mutation = useLogin();

  const handleSubmit = (identifier: string) => {
    mutation.mutate(
      { identifier },
      {
        onSuccess: (response) => {
          router.push({
            pathname: VERIFY_OTP_ROUTE,
            params: { userId: response.userId, purpose: 'login' },
          });
        },
      },
    );
  };

  return (
    <SignInScreen
      onSubmit={handleSubmit}
      onGoToSignUp={() => router.push('/sign-up' as Href)}
      isLoading={mutation.isPending}
      errorMessage={mutation.isError ? mutation.error.message : undefined}
    />
  );
}
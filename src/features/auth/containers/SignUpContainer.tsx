import { router, type Href } from 'expo-router';
import SignUpScreen from '../components/SignUpScreen';
import { useRegister, type RegisterRequest } from '../hooks/use-register';

const VERIFY_OTP_ROUTE = '/verify-otp' as Href;

export default function SignUpContainer() {
  const mutation = useRegister();

  const handleSubmit = (values: RegisterRequest) => {
    mutation.mutate(values, {
      onSuccess: (response) => {
        router.push({
          pathname: VERIFY_OTP_ROUTE,
          params: { userId: response.userId, purpose: 'register' },
        });
      },
    });
  };

  return (
    <SignUpScreen
      onSubmit={handleSubmit}
      onGoToSignIn={() => router.push('/sign-in' as Href)}
      isLoading={mutation.isPending}
      errorMessage={mutation.isError ? mutation.error.message : undefined}
    />
  );
}
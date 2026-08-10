import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth.service';
import { saveTokens } from '../services/token-storage';
import { useAuthStore } from '../../../store/auth.store';
import { authKeys } from '../queries/auth.queries';
import type { AuthTokens } from '../types/auth';
import type { LoginRequest } from '../types/auth';

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (credentials: LoginRequest) => {
      const response = await loginUser(credentials);

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresAt: Date.now() + response.expiresIn * 1000,
      };

      await saveTokens(tokens);
      setSession(response.user, tokens);

      return response;
    },
  });
}

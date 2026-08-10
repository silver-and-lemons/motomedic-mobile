import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../../store/auth.store';
import { authKeys } from '../queries/auth.queries';
import { logoutUser } from '../services/auth.service';
import { clearTokens, getTokens } from '../services/token-storage';

export function useLogout() {
  const clearSession = useAuthStore((s) => s.clearSession);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async () => {
      const tokens = await getTokens();

      if (tokens) {
        await logoutUser(tokens.refreshToken).catch(() => {});
      }

      await clearTokens();
      clearSession();
      queryClient.clear();
    },
  });
}

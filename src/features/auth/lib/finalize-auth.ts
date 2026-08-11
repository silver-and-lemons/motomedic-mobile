import { useAuthStore } from '../../../store/auth.store';
import { saveTokens } from '../services/token-storage';
import type { AuthTokens, VerifyOtpResponse } from '../types/auth';

export async function finalizeAuth(response: VerifyOtpResponse): Promise<AuthTokens> {
  const tokens: AuthTokens = {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    expiresAt: Date.now() + response.expiresIn * 1000,
  };

  await saveTokens(tokens);
  useAuthStore.getState().setSession(response.user, tokens);
  useAuthStore.getState().setHasBikeProfile(response.hasBikeProfile);

  return tokens;
}
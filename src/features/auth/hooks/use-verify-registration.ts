import { useMutation } from '@tanstack/react-query';
import { verifyRegistrationOtp } from '../services/auth.service';
import { finalizeAuth } from '../lib/finalize-auth';
import { authKeys } from '../queries/auth.queries';
import type { VerifyOtpRequest, VerifyOtpResponse } from '../types/auth';

export function useVerifyRegistration() {
  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: async (input: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
      const response = await verifyRegistrationOtp(input);
      await finalizeAuth(response);
      return response;
    },
  });
}

export type { VerifyOtpRequest, VerifyOtpResponse };
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../services/auth.service';
import { authKeys } from '../queries/auth.queries';
import type { RegisterRequest, RegisterResponse } from '../types/auth';

export function useRegister() {
  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: (input: RegisterRequest) => registerUser(input),
  });
}

export type { RegisterRequest, RegisterResponse };
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth.service';
import { authKeys } from '../queries/auth.queries';
import type { LoginRequest, LoginResponse } from '../types/auth';

export function useLogin() {
  return useMutation({
    mutationKey: authKeys.session(),
    mutationFn: (credentials: LoginRequest) => loginUser(credentials),
  });
}

export type { LoginRequest, LoginResponse };
export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  contactNumber: string | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginRequest {
  identifier: string;
}

export interface LoginResponse {
  userId: string;
  message: string;
}

export interface RegisterRequest {
  phone: string;
  email: string;
  fullName: string;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

export interface VerifyOtpRequest {
  userId: string;
  otp: string;
}

export interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: AuthUser;
  hasBikeProfile: boolean;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
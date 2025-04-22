import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function submitVerificationToken(
  token: string,
): Promise<ApiResponse> {
  return fetcher('POST', 'auth/verify-email', { token });
}

export async function submitResendVerification(
  email: string,
): Promise<ApiResponse> {
  return fetcher('POST', 'auth/resend-verification-email', { email });
}

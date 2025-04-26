import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function submitVerificationToken(
  token: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: 'auth/verify-email',
    payload: { token },
  });
}

export async function submitResendVerification(
  email: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: 'auth/resend-verification-email',
    payload: { email },
  });
}

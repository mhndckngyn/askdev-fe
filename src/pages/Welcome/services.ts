import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';
import { LoginFormValues, SignupPayload } from './types';

export async function submitSignupForm(
  payload: SignupPayload,
): Promise<ApiResponse> {
  return fetcher({ method: 'POST', route: 'user/signup', payload });
}

export async function submitLoginForm(
  payload: LoginFormValues,
): Promise<ApiResponse> {
  return fetcher({ method: 'POST', route: 'auth/login', payload });
}

import { ApiResponse } from '@/types';
import axiosInstance from '@/utils/axiosInstance';
import { AxiosError } from 'axios';

export async function submitVerificationToken(
  token: string,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.post('auth/verify-email', { token });
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;

    if (err.response) {
      return err.response.data as ApiResponse;
    }

    return {
      success: false,
      message: 'api:common.something-went-wrong',
      content: null,
      error: err.message,
      statusCode: 500,
    };
  }
}

export async function submitResendVerification(
  email: string,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.post(
      'auth/resend-verification-email',
      { email },
    );
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;

    if (err.response) {
      return err.response.data as ApiResponse;
    }

    return {
      success: false,
      message: 'api:common.something-went-wrong',
      content: null,
      error: err.message,
      statusCode: 500,
    };
  }
}

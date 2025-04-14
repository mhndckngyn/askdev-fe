import axiosInstance from '@/utils/axiosInstance';
import { LoginFormValues, SignupPayload } from './types';
import { ApiResponse } from '@/types';
import { AxiosError } from 'axios';

export async function submitSignupForm(
  payload: SignupPayload,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.post('user/signup', payload);
    return response.data;
  } catch (error: any) {
    // axios throws an AxiosError object when response status is outside of 2xx range
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

export async function submitLoginForm(
  payload: LoginFormValues,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance.post('auth/login', payload);
    return response.data;
  } catch (error: any) {
    const err = error as AxiosError;

    if (err.response) {
      return err.response.data as ApiResponse;
    }

    return {
      success: false,
      content: null,
      error: 'api:common.something-went-wrong',
      statusCode: 500,
    };
  }
}

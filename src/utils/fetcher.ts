import { ApiResponse, ApiMethod } from '@/types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

type fetcherParams = {
  method: ApiMethod;
  route: string;
  payload?: any;
  options?: AxiosRequestConfig;
};

async function fetcher({
  method,
  route,
  payload = undefined,
  options = {},
}: fetcherParams): Promise<ApiResponse> {
  try {
    const response = await axiosInstance({
      method,
      url: route,
      data: payload,
      ...options,
    });

    return response.data;
  } catch (error) {
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

export default fetcher;

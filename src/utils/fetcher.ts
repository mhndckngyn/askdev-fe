import { ApiResponse, ApiMethod } from '@/types';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

async function fetcher(
  method: ApiMethod,
  route: string,
  payload?: any,
): Promise<ApiResponse> {
  try {
    const response = await axiosInstance({ method, url: route, data: payload });
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

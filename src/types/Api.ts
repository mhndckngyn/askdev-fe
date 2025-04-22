// response body data
export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  content: T;
  error?: string;
  statusCode: number;
};

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

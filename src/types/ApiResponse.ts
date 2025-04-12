export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  content: T;
  error?: string;
  statusCode: number;
};
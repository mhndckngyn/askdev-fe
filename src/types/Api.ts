// response body data
export type ApiResponse<T = any> = {
  success: boolean;
  message?: string; // quy ước: Nếu có lỗi và cần hiển thị cho người dùng, set ở đây
  content: T;
  error?: string;
  statusCode: number;
};

export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

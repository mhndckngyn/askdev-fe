import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';


export async function getQuestion(id: string): Promise<ApiResponse> {
  return fetcher('GET', `question/${id}`);
}

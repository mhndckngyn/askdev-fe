import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function getQuestion(id: string): Promise<ApiResponse> {
  return fetcher({ method: 'GET', route: `question/${id}` });
}

export async function voteQuestion(
  id: string,
  type: 1 | -1,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `question/${id}/vote?type=${type}`,
  });
}

export async function getVoteStatus(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `question/${id}/vote-status`,
  });
}

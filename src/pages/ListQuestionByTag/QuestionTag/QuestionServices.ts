import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function getQuestion(id: string): Promise<ApiResponse> {
  return fetcher({ method: 'GET', route: `question/${id}` });
}

export async function getQuestionsByTag(tagId: string): Promise<ApiResponse> {
  return fetcher({ method: 'GET', route: `question/by-tag/${tagId}` });
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

export async function getEditHistory(
  id: string,
  createdAt: Date,
  direction: number,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `question/${id}/edit-history?createdAt=${createdAt.toISOString()}&direction=${direction}`,
  });
}

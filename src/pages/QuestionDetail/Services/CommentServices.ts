import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function createComment(
  answerId: string,
  content: string,
): Promise<ApiResponse> {
  const payload = {
    answerId,
    content,
  };
  return fetcher({
    method: 'POST',
    route: 'comment',
    payload,
  });
}

export async function updateComment(
  id: string,
  content: string,
): Promise<ApiResponse> {
  const payload = { content };
  return fetcher({
    method: 'PUT',
    route: `comment/${id}`,
    payload,
  });
}

export async function getCommentsByAnswerId(
  answerId: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `comment/answer/${answerId}`,
  });
}

export async function voteComment(
  id: string,
  type: 1 | -1,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `comment/${id}/vote?type=${type}`,
  });
}

export async function getVoteStatusComment(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `comment/${id}/vote-status`,
  });
}

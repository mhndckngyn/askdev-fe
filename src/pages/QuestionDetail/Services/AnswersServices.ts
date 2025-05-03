import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

export async function createAnswer(
  questionId: string,
  content: string,
): Promise<ApiResponse> {
  const payload = {
    questionId,
    content,
  };
  return fetcher({
    method: 'POST',
    route: 'answer',
    payload,
  });
}

export async function updateAnswer(
  id: string,
  content: string,
): Promise<ApiResponse> {
  const payload = { content };
  return fetcher({
    method: 'PUT',
    route: `answer/${id}`,
    payload,
  });
}

export async function getAnswersByQuestionId(
  questionId: string,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `answer/question/${questionId}`,
  });
}

export async function voteAnswers(
  id: string,
  type: 1 | -1,
): Promise<ApiResponse> {
  return fetcher({
    method: 'POST',
    route: `answer/${id}/vote?type=${type}`,
  });
}

export async function getVoteStatus(id: string): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: `answer/${id}/vote-status`,
  });
}

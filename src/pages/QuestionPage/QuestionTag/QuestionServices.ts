import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

type GetQuestionsParam = {
  page: number;
  pageSize: number;
  titleKeyword?: string;
  tags?: string[];
  username?: string;
  isAnswered?: boolean;
  hiddenOption?: boolean;
  isEdited?: boolean;
  startDate?: string;
  endDate?: string;
};

export async function getQuestions(
  params: GetQuestionsParam,
): Promise<ApiResponse> {
  const queryParams = {
    ...params,
    tags: params.tags?.join(','),
    startDate: params.startDate,
    endDate: params.endDate,
  };
  return fetcher({
    method: 'GET',
    route: 'question',
    options: {
      params: queryParams,
    },
  });
}

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

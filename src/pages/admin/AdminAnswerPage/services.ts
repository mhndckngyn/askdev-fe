import fetcher from '@/utils/fetcher';
import mapParams from '@/utils/mapParams';
import { AnswerFilter } from './AdminAnswerPage';

type GetAnswersParam = AnswerFilter & {
  page: number;
  pageSize: number;
};

export async function getAnswers(params: GetAnswersParam) {
  const mappedParams = mapParams(params);

  return fetcher({
    method: 'GET',
    route: 'admin/answer',
    options: {
      params: mappedParams,
    },
  });
}

export async function hideAnswers(ids: string[]) {
  return fetcher({
    method: 'PATCH',
    route: 'admin/answer/hide',
    payload: { ids },
  });
}

export async function unhideAnswers(ids: string[]) {
  return fetcher({
    method: 'PATCH',
    route: 'admin/answer/unhide',
    payload: { ids },
  });
}

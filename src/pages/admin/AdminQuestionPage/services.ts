import fetcher from '@/utils/fetcher';
import mapParams from '@/utils/mapParams';
import { Filter } from './AdminQuestionPage';

type GetQuestionsParam = Filter & {
  page: number;
  pageSize: number;
};

export async function getQuestions(params: GetQuestionsParam) {
  const mappedParams = mapParams(params);

  return fetcher({
    method: 'GET',
    route: 'question',
    options: {
      params: mappedParams,
    },
  });
}

const USERNAME_TO_GET = 5;

export async function getUsernames(query: string) {
  return fetcher({
    method: 'GET',
    route: 'user',
    options: {
      params: {
        username: query,
        page: 1,
        pageSize: USERNAME_TO_GET,
      },
    },
  });
}

const TAG_TO_GET = 5;

export async function getTags(query: string) {
  return fetcher({
    method: 'GET',
    route: 'tag',
    options: {
      params: {
        keyword: query,
        count: TAG_TO_GET,
      },
    },
  });
}

export async function hideQuestions(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/question/hide',
    payload: { ids },
  });
}

export async function unhideQuestions(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/question/unhide',
    payload: { ids },
  });
}

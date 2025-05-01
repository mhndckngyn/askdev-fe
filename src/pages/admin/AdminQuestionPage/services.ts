import fetcher from '@/utils/fetcher';
import dayjs from 'dayjs';
import { Filter } from './AdminQuestionPage';

type GetQuestionsParam = Filter & {
  page: number;
  pageSize: number;
};

export async function getQuestions(params: GetQuestionsParam) {
  const mappedParams: Record<string, any> = {};

  // filter undefined, sanitize field
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return; // skip empty

    if (value instanceof Date) {
      mappedParams[key] = dayjs(value).format('YYYY-MM-DD');
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        mappedParams[key] = value.join(','); // Array => CSV string
      }
    } else {
      mappedParams[key] = value; // primitives (string, number, boolean)
    }
  });

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

export async function deleteQuestion(id: string) {
  return fetcher({
    method: 'DELETE',
    route: `question/${id}`,
  });
}

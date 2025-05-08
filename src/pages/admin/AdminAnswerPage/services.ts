import fetcher from "@/utils/fetcher";
import dayjs from "dayjs";
import { AnswerFilter } from "./AdminAnswerPage";

type GetAnswersParam = AnswerFilter & {
  page: number;
  pageSize: number;
}

export async function getAnswers(params: GetAnswersParam) {
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
    route: 'answer',
    options: {
      params: mappedParams,
    },
  });
}

export async function hideAnswers(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/answer/hide',
    payload: { ids },
  });
}

export async function unhideAnswers(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/answer/unhide',
    payload: { ids },
  });
}

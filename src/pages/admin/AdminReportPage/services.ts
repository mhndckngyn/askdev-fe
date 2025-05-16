import fetcher from '@/utils/fetcher';
import dayjs from 'dayjs';
import { Filter } from './AdminReportPage';

type GetReportsParam = Filter & {
  page: number;
  pageSize: number;
};

export async function getReports(params: GetReportsParam) {
  const mappedParams: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof Date) {
      mappedParams[key] = dayjs(value).format('YYYY-MM-DD');
    } else if (Array.isArray(value)) {
      if (value.length > 0) {
        mappedParams[key] = value.join(',');
      }
    } else {
      mappedParams[key] = value;
    }
  });

  return fetcher({
    method: 'GET',
    route: 'admin/report',
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

export async function hideReports(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/report/hide',
    payload: { ids },
  });
}

export async function unhideReports(ids: string[]) {
  return fetcher({
    method: 'POST',
    route: 'admin/report/unhide',
    payload: { ids },
  });
}

export async function updateStatus(
  id: string,
  status: 'PENDING' | 'REVIEWED' | 'REJECTED',
) {
  return fetcher({
    method: 'PATCH',
    route: `admin/report/${id}/status`,
    options: {
      params: { status },
    },
  });
}

export async function getReportedContentDetails(
  contentType: 'QUESTION' | 'ANSWER' | 'COMMENT',
  contentId: string,
) {
  return fetcher({
    method: 'GET',
    route: 'admin/report/content',
    options: {
      params: {
        contentType,
        contentId,
      },
    },
  });
}

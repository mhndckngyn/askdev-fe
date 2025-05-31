import { ApiResponse } from '@/types';
import { UserAdminView } from '@/types/UserAdminView';
import fetcher from '@/utils/fetcher';
import { UserFilter } from './AdminUserPage';
import dayjs from 'dayjs';
import { BanLog } from './partials/BanLog';

type GetUserResults = {
  users: UserAdminView[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    count: number;
  };
};

type GetUserParams = UserFilter & {
  page: number;
  pageSize: number;
};

export async function getUsers(
  params: GetUserParams,
): Promise<ApiResponse<GetUserResults>> {
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
    route: `admin/user`,
    options: {
      params: mappedParams,
    },
  });
}

export async function banUser(userId: string, reason: string = '') {
  return fetcher({
    method: 'PATCH',
    route: `admin/user/${userId}/ban`,
    payload: { reason },
  });
}

export async function unbanUser(userId: string, reason: string = '') {
  return fetcher({
    method: 'PATCH',
    route: `admin/user/${userId}/unban`,
    payload: { reason },
  });
}

export async function getBanRecords(): Promise<ApiResponse<BanLog[]>> {
  return fetcher({
    method: 'GET',
    route: 'admin/ban',
  });
}

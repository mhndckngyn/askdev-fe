import fetcher from '@/utils/fetcher';
import mapParams from '@/utils/mapParams';
import { CommentFilter } from './AdminCommentPage';
import { ApiResponse } from '@/types';
import { CommentAdminView } from '@/types/CommentAdminView';

type GetCommentsParam = CommentFilter & {
  page: number;
  pageSize: number;
};

type GetCommentsResult = {
  comments: CommentAdminView[];
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    count: number;
  };
};

export async function getComments(
  params: GetCommentsParam,
): Promise<ApiResponse<GetCommentsResult>> {
  const mappedParams = mapParams(params);

  return fetcher({
    method: 'GET',
    route: 'admin/comment',
    options: {
      params: mappedParams,
    },
  });
}

export async function hideComments(ids: string[]) {
  return fetcher({
    method: 'PATCH',
    route: 'admin/comment/hide',
    payload: { ids },
  });
}

export async function unhideComments(ids: string[]) {
  return fetcher({
    method: 'PATCH',
    route: 'admin/comment/unhide',
    payload: { ids },
  });
}

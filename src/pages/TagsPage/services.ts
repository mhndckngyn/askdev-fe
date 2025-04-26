import { ApiResponse } from '@/types';
import fetcher from '@/utils/fetcher';

type SearchTagsParams = {
  keyword?: string;
  pagination?: {
    count: number;
    page: number;
  };
  sortBy: 'name' | 'popularity';
};

export async function searchTags(
  params: SearchTagsParams,
): Promise<ApiResponse> {
  return fetcher({
    method: 'GET',
    route: '/tag',
    options: {
      params: {
        keyword: params.keyword,
        sortBy: params.sortBy,
        page: params.pagination?.page,
        count: params.pagination?.count,
      },
    },
  });
}

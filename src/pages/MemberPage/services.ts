import fetcher from '@/utils/fetcher';
import { RankingType } from './types';

export async function getMembers(
  page: number = 1,
  limit: number = 20,
  ranking: RankingType = 'reputation',
  searchQuery?: string,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ranking,
  });

  if (searchQuery?.trim()) {
    params.append('search', searchQuery.trim());
  }

  return fetcher({
    method: 'GET',
    route: `member?${params.toString()}`,
  });
}

import fetcher from '@/utils/fetcher';
import { HistoryFilters } from './types';

export async function getHistory(
  page: number = 1,
  limit: number = 20,
  filters?: Partial<HistoryFilters>,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.searchQuery) {
    params.append('search', filters.searchQuery);
  }

  if (filters?.types && filters.types.length > 0) {
    params.append('types', filters.types.join(','));
  }

  if (filters?.dateRange?.start) {
    params.append('startDate', filters.dateRange.start.toISOString());
  }

  if (filters?.dateRange?.end) {
    params.append('endDate', filters.dateRange.end.toISOString());
  }

  return fetcher({
    method: 'GET',
    route: `history?${params.toString()}`,
  });
}

export async function deleteHistoryItem(id: string) {
  return fetcher({
    method: 'DELETE',
    route: `history/${id}`,
  });
}

export async function deleteMultipleHistoryItems(ids: string[]) {
  return fetcher({
    method: 'DELETE',
    route: 'history',
    payload: { ids },
  });
}

export async function deleteAllHistory() {
  return fetcher({
    method: 'DELETE',
    route: 'history/all',
  });
}

export async function getHistoryTypes() {
  return fetcher({
    method: 'GET',
    route: 'history/types',
  });
}

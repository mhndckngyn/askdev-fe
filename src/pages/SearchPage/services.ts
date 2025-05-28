import fetcher from '@/utils/fetcher';

export async function search(query: string) {
  return fetcher({
    method: 'GET',
    route: `search?query=${encodeURIComponent(query)}`,
  });
}

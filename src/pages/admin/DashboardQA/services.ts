import fetcher from '@/utils/fetcher';

export async function getDashboardStats() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/posts-tags-month',
  });
}

export async function getDashboardStatsInYear(year: number) {
  return fetcher({
    method: 'GET',
    route: `admin/dashboard/posts-tags-year?year=${year}`,
  });
}

export async function getDashboardTopTagsInYear(year: number) {
  return fetcher({
    method: 'GET',
    route: `admin/dashboard/top-tags-year?year=${year}`,
  });
}

export async function getDashboardTopTags() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/top-tags',
  });
}

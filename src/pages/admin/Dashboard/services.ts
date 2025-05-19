import fetcher from '@/utils/fetcher';

export async function getDashboardGeneralStats() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/general-stats',
  });
}

export async function getDashboardTopTagsStats() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/top-tags-stats',
  });
}

export async function getDashboardTopUsersStats() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/top-users-posts',
  });
}

export async function getDashboardWeeklyTrends() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/weekly-trends',
  });
}

import fetcher from '@/utils/fetcher';

export async function getDashboardReportMonthlyStats() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/monthly-report-stats',
  });
}

export async function getDailyReportStatsByMonthYear(
  month: number,
  year: number,
) {
  return fetcher({
    method: 'GET',
    route: `admin/dashboard/daily-report-stats?month=${month}&year=${year}`,
  });
}

export async function getTotalReportsByType() {
  return fetcher({
    method: 'GET',
    route: 'admin/dashboard/report-counts',
  });
}

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ReportsBarChart from './ReportsBarChart';
import { getDashboardWeeklyTrends } from '../services';
import { subDays, startOfDay } from 'date-fns';
import { useTranslation } from 'react-i18next';

function getVietnameseDayOfWeek(
  date: Date,
  t: (key: string) => string,
): string {
  const day = date.getDay();
  return t(`day.${day}`);
}

function generateWeeklyLabels(t: (key: string) => string): string[] {
  const today = startOfDay(new Date());
  const labels: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    labels.push(getVietnameseDayOfWeek(date, t));
  }

  return labels;
}

const baseChartData = (t: (key: string) => string) => ({
  colors: '',
  labels: generateWeeklyLabels(t),
  datasets: [
    {
      label: '',
      data: [] as number[],
    },
  ],
});

export default function DashboardCharts() {
  const { t } = useTranslation('adminDashboardPage');

  const [data, setData] = useState({
    user: baseChartData(t as (key: string) => string),
    question: baseChartData(t as (key: string) => string),
    report: baseChartData(t as (key: string) => string),
  });

  function calculateAverage(data: number[]): string {
    if (!data.length) return '0';
    const sum = data.reduce((a, b) => a + b, 0);
    const avg = sum / data.length;
    return avg.toFixed(1);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDashboardWeeklyTrends();

        const labels = generateWeeklyLabels(t as (key: string) => string);

        setData({
          user: {
            ...baseChartData(t as (key: string) => string),
            labels,
            datasets: [
              {
                label: t('newUsers'),
                data: res.content.newUsers.current || [],
              },
            ],
          },
          question: {
            ...baseChartData(t as (key: string) => string),
            labels,
            datasets: [
              {
                label: t('posts'),
                data: res.content.questions.current || [],
              },
            ],
          },
          report: {
            ...baseChartData(t as (key: string) => string),
            labels,
            datasets: [
              {
                label: t('reports'),
                data: res.content.reports.current || [],
              },
            ],
          },
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [t]);

  return (
    <Box
      mt="25px"
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      width="100%"
      justifyContent="space-between">
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title={t('chart.users')}
          description={`${t('averagePerDay', { value: calculateAverage(data.user.datasets[0].data) })}`}
          chart={{
            ...data.user,
            colors: 'linear-gradient(135deg, #49a3f1, #1A73E8)',
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title={t('chart.questions')}
          description={`${t('averagePerDay', { value: calculateAverage(data.question.datasets[0].data) })}`}
          chart={{
            ...data.question,
            colors: 'linear-gradient(135deg, #EC407A, #D81B60)',
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title={t('chart.reports')}
          description={`${t('averagePerDay', { value: calculateAverage(data.report.datasets[0].data) })}`}
          chart={{
            ...data.report,
            colors: 'linear-gradient(135deg, #66BB6A, #43A047)',
          }}
        />
      </Box>
    </Box>
  );
}

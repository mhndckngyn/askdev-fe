import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grow from '@mui/material/Grow';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
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
  const [loading, setLoading] = useState(true);
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
        setLoading(true);
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
      } finally {
        setTimeout(() => setLoading(false), 800); // Add smooth loading transition
      }
    }

    fetchData();
  }, [t]);

  const SkeletonLoader = () => (
    <Card
      sx={{
        height: '320px',
        borderRadius: '20px',
        background: 'linear-gradient(145deg, #f8fafc, #e2e8f0)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`,
        },
      }}>
      <Skeleton
        variant="rectangular"
        height={200}
        sx={{
          borderRadius: '16px',
          mb: 2,
        }}
      />
      <Skeleton variant="text" height={32} width="60%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={24} width="40%" />
    </Card>
  );

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            width: '100%',
          }}>
          {[1, 2, 3].map((index) => (
            <Grow
              key={index}
              in
              timeout={600 + index * 200}
              style={{ transformOrigin: '0 0 0' }}>
              <Box>
                <SkeletonLoader />
              </Box>
            </Grow>
          ))}
        </Box>
      </Container>
    );
  }

  const chartConfigs = [
    {
      key: 'user',
      title: t('chart.users'),
      description: `${t('averagePerDay', {
        value: calculateAverage(data.user.datasets[0].data),
      })}`,
      colors: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      data: data.user,
    },
    {
      key: 'question',
      title: t('chart.questions'),
      description: `${t('averagePerDay', {
        value: calculateAverage(data.question.datasets[0].data),
      })}`,
      colors: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      data: data.question,
    },
    {
      key: 'report',
      title: t('chart.reports'),
      description: `${t('averagePerDay', {
        value: calculateAverage(data.report.datasets[0].data),
      })}`,
      colors: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      data: data.report,
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
          gap: 3,
          width: '100%',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}>
        {chartConfigs.map((config, index) => (
          <Grow
            key={config.key}
            in
            timeout={800 + index * 200}
            style={{
              width: '100%',
              maxWidth: '100%',
            }}>
            <Box
              sx={{
                width: '100%',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  '& .chart-wrapper': {
                    transform: 'scale(1.02)',
                  },
                },
              }}>
              <Box
                className="chart-wrapper"
                sx={{
                  transition: 'transform 0.3s ease',
                  height: '100%',
                }}>
                <ReportsBarChart
                  title={config.title}
                  description={config.description}
                  chart={{
                    ...config.data,
                    colors: config.colors,
                  }}
                />
              </Box>
            </Box>
          </Grow>
        ))}
      </Box>
    </Container>
  );
}

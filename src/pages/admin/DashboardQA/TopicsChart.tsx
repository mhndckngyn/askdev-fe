import ReactECharts from 'echarts-for-react';
import { Paper, Typography, Box } from '@mui/material';
import { getDashboardTopTags } from './services';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
export interface ITopicsDashboard {
  Topics: string;
  Count: number;
}

const TopicsChart = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const [topics, setTopics] = useState<ITopicsDashboard[]>([]);

  const COLORS = [
    'rgb(236, 64, 122)',
    'rgb(102, 187, 106)',
    'rgb(239, 83, 80)',
    'rgb(255, 167, 38)',
    'rgb(73, 163, 241)',
    'rgb(116, 123, 138)',
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDashboardTopTags();

        const mappedData = response.content.map((item: any) => ({
          Topics: item.name || t('tagsOther'),
          Count: item.postCount,
        }));
        setTopics(mappedData);
      } catch (error) {
        console.error(error);
        setTopics([]);
      }
    }

    fetchData();
  }, []);

  const chartData =
    topics?.map((topic) => ({
      value: topic.Count,
      name: topic.Topics,
    })) || [];

  const option = {
    background:
      colorScheme === 'dark'
        ? 'rgba(30, 41, 59, 0.3)'
        : 'rgba(248, 250, 252, 0.5)',
    tooltip: {
      trigger: 'item',
      backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      textStyle: {
        color: colorScheme === 'dark' ? '#fff' : '#000',
        fontFamily: 'Arial, sans-serif',
      },
      formatter: function (p: any) {
        return `<strong>${p.name}</strong><br /><strong>${t('quantity')}</strong> : ${p.value}<br /><strong>${t('rate')}</strong> : ${p.percent}%`;
      },
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      bottom: 20,
      itemGap: 14,
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
    },

    series: [
      {
        name: t('tag'),
        type: 'pie',
        radius: '90%',
        center: ['50%', '45%'],
        data: chartData.map((item, index) => ({
          ...item,
          itemStyle: {
            color: COLORS[index % COLORS.length],
          },
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        mt: '32px',
        padding: '32px',
        overflow: 'hidden',
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(145deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        border:
          colorScheme === 'dark'
            ? '1px solid rgba(51, 65, 85, 0.3)'
            : '1px solid rgba(226, 232, 240, 0.4)',
        borderRadius: '24px',
        boxShadow:
          colorScheme === 'dark'
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(148, 163, 184, 0.1)'
            : '0 25px 50px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background:
            colorScheme === 'dark'
              ? 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.8), transparent)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow:
            colorScheme === 'dark'
              ? '0 32px 64px -12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(148, 163, 184, 0.15)'
              : '0 32px 64px -12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        },
      }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.03,
          background: `radial-gradient(circle at 20% 80%, ${colorScheme === 'dark' ? '#3b82f6' : '#8b5cf6'} 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, ${colorScheme === 'dark' ? '#10b981' : '#06b6d4'} 0%, transparent 50%),
                              radial-gradient(circle at 40% 40%, ${colorScheme === 'dark' ? '#f59e0b' : '#f97316'} 0%, transparent 50%)`,
        }}
      />
      <Box>
        <Typography
          sx={{
            fontSize: '28px',
            fontWeight: 700,
            background:
              colorScheme === 'dark'
                ? 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            letterSpacing: '-0.025em',
            mb: '8px',
          }}>
          {t('statisticsTags')}
        </Typography>
        <Box
          sx={{
            width: '60px',
            height: '4px',
            background: 'linear-gradient(90deg, #3b82f6, #10b981)',
            borderRadius: '2px',
            animation: 'shimmer 2s ease-in-out infinite alternate',
            '@keyframes shimmer': {
              '0%': { opacity: 0.5 },
              '100%': { opacity: 1 },
            },
          }}
        />
      </Box>
      <ReactECharts option={option} style={{ height: 500, width: '100%' }} />
    </Paper>
  );
};

export default TopicsChart;

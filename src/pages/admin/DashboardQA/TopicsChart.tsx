import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
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
    backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
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
        center: ['50%', '40%'],
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
        width: '100%',
        padding: '24px',
        mt: '24px',
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      }}>
      <Typography
        sx={{
          mb: '30px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>
        {t('statisticsTags')}
      </Typography>
      <ReactECharts option={option} style={{ height: 500, width: '100%' }} />
    </Paper>
  );
};

export default TopicsChart;

import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';
import { getDashboardTopTags } from './services';
import { useEffect, useState } from 'react';
export interface ITopicsDashboard {
  Topics: string;
  Count: number;
}

const TopicsChart = () => {
  const [topics, setTopics] = useState<ITopicsDashboard[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getDashboardTopTags();

        const mappedData = response.content.map((item: any) => ({
          Topics: item.name || 'Các chủ đề khác',
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
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      textStyle: {},
    },
    legend: {
      orient: 'horizontal',
      left: 'left',
      bottom: 20,
      itemGap: 14,
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
      },
    },

    series: [
      {
        name: 'Chủ đề',
        type: 'pie',
        radius: '90%',
        center: ['50%', '40%'],
        data: chartData,
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
      sx={{
        width: '100%',
        padding: '24px',
        mt: '24px',
      }}>
      <Typography
        sx={{
          mb: '30px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}>
        {'Thống kê chủ đề'}
      </Typography>
      <ReactECharts option={option} style={{ height: 500, width: '100%' }} />
    </Paper>
  );
};

export default TopicsChart;

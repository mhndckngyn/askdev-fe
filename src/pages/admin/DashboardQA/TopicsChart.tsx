import ReactECharts from 'echarts-for-react';
import { Paper, Typography } from '@mui/material';

export interface ITopicsDashboard {
  Topics: string;
  Count: number;
}

const TopicsChart = () => {
  const Topicss: ITopicsDashboard[] = [
    { Topics: 'ReactJS', Count: 30 },
    { Topics: 'NodeJS', Count: 25 },
    { Topics: 'TypeScript', Count: 15 },
    { Topics: 'NextJS', Count: 20 },
    { Topics: 'GraphQL', Count: 10 },
  ];

  const chartData =
    Topicss?.map((topic) => ({
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
      top: 'bottom',
      itemGap: 14,
      textStyle: {
        fontFamily: 'Arial, sans-serif',
      },
    },

    series: [
      {
        name: 'Chủ đề',
        type: 'pie',
        radius: '70%',
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

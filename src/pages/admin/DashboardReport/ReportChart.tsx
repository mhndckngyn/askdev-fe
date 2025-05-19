import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Paper, Typography } from '@mui/material';
import { getTotalReportsByType } from './services';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

export interface IReportDashboard {
  question: number;
  answer: number;
  comment: number;
}

const reportPieChart: React.FC = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const [report, setReport] = useState<IReportDashboard>({
    question: 0,
    answer: 0,
    comment: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTotalReportsByType();
        setReport(data.content);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const option = {
    textStyle: {
      fontFamily: 'Arial, sans-serif',
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    tooltip: {
      backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      trigger: 'item',
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
      formatter: function (p: any) {
        return `<strong>${p.name}</strong><br /><strong>${t('quantity')}</strong> : ${p.value}<br /><strong>${t('rate')}</strong> : ${p.percent}%`;
      },
    },
    legend: {
      top: 'bottom',
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
    },
    series: [
      {
        type: 'pie',
        radius: ['50%', '90%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
            color: colorScheme === 'dark' ? '#fff' : '#000',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: report?.question,
            name: t('question'),
            itemStyle: {
              color: '#66BB6A',
            },
          },
          {
            value: report?.answer,
            name: t('answer'),
            itemStyle: {
              color: '#EC407A',
            },
          },
          {
            value: report?.comment,
            name: t('comment'),
            itemStyle: {
              color: '#49a3f1',
            },
          },
        ],
      },
    ],
  };
  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        padding: '24px',
        height: '100%',
        mt: '24px',
        color: colorScheme === 'dark' ? '#fff' : '#000',
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'top',
        }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
          }}>
          {t('reportStatistics')}
        </Typography>
      </Box>
      <ReactECharts
        option={option}
        style={{ height: '450px', width: '100%' }}
      />
    </Paper>
  );
};

export default reportPieChart;

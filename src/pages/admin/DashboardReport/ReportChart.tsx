import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Paper, Typography } from '@mui/material';
import { getTotalReportsByType } from './services';

export interface IReportDashboard {
  question: number;
  answer: number;
  comment: number;
}

const reportPieChart: React.FC = () => {
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
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      top: 'bottom',
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        fontSize: 16,
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
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: report?.question,
            name: 'Câu hỏi',
            itemStyle: {
              color: '#66BB6A',
            },
          },
          {
            value: report?.answer,
            name: 'Trả lời',
            itemStyle: {
              color: '#EC407A',
            },
          },
          {
            value: report?.comment,
            name: 'Phản hồi',
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
      sx={{
        width: '100%',
        padding: '24px',
        height: '100%',
        mt: '24px',
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
          {'Thông kê báo cáo'}
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

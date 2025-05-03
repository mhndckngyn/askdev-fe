import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Paper, Typography } from '@mui/material';

export interface IReportDashboard {
  Question: number;
  Answer: number;
  COMMENT: number;
}

const reportPieChart: React.FC = () => {
  const report: IReportDashboard = {
    Question: 50,
    Answer: 30,
    COMMENT: 20,
  };

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
            value: report?.Question,
            name: 'Câu hỏi',
          },
          {
            value: report?.Answer,
            name: 'Trả lời',
          },
          {
            value: report?.COMMENT,
            name: 'Phản hồi',
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

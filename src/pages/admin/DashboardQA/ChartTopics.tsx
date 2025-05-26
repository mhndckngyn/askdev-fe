import React, { useState, useEffect } from 'react';

import {
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { getDashboardTopTagsInYear } from './services';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface ICountErrorReportsByType {
  tagName: string;
  postCount: number;
}

const Chart: React.FC = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState<ICountErrorReportsByType[]>([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const result = await getDashboardTopTagsInYear(selectedYear);
        setData(result.content ?? []);
      } catch (error) {
        console.error(error);
        setData([]);
      }
    };
    fetchTopTags();
  }, [selectedYear]);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(Number(event.target.value));
  };

  const reportData = data.map((item) => ({
    score: item.postCount,
    amount: item.postCount,
    type: item.tagName,
  }));

  const maxScore =
    reportData.length > 0
      ? Math.max(...reportData.map((item) => item.score))
      : 0;

  const option = {
    background:
      colorScheme === 'dark'
        ? 'rgba(30, 41, 59, 0.3)'
        : 'rgba(248, 250, 252, 0.5)',
    textStyle: {
      fontFamily: 'Arial, sans-serif',
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    dataset: {
      source: [
        ['score', 'amount', 'type'],
        ...reportData.map((item) => [item.score, item.amount, item.type]),
      ],
    },
    grid: {
      containLabel: true,
      top: '10%',
      left: '2%',
      right: '10%',
      bottom: '3%',
    },
    xAxis: {},
    yAxis: { type: 'category' },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      top: '0%',
      min: 0,
      max: maxScore,
      text: [t('high'), t('low')],
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
      dimension: 0,
      inRange: {
        color: ['#49a3f1', '#66BB6A', '#FB8C00', '#EC407A'],
      },
      itemHeight: '300',
    },
    tooltip: {
      backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      trigger: 'item',
      formatter: function (params: any) {
        return `<strong>${t('tag')}</strong> : ${params.value[2]}<br/><strong>${t('quantity')}</strong> : ${params.value[1]}`;
      },
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: colorScheme === 'dark' ? '#fff' : '#000',
      },
      feature: {
        saveAsImage: {
          show: true,
          title: 'Save as Image',
          pixelRatio: 2,
        },
      },
    },
    legend: {
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
    },
    series: [
      {
        barMaxWidth: 40,
        type: 'bar',
        encode: {
          x: 'amount',
          y: 'type',
        },
        itemStyle: {
          borderRadius: [0, 30, 30, 0],
        },
        emphasis: {
          itemStyle: {
            borderWidth: 2,
            shadowBlur: 20,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
          },
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
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          mb: '32px',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
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
            {t('postStatisticsByTagYear')}
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
        <FormControl sx={{ width: '120px' }}>
          <Select
            defaultValue={currentYear}
            onChange={handleYearChange}
            sx={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              color: colorScheme === 'dark' ? '#e2e8f0' : '#1e293b',
              background:
                colorScheme === 'dark'
                  ? 'rgba(51, 65, 85, 0.5)'
                  : 'rgba(226, 232, 240, 0.8)',
              backdropFilter: 'blur(12px)',
              border: 'none',
              borderRadius: '16px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

              '&:hover': {
                background:
                  colorScheme === 'dark'
                    ? 'rgba(51, 65, 85, 0.7)'
                    : 'rgba(255, 255, 255, 0.95)',
                transform: 'translateY(-1px)',
                boxShadow:
                  colorScheme === 'dark'
                    ? '0 12px 24px -4px rgba(0, 0, 0, 0.4)'
                    : '0 12px 24px -4px rgba(0, 0, 0, 0.15)',
              },

              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },

              '&.Mui-focused': {
                background:
                  colorScheme === 'dark'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : 'rgba(16, 185, 129, 0.05)',
                boxShadow:
                  colorScheme === 'dark'
                    ? '0 0 0 3px rgba(16, 185, 129, 0.2)'
                    : '0 0 0 3px rgba(16, 185, 129, 0.1)',
              },

              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent',
              },

              '& fieldset': {
                border: 'none',
              },

              '& .MuiSelect-icon': {
                color: colorScheme === 'dark' ? '#94a3b8' : '#64748b',
                transition: 'transform 0.2s ease',
              },

              '&.Mui-focused .MuiSelect-icon': {
                transform: 'rotate(180deg)',
                color: '#10b981',
              },

              '& .MuiInputBase-input': {
                padding: '14px 16px',
                color: colorScheme === 'dark' ? '#e2e8f0' : '#1e293b',
              },
            }}
            MenuProps={{
              PaperProps: {
                elevation: 0,
                sx: {
                  mt: '8px',
                  borderRadius: '16px',
                  padding: '8px',
                  minWidth: '120px',
                  background:
                    colorScheme === 'dark'
                      ? 'rgba(15, 23, 42, 0.95)'
                      : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border:
                    colorScheme === 'dark'
                      ? '1px solid rgba(51, 65, 85, 0.3)'
                      : '1px solid rgba(226, 232, 240, 0.4)',
                  boxShadow:
                    colorScheme === 'dark'
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  '& .MuiMenuItem-root': {
                    borderRadius: '12px',
                    margin: '2px 0',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    color: colorScheme === 'dark' ? '#cbd5e1' : '#475569',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background:
                        colorScheme === 'dark'
                          ? 'rgba(16, 185, 129, 0.15)'
                          : 'rgba(16, 185, 129, 0.08)',
                      color: '#10b981',
                      transform: 'translateX(2px)',
                    },
                    '&.Mui-selected': {
                      background:
                        colorScheme === 'dark'
                          ? 'rgba(16, 185, 129, 0.2)'
                          : 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontWeight: 600,
                      '&:hover': {
                        background:
                          colorScheme === 'dark'
                            ? 'rgba(16, 185, 129, 0.25)'
                            : 'rgba(16, 185, 129, 0.15)',
                      },
                    },
                  },
                },
              },
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'right',
              },
            }}>
            {[...Array(currentYear - 2022)].map((_, index) => {
              const year = currentYear - index;
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <ReactECharts option={option} style={{ height: 500, width: '100%' }} />
    </Paper>
  );
};

export default Chart;

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
import { useEffect, useState } from 'react';
import { getDashboardStatsInYear } from './services';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface IMonthlyStat {
  month: number;
  newPosts: number;
  totalPosts: number;
  newTags: number;
  totalTags: number;
}

const Chart = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [monthlyStats, setMonthlyStats] = useState<IMonthlyStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStatsInYear(selectedYear);
        if (response.success) {
          setMonthlyStats(response.content);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [selectedYear]);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'tag'>(
    'all',
  );

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as 'all' | 'post' | 'tag');
  };

  const option = {
    barGap: '10%',
    background:
      colorScheme === 'dark'
        ? 'rgba(30, 41, 59, 0.3)'
        : 'rgba(248, 250, 252, 0.5)',
    textStyle: {
      fontFamily: 'Arial, sans-serif',
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    animation: true,
    animationDuration: 700,
    tooltip: {
      trigger: 'axis',
      backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      textStyle: {
        color: colorScheme === 'dark' ? '#fff' : '#000',
        fontFamily: 'Arial, sans-serif',
      },
    },
    legend: {
      data:
        selectedType === 'all'
          ? [t('newPosts'), t('currentPosts'), t('newTags'), t('currentTags')]
          : selectedType === 'post'
            ? [t('newPosts'), t('currentPosts')]
            : [t('newTags'), t('currentTags')],
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
      itemGap: 30,
    },
    toolbox: {
      show: true,
      iconStyle: {
        borderColor: colorScheme === 'dark' ? '#fff' : '#000',
      },
      feature: {
        magicType: { show: true, type: ['line', 'bar'] },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: '2%',
      right: '5.5%',
      bottom: '3%',
      containLabel: true,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          lineStyle: {},
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        data: [
          t('month.1'),
          t('month.2'),
          t('month.3'),
          t('month.4'),
          t('month.5'),
          t('month.6'),
          t('month.7'),
          t('month.8'),
          t('month.9'),
          t('month.10'),
          t('month.11'),
          t('month.12'),
        ],
      },
    ],
    yAxis: [
      {
        axisLine: {
          lineStyle: {},
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
          },
        },
        type: 'value',
      },
    ],
    series:
      selectedType === 'all'
        ? [
            {
              name: t('newPosts'),
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => monthlyStats[i]?.newPosts || 0,
              ),
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              barWidth: '22%',
              itemStyle: {
                color: '#FB8C00',
                borderRadius: [6, 6, 0, 0],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: { fontSize: 11, fontWeight: 'bold' },
              },
            },
            {
              name: t('currentPosts'),
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => monthlyStats[i]?.totalPosts || 0,
              ),
              barWidth: '22%',
              itemStyle: {
                color: '#EC407A',
                borderRadius: [6, 6, 0, 0],
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: { fontSize: 11, fontWeight: 'bold' },
              },
            },
            {
              name: t('newTags'),
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => monthlyStats[i]?.newTags || 0,
              ),
              barWidth: '22%',
              itemStyle: {
                color: '#49a3f1',
                borderRadius: [6, 6, 0, 0],
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: { fontSize: 11, fontWeight: 'bold' },
              },
            },
            {
              name: t('currentTags'),
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => monthlyStats[i]?.totalTags || 0,
              ),
              barWidth: '22%',
              itemStyle: {
                color: '#66BB6A',
                borderRadius: [6, 6, 0, 0],
              },
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' },
                ],
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }],
                label: { fontSize: 11, fontWeight: 'bold' },
              },
            },
          ]
        : selectedType === 'post'
          ? [
              {
                name: t('newPosts'),
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => monthlyStats[i]?.newPosts || 0,
                ),
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                barWidth: '22%',
                itemStyle: {
                  color: '#FB8C00',
                  borderRadius: [6, 6, 0, 0],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                  label: { fontSize: 11, fontWeight: 'bold' },
                },
              },
              {
                name: t('currentPosts'),
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => monthlyStats[i]?.totalPosts || 0,
                ),
                barWidth: '22%',
                itemStyle: {
                  color: '#EC407A',
                  borderRadius: [6, 6, 0, 0],
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                  label: { fontSize: 11, fontWeight: 'bold' },
                },
              },
            ]
          : [
              {
                name: t('newTags'),
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => monthlyStats[i]?.newTags || 0,
                ),
                barWidth: '22%',
                itemStyle: {
                  color: '#49a3f1',
                  borderRadius: [6, 6, 0, 0],
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                  label: { fontSize: 11, fontWeight: 'bold' },
                },
              },
              {
                name: t('currentTags'),
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => monthlyStats[i]?.totalTags || 0,
                ),
                barWidth: '22%',
                itemStyle: {
                  color: '#66BB6A',
                  borderRadius: [6, 6, 0, 0],
                },
                markPoint: {
                  data: [
                    { type: 'max', name: 'Max' },
                    { type: 'min', name: 'Min' },
                  ],
                },
                markLine: {
                  data: [{ type: 'average', name: 'Avg' }],
                  label: { fontSize: 11, fontWeight: 'bold' },
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
            {t('yearlyStats')}
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

        <Box sx={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <FormControl sx={{ width: '140px' }}>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
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
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                  boxShadow:
                    colorScheme === 'dark'
                      ? '0 0 0 3px rgba(59, 130, 246, 0.2)'
                      : '0 0 0 3px rgba(59, 130, 246, 0.1)',
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
                  color: '#3b82f6',
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
                    minWidth: '140px',
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
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(59, 130, 246, 0.08)',
                        color: '#3b82f6',
                        transform: 'translateX(2px)',
                      },
                      '&.Mui-selected': {
                        background:
                          colorScheme === 'dark'
                            ? 'rgba(59, 130, 246, 0.2)'
                            : 'rgba(59, 130, 246, 0.1)',
                        color: '#3b82f6',
                        fontWeight: 600,
                        '&:hover': {
                          background:
                            colorScheme === 'dark'
                              ? 'rgba(59, 130, 246, 0.25)'
                              : 'rgba(59, 130, 246, 0.15)',
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
              {[
                { label: t('all'), value: 'all' },
                { label: t('post'), value: 'post' },
                { label: t('tag'), value: 'tag' },
              ].map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          borderRadius: '20px',
          overflow: 'hidden',

          padding: '8px',
        }}>
        <ReactECharts
          option={option}
          key={`${selectedYear}-${selectedType}`}
          style={{
            height: 480,
            width: '100%',
            borderRadius: '16px',
          }}
        />
      </Box>
    </Paper>
  );
};

export default Chart;

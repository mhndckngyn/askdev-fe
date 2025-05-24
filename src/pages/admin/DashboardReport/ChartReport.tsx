import {
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import { getDailyReportStatsByMonthYear } from './services';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface IMonthlyStat {
  question: number[];
  answer: number[];
  comment: number[];
}

const Chart = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const currentYear = new Date();
  const [selectedYear, setSelectedYear] = useState(currentYear.getFullYear());
  const [selectedType, setSelectedType] = useState<
    'ALL' | 'QUESTION' | 'ANSWER' | 'COMMENT'
  >('ALL');
  const [currentMonth, setCurrentMonth] = useState(currentYear.getMonth() + 1);
  const [monthlyStat, setMonthlyStat] = useState<IMonthlyStat | null>(null);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setCurrentMonth(event.target.value as number);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(
      event.target.value as 'ALL' | 'QUESTION' | 'ANSWER' | 'COMMENT',
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDailyReportStatsByMonthYear(
          currentMonth,
          selectedYear,
        );
        setMonthlyStat(response.content);
      } catch (error) {
        console.error(error);
        setMonthlyStat(null);
      }
    };

    fetchData();
  }, [selectedYear, currentMonth]);

  const generateChartData = (): [string, number][] => {
    const daysInMonth = new Date(selectedYear, currentMonth, 0).getDate();
    const monthData = monthlyStat;

    const question = monthData?.question ?? [];
    const answer = monthData?.answer ?? [];
    const comment = monthData?.comment ?? [];

    const result: [string, number][] = [];

    for (let i = 0; i < daysInMonth; i++) {
      let value = 0;
      switch (selectedType) {
        case 'QUESTION':
          value = question[i] ?? 0;
          break;
        case 'ANSWER':
          value = answer[i] ?? 0;
          break;
        case 'COMMENT':
          value = comment[i] ?? 0;
          break;
        case 'ALL':
          value = (question[i] ?? 0) + (answer[i] ?? 0) + (comment[i] ?? 0);
          break;
      }

      const day = String(i + 1).padStart(2, '0');
      const month = String(currentMonth).padStart(2, '0');
      result.push([`${selectedYear}-${month}-${day}`, value]);
    }

    return result;
  };

  const chartData = generateChartData();

  const values = chartData.map((item) => item[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const option = {
    textStyle: {
      fontFamily: 'Arial, sans-serif',
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },

    tooltip: {
      backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      position: 'top',
      textStyle: {
        fontFamily: 'Arial, sans-serif',
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
      formatter: function (p: any) {
        const format = echarts.time.format(p.data[0], `{dd}`, false);
        return `<strong>${t('dayWithNumber')}</strong> : ${format}<br /><strong>${t('quantity')}</strong> : ${p.data[1]}`;
      },
    },

    visualMap: {
      min: min,
      max: max,
      calculable: true,
      orient: 'vertical',
      right: '20',
      top: 'center',
      color: ['#EC407A', '#FB8C00', '#66BB6A', '#49a3f1'],
      textStyle: {
        color: colorScheme === 'dark' ? '#fff' : '#000',
      },
    },

    calendar: [
      {
        orient: 'vertical',
        range: [
          `${selectedYear}-${String(currentMonth).padStart(2, '0')}-01`,
          `${selectedYear}-${String(currentMonth).padStart(2, '0')}-${new Date(selectedYear, currentMonth, 0).getDate()}`,
        ],
        cellSize: ['auto', 40],
        splitLine: {
          show: false,
        },

        itemStyle: {
          borderWidth: 0,
        },
        splitArea: {
          show: false,
        },

        yearLabel: {
          show: false,
        },
        monthLabel: {
          show: false,
        },

        top: '10%',
        left: '6%',
        width: '80%',
        height: '80%',
        dayLabel: {
          color: colorScheme === 'dark' ? '#fff' : '#000',
          show: true,
          nameMap: Array.from({ length: 7 }, (_, index) =>
            t(`day.${index}` as any),
          ),
          margin: 20,
          fontSize: 16,
        },
        backgroundColor: colorScheme === 'dark' ? '#222' : '#f0f0f0',
      },
    ],
    series: [
      {
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: chartData,
        label: {
          show: true,
          color: colorScheme === 'dark' ? '#fff' : '#000',
          fontSize: 14,
          position: 'inside',
          formatter: function (param: any) {
            const dayOfMonth = echarts.time.format(
              param.data[0],
              '{dd}',
              false,
            );

            return dayOfMonth;
          },
        },
        itemStyle: {
          borderRadius: 16,
          borderWidth: 12,
          borderColor: colorScheme === 'dark' ? 'rgba(22, 32, 50)' : '#ffffff',
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
            {t('reportStatisticsByMonth')}
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

        <Box sx={{ display: 'flex', gap: '12px' }}>
          <FormControl sx={{ width: '120px' }}>
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
                { label: t('all'), value: 'ALL' },
                { label: t('question'), value: 'QUESTION' },
                { label: t('answer'), value: 'ANSWER' },
                { label: t('comment'), value: 'COMMENT' },
              ].map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ width: '130px' }}>
            <Select
              defaultValue={currentMonth}
              onChange={handleMonthChange}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                color: colorScheme === 'dark' ? '#e2e8f0' : '#FDBA74',
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
                      ? 'rgba(253, 186, 116, 0.1)'
                      : 'rgba(253, 186, 116, 0.05)',
                  boxShadow:
                    colorScheme === 'dark'
                      ? '0 0 0 3px rgba(253, 186, 116, 0.2)'
                      : '0 0 0 3px rgba(253, 186, 116, 0.1)',
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
                  color: ' #b45309',
                },

                '& .MuiInputBase-input': {
                  padding: '14px 16px',
                  color: colorScheme === 'dark' ? '#e2e8f0' : ' #1e293b',
                },
              }}
              MenuProps={{
                MenuListProps: {
                  sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
                  },
                },
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
                            ? 'rgba(253, 186, 116 ,0.15)'
                            : 'rgba(253, 186, 116, 0.08)',
                        color: '#b45309',
                        transform: 'translateX(2px)',
                      },
                      '&.Mui-selected': {
                        background:
                          colorScheme === 'dark'
                            ? 'rgba(253, 186, 116, 0.2)'
                            : 'rgba(253, 186, 116, 0.1)',
                        color: '#b45309',
                        fontWeight: 600,
                        '&:hover': {
                          background:
                            colorScheme === 'dark'
                              ? 'rgba(253, 186, 116, 0.25)'
                              : 'rgba(253, 186, 116, 0.15)',
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
              {Array.from({ length: 12 }, (_, index) => {
                const month = index + 1;
                return (
                  <MenuItem key={month} value={month}>
                    {t(`month.${month}` as any)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ width: '90px' }}>
            <Select
              defaultValue={currentYear.getFullYear()}
              onChange={handleYearChange}
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '14px',
                color: colorScheme === 'dark' ? '#e2e8f0' : '#FDBA74',
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
                  color: colorScheme === 'dark' ? ' #94a3b8' : ' #64748b',
                  transition: 'transform 0.2s ease',
                },

                '&.Mui-focused .MuiSelect-icon': {
                  transform: 'rotate(180deg)',
                  color: ' #10b981',
                },

                '& .MuiInputBase-input': {
                  padding: '14px 16px',
                  color: colorScheme === 'dark' ? '#e2e8f0' : ' #1e293b',
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
                        color: ' #10b981',
                        transform: 'translateX(2px)',
                      },
                      '&.Mui-selected': {
                        background:
                          colorScheme === 'dark'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : 'rgba(16, 185, 129, 0.1)',
                        color: ' #10b981',
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
              {[...Array(currentYear.getFullYear() - 2022)].map((_, index) => {
                const year = currentYear.getFullYear() - index;
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

      <ReactECharts
        option={option}
        key={`${selectedYear}-${currentMonth}-${selectedType}`}
        style={{
          height: 450,
          width: '100%',
        }}
      />
    </Paper>
  );
};

export default Chart;

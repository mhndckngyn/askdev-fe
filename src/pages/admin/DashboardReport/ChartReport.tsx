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
    backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
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
          borderColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        },
      },
    ],
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        mt: '24px',
        padding: '24px 24px 15px',
        overflow: 'hidden',
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          mb: '24px',
          justifyContent: 'space-between',
        }}>
        <Box>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: colorScheme === 'dark' ? '#fff' : '#000',
            }}>
            {t('reportStatisticsByMonth')}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '12px' }}>
          <FormControl sx={{ width: '120px' }}>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              sx={{
                color: colorScheme === 'dark' ? '#fff' : '#000',

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#bbb' : '#333',
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#4caf50' : '#1976d2',
                  borderWidth: '2px',
                },

                '& fieldset': {
                  borderRadius: '8px',
                  borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
                },

                '& .MuiSelect-icon': {
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },

                '& .MuiInputBase-input': {
                  padding: '10px',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },
              }}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    width: '120px',
                    mt: '2px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                    backgroundColor:
                      colorScheme === 'dark' ? '#121212' : '#fff',
                    backgroundPosition: 'top right, bottom left',
                    backgroundSize: '50%, 50%',
                    backgroundRepeat: 'no-repeat',
                    backdropFilter: 'blur(20px)',
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
                <MenuItem
                  key={item.value}
                  value={item.value}
                  sx={{
                    borderRadius: '6px',
                    '&:last-child': {
                      mt: '3px',
                    },
                  }}>
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
                color: colorScheme === 'dark' ? '#fff' : '#000',

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#bbb' : '#333',
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#4caf50' : '#1976d2',
                  borderWidth: '2px',
                },

                '& fieldset': {
                  borderRadius: '8px',
                  borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
                },

                '& .MuiSelect-icon': {
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },

                '& .MuiInputBase-input': {
                  padding: '10px',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },
              }}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    mt: '2px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    backgroundPosition: 'top right, bottom left',
                    backgroundSize: '50%, 50%',
                    backgroundRepeat: 'no-repeat',
                    backdropFilter: 'blur(20px)',
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                    backgroundColor:
                      colorScheme === 'dark' ? '#121212' : '#fff',
                  },
                },
                MenuListProps: {
                  sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 2,
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
                  <MenuItem
                    key={month}
                    value={month}
                    sx={{
                      borderRadius: '6px',
                      '&:last-child': {
                        mt: '3px',
                      },
                    }}>
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
                color: colorScheme === 'dark' ? '#fff' : '#000',

                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#bbb' : '#333',
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colorScheme === 'dark' ? '#4caf50' : '#1976d2',
                  borderWidth: '2px',
                },

                '& fieldset': {
                  borderRadius: '8px',
                  borderColor: colorScheme === 'dark' ? '#666' : '#ccc',
                },

                '& .MuiSelect-icon': {
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },

                '& .MuiInputBase-input': {
                  padding: '10px',
                  color: colorScheme === 'dark' ? '#fff' : '#000',
                },
              }}
              MenuProps={{
                PaperProps: {
                  elevation: 0,
                  sx: {
                    width: '120px',
                    mt: '2px',
                    borderRadius: '8px',
                    padding: '0 8px',
                    color: colorScheme === 'dark' ? '#fff' : '#000',
                    backgroundColor:
                      colorScheme === 'dark' ? '#121212' : '#fff',
                    backgroundPosition: 'top right, bottom left',
                    backgroundSize: '50%, 50%',
                    backgroundRepeat: 'no-repeat',
                    backdropFilter: 'blur(20px)',
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
                  <MenuItem
                    key={year}
                    value={year}
                    sx={{
                      borderRadius: '6px',
                      '&:last-child': {
                        mt: '3px',
                      },
                    }}>
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
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        }}
      />
    </Paper>
  );
};

export default Chart;

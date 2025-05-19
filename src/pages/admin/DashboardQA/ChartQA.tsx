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
    backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
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
        width: '100%',
        mt: '24px',
        padding: '24px 24px 15px',
        overflow: 'hidden',
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        color: colorScheme === 'dark' ? '#fff' : '#000',
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
            {t('yearlyStats')}
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
                { label: t('all'), value: 'all' },
                { label: t('post'), value: 'post' },
                { label: t('tag'), value: 'tag' },
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

          <FormControl sx={{ width: '90px' }}>
            <Select
              defaultValue={currentYear}
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
              {[...Array(currentYear - 2022)].map((_, index) => {
                const year = currentYear - index;
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
        key={`${selectedYear}-${selectedType}`}
        style={{ height: 450, width: '100%' }}
      />
    </Paper>
  );
};

export default Chart;

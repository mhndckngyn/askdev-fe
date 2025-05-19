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
        setData(result.content);
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
    backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
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
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        width: '100%',
        mt: '24px',
        padding: '24px 24px 15px',
        overflow: 'hidden',
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
            }}>
            {t('postStatisticsByTagYear')}
          </Typography>
        </Box>
        <FormControl sx={{ width: '100px' }}>
          <Select
            value={selectedYear}
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
                  backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff',
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
      <ReactECharts option={option} style={{ height: 500, width: '100%' }} />
    </Paper>
  );
};

export default Chart;

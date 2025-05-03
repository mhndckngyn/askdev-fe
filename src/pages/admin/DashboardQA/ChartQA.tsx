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
import { useState } from 'react';

interface IMonthlyStat {
  Month: number;
  newPosts: number;
  currentPosts: number;
  newTopics: number;
  currentTopics: number;
}

const mockData: Record<number, IQAStatsByYearsQuery> = {
  2024: {
    MonthlyStats: Array.from({ length: 12 }, (_, index) => ({
      Month: index + 1,
      newPosts: Math.floor(Math.random() * 10) + 1,
      currentPosts: Math.floor(Math.random() * 10),
      newTopics: Math.floor(Math.random() * 20) + 5,
      currentTopics: Math.floor(Math.random() * 20) + 5,
    })),
  },
  2025: {
    MonthlyStats: Array.from({ length: 12 }, (_, index) => ({
      Month: index + 1,
      newPosts: Math.floor(Math.random() * 8) + 2,
      currentPosts: Math.floor(Math.random() * 6),
      newTopics: Math.floor(Math.random() * 15) + 10,
      currentTopics: Math.floor(Math.random() * 15) + 8,
    })),
  },
};

interface IQAStatsByYearsQuery {
  MonthlyStats: IMonthlyStat[];
}

const Chart = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const data = mockData[selectedYear];

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const [selectedType, setSelectedType] = useState<'all' | 'post' | 'topic'>(
    'all',
  );

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value as 'all' | 'post' | 'topic');
  };

  const option = {
    barGap: '10%',
    textStyle: {
      fontFamily: 'Arial, sans-serif',
    },
    animation: true,
    animationDuration: 700,
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data:
        selectedType === 'all'
          ? [
              'Số bài đăng mới',
              'Số bài đăng hiện tại',
              'Số chủ đề mới',
              'Số chủ đề hiện tại',
            ]
          : selectedType === 'post'
            ? ['Số bài đăng mới', 'Số bài đăng hiện tại']
            : ['Số chủ đề mới', 'Số chủ đề hiện tại'],
      textStyle: {
        fontFamily: 'Arial, sans-serif',
      },
      itemGap: 30,
    },
    toolbox: {
      show: true,
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
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
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
              name: 'Số bài đăng mới',
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => data?.MonthlyStats[i]?.newPosts || 0,
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
              name: 'Số bài đăng hiện tại',
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => data?.MonthlyStats[i]?.currentPosts || 0,
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
              name: 'Số chủ đề mới',
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => data?.MonthlyStats[i]?.newTopics || 0,
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
              name: 'Số chủ đề hiện tại',
              type: 'bar',
              data: Array.from(
                { length: 12 },
                (_, i) => data?.MonthlyStats[i]?.currentTopics || 0,
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
                name: 'Số bài đăng mới',
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => data?.MonthlyStats[i]?.newPosts || 0,
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
                name: 'Số bài đăng hiện tại',
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => data?.MonthlyStats[i]?.currentPosts || 0,
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
                name: 'Số chủ đề mới',
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => data?.MonthlyStats[i]?.newTopics || 0,
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
                name: 'Số chủ đề hiện tại',
                type: 'bar',
                data: Array.from(
                  { length: 12 },
                  (_, i) => data?.MonthlyStats[i]?.currentTopics || 0,
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
      sx={{
        width: '100%',
        mt: '24px',
        padding: '24px 24px 15px',
        overflow: 'hidden',
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
              color: 'black',
            }}>
            {'Thông kê số bài đăng và chủ đề theo năm'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '12px' }}>
          <FormControl sx={{ width: '140px' }}>
            <Select
              value={selectedType}
              onChange={handleTypeChange}
              sx={{
                '&:hover .MuiOutlinedInput-notchedOutline': {},
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {},
                '& fieldset': {
                  borderRadius: '8px',
                },
                '& .MuiSelect-icon': {},
                '& .MuiInputBase-input': {
                  padding: '10px',
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
                    backgroundImage:
                      'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
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
                { label: 'Tất cả', value: 'all' },
                { label: 'Bài đăng', value: 'post' },
                { label: 'Chủ đề', value: 'topic' },
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
                '&:hover .MuiOutlinedInput-notchedOutline': {},
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {},
                '& fieldset': {
                  borderRadius: '8px',
                },
                '& .MuiSelect-icon': {},
                '& .MuiInputBase-input': {
                  padding: '10px',
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
                    backgroundImage:
                      'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODYpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NiIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxMjAgMS44MTgxMmUtMDUpIHJvdGF0ZSgtNDUpIHNjYWxlKDEyMy4yNSkiPgo8c3RvcCBzdG9wLWNvbG9yPSIjMDBCOEQ5Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwQjhEOSIgc3RvcC1vcGFjaXR5PSIwIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==), url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSJ1cmwoI3BhaW50MF9yYWRpYWxfMjc0OV8xNDUxODcpIiBmaWxsLW9wYWNpdHk9IjAuMTIiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0icGFpbnQwX3JhZGlhbF8yNzQ5XzE0NTE4NyIgY3g9IjAiIGN5PSIwIiByPSIxIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEyMCkgcm90YXRlKDEzNSkgc2NhbGUoMTIzLjI1KSI+CjxzdG9wIHN0b3AtY29sb3I9IiNGRjU2MzAiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY1NjMwIiBzdG9wLW9wYWNpdHk9IjAiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K)',
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

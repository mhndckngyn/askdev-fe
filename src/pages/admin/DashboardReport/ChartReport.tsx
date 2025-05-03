import {
  MenuItem,
  FormControl,
  Select,
  Box,
  Paper,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

interface IMonthlyStat {
  question: number[];
  answer: number[];
  comment: number[];
}

const mockData: Record<number, Record<number, IMonthlyStat>> = {
  2025: {
    5: {
      question: Array.from({ length: 31 }, () =>
        Math.floor(Math.random() * 10),
      ),
      answer: Array.from({ length: 31 }, () => Math.floor(Math.random() * 5)),
      comment: Array.from({ length: 31 }, () => Math.floor(Math.random() * 8)),
    },
  },
};

const Chart = () => {
  const currentYear = new Date();
  const [selectedYear, setSelectedYear] = useState(currentYear.getFullYear());

  const [currentMonth, setCurrentMonth] = useState(currentYear.getMonth() + 1);

  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setCurrentMonth(event.target.value as number);
  };

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setSelectedYear(event.target.value as number);
  };

  const [selectedType, setSelectedType] = useState<
    'ALL' | 'QUESTION' | 'ANSWER' | 'COMMENT'
  >('ALL');

  const handleTypeChange = (event: SelectChangeEvent) => {
    setSelectedType(
      event.target.value as 'ALL' | 'QUESTION' | 'ANSWER' | 'COMMENT',
    );
  };

  const generateChartData = (): [string, number][] => {
    const daysInMonth = new Date(selectedYear, currentMonth, 0).getDate();
    const monthData = mockData[selectedYear]?.[currentMonth];

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
    backgroundColor: '#fff',
    tooltip: {
      position: 'top',
      formatter: function (p: any) {
        const format = echarts.time.format(p.data[0], ' Ngày ' + '{dd}', false);
        return format + ' (' + p.data[1] + ')';
      },
    },
    visualMap: {
      min: min,
      max: max,
      calculable: true,
      orient: 'vertical',
      right: '20',
      top: 'center',
      color: ['#EC407A', '#FB8C00', '#49a3f1', '#66BB6A'],
    },

    calendar: [
      {
        orient: 'vertical',
        range: [
          `${selectedYear}-${String(currentMonth).padStart(2, '0')}-01`,
          `${selectedYear}-${String(currentMonth).padStart(2, '0')}-${new Date(selectedYear, currentMonth, 0).getDate()}`,
        ],
        cellSize: ['auto', 20],
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
          show: true,
          nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          margin: 20,
          fontSize: 16,
        },
      },
    ],
    series: [
      {
        type: 'heatmap',
        coordinateSystem: 'calendar',
        calendarIndex: 0,
        data: chartData,
        label: {
          show: true,
          color: '#000',
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
          borderWidth: 8,
          borderColor: '#fff',
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
            {'Thông kê số báo cáo theo tháng'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: '12px' }}>
          <FormControl sx={{ width: '110px' }}>
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
                { label: 'Tất cả', value: 'ALL' },
                { label: 'Câu hỏi', value: 'QUESTION' },
                { label: 'Trả lời', value: 'ANSWER' },
                { label: 'Phản hồi', value: 'COMMENT' },
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

          <FormControl sx={{ width: '110px' }}>
            <Select
              defaultValue={currentMonth}
              onChange={handleMonthChange}
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
                    Tháng {month}
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
        key={`${selectedYear}-${setCurrentMonth}-${selectedType}`}
        style={{ height: 450, width: '100%' }}
      />
    </Paper>
  );
};

export default Chart;

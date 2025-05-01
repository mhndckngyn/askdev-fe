import ReportsBarChart from './ReportsBarChart';
import Box from '@mui/material/Box';

const chartData = {
  colors: 'green',
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: {
    label: 'Monthly Sales',
    data: [30, 45, 50, 60, 40],
  },
};

export default function DashboardCharts() {
  return (
    <Box
      mt="25px"
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      width="100%"
      justifyContent="space-between">
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title="Số thành viên mới"
          description="Tăng 7% so với tuần trước"
          chart={{
            ...chartData,
            colors: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title="Số bài đăng"
          description="Tăng 7% so với tuần trước"
          chart={{
            ...chartData,
            colors: 'linear-gradient(195deg, #EC407A, #D81B60)',
          }}
        />
      </Box>
      <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
        <ReportsBarChart
          title="Số báo cáo"
          description="Tăng 7% so với tuần trước"
          chart={{
            ...chartData,
            colors: 'linear-gradient(195deg, #66BB6A, #43A047)',
          }}
        />
      </Box>
    </Box>
  );
}

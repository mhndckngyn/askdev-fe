import Box from '@mui/material/Box';
import DashboardStats from './Statistics/DashboardStats';
import ChartEmployee from './ChartQA';
import ChartTopics from './ChartTopics';
import TopicsChart from './TopicsChart';
export default function Dashboard() {
  return (
    <Box width="100%">
      <DashboardStats />
      <ChartEmployee />
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'calc(100% / 3 * 2 - 8px) calc(100% / 3 - 16px)',
          gap: '24px',
         
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <ChartTopics />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <TopicsChart />
        </Box>
      </Box>
    </Box>
  );
}

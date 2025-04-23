import Box from '@mui/material/Box';
import DashboardCharts from './Charts/DashboardCharts';
import DashboardStats from './Statistics/DashboardStats';
import Rank from './RankSubject';
import Ran from './RankUsers';
export default function Homepage() {
  return (
    <Box>
      <DashboardStats />
      <DashboardCharts />
      <Box mt="25px" display="flex" width="100%" gap="1rem">
        <Box sx={{ flex: '2', marginRight: '25px' }}>
          <Rank />
        </Box>
        <Box sx={{ flex: '1' }}>
          <Ran />
        </Box>
      </Box>
    </Box>
  );
}

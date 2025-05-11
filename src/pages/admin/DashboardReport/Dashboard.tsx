import Box from '@mui/material/Box';
import DashboardStats from './Statistics/DashboardStats';
import ChartReport from './ChartReport';
import ReportChart from './ReportChart';

export default function DashboardReport() {
  return (
    <Box width="100%">
      <DashboardStats />
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
          <ChartReport />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <ReportChart />
        </Box>
      </Box>
    </Box>
  );
}

import ComplexStatisticsCard from './ComplexStatisticsCard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CommentIcon from '@mui/icons-material/Comment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';

const DashboardStats = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      justifyContent="space-between">
      {[
        {
          title: 'Số báo cáo câu hỏi',
          count: 50,
          icon: <HelpOutlineIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
            amount: '+7%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số báo cáo câu trả lời',
          count: 120,
          icon: <CommentIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #EC407A, #D81B60)',
            amount: '+10%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số báo cáo phản hồi',
          count: 15,
          icon: <RateReviewIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            amount: '-5%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Tổng số báo cáo',
          count: 185,
          icon: <BarChartIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #66BB6A, #43A047)',
            amount: '+3%',
            label: 'So với tháng trước',
          },
        },
      ].map((item, index) => (
        <Box key={index} flex="1 1 250px" minWidth="250px" sx={{ flexGrow: 1 }}>
          <ComplexStatisticsCard
            title={item.title}
            count={item.count}
            icon={item.icon}
            percentage={item.percentage}
          />
        </Box>
      ))}
    </Box>
  );
};

export default DashboardStats;

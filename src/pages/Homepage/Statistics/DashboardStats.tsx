import ComplexStatisticsCard from './ComplexStatisticsCard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
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
          title: 'Số thành viên mới',
          count: 50,
          icon: <PersonAddIcon />,
          percentage: {
            color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
            amount: '+7%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số bài đăng',
          count: 120,
          icon: <PostAddIcon />,
          percentage: {
            color: 'linear-gradient(195deg, #EC407A, #D81B60)',
            amount: '+10%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số báo cáo',
          count: 15,
          icon: <ReportProblemIcon />,
          percentage: {
            color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            amount: '-5%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số thành viên hiện tại',
          count: 500,
          icon: <PeopleIcon />,
          percentage: {
            color: 'linear-gradient(195deg, #66BB6A, #43A047)',
            amount: '+3%',
            label: 'So với hôm qua',
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

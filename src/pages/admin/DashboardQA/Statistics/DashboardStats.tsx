import ComplexStatisticsCard from './ComplexStatisticsCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import GroupsIcon from '@mui/icons-material/AccountTree';
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
          title: 'Số bài đăng mới',
          count: 50,
          icon: <AddCircleOutlineIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
            amount: '+7%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số bài đăng hiện tại',
          count: 120,
          icon: <ArticleIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #EC407A, #D81B60)',
            amount: '+10%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số chủ đề mới',
          count: 15,
          icon: <LibraryAddIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            amount: '-5%',
            label: 'So với tháng trước',
          },
        },
        {
          title: 'Số chủ đề hiện tại',
          count: 500,
          icon: <GroupsIcon sx={{ marginBottom: '10px' }} />,
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

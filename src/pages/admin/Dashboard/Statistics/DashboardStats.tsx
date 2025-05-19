import ComplexStatisticsCard from './ComplexStatisticsCard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import { getDashboardGeneralStats } from '../services';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t } = useTranslation('adminDashboardPage');
  const [stats, setStats] = useState({
    totalNewUsers: 0,
    percentNewUsers: 0,
    totalPosts: 0,
    percentPosts: 0,
    totalReports: 0,
    percentReports: 0,
    totalUsers: 0,
    percentUsers: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardGeneralStats();
        if (data.success) {
          setStats(data.content);
          console.error(stats);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  }, []);

  const formatGrowth = (value: number | null) => {
    if (value === null || value === undefined) return 'N/A';
    const sign = value > 0 ? '+' : value < 0 ? '-' : '';
    return sign + Math.abs(value) + '%';
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      justifyContent="space-between">
      {[
        {
          title: t('newUsers'),
          count: stats.totalNewUsers,
          icon: <PersonAddIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
            amount: formatGrowth(stats.percentNewUsers),
            label: t('comparison'),
          },
        },
        {
          title: t('posts'),
          count: stats.totalPosts,
          icon: <PostAddIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #EC407A, #D81B60)',
            amount: formatGrowth(stats.percentPosts),
            label: t('comparison'),
          },
        },
        {
          title: t('reports'),
          count: stats.totalReports,
          icon: <ReportProblemIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            amount: formatGrowth(stats.percentReports),
            label: t('comparison'),
          },
        },
        {
          title: t('currentUsers'),
          count: stats.totalUsers,
          icon: <PeopleIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #66BB6A, #43A047)',
            amount: formatGrowth(stats.percentUsers),
            label: t('comparison'),
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

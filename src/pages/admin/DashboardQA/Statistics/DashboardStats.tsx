import { useEffect, useState } from 'react';
import ComplexStatisticsCard from './ComplexStatisticsCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import GroupsIcon from '@mui/icons-material/AccountTree';
import Box from '@mui/material/Box';
import { getDashboardStats } from '../services';
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t } = useTranslation('adminDashboardPage');
  const [stats, setStats] = useState({
    newPosts: 0,
    totalPosts: 0,
    postGrowthNew: 0,
    postGrowthCurrent: 0,
    newTags: 0,
    totalTags: 0,
    tagGrowthNew: 0,
    tagGrowthCurrent: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats();
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

  const items = [
    {
      title: t('newPosts'),
      count: stats.newPosts,
      icon: <AddCircleOutlineIcon sx={{ marginBottom: '10px' }} />,
      percentage: {
        color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
        amount: formatGrowth(stats.postGrowthNew),
        label: t('comparison'),
      },
    },
    {
      title: t('currentPosts'),
      count: stats.totalPosts,
      icon: <ArticleIcon sx={{ marginBottom: '10px' }} />,
      percentage: {
        color: 'linear-gradient(195deg, #EC407A, #D81B60)',
        amount: formatGrowth(stats.postGrowthCurrent),
        label: t('comparison'),
      },
    },
    {
      title: t('newTags'),
      count: stats.newTags,
      icon: <LibraryAddIcon sx={{ marginBottom: '10px' }} />,
      percentage: {
        color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
        amount: formatGrowth(stats.tagGrowthNew),
        label: t('comparison'),
      },
    },
    {
      title: t('currentTags'),
      count: stats.totalTags,
      icon: <GroupsIcon sx={{ marginBottom: '10px' }} />,
      percentage: {
        color: 'linear-gradient(195deg, #66BB6A, #43A047)',
        amount: formatGrowth(stats.tagGrowthCurrent),
        label: t('comparison'),
      },
    },
  ];

  return (
    <Box
      width="100%"
      display="flex"
      flexWrap="wrap"
      gap="1rem"
      justifyContent="space-between">
      {items.map((item, index) => (
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

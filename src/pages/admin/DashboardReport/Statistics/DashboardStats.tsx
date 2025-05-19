import ComplexStatisticsCard from './ComplexStatisticsCard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CommentIcon from '@mui/icons-material/Comment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { getDashboardReportMonthlyStats } from '../services';
import { useTranslation } from 'react-i18next';

const DashboardStats = () => {
  const { t } = useTranslation('adminDashboardPage');
  const [stats, setStats] = useState({
    questionReports: 0,
    questionGrowth: 0,
    answerReports: 0,
    answerGrowth: 0,
    commentReports: 0,
    commentGrowth: 0,
    totalReports: 0,
    growthPercent: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardReportMonthlyStats();
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
          title: t('reportQuestion'),
          count: stats.questionReports,
          icon: <HelpOutlineIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #66BB6A, #43A047)',
            amount: formatGrowth(stats.questionGrowth),
            label: t('comparison'),
          },
        },
        {
          title: t('reportAnswer'),
          count: stats.answerReports,
          icon: <CommentIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #EC407A, #D81B60)',
            amount: formatGrowth(stats.answerGrowth),
            label: t('comparison'),
          },
        },
        {
          title: t('reportComment'),
          count: stats.commentReports,
          icon: <RateReviewIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
            amount: formatGrowth(stats.commentGrowth),
            label: t('comparison'),
          },
        },
        {
          title: t('totalReports'),
          count: stats.totalReports,
          icon: <BarChartIcon sx={{ marginBottom: '10px' }} />,
          percentage: {
            color: 'linear-gradient(195deg, #FB8C00, #F57C00)',
            amount: formatGrowth(stats.growthPercent),
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

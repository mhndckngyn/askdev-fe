import { Box, Typography, Paper, Avatar, LinearProgress } from '@mui/material';

import { Star } from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type Contributor = {
  name: string;
  avatar: string;
  points: number;
  answers: number;
};

type ContributorspageProps = {
  topContributors: Contributor[];
};

export default function TopContributors({
  topContributors,
}: ContributorspageProps) {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useTranslation('home');
  const isDark = colorScheme === 'dark';

  const maxPoints = Math.max(...topContributors.map((c) => c.points), 1);
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        mb: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
        backdropFilter: 'blur(15px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
        borderRadius: 3,
      }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          color: isDark ? 'white' : 'text.primary',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
        <Star sx={{ color: '#ffd700' }} />
        {t('topContributors')}
      </Typography>

      {topContributors?.map((contributor, index) => (
        <Box
          key={index}
          sx={{
            alignItems: 'center',
            gap: 2,
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.5)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 1,
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}>
            <Avatar src={contributor.avatar} sx={{ width: 32, height: 32 }} />
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 'bold',
                  color: isDark ? 'white' : 'text.primary',
                }}>
                {contributor.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                }}>
                {contributor.points} {t('point')} • {contributor.answers}{' '}
                {t('answer')}
              </Typography>
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={(contributor.points / maxPoints) * 100}
            sx={{
              height: 4,
              borderRadius: 2,
              backgroundColor: isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4caf50',
              },
            }}
          />
        </Box>
      ))}
    </Paper>
  );
}

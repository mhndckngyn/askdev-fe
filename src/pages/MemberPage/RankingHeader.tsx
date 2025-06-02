import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface RankingHeaderProps {
  memberCount: number;
  onRefresh: () => void;
}

export const RankingHeader: React.FC<RankingHeaderProps> = ({
  memberCount,
  onRefresh,
}) => {
  const { t } = useTranslation('member');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        p: 4,
        background: isDark
          ? 'rgba(33, 37, 41, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 3,
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s infinite',
            }}>
            <TrophyIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Box>
            <Typography
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                fontFamily:
                  '"Inter", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 800,
                background: isDark
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'linear-gradient(135deg, #4ECDC4 0%, #FF6B6B 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}>
              {t('ranking.title')}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
                fontWeight: 500,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}>
              🏆 {t('ranking.subtitle')}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<PersonIcon />}
            label={t('ranking.memberCount', { count: memberCount })}
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                : 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              height: 40,
              '& .MuiChip-icon': { color: 'white' },
            }}
          />

          <Tooltip title={t('ranking.refresh')}>
            <IconButton
              onClick={onRefresh}
              sx={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
                color: 'white',
                width: 48,
                height: 48,
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

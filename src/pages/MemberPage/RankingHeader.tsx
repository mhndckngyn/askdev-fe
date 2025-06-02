import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  Fade,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

interface RankingHeaderProps {
  memberCount: number;
  onRefresh: () => void;
}

export const RankingHeader: React.FC<RankingHeaderProps> = ({
  memberCount,
  onRefresh,
}) => {
  return (
    <Fade in timeout={1000}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
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
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background:
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontSize: { xs: '2rem', sm: '3rem' },
                }}>
                Bảng Xếp Hạng
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                }}>
                🏆 Top thành viên xuất sắc nhất cộng đồng
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<PersonIcon />}
              label={`${memberCount} thành viên`}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                height: 40,
                '& .MuiChip-icon': { color: 'white' },
              }}
            />
            <Tooltip title="Làm mới dữ liệu">
              <IconButton
                onClick={onRefresh}
                sx={{
                  background:
                    'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
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
    </Fade>
  );
};

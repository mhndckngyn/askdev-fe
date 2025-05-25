import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  AvatarGroup,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Fade,
  Grow,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { getDashboardTopTagsStats } from './services';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface TopTag {
  rank: number;
  avatars: string[];
  tagName: string;
  questionCount: number;
  percentage: number;
}

// Smooth animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(1deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
`;

const slideInFromLeft = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const progressFill = keyframes`
  0% { width: 0%; }
  100% { width: var(--progress-width); }
`;

// Ultra-modern styled components
const MainContainer = styled(Card)(() => ({
  position: 'relative',
  background: 'transparent',
  backdropFilter: 'blur(40px)',
  borderRadius: '32px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  overflow: 'hidden',
  maxWidth: '100%',
  height: '820px',
  boxShadow: '0 32px 64px rgba(0, 0, 0, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.02) 100%)',
    pointerEvents: 'none',
  },
}));

const HeaderSection = styled(Box)(() => ({
  position: 'relative',
  padding: '32px 40px',
  background:
    'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '2px',
    background:
      'linear-gradient(90deg, transparent 0%, #6366f1 50%, transparent 100%)',
    animation: `${slideInFromLeft} 2s ease-out infinite`,
  },
}));

const StyledTable = styled(Table)(() => ({
  background: 'transparent',
  '& .MuiTableCell-root': {
    border: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  },
}));

const TableRowStyled = styled(TableRow)(() => ({
  position: 'relative',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateX(8px) scale(1.02)',
    background:
      'linear-gradient(90deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '60%',
      background: 'linear-gradient(180deg, #6366f1 0%, #a855f7 100%)',
      borderRadius: '0 8px 8px 0',
      opacity: 1,
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '4px',
    height: '0%',
    background: 'linear-gradient(180deg, #6366f1 0%, #a855f7 100%)',
    borderRadius: '0 8px 8px 0',
    opacity: 0,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

const RankBadge = styled(Box)(() => ({
  width: '48px',
  height: '48px',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '1.1rem',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background:
      'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.3) 90deg, transparent 180deg)',
    animation: 'spin 3s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
}));

const TagContainer = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-block',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    borderRadius: '20px',
    background:
      'linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const TagChip = styled(Chip)(() => ({
  fontWeight: 600,
  fontSize: '0.95rem',
  borderRadius: '18px',
  padding: '12px 20px',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const AvatarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiAvatarGroup-root': {
    '& .MuiAvatar-root': {
      width: 40,
      height: 40,
      border: '2px solid rgba(255, 255, 255, 0.15)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #6366f1, #a855f7, #ec4899)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: -1,
      },
      '&:hover': {
        transform: 'scale(1.2) translateY(-4px)',
        zIndex: 10,
        '&::after': {
          opacity: 1,
        },
      },
    },
  },
}));

const CountDisplay = styled(Typography)(() => ({
  fontWeight: 700,
  fontSize: '1.3rem',
  background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-4px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0%',
    height: '2px',
    background: 'linear-gradient(90deg, #6366f1, #a855f7)',
    borderRadius: '1px',
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '80%',
  },
}));

const ProgressContainer = styled(Box)(() => ({
  position: 'relative',
  padding: '8px 0',
}));

const ProgressBar = styled(Box)<{ isDark?: boolean }>(({ isDark }) => ({
  width: '100%',
  height: '16px',
  borderRadius: '12px',
  background: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.12)',
  overflow: 'hidden',
  position: 'relative',
  backdropFilter: 'blur(10px)',
  border: isDark
    ? '1px solid rgba(255, 255, 255, 0.1)'
    : '1px solid rgba(0, 0, 0, 0.15)',
  boxShadow: isDark
    ? 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
    : 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
}));

const ProgressFill = styled(Box)(() => ({
  height: '100%',
  borderRadius: '12px',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background:
      'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
    animation: 'shimmer 2s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  },
}));

const PercentageText = styled(Typography)<{ isDark?: boolean }>(
  ({ isDark }) => ({
    fontWeight: 700,
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '8px',
    background: isDark
      ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
      : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }),
);

const TopicTable: React.FC = () => {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useTranslation('adminDashboardPage');
  const [data, setData] = useState<TopTag[]>([]);

  const getRankColors = (rank: number) => {
    if (rank === 1) return 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)';
    if (rank === 2) return 'linear-gradient(135deg, #c0c0c0 0%, #87ceeb 100%)';
    if (rank === 3) return 'linear-gradient(135deg, #cd7f32 0%, #daa520 100%)';
    return 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)';
  };

  const getProgressGradient = (percentage: number) => {
    if (percentage > 75)
      return 'linear-gradient(90deg, #ff6b6b 0%, #ee5a6f 100%)';
    if (percentage > 50)
      return 'linear-gradient(90deg, #ffd93d 0%, #ff6b6b 100%)';
    if (percentage > 25)
      return 'linear-gradient(90deg, #6bcf7f 0%, #4d9fff 100%)';
    return 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)';
  };

  const getTagGradient = (index: number) => {
    const gradients = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      'linear-gradient(135deg, #ff8177 0%, #ff867a 100%)',
      'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)',
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const response = await getDashboardTopTagsStats();
        if (response.success) {
          setData(response.content);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopTags();
  }, []);

  const isDark = colorScheme === 'dark';

  return (
    <Fade in timeout={1000}>
      <MainContainer
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.95) 0%, rgba(25, 25, 25, 0.95) 100%)'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(0, 0, 0, 0.04)',
        }}>
        <CardContent sx={{ p: 0, height: '100%' }}>
          {/* Header */}
          <HeaderSection
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.04) 0%, rgba(168, 85, 247, 0.04) 100%)',
            }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={3}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                  animation: `${pulseGlow} 2s ease-in-out infinite`,
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  fontSize: '2rem',
                  background:
                    'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '1px',
                  textAlign: 'center',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '3px',
                    background:
                      'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
                    borderRadius: '2px',
                  },

                  fontFamily:
                    '"Inter", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", Arial, sans-serif',
                }}>
                {t('top10Tags')}
              </Typography>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #a855f7, #ec4899)',
                  animation: `${pulseGlow} 2s ease-in-out infinite 1s`,
                }}
              />
            </Stack>
          </HeaderSection>

          {/* Table */}
          <TableContainer
            sx={{ maxHeight: 'calc(100% - 120px)', overflowX: 'hidden' }}>
            <StyledTable>
              <TableHead
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.01) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%)',
                  backdropFilter: 'blur(20px)',
                }}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      width: '15%',
                      py: 3,
                      borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                    }}>
                    {t('rank')}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      width: '30%',
                      py: 3,
                      borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                    }}>
                    {t('tagName')}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      width: '20%',
                      py: 3,
                      borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                    }}>
                    Avatars
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      width: '15%',
                      py: 3,
                      borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                    }}>
                    {t('quantity')}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: isDark ? '#cbd5e1' : '#475569',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      width: '20%',
                      py: 3,
                      borderBottom: '2px solid rgba(99, 102, 241, 0.1)',
                    }}>
                    {t('rate')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <Grow in timeout={800 + index * 150} key={index}>
                    <TableRowStyled>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <RankBadge
                          sx={{
                            background: getRankColors(row.rank),
                            animationDelay: `${index * 0.2}s`,
                          }}>
                          {row.rank}
                        </RankBadge>
                      </TableCell>
                      <TableCell sx={{ py: 3 }}>
                        <TagContainer>
                          <TagChip
                            label={row.tagName}
                            sx={{
                              background: getTagGradient(index),
                            }}
                          />
                        </TagContainer>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <AvatarContainer>
                          <AvatarGroup max={6}>
                            {row.avatars.map((url, idx) => (
                              <Avatar
                                key={idx}
                                src={url}
                                sx={{
                                  animationDelay: `${index * 150 + idx * 100}ms`,
                                }}
                              />
                            ))}
                          </AvatarGroup>
                        </AvatarContainer>
                      </TableCell>
                      <TableCell align="center" sx={{ py: 3 }}>
                        <CountDisplay>{row.questionCount}</CountDisplay>
                      </TableCell>
                      <TableCell sx={{ py: 3 }}>
                        <ProgressContainer>
                          <PercentageText isDark={isDark}>
                            {row.percentage}%
                          </PercentageText>
                          <ProgressBar isDark={isDark}>
                            <ProgressFill
                              sx={{
                                width: `${row.percentage}%`,
                                background: getProgressGradient(row.percentage),
                                animation: `${progressFill} 1s ease-out ${index * 0.1}s both`,
                                '--progress-width': `${row.percentage}%`,
                              }}
                            />
                          </ProgressBar>
                        </ProgressContainer>
                      </TableCell>
                    </TableRowStyled>
                  </Grow>
                ))}
              </TableBody>
            </StyledTable>
          </TableContainer>
        </CardContent>
      </MainContainer>
    </Fade>
  );
};

export default TopicTable;

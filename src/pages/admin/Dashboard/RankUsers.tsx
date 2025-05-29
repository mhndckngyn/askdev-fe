import {
  Box,
  Avatar,
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import { NotebookPen } from 'lucide-react';
import { Trophy } from 'phosphor-react';
import { getDashboardTopUsersStats } from './services';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface TopUsers {
  rank: number;
  username: string;
  avatar: string;
  postCount: number;
  topTopics: string[];
}

const TrophyWithNumber = ({ rank }: { rank: number }) => {
  const colors: Record<string, { trophy: string; bg: string }> = {
    1: { trophy: '#FFD700', bg: 'linear-gradient(135deg, #FFD700, #FFA000)' },
    2: { trophy: '#C0C0C0', bg: 'linear-gradient(135deg, #C0C0C0, #9E9E9E)' },
    3: { trophy: '#CD7F32', bg: 'linear-gradient(135deg, #CD7F32, #8D4E00)' },
    default: {
      trophy: '#555555',
      bg: 'linear-gradient(135deg, #43CEA2, #185A9D)',
    },
  };

  const { trophy } = colors[rank.toString()] || colors.default;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        marginRight: 1,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
      }}>
      <Trophy size={32} weight="fill" style={{ color: trophy }} />
      <Typography
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          fontWeight: '900',
          fontSize: 14,
          userSelect: 'none',
          pointerEvents: 'none',
          fontFamily:
            '"Inter", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", Arial, sans-serif',
          letterSpacing: '0.05em',
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>
        {rank}
      </Typography>
    </Box>
  );
};

const TopUsers = () => {
  const { t } = useTranslation('adminDashboardPage');
  const { colorScheme } = useMantineColorScheme();
  const [users, setUsers] = useState<TopUsers[]>([]);

  useEffect(() => {
    const fetchTopTags = async () => {
      try {
        const response = await getDashboardTopUsersStats();
        if (response.success) {
          setUsers(response.content);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopTags();
  }, []);

  const getRankBadge = (index: number) => {
    if (index < 3) {
      return <TrophyWithNumber rank={index + 1} />;
    }

    return (
      <Box
        sx={{
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
          borderRadius: '50%',
          width: 32,
          height: 32,
          display: 'flex',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 1,
          boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}>
        {index + 1}
      </Box>
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: '100%',
        padding: '20px',
        height: '820px',
        backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#f8fafc',
        borderRadius: '16px',
        background:
          colorScheme === 'dark'
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        overflowY: 'auto',
      }}>
      <Box
        sx={{
          paddingBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          backgroundColor: 'inherit',
          zIndex: 1,
        }}>
        <Typography
          sx={{
            fontFamily:
              '"Inter", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", Arial, sans-serif',
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
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
              borderRadius: '2px',
            },
          }}>
          {t('top10ActiveUsers')}
        </Typography>
      </Box>

      <Stack spacing={1.5}>
        {users.map((user, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              borderRadius: '12px',
              background:
                colorScheme === 'dark'
                  ? 'linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              border:
                colorScheme === 'dark'
                  ? '1px solid rgba(255,255,255,0.1)'
                  : '1px solid rgba(0,0,0,0.06)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow:
                  colorScheme === 'dark'
                    ? '0 12px 24px rgba(0,0,0,0.4)'
                    : '0 12px 24px rgba(0,0,0,0.1)',
                border:
                  colorScheme === 'dark'
                    ? '1px solid rgba(255,255,255,0.2)'
                    : '1px solid rgba(0,0,0,0.12)',
              },
            }}>
            <CardContent sx={{ padding: '12px !important' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}>
                {getRankBadge(index)}

                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    border: '2px solid',
                    borderColor:
                      colorScheme === 'dark'
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.1)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  }}
                  src={user.avatar}
                />

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontWeight: '700',
                      fontSize: '1rem',
                      color: colorScheme === 'dark' ? '#ffffff' : '#1e293b',
                      marginBottom: '2px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                    {user.username}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                    {(() => {
                      const maxVisible = 2;
                      const visibleTopics = user.topTopics.slice(0, maxVisible);
                      const hiddenCount =
                        user.topTopics.length - visibleTopics.length;

                      return (
                        <>
                          {visibleTopics.map((topic, idx) => (
                            <Chip
                              key={idx}
                              label={
                                topic.length > 8
                                  ? topic.substring(0, 8) + '...'
                                  : topic
                              }
                              size="small"
                              sx={{
                                fontSize: '10px',
                                height: '18px',
                                backgroundColor:
                                  colorScheme === 'dark'
                                    ? 'rgba(102, 126, 234, 0.2)'
                                    : 'rgba(79, 70, 229, 0.1)',
                                color:
                                  colorScheme === 'dark'
                                    ? '#a5b4fc'
                                    : '#4f46e5',
                                border: '1px solid',
                                borderColor:
                                  colorScheme === 'dark'
                                    ? 'rgba(102, 126, 234, 0.3)'
                                    : 'rgba(79, 70, 229, 0.2)',
                                '&:hover': {
                                  backgroundColor:
                                    colorScheme === 'dark'
                                      ? 'rgba(102, 126, 234, 0.3)'
                                      : 'rgba(79, 70, 229, 0.15)',
                                },
                              }}
                            />
                          ))}
                          {hiddenCount > 0 && (
                            <Chip
                              label={`+${hiddenCount}`}
                              size="small"
                              sx={{
                                fontSize: '10px',
                                height: '18px',
                                backgroundColor:
                                  colorScheme === 'dark'
                                    ? 'rgba(156, 163, 175, 0.2)'
                                    : 'rgba(107, 114, 128, 0.1)',
                                color:
                                  colorScheme === 'dark'
                                    ? '#d1d5db'
                                    : '#6b7280',
                                border: '1px solid',
                                borderColor:
                                  colorScheme === 'dark'
                                    ? 'rgba(156, 163, 175, 0.3)'
                                    : 'rgba(107, 114, 128, 0.2)',
                              }}
                            />
                          )}
                        </>
                      );
                    })()}
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    padding: '6px 10px',
                    borderRadius: '8px',
                    background:
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '12px',
                    boxShadow: '0 4px 8px rgba(102, 126, 234, 0.4)',
                    minWidth: 'fit-content',
                  }}>
                  <NotebookPen size={14} />
                  <Typography sx={{ fontWeight: '700', fontSize: '12px' }}>
                    {user.postCount}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
};

export default TopUsers;

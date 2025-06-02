import React from 'react';
import {
  Box,
  Typography,
  CardContent,
  Avatar,
  Chip,
  alpha,
  Badge,
  Tooltip,
  Divider,
  IconButton,
  Paper,
  Fade,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  QuestionAnswer as QuestionIcon,
  Schedule as ScheduleIcon,
  GitHub as GitHubIcon,
  Visibility as VisibilityIcon,
  Whatshot as WhatshotIcon,
} from '@mui/icons-material';
import { Member, RankingType } from './types';

interface MemberCardProps {
  member: Member;
  index: number;
  selectedTab: RankingType;
  getStatValue: (member: Member, type: RankingType) => number;
  getActiveTabConfig: () => {
    label: string;
    color: string;
    gradient: string;
  };
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  index,
  selectedTab,
  getStatValue,
  getActiveTabConfig,
}) => {
  const getRankIcon = (index: number) => {
    if (index === 0)
      return <TrophyIcon sx={{ color: '#FFD700', fontSize: 32 }} />;
    if (index === 1)
      return <TrophyIcon sx={{ color: '#C0C0C0', fontSize: 28 }} />;
    if (index === 2)
      return <TrophyIcon sx={{ color: '#CD7F32', fontSize: 26 }} />;
    return (
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.1rem',
        }}>
        {index + 1}
      </Box>
    );
  };

  const getRankColor = (index: number) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return '#667eea';
  };

  const activeTabConfig = getActiveTabConfig();

  return (
    <Fade in timeout={1600 + index * 100}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          background:
            index < 3
              ? `linear-gradient(135deg, ${alpha(getRankColor(index), 0.1)} 0%, rgba(255, 255, 255, 0.95) 100%)`
              : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border:
            index < 3
              ? `2px solid ${getRankColor(index)}`
              : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: `0 20px 40px ${alpha(getRankColor(index), 0.2)}`,
          },
        }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              textAlign: { xs: 'center', md: 'left' },
            }}>
            {/* Enhanced Rank Display */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 80,
                height: 80,
                borderRadius: '50%',
                background:
                  index < 3
                    ? `linear-gradient(135deg, ${getRankColor(index)} 0%, ${alpha(getRankColor(index), 0.8)} 100%)`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: `0 8px 24px ${alpha(getRankColor(index), 0.3)}`,
                position: 'relative',
                '&::before':
                  index < 3
                    ? {
                        content: '""',
                        position: 'absolute',
                        inset: -2,
                        borderRadius: '50%',
                        padding: 2,
                        background: `linear-gradient(135deg, ${getRankColor(index)}, transparent)`,
                        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        maskComposite: 'xor',
                        WebkitMaskComposite: 'xor',
                      }
                    : {},
              }}>
              {getRankIcon(index)}
            </Box>

            {/* Enhanced Avatar & Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                flex: 1,
              }}>
              <Badge
                badgeContent={member.role === 'ADMIN' ? '👑' : null}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '1.2rem',
                    minWidth: 24,
                    height: 24,
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)',
                  },
                }}>
                <Avatar
                  src={member.profilePicture}
                  sx={{
                    width: 80,
                    height: 80,
                    border: `4px solid ${getRankColor(index)}`,
                    boxShadow: `0 8px 24px ${alpha(getRankColor(index), 0.3)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  }}
                />
              </Badge>

              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 1,
                  }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      background:
                        index < 3
                          ? `linear-gradient(135deg, ${getRankColor(index)} 0%, ${alpha(getRankColor(index), 0.8)} 100%)`
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    {member.username}
                  </Typography>
                  {member.showGithub && member.github && (
                    <Tooltip title={`GitHub: ${member.github}`} arrow>
                      <IconButton
                        size="small"
                        onClick={() =>
                          window.open(
                            `https://github.com/${member.github}`,
                            '_blank',
                          )
                        }
                        sx={{
                          background:
                            'linear-gradient(135deg, #333 0%, #24292e 100%)',
                          color: 'white',
                          width: 36,
                          height: 36,
                          '&:hover': {
                            transform: 'scale(1.1)',
                            boxShadow: '0 4px 12px rgba(51, 51, 51, 0.4)',
                          },
                          transition: 'all 0.3s ease',
                        }}>
                        <GitHubIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {index < 3 && (
                    <Chip
                      icon={<WhatshotIcon />}
                      label="TOP"
                      size="small"
                      sx={{
                        background: `linear-gradient(135deg, ${getRankColor(index)} 0%, ${alpha(getRankColor(index), 0.8)} 100%)`,
                        color: 'white',
                        fontWeight: 700,
                        '& .MuiChip-icon': { color: 'white' },
                      }}
                    />
                  )}
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    fontStyle: 'italic',
                    maxWidth: 400,
                  }}>
                  {member.bio}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    flexWrap: 'wrap',
                    gap: 2,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}>
                    <ScheduleIcon
                      sx={{ fontSize: 16, color: 'text.secondary' }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Tham gia:{' '}
                      {new Date(member.createdAt).toLocaleDateString('vi-VN')}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<VisibilityIcon />}
                    label={`${member.stats.totalViews.toLocaleString()} lượt xem`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Enhanced Stats Display */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 4,
                width: { xs: '100%', lg: 'auto' },
              }}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 3,
                  background: activeTabConfig.gradient,
                  color: 'white',
                  minWidth: 100,
                  boxShadow: `0 4px 20px ${alpha(activeTabConfig.color, 0.3)}`,
                }}>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                  {getStatValue(member, selectedTab).toLocaleString()}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.9, fontWeight: 600 }}>
                  {activeTabConfig.label}
                </Typography>
              </Box>

              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: alpha(getRankColor(index), 0.3),
                  borderWidth: 2,
                  display: { xs: 'none', lg: 'block' },
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                  minWidth: 160,
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}>
                    <QuestionIcon sx={{ fontSize: 16, color: '#667eea' }} />
                    <Typography variant="body2" color="text.secondary">
                      Câu hỏi
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {member.stats.totalQuestions}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}>
                    <ThumbUpIcon sx={{ fontSize: 16, color: '#4ECDC4' }} />
                    <Typography variant="body2" color="text.secondary">
                      Upvotes
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {member.stats.totalUpvotes}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}>
                    <StarIcon sx={{ fontSize: 16, color: '#FFD93D' }} />
                    <Typography variant="body2" color="text.secondary">
                      Reputation
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {member.stats.reputation}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Paper>
    </Fade>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  alpha,
  Badge,
  Tooltip,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
  QuestionAnswer as QuestionIcon,
  ThumbUp as ThumbUpIcon,
  Schedule as ScheduleIcon,
  GitHub as GitHubIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// Mock data dựa trên schema
const mockMembers = [
  {
    id: '1',
    username: 'nguyenvana',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
    bio: 'Full-stack developer passionate about React and Node.js',
    github: 'nguyenvana',
    showGithub: true,
    createdAt: '2024-01-15T00:00:00Z',
    role: 'ADMIN',
    stats: {
      totalQuestions: 45,
      totalAnswers: 128,
      totalUpvotes: 890,
      chosenAnswers: 35,
      totalViews: 12500,
      reputation: 1250,
    },
  },
  {
    id: '2',
    username: 'tranvanbao',
    profilePicture: 'https://i.pravatar.cc/150?img=2',
    bio: 'Frontend enthusiast, love creating beautiful UIs',
    github: 'tranvanbao',
    showGithub: true,
    createdAt: '2024-02-20T00:00:00Z',
    role: 'MEMBER',
    stats: {
      totalQuestions: 32,
      totalAnswers: 95,
      totalUpvotes: 720,
      chosenAnswers: 28,
      totalViews: 9800,
      reputation: 980,
    },
  },
  {
    id: '3',
    username: 'lethicamly',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    bio: 'Backend developer specializing in microservices',
    github: null,
    showGithub: false,
    createdAt: '2024-03-10T00:00:00Z',
    role: 'MEMBER',
    stats: {
      totalQuestions: 28,
      totalAnswers: 87,
      totalUpvotes: 650,
      chosenAnswers: 22,
      totalViews: 8200,
      reputation: 850,
    },
  },
  {
    id: '4',
    username: 'phamquangduc',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
    bio: 'DevOps engineer and cloud architect',
    github: 'phamquangduc',
    showGithub: true,
    createdAt: '2024-01-25T00:00:00Z',
    role: 'MEMBER',
    stats: {
      totalQuestions: 38,
      totalAnswers: 76,
      totalUpvotes: 580,
      chosenAnswers: 18,
      totalViews: 7100,
      reputation: 720,
    },
  },
  {
    id: '5',
    username: 'hoangminhdang',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
    bio: 'Mobile app developer (React Native & Flutter)',
    github: 'hoangminhdang',
    showGithub: true,
    createdAt: '2024-04-05T00:00:00Z',
    role: 'MEMBER',
    stats: {
      totalQuestions: 22,
      totalAnswers: 65,
      totalUpvotes: 480,
      chosenAnswers: 15,
      totalViews: 6200,
      reputation: 620,
    },
  },
];

const MemberRanking = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isDark] = useState(false); // Có thể kết nối với theme context

  // Simulate data loading
  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMembers(mockMembers);
      setLoading(false);
    };

    loadMembers();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const getRankIcon = (index) => {
    if (index === 0)
      return <TrophyIcon sx={{ color: '#FFD700', fontSize: 28 }} />;
    if (index === 1)
      return <TrophyIcon sx={{ color: '#C0C0C0', fontSize: 24 }} />;
    if (index === 2)
      return <TrophyIcon sx={{ color: '#CD7F32', fontSize: 22 }} />;
    return (
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, color: 'text.secondary', minWidth: 24 }}>
        #{index + 1}
      </Typography>
    );
  };

  const getRankColor = (index) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return 'transparent';
  };

  const sortedMembers = [...members].sort((a, b) => {
    switch (selectedTab) {
      case 0:
        return b.stats.reputation - a.stats.reputation;
      case 1:
        return b.stats.totalUpvotes - a.stats.totalUpvotes;
      case 2:
        return b.stats.chosenAnswers - a.stats.chosenAnswers;
      case 3:
        return b.stats.totalAnswers - a.stats.totalAnswers;
      default:
        return 0;
    }
  });

  const backgroundGradient = isDark
    ? `linear-gradient(135deg, ${alpha('#2c3e50', 0.1)} 0%, ${alpha('#34495e', 0.1)} 100%)`
    : `linear-gradient(135deg, ${alpha('#667eea', 0.05)} 0%, ${alpha('#764ba2', 0.05)} 100%)`;

  const headerGradient = isDark
    ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 2,
        }}>
        <CircularProgress size={60} sx={{ color: '#667eea' }} />
        <Typography variant="h6" color="text.secondary">
          Đang tải bảng xếp hạng...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        width: '100%',
        mx: 'auto',
        background: backgroundGradient,
        minHeight: '100vh',
      }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
          p: 3,
          background: headerGradient,
          borderRadius: 4,
          color: 'white',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TrophyIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, mb: 0.5 }}>
              Bảng Xếp Hạng
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Top thành viên xuất sắc nhất của cộng đồng
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<PersonIcon />}
            label={`${members.length} thành viên`}
            sx={{
              bgcolor: alpha('#fff', 0.2),
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          />
          <IconButton
            sx={{
              color: 'white',
              bgcolor: alpha('#fff', 0.1),
              '&:hover': { bgcolor: alpha('#fff', 0.2) },
            }}
            onClick={() => window.location.reload()}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: 3,
            }}>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <QuestionIcon sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {members.reduce((sum, m) => sum + m.stats.totalQuestions, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Câu hỏi
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
              color: 'white',
              borderRadius: 3,
            }}>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <QuestionIcon
                sx={{ fontSize: 36, mb: 1, transform: 'rotate(180deg)' }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {members.reduce((sum, m) => sum + m.stats.totalAnswers, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Câu trả lời
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)',
              color: 'white',
              borderRadius: 3,
            }}>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <ThumbUpIcon sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {members.reduce((sum, m) => sum + m.stats.totalUpvotes, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Lượt thích
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
              color: 'white',
              borderRadius: 3,
            }}>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <StarIcon sx={{ fontSize: 36, mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {members.reduce((sum, m) => sum + m.stats.chosenAnswers, 0)}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Được chọn
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ranking Tabs */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              minHeight: 64,
              fontSize: '1rem',
            },
            '& .Mui-selected': {
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white !important',
              borderRadius: '8px 8px 0 0',
            },
          }}>
          <Tab label="Danh tiếng" icon={<StarIcon />} iconPosition="start" />
          <Tab label="Lượt thích" icon={<ThumbUpIcon />} iconPosition="start" />
          <Tab label="Được chọn" icon={<TrophyIcon />} iconPosition="start" />
          <Tab label="Trả lời" icon={<QuestionIcon />} iconPosition="start" />
        </Tabs>
      </Card>

      {/* Ranking List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sortedMembers.map((member, index) => (
          <Card
            key={member.id}
            sx={{
              borderRadius: 3,
              boxShadow:
                index < 3
                  ? '0 12px 48px rgba(0,0,0,0.15)'
                  : '0 4px 20px rgba(0,0,0,0.08)',
              border: index < 3 ? `2px solid ${getRankColor(index)}` : 'none',
              background:
                index < 3
                  ? `linear-gradient(135deg, ${alpha(getRankColor(index), 0.05)} 0%, ${alpha(getRankColor(index), 0.02)} 100%)`
                  : 'white',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              },
            }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {/* Rank */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 60,
                    height: 60,
                    borderRadius: '50%',
                    bgcolor:
                      index < 3
                        ? alpha(getRankColor(index), 0.1)
                        : alpha('#667eea', 0.1),
                  }}>
                  {getRankIcon(index)}
                </Box>

                {/* Avatar & Basic Info */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flex: 1,
                  }}>
                  <Badge
                    badgeContent={member.role === 'ADMIN' ? 'Admin' : null}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.7rem',
                        minWidth: 18,
                        height: 18,
                      },
                    }}>
                    <Avatar
                      src={member.profilePicture}
                      sx={{
                        width: 64,
                        height: 64,
                        border: `3px solid ${index < 3 ? getRankColor(index) : '#e0e0e0'}`,
                      }}
                    />
                  </Badge>

                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5,
                      }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {member.username}
                      </Typography>
                      {member.showGithub && member.github && (
                        <Tooltip title={`GitHub: ${member.github}`}>
                          <IconButton
                            size="small"
                            sx={{ color: '#333' }}
                            onClick={() =>
                              window.open(
                                `https://github.com/${member.github}`,
                                '_blank',
                              )
                            }>
                            <GitHubIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 300,
                      }}>
                      {member.bio}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon
                        sx={{ fontSize: 14, color: 'text.secondary' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Tham gia:{' '}
                        {new Date(member.createdAt).toLocaleDateString('vi-VN')}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Stats */}
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: '#667eea' }}>
                      {selectedTab === 0 && member.stats.reputation}
                      {selectedTab === 1 && member.stats.totalUpvotes}
                      {selectedTab === 2 && member.stats.chosenAnswers}
                      {selectedTab === 3 && member.stats.totalAnswers}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedTab === 0 && 'Danh tiếng'}
                      {selectedTab === 1 && 'Lượt thích'}
                      {selectedTab === 2 && 'Được chọn'}
                      {selectedTab === 3 && 'Trả lời'}
                    </Typography>
                  </Box>

                  <Divider orientation="vertical" flexItem />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      minWidth: 120,
                    }}>
                    <Chip
                      label={`${member.stats.totalQuestions} câu hỏi`}
                      size="small"
                      sx={{ bgcolor: alpha('#667eea', 0.1), color: '#667eea' }}
                    />
                    <Chip
                      label={`${member.stats.totalViews} lượt xem`}
                      size="small"
                      sx={{ bgcolor: alpha('#00b894', 0.1), color: '#00b894' }}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MemberRanking;

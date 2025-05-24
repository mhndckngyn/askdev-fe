import React from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Chip,
  Card,
  CardContent,
  LinearProgress,
  Divider,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  QuestionAnswer,
  TrendingUp,
  People,
  Star,
  ThumbUp,
  Visibility,
} from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';

export default function Homepage() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const stats = [
    {
      icon: <QuestionAnswer />,
      value: '12,345',
      label: 'Câu hỏi',
      color: '#3f51b5',
    },
    { icon: <People />, value: '8,920', label: 'Thành viên', color: '#4caf50' },
    { icon: <Star />, value: '45,678', label: 'Câu trả lời', color: '#ff9800' },
    {
      icon: <TrendingUp />,
      value: '98%',
      label: 'Giải quyết',
      color: '#e91e63',
    },
  ];

  const trendingQuestions = [
    {
      id: 1,
      title: 'Làm thế nào để tối ưu hóa hiệu suất React application?',
      author: 'NguyenVanA',
      avatar: 'https://i.pravatar.cc/40?img=1',
      votes: 24,
      answers: 8,
      views: 156,
      tags: ['React', 'Performance', 'JavaScript'],
      time: '2 giờ trước',
    },
    {
      id: 2,
      title: 'Sự khác biệt giữa var, let và const trong JavaScript?',
      author: 'TranThiB',
      avatar: 'https://i.pravatar.cc/40?img=2',
      votes: 18,
      answers: 12,
      views: 203,
      tags: ['JavaScript', 'ES6', 'Variables'],
      time: '4 giờ trước',
    },
    {
      id: 3,
      title: 'Cách thiết kế database cho ứng dụng e-commerce?',
      author: 'LeVanC',
      avatar: 'https://i.pravatar.cc/40?img=3',
      votes: 31,
      answers: 6,
      views: 298,
      tags: ['Database', 'MySQL', 'E-commerce'],
      time: '6 giờ trước',
    },
  ];

  const topContributors = [
    {
      name: 'Alice Johnson',
      points: 2840,
      answers: 89,
      avatar: 'https://i.pravatar.cc/50?img=4',
    },
    {
      name: 'Bob Smith',
      points: 2156,
      answers: 67,
      avatar: 'https://i.pravatar.cc/50?img=5',
    },
    {
      name: 'Carol Davis',
      points: 1923,
      answers: 54,
      avatar: 'https://i.pravatar.cc/50?img=6',
    },
    {
      name: 'David Wilson',
      points: 1678,
      answers: 42,
      avatar: 'https://i.pravatar.cc/50?img=7',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        transition: 'all 0.3s ease-in-out',
      }}>
      {/* Header */}
      <Box
        sx={{
          background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}`,
          py: 2,
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              Q&A Platform
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
            Nơi chia sẻ kiến thức
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}>
            Đặt câu hỏi, nhận câu trả lời từ cộng đồng chuyên gia và phát triển
            cùng nhau
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid
          container
          spacing={3}
          sx={{
            mb: 6,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {stats.slice(0, 4).map((stat, index) => (
            <Grid
              key={index}
              sx={{
                flex: '1 1 calc(25% - 24px)', // trừ spacing (3 * 8px)
                minWidth: '250px',
                maxWidth: '100%',
              }}>
              <Paper
                elevation={8}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                  borderRadius: 3,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  },
                }}>
                <Box
                  sx={{
                    color: stat.color,
                    mb: 2,
                    fontSize: '2.5rem',
                    animation: 'pulse 2s infinite',
                  }}>
                  {React.cloneElement(stat.icon, { sx: { fontSize: '4rem' } })}
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: isDark ? 'white' : 'text.primary',
                    mb: 1,
                  }}>
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                  }}>
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" width="100%" gap="1rem">
          <Box sx={{ flex: '2', marginRight: '5px' }}>
            <Paper
              elevation={8}
              sx={{
                p: 3,
                mb: 4,
                background: isDark
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
                backdropFilter: 'blur(15px)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                borderRadius: 3,
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  color: isDark ? 'white' : 'text.primary',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}>
                <TrendingUp sx={{ color: '#ff9800' }} />
                Câu hỏi thịnh hành
              </Typography>

              {trendingQuestions.map((question) => (
                <Card
                  key={question.id}
                  sx={{
                    mb: 2,
                    background: isDark
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(255,255,255,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(5px)',
                      boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                    },
                  }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                      }}>
                      <Avatar
                        src={question.avatar}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: isDark ? 'white' : 'text.primary',
                          }}>
                          {question.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                          }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: isDark
                                ? 'rgba(255,255,255,0.7)'
                                : 'text.secondary',
                            }}>
                            bởi {question.author} • {question.time}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                          }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}>
                            <ThumbUp sx={{ fontSize: 16, color: '#4caf50' }} />
                            <Typography
                              variant="body2"
                              sx={{ color: isDark ? 'white' : 'text.primary' }}>
                              {question.votes}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}>
                            <QuestionAnswer
                              sx={{ fontSize: 16, color: '#2196f3' }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: isDark ? 'white' : 'text.primary' }}>
                              {question.answers}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}>
                            <Visibility
                              sx={{ fontSize: 16, color: '#ff9800' }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ color: isDark ? 'white' : 'text.primary' }}>
                              {question.views}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {question.tags.map((tag, tagIndex) => (
                            <Chip
                              key={tagIndex}
                              label={tag}
                              size="small"
                              sx={{
                                backgroundColor: isDark
                                  ? 'rgba(255,255,255,0.1)'
                                  : 'rgba(63,81,181,0.1)',
                                color: isDark ? 'white' : '#3f51b5',
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Box>

          <Box sx={{ flex: '1' }}>
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
                Top Contributors
              </Typography>

              {topContributors.map((contributor, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                    }}>
                    <Avatar
                      src={contributor.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
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
                          color: isDark
                            ? 'rgba(255,255,255,0.7)'
                            : 'text.secondary',
                        }}>
                        {contributor.points} điểm • {contributor.answers} câu
                        trả lời
                      </Typography>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(contributor.points / 3000) * 100}
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
                  {index < topContributors.length - 1 && (
                    <Divider sx={{ mt: 2, opacity: 0.3 }} />
                  )}
                </Box>
              ))}
            </Paper>
          </Box>
        </Box>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
}

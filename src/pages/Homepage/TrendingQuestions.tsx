import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import FormatTime from './formatTime';
import { useTranslation } from 'react-i18next';
import {
  QuestionAnswer,
  TrendingUp,
  ThumbUp,
  Visibility,
  ArrowForward,
  Launch,
} from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';

type Question = {
  id: string;
  title: string;
  author: string;
  time: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  avatar?: string;
};

interface TrendingpageProps {
  trendingQuestions: Question[];
}

export default function TrendingQuestions({
  trendingQuestions,
}: TrendingpageProps) {
  const { colorScheme } = useMantineColorScheme();
  const { t } = useTranslation('home');
  const isDark = colorScheme === 'dark';
  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
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
        {t('titleQuestion')}
      </Typography>

      {trendingQuestions?.map((question) => (
        <Card
          key={question.id}
          sx={{
            borderRadius: 3,
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
              <Avatar src={question.avatar} sx={{ width: 40, height: 40 }} />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component={Link}
                  to={`/questions/${question.id}`}
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    color: isDark ? 'white' : 'text.primary',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#1976d2',
                      textDecoration: 'underline',
                    },
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
                    {t('by')} {<strong>{question.author}</strong>} {"• "}
                    {<FormatTime createdAt={question.time} />}
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
                    <QuestionAnswer sx={{ fontSize: 16, color: '#2196f3' }} />
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
                    <Visibility sx={{ fontSize: 16, color: '#ff9800' }} />
                    <Typography
                      variant="body2"
                      sx={{ color: isDark ? 'white' : 'text.primary' }}>
                      {question.views}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}>
                  <Box
                    sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
                    {question.tags.slice(0, 3).map((tag, tagIndex) => (
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
                    {question.tags.length > 3 && (
                      <Chip
                        label={`+${question.tags.length - 3}`}
                        size="small"
                        sx={{
                          backgroundColor: isDark
                            ? 'rgba(255,193,7,0.2)'
                            : 'rgba(255,193,7,0.15)',
                          color: isDark ? '#ffeb3b' : '#f57c00',
                          fontWeight: 'bold',
                          border: `1px solid ${isDark ? 'rgba(255,235,59,0.3)' : 'rgba(245,124,0,0.3)'}`,
                        }}
                      />
                    )}
                  </Box>

                  <Button
                    component={Link}
                    to={`/questions/${question.id}`}
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: isDark
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      px: 2,
                      py: 0.8,
                      borderRadius: '20px',
                      textTransform: 'none',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      border: 'none',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      ml: 2,
                      flexShrink: 0,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background:
                          'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        transition: 'left 0.5s',
                      },
                      '&:hover': {
                        transform: 'translateY(-2px) scale(1.02)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        background: isDark
                          ? 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)'
                          : 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                        '&::before': {
                          left: '100%',
                        },
                      },
                      '&:active': {
                        transform: 'translateY(0) scale(0.98)',
                      },
                    }}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Launch sx={{ fontSize: 14 }} />
                      {t('seeDetails')}
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Paper>
  );
}

import { Card, CardContent, Box, Typography, Chip, Stack } from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import FormatTime from '../formatTime';
import QuestionContent from '../QuestionContent';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  views: number;
  upvotes: number;
  answers: number;
  isSolved: boolean;
  tags: string[];
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
  isDark: boolean;
}

export default function QuestionCard({ question, isDark }: QuestionCardProps) {
  const { t } = useTranslation('search');
  const navigate = useNavigate();
  const handleClick = () => {
    if (question.id) {
      navigate(`/questions/${question.id}`);
    }
  };

  return (
    <Card
      onClick={() => {
        handleClick();
      }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(25,25,25,0.9) 0%, rgba(40,40,40,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: question?.isSolved
            ? 'linear-gradient(90deg, #10B981, #059669)'
            : 'linear-gradient(90deg, #3B82F6, #1D4ED8)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: isDark
            ? '0 20px 40px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          '&::before': {
            opacity: 1,
          },
        },
      }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            {/* Title Section */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                    : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flex: 1,
                }}>
                {question?.title}
              </Typography>
              {question?.isSolved && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }}>
                  <CheckCircleIcon sx={{ color: 'white', fontSize: 16 }} />
                </Box>
              )}
            </Box>

            {/* Content Section */}
            {question?.content && (
              <Typography
                variant="body2"
                sx={{
                  mb: 3,
                  lineHeight: 1.6,
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                <QuestionContent content={question?.content} />
              </Typography>
            )}

            {/* Tags Section */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mb: 3,
                flexWrap: 'wrap',
                gap: 1,
                '& > *': { mb: '0px !important' },
              }}>
              {question?.tags.slice(0, 4).map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: isDark
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.08)',
                    color: isDark ? '#60A5FA' : '#2563EB',
                    border: isDark
                      ? '1px solid rgba(59, 130, 246, 0.2)'
                      : '1px solid rgba(59, 130, 246, 0.15)',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: isDark
                        ? 'rgba(59, 130, 246, 0.2)'
                        : 'rgba(59, 130, 246, 0.15)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                />
              ))}
              {question?.tags.length > 4 && (
                <Chip
                  label={`+${question.tags.length - 4}`}
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: isDark
                      ? 'rgba(156, 163, 175, 0.1)'
                      : 'rgba(156, 163, 175, 0.08)',
                    color: isDark ? '#9CA3AF' : '#6B7280',
                    border: 'none',
                  }}
                />
              )}
            </Stack>

            {/* Stats Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 2,
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ThumbUpIcon sx={{ fontSize: 14, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? '#FCD34D' : '#D97706',
                    }}>
                    {question?.upvotes}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ViewIcon sx={{ fontSize: 14, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? '#C4B5FD' : '#7C3AED',
                    }}>
                    {question?.views}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? '#34D399' : '#059669',
                  }}>
                  {question?.answers} {t('answers')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                  }}>
                  {t('by')}{' '}
                  <span style={{ fontWeight: 600 }}>{question?.author}</span> •{' '}
                  <FormatTime createdAt={question?.createdAt} />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

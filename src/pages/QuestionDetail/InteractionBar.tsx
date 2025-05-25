import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Popover,
  Chip,
  Fade,
  Zoom,
} from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import {
  voteQuestion,
  getQuestion,
  getVoteStatus,
} from './Services/QuestionServices';
import { ApiResponse } from '@/types';
import { useTranslation } from 'react-i18next';

export default function InteractionBar() {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [data, setData] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [interaction, setInteraction] = useState<'like' | 'dislike' | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateVote, setAnimateVote] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchQuestion = async () => {
      try {
        const response: ApiResponse = await getQuestion(id);
        if (response.success) {
          setData(response.content);
        }

        const voteStatusResponse: ApiResponse = await getVoteStatus(id);
        if (voteStatusResponse.success) {
          setInteraction(voteStatusResponse.content.status);
        }

        setTimeout(() => setIsLoaded(true), 300);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleLike = async () => {
    if (!id || id.trim() === '') return;

    try {
      setAnimateVote(true);
      await voteQuestion(id, 1);
      const response: ApiResponse = await getQuestion(id);
      if (response.success) {
        setData(response.content);
      }
      setInteraction((prev) => (prev === 'like' ? null : 'like'));
      setAnchorEl(null);
      setTimeout(() => setAnimateVote(false), 600);
    } catch (error) {
      console.error(error);
      setAnimateVote(false);
    }
  };

  const handleDislike = async () => {
    if (!id || id.trim() === '') return;

    try {
      setAnimateVote(true);
      await voteQuestion(id, -1);
      const response: ApiResponse = await getQuestion(id);
      if (response.success) {
        setData(response.content);
      }
      setInteraction((prev) => (prev === 'dislike' ? null : 'dislike'));
      setAnchorEl(null);
      setTimeout(() => setAnimateVote(false), 600);
    } catch (error) {
      console.error(error);
      setAnimateVote(false);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'interaction-popover' : undefined;

  return (
    <Fade in={isLoaded} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          p: 2,
          background: 'transparent',

          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background:
              'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
            backgroundSize: '300% 300%',
            animation: 'gradientShift 6s ease infinite',
          },
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}>
        {/* Main Interaction Button */}
        <Zoom in={isLoaded} timeout={600} style={{ transitionDelay: '200ms' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              p: 2,
              background: isDark
                ? 'linear-gradient(135deg, rgba(55, 59, 83, 0.8) 0%, rgba(28, 30, 41, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                background: isDark
                  ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
                  : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
              },
            }}>
            {/* Vote Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                position: 'relative',
              }}
              onClick={handleClick}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: '16px',
                  background:
                    interaction === 'like'
                      ? 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
                      : interaction === 'dislike'
                        ? 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)'
                        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  transform: animateVote ? 'scale(1.1)' : 'scale(1)',
                  animation: animateVote ? 'heartbeat 0.6s ease' : 'none',
                  '@keyframes heartbeat': {
                    '0%': { transform: 'scale(1)' },
                    '25%': { transform: 'scale(1.1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '75%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                  },
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}>
                {interaction === 'like' ? (
                  <ThumbUpIcon sx={{ fontSize: '24px' }} />
                ) : interaction === 'dislike' ? (
                  <ThumbDownIcon sx={{ fontSize: '24px' }} />
                ) : (
                  <FavoriteIcon sx={{ fontSize: '24px' }} />
                )}

                <Typography
                  sx={{
                    fontSize: '16px',
                    fontWeight: '600',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}>
                  {interaction === 'like'
                    ? t('liked')
                    : interaction === 'dislike'
                      ? t('disliked')
                      : t('interaction')}
                </Typography>
              </Box>

              {/* Vote Count Display */}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  icon={<ThumbUpIcon sx={{ fontSize: '16px !important' }} />}
                  label={data ? data.upvotes : 0}
                  size="small"
                  sx={{
                    background:
                      'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '600',
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                    boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <Chip
                  icon={<ThumbDownIcon sx={{ fontSize: '16px !important' }} />}
                  label={data ? data.downvotes : 0}
                  size="small"
                  sx={{
                    background:
                      'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '600',
                    '& .MuiChip-icon': {
                      color: 'white',
                    },
                    boxShadow: '0 2px 8px rgba(244, 67, 54, 0.3)',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Divider */}
            <Box
              sx={{
                width: '2px',
                height: '40px',
                background:
                  'linear-gradient(180deg, transparent, #667eea, transparent)',
                borderRadius: '1px',
                opacity: 0.6,
              }}
            />

            {/* Comment Section */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1.5,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)',
                },
              }}>
              <CommentIcon sx={{ fontSize: '24px' }} />
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                }}>
                {t('comment')}
              </Typography>
            </Box>
          </Box>
        </Zoom>

        {/* Enhanced Popover */}
        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleMouseLeave}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiPopover-paper': {
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              overflow: 'visible',
              mt: -1,
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid rgba(255, 255, 255, 0.9)',
              },
            },
          }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton
                onClick={handleLike}
                sx={{
                  background:
                    interaction === 'like'
                      ? 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)'
                      : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                  color: interaction === 'like' ? 'white' : '#666',
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s ease',
                  boxShadow:
                    interaction === 'like'
                      ? '0 4px 12px rgba(76, 175, 80, 0.4)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
                  },
                }}>
                <ThumbUpIcon sx={{ fontSize: '28px' }} />
              </IconButton>

              <IconButton
                onClick={handleDislike}
                sx={{
                  background:
                    interaction === 'dislike'
                      ? 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)'
                      : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
                  color: interaction === 'dislike' ? 'white' : '#666',
                  width: 56,
                  height: 56,
                  transition: 'all 0.3s ease',
                  boxShadow:
                    interaction === 'dislike'
                      ? '0 4px 12px rgba(244, 67, 54, 0.4)'
                      : '0 2px 8px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px) scale(1.05)',
                    boxShadow: '0 8px 20px rgba(244, 67, 54, 0.4)',
                  },
                }}>
                <ThumbDownIcon sx={{ fontSize: '28px' }} />
              </IconButton>
            </Box>

            <Box
              sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '700',
                    color: '#4caf50',
                    fontSize: '18px',
                  }}>
                  {data ? data.upvotes : 0}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}>
                  {t('liked')}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: '700',
                    color: '#f44336',
                    fontSize: '18px',
                  }}>
                  {data ? data.downvotes : 0}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#666',
                    fontSize: '11px',
                    fontWeight: '500',
                  }}>
                  {t('disliked')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Popover>
      </Box>
    </Fade>
  );
}

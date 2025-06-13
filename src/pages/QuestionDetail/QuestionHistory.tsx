import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Modal,
  IconButton,
  Chip,
  Fade,
  Zoom,
  Backdrop,
} from '@mui/material';
import { TypographyStylesProvider, useMantineColorScheme } from '@mantine/core';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import FormatTime from './formatTime';
import {
  X,
  ChevronLeft,
  ChevronRight,
  History,
  Clock,
  User,
  Tag,
} from 'lucide-react';
import { getEditHistory } from './Services/QuestionServices';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/stores/useUserStore';

interface Props {
  open: boolean;
  handleToggle: () => void;
  question: any;
}

interface History {
  title: string;
  content: string;
  createdAt: string;
  images: string[];
}

function QuestionHistory({ open, handleToggle, question }: Props) {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [history, setHistory] = useState<History>(question);
  const [prevHistory, setPrevHistory] = useState<any>(null);
  const [nextHistory, setNextHistory] = useState<any>(null);

  const { user } = useUserStore();

  const fetchHistory = async (history: any) => {
    if (history) {
      try {
        const responsePrev = await getEditHistory(
          question.id,
          new Date(history.updatedAt ?? history.createdAt),
          -1,
        );
        setPrevHistory(responsePrev.content);

        const responseNext = await getEditHistory(
          question.id,
          new Date(history.updatedAt ?? history.createdAt),
          1,
        );
        setNextHistory(responseNext.content);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (history.createdAt && user?.id == question?.userId) {
      fetchHistory(history);
    }
  }, [history.createdAt, user]);

  const handlePrev = () => {
    if (prevHistory) {
      setHistory(prevHistory);
    }
  };

  const handleNext = () => {
    if (nextHistory) {
      setHistory(nextHistory);
    }
  };

  // Theme colors
  const themeColors = {
    background: isDark ? '#1a1b23' : '#f8fafc',
    paper: isDark ? '#2d3748' : '#ffffff',
    primary: isDark ? '#667eea' : '#4c51bf',
    secondary: isDark ? '#764ba2' : '#667eea',
    text: isDark ? '#e2e8f0' : '#2d3748',
    textSecondary: isDark ? '#a0aec0' : '#718096',
    border: isDark ? '#4a5568' : '#e2e8f0',
    accent: isDark ? '#38b2ac' : '#319795',
    cardBg: isDark
      ? 'linear-gradient(145deg, #2d3748 0%, #1a202c 100%)'
      : 'linear-gradient(145deg, #ffffff 0%, #f7fafc 100%)',
  };

  return (
    <Modal
      open={open}
      onClose={handleToggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: {
          backdropFilter: 'blur(10px)',
        },
      }}>
      <Fade in={open}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            position: 'relative',
          }}>
          {/* Background Icon */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.03,
              zIndex: 1,
              pointerEvents: 'none',
            }}>
            <History size={600} color={themeColors.primary} />
          </Box>

          <Zoom in={open} timeout={400}>
            <Paper
              elevation={24}
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },

                width: '75%',
                maxWidth: '1000px',
                height: '92vh',
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto',
                overflowY: 'auto',
                borderRadius: '20px',
                background: themeColors.cardBg,
                border: `1px solid ${themeColors.border}`,
                boxShadow: isDark
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                  : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                '&::-webkit-scrollbar-track': {
                  background: isDark ? '#2d3748' : '#f1f5f9',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: `linear-gradient(45deg, ${themeColors.primary}, ${themeColors.secondary})`,
                  borderRadius: '10px',
                  '&:hover': {
                    background: themeColors.accent,
                  },
                },
              }}>
              {/* Header */}
              <Box
                sx={{
                  paddingBlock: 2,
                  paddingInline: 4,
                  display: 'flex',
                  backgroundColor: themeColors.paper,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  borderBottom: `2px solid ${themeColors.border}`,
                  borderRadius: '20px 20px 0 0',
                  background: `linear-gradient(135deg, ${themeColors.primary}15, ${themeColors.secondary}15)`,
                  backdropFilter: 'blur(10px)',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <History size={24} color={themeColors.primary} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.5rem',
                      textAlign: 'center',
                      color: themeColors.text,
                      background: `linear-gradient(45deg, ${themeColors.primary}, ${themeColors.secondary})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    {t('editHistory')}
                  </Typography>
                </Box>

                <IconButton
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: isDark
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.05)',
                    border: `2px solid ${themeColors.border}`,
                    borderRadius: '12px',
                    width: '48px',
                    height: '48px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: isDark
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.1)',
                      transform: 'translateY(-50%) scale(1.1)',
                      boxShadow: `0 8px 25px rgba(0,0,0,0.2)`,
                    },
                  }}
                  onClick={handleToggle}>
                  <X size={20} color={themeColors.text} />
                </IconButton>
              </Box>

              {/* Content */}
              <Box
                sx={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}>
                {/* User Info Section */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: themeColors.paper,
                    border: `1px solid ${themeColors.border}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? '0 12px 24px rgba(0,0,0,0.4)'
                        : '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Avatar
                      src={question.user.profilePicture}
                      sx={{
                        width: 72,
                        height: 72,
                        border: `4px solid ${themeColors.primary}`,
                        boxShadow: `0 8px 16px rgba(0,0,0,0.2)`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          mb: 2,
                        }}>
                        <User size={18} color={themeColors.primary} />
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: themeColors.text,
                            fontSize: '1.1rem',
                          }}>
                          {question.user.username}
                        </Typography>
                        <Chip
                          icon={<Clock size={14} />}
                          label={<FormatTime createdAt={history.createdAt} />}
                          sx={{
                            backgroundColor: `${themeColors.primary}20`,
                            color: themeColors.primary,
                            fontWeight: 600,
                            fontSize: '0.8rem',
                            '& .MuiChip-icon': {
                              color: themeColors.primary,
                            },
                          }}
                        />
                      </Box>

                      {question.tags?.length > 0 && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            flexWrap: 'wrap',
                          }}>
                          <Tag size={16} color={themeColors.accent} />
                          {question.tags.map((tag: any, index: number) => (
                            <Chip
                              key={index}
                              label={tag.name}
                              size="small"
                              sx={{
                                backgroundColor: `${themeColors.accent}20`,
                                color: themeColors.accent,
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                '&:hover': {
                                  backgroundColor: `${themeColors.accent}30`,
                                  transform: 'scale(1.05)',
                                },
                                transition: 'all 0.2s ease',
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Paper>

                {/* Question Content */}
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    borderRadius: '16px',
                    background: themeColors.paper,
                    border: `1px solid ${themeColors.border}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: isDark
                        ? '0 12px 24px rgba(0,0,0,0.4)'
                        : '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: themeColors.text,
                      mb: 3,
                      lineHeight: 1.4,
                      background: `linear-gradient(45deg, ${themeColors.text}, ${themeColors.textSecondary})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                    {history.title}
                  </Typography>

                  <Divider
                    sx={{
                      mb: 3,
                      background: `linear-gradient(90deg, ${themeColors.primary}, ${themeColors.secondary})`,
                      height: '2px',
                      borderRadius: '1px',
                    }}
                  />

                  <Box
                    sx={{
                      '& *': {
                        color: `${themeColors.text} !important`,
                      },
                      '& p': {
                        lineHeight: 1.7,
                        marginBottom: '16px',
                      },
                      '& h1, & h2, & h3, & h4, & h5, & h6': {
                        marginBottom: '12px',
                        fontWeight: 600,
                      },
                    }}>
                    <TypographyStylesProvider>
                      <QuestionContent content={history.content} />
                    </TypographyStylesProvider>
                  </Box>

                  {history.images?.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                      <ImageGrid files={history.images} />
                    </Box>
                  )}
                </Paper>
              </Box>
            </Paper>
          </Zoom>

          {/* Navigation Buttons */}
          <Fade in={!!prevHistory} timeout={300}>
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                left: 'calc(12.5% - 70px)',
                transform: 'translateY(-50%)',
                backgroundColor: themeColors.paper,
                border: `2px solid ${themeColors.primary}`,
                borderRadius: '16px',
                width: '56px',
                height: '56px',
                boxShadow: isDark
                  ? '0 8px 25px rgba(0,0,0,0.4)'
                  : '0 8px 25px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: themeColors.primary,
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: isDark
                    ? '0 12px 30px rgba(0,0,0,0.6)'
                    : '0 12px 30px rgba(0,0,0,0.25)',
                  '& svg': {
                    color: '#ffffff',
                  },
                },
                '& svg': {
                  color: themeColors.primary,
                  transition: 'color 0.3s ease',
                },
              }}
              onClick={handlePrev}>
              <ChevronLeft size={24} />
            </IconButton>
          </Fade>

          <Fade in={!!nextHistory} timeout={300}>
            <IconButton
              sx={{
                position: 'absolute',
                top: '50%',
                right: 'calc(12.5% - 70px)',
                transform: 'translateY(-50%)',
                backgroundColor: themeColors.paper,
                border: `2px solid ${themeColors.primary}`,
                borderRadius: '16px',
                width: '56px',
                height: '56px',
                boxShadow: isDark
                  ? '0 8px 25px rgba(0,0,0,0.4)'
                  : '0 8px 25px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: themeColors.primary,
                  transform: 'translateY(-50%) scale(1.1)',
                  boxShadow: isDark
                    ? '0 12px 30px rgba(0,0,0,0.6)'
                    : '0 12px 30px rgba(0,0,0,0.25)',
                  '& svg': {
                    color: '#ffffff',
                  },
                },
                '& svg': {
                  color: themeColors.primary,
                  transition: 'color 0.3s ease',
                },
              }}
              onClick={handleNext}>
              <ChevronRight size={24} />
            </IconButton>
          </Fade>
        </Box>
      </Fade>
    </Modal>
  );
}

export default QuestionHistory;

import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Tooltip,
  IconButton,
  Chip,
  Fade,
  Zoom,
} from '@mui/material';
import { TypographyStylesProvider, useMantineColorScheme } from '@mantine/core';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import { getQuestion } from './Services/QuestionServices';
import { ApiResponse } from '@/types';
import { useParams } from 'react-router-dom';
import FormatTime from './formatTime';
import QuestionHistory from './QuestionHistory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import FlagIcon from '@mui/icons-material/Flag';
import ReportPage from './ReportPage';
import { useUserStore } from '../../stores/useUserStore';
import { Link } from 'react-router-dom';
import memberRoutePaths from '@/routes/user/member/paths';
import { useTranslation } from 'react-i18next';

const QuestionView = () => {
  const { t } = useTranslation('question');
  const { user } = useUserStore();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [openHistory, setOpenHistory] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleToggleHistory = () => {
    setOpenHistory((prev) => !prev);
  };

  const handleToggleReport = () => {
    setOpenReport((prev) => !prev);
  };

  const handleDelete = () => {};

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        const response: ApiResponse = await getQuestion(id);
        if (response.success) {
          setData(response.content);
          setTimeout(() => setIsLoaded(true), 300);
        } else {
        }
      } catch (err) {}
    };

    fetchQuestion();
  }, [id]);

  const getThemeStyles = () => ({
    loadingContainer: {
      background: isDark
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    loadingText: {
      color: 'white',
      fontSize: '18px',
      fontWeight: '500',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },
    headerBox: {
      background: isDark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
        : '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
    usernameText: {
      fontWeight: '700',
      fontSize: '18px',
      background: isDark
        ? 'linear-gradient(135deg, #bb86fc 0%, #3700b3 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    actionButtonsContainer: {
      background: isDark ? 'rgba(40, 40, 40, 0.8)' : 'rgba(255, 255, 255, 0.6)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
    },
    divider: {
      background: isDark
        ? 'linear-gradient(90deg, transparent, #bb86fc, #3700b3, transparent)'
        : 'linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)',
    },
    titleText: {
      fontSize: '28px',
      fontWeight: 'bold',
      mb: 3,
      background: isDark
        ? 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
        : 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.3,
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    contentBox: {
      background: isDark ? 'rgba(40, 40, 40, 0.9)' : 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
    },
    imagesBox: {
      background: isDark ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.6)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      border: isDark
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.2)'
        : '0 8px 32px rgba(0, 0, 0, 0.08)',
    },
  });

  const themeStyles = getThemeStyles();

  if (!data) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '400px',
          ...themeStyles.loadingContainer,
          borderRadius: '24px',
          margin: '20px',
        }}>
        <Typography sx={themeStyles.loadingText}></Typography>
      </Box>
    );
  }

  return (
    <Fade in={isLoaded} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          background: 'transparent',
        }}>
        <Box
          sx={{
            width: '100%',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}>
          {/* Header Section */}
          <Zoom
            in={isLoaded}
            timeout={600}
            style={{ transitionDelay: '200ms' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                mb: 3,
                p: 3,
                ...themeStyles.headerBox,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                    : '0 12px 40px rgba(0, 0, 0, 0.15)',
                },
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    mr: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      right: -4,
                      bottom: -4,
                      background: isDark
                        ? 'linear-gradient(45deg, #bb86fc, #3700b3, #03dac6)'
                        : 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                      borderRadius: '50%',
                      opacity: 0.7,
                      animation: 'pulse 2s ease-in-out infinite',
                    },
                    '@keyframes pulse': {
                      '0%': { transform: 'scale(1)', opacity: 0.7 },
                      '50%': { transform: 'scale(1.1)', opacity: 0.9 },
                      '100%': { transform: 'scale(1)', opacity: 0.7 },
                    },
                  }}>
                  <Avatar
                    src={data.user.profilePicture}
                    alt=""
                    sx={{
                      width: 68,
                      height: 68,
                      position: 'relative',
                      zIndex: 1,
                      border: '3px solid white',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                </Box>

                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                    }}>
                    <Typography sx={themeStyles.usernameText}>
                      {data.user.username}
                    </Typography>

                    <Chip
                      label={
                        <FormatTime
                          createdAt={data.updatedAt ?? data.createdAt}
                        />
                      }
                      sx={{
                        background: isDark
                          ? 'linear-gradient(135deg, #bb86fc 0%, #3700b3 100%)'
                          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '600',
                        height: '28px',
                        '& .MuiChip-label': {
                          px: 2,
                        },
                        boxShadow: isDark
                          ? '0 4px 12px rgba(187, 134, 252, 0.4)'
                          : '0 4px 12px rgba(102, 126, 234, 0.4)',
                      }}
                    />
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {data.tags?.map((tag: any, index: number) => (
                      <Chip
                        key={index}
                        label={tag.name}
                        size="small"
                        sx={{
                          background: isDark
                            ? 'linear-gradient(135deg, #ff7043 0%, #ff5722 100%)'
                            : 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                          color: isDark ? 'white' : '#2d3436',
                          fontSize: '11px',
                          fontWeight: '600',
                          height: '24px',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: isDark
                              ? '0 4px 12px rgba(255, 112, 67, 0.6)'
                              : '0 4px 12px rgba(255, 234, 167, 0.6)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  p: 1,
                  ...themeStyles.actionButtonsContainer,
                }}>
                {user &&
                  (user?.id == data.userId ? (
                    <>
                      <Tooltip title={t('editHistory')} arrow>
                        <IconButton
                          onClick={handleToggleHistory}
                          sx={{
                            background:
                              'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
                            color: 'white',
                            width: 44,
                            height: 44,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px) scale(1.05)',
                              boxShadow: '0 8px 20px rgba(76, 175, 80, 0.4)',
                            },
                          }}>
                          <HistoryIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={t('edit')} arrow>
                        <IconButton
                          component={Link}
                          to={memberRoutePaths.editQuestion.replace(
                            ':id',
                            data.id,
                          )}
                          sx={{
                            background:
                              'linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)',
                            color: 'white',
                            width: 44,
                            height: 44,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px) scale(1.05)',
                              boxShadow: '0 8px 20px rgba(33, 150, 243, 0.4)',
                            },
                          }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={t('delete')} arrow>
                        <IconButton
                          onClick={handleDelete}
                          sx={{
                            background:
                              'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
                            color: 'white',
                            width: 44,
                            height: 44,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-2px) scale(1.05)',
                              boxShadow: '0 8px 20px rgba(244, 67, 54, 0.4)',
                            },
                          }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title={t('report')} arrow>
                      <IconButton
                        onClick={handleToggleReport}
                        sx={{
                          background:
                            'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
                          color: 'white',
                          width: 44,
                          height: 44,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px) scale(1.05)',
                            boxShadow: '0 8px 20px rgba(255, 152, 0, 0.4)',
                          },
                        }}>
                        <FlagIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ))}
              </Box>
            </Box>
          </Zoom>

          {/* Divider with gradient */}
          <Box
            sx={{
              height: '2px',
              ...themeStyles.divider,
              my: 3,
              borderRadius: '1px',
              opacity: 0.6,
            }}
          />

          {/* Title Section */}
          <Fade
            in={isLoaded}
            timeout={800}
            style={{ transitionDelay: '400ms' }}>
            <Typography variant="h4" sx={themeStyles.titleText}>
              {data.title}
            </Typography>
          </Fade>

          {/* Content Section */}
          <Fade
            in={isLoaded}
            timeout={1000}
            style={{ transitionDelay: '600ms' }}>
            <Box
              sx={{
                p: 3,
                ...themeStyles.contentBox,
                mb: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 0, 0, 0.3)'
                    : '0 12px 40px rgba(0, 0, 0, 0.12)',
                },
                color: isDark ? '#ffffff' : '#1a202c',
              }}>
              <TypographyStylesProvider>
                <QuestionContent content={data.content} />
              </TypographyStylesProvider>
            </Box>
          </Fade>

          {/* Images Section */}
          {data.images?.length > 0 && (
            <Fade
              in={isLoaded}
              timeout={1200}
              style={{ transitionDelay: '800ms' }}>
              <Box
                sx={{
                  p: 3,
                  ...themeStyles.imagesBox,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: isDark
                      ? '0 12px 40px rgba(0, 0, 0, 0.3)'
                      : '0 12px 40px rgba(0, 0, 0, 0.12)',
                  },
                }}>
                <ImageGrid files={data.images} />
              </Box>
            </Fade>
          )}
        </Box>

        <QuestionHistory
          open={openHistory}
          handleToggle={handleToggleHistory}
          question={data}
        />

        <ReportPage
          open={openReport}
          handleToggle={handleToggleReport}
          contentType="QUESTION"
          contentId={id || ''}
          content={data.title}
        />
      </Paper>
    </Fade>
  );
};

export default QuestionView;

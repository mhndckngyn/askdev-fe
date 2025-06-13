import { Box, Paper, Typography, Modal, Avatar, Divider } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { TypographyStylesProvider, useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import FormatTime from './formatTime';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  handleToggle: () => void;
  data: any;
}

function ContentTypePage({ open, handleToggle, data }: Props) {
  const { t } = useTranslation('adminReportPage');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const themeColors = {
    bg: isDark ? '#0f1419' : '#ffffff',
    paper: isDark ? '#1a1f2e' : '#ffffff',
    text: isDark ? '#ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    border: isDark ? '#2a2f3e' : '#e0e0e0',
    accent: isDark ? ' #3b82f6' : ' #2563eb',
    surface: isDark ? '#252a3a' : '#f8fafc',
    hover: isDark ? '#2a2f3e' : '#f0f0f0',
    gradient: isDark
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    cardBg: isDark ? '#1e2333' : '#ffffff',
  };

  return (
    <>
      <Modal open={open} onClose={handleToggle}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <Paper
            elevation={24}
            sx={{
              width: { xs: '95%', md: '70%', lg: '60%' },
              maxWidth: '1000px',
              height: '92vh',
              position: 'absolute',
              overflowY: 'auto',
              top: '50%',
              left: '50%',
              borderRadius: '24px',
              transform: 'translate(-50%, -50%)',
              backgroundColor: themeColors.paper,
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: `1px solid ${themeColors.border}`,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '&::-webkit-scrollbar-track': {
                background: themeColors.surface,
              },
              '&::-webkit-scrollbar-thumb': {
                background: themeColors.accent,
                borderRadius: '4px',
              },
            }}>
            {/* Header with gradient background */}
            <Box
              sx={{
                background: themeColors.gradient,
                padding: '20px 32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                borderRadius: '24px 24px 0 0',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  fontSize: '28px',
                  textAlign: 'center',
                  margin: 'auto',
                  color: themeColors.text,
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  letterSpacing: '0.5px',
                }}>
                {t('openContentPage')}
              </Typography>

              {/* Close button */}
              <Box
                sx={{
                  position: 'absolute',
                  right: '20px',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  padding: '12px',
                  borderRadius: '50%',
                  backdropFilter: 'blur(10px)',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor: isDark
                      ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)'
                      : 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                    transform: 'scale(1.1) rotate(90deg)',
                  },
                }}
                onClick={handleToggle}>
                <IconX style={{ color: themeColors.text, fontSize: '20px' }} />
              </Box>
            </Box>

            {/* Question Content Card */}
            <Box
              sx={{
                margin: '24px',
                padding: '32px',
                borderRadius: '20px',
                backgroundColor: themeColors.cardBg,
                border: `1px solid ${themeColors.border}`,
                boxShadow: isDark
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.08)',
                background:
                  data.content.answer === null
                    ? isDark
                      ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                      : 'linear-gradient(135deg, #ffe6e6 0%, #ffcccb 100%)'
                    : themeColors.cardBg,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                    : '0 12px 40px rgba(0, 0, 0, 0.12)',
                },
              }}>
              {/* User Info Section */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  mb: 3,
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={data.content.question.user.profilePicture}
                    alt=""
                    sx={{
                      width: '72px',
                      height: '72px',
                      marginRight: '16px',
                      border: `3px solid ${themeColors.accent}`,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                      }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '18px',
                          color: themeColors.text,
                          textShadow:
                            data.content.answer === null
                              ? '0 1px 2px rgba(0, 0, 0, 0.3)'
                              : 'none',
                        }}>
                        {data.content.question.user.username}
                      </Typography>

                      <Typography
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color:
                            data.content.answer === null
                              ? themeColors.text
                              : themeColors.textSecondary,
                          padding: '6px 16px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}>
                        <FormatTime
                          createdAt={
                            data.content.question.updatedAt ??
                            data.content.question.createdAt
                          }
                        />
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        backgroundColor:
                          data.content.answer === null
                            ? 'rgba(255, 255, 255, 0.2)'
                            : '#ffd700',
                        color:
                          data.content.answer === null
                            ? themeColors.text
                            : themeColors.textSecondary,
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 600,
                        display: 'inline-block',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                      }}>
                      {data.content.question.tags
                        ?.map((tag: any) => tag.name)
                        .join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider
                sx={{
                  borderColor:
                    data.content.answer === null
                      ? 'rgba(255, 255, 255, 0.3)'
                      : themeColors.border,
                  mb: 3,
                }}
              />

              {/* Question Title */}
              <Typography
                variant="h4"
                sx={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: themeColors.text,
                  mb: 3,
                  lineHeight: 1.4,
                  textShadow:
                    data.content.answer === null
                      ? '0 1px 2px rgba(0, 0, 0, 0.3)'
                      : 'none',
                }}>
                {data.content.question.title}
              </Typography>

              {/* Question Content */}
              <Box
                sx={{
                  color: themeColors.text,
                  mb: 3,
                }}>
                <TypographyStylesProvider>
                  <QuestionContent content={data.content.question.content} />
                </TypographyStylesProvider>
              </Box>

              {/* Images */}
              {data.content.question.images?.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <ImageGrid files={data.content.question.images} />
                </Box>
              )}
            </Box>

            {/* Answer Section */}
            {data.content.answer && (
              <Box
                sx={{
                  margin: '24px',
                  padding: '32px',
                  borderRadius: '20px',
                  backgroundColor: themeColors.cardBg,
                  border: `1px solid ${themeColors.border}`,
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                    : '0 8px 32px rgba(0, 0, 0, 0.08)',
                  background:
                    data.content.comment === null
                      ? isDark
                        ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                        : 'linear-gradient(135deg, #ffe6e6 0%, #ffcccb 100%)'
                      : isDark
                        ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)'
                        : 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: isDark
                      ? '0 12px 40px rgba(0, 0, 0, 0.4)'
                      : '0 12px 40px rgba(0, 0, 0, 0.12)',
                  },
                }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Avatar
                    src={data.content.answer.user.profilePicture}
                    sx={{
                      width: 60,
                      height: 60,
                      border: `3px solid ${themeColors.accent}`,
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 1,
                      }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '18px',
                          color: themeColors.text,
                          textShadow:
                            data.content.comment === null
                              ? '0 1px 2px rgba(0, 0, 0, 0.3)'
                              : 'none',
                        }}>
                        {data.content.answer.user.username}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          color:
                            data.content.comment === null
                              ? themeColors.text
                              : themeColors.textSecondary,
                          backgroundColor:
                            data.content.comment === null
                              ? 'rgba(255, 255, 255, 0.1)'
                              : 'rgba(0, 0, 0, 0.05)',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)',
                        }}>
                        {dayjs(data.content.answer.createdAt).format(
                          'HH:mm DD/MM/YYYY',
                        )}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        maxWidth: '100%',
                        overflowWrap: 'break-word',
                        fontSize: '16px',
                        lineHeight: 1.6,
                        color: themeColors.text,
                        textShadow:
                          data.content.comment === null
                            ? '0 1px 2px rgba(0, 0, 0, 0.2)'
                            : 'none',
                      }}>
                      {data.content.answer.content}
                    </Typography>
                  </Box>
                </Box>

                {/* Comment Section */}
                {data.content.comment && (
                  <Box sx={{ ml: 6, mt: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        backgroundImage: isDark
                          ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)'
                          : 'linear-gradient(135deg, #ffe6e6 0%, #ffcccb 100%)',
                        borderRadius: '16px',
                        padding: '20px',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${themeColors.border}`,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      }}>
                      <Avatar
                        src={data.content.comment.user.profilePicture}
                        sx={{
                          width: 48,
                          height: 48,
                          border: `2px solid ${themeColors.accent}`,
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                          }}>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: '16px',
                              color: themeColors.text,
                            }}>
                            {data.content.comment.user.username}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '12px',
                              color: themeColors.text,
                              backgroundColor: 'rgba(0, 0, 0, 0.05)',
                              padding: '2px 8px',
                              borderRadius: '8px',
                            }}>
                            {dayjs(data.content.comment.createdAt).format(
                              'HH:mm DD/MM/YYYY',
                            )}
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '15px',
                            lineHeight: 1.5,
                            color: themeColors.text,
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            maxWidth: '100%',
                            overflowWrap: 'break-word',
                          }}>
                          {data.content.comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default ContentTypePage;

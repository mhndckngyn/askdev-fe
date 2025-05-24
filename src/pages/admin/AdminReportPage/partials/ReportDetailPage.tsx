import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
  Fade,
  Grow,
  Avatar,
  Stack,
  Divider,
  alpha,
} from '@mui/material';

import { ActionIcon, Tooltip } from '@mantine/core';
import {
  IconX,
  IconFileReport,
  IconEye,
  IconEyeSpark,
  IconShield,
} from '@tabler/icons-react';

import { useMantineColorScheme } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateStatus } from '../services';
import { notifications, Notifications } from '@mantine/notifications';
import { getReportedContentDetails } from '../services';
import ContentTypePage from './ContentTypePage';

export interface ReportAdminView {
  id: string;
  username?: string;
  contentType: string;
  contentId: string;
  reason: string;
  status: string;
  createdAt: string;
  isHidden: boolean;
}

interface Props {
  open: boolean;
  handleToggle: () => void;
  report: ReportAdminView;
  setRecords: (updatedStatus: ReportAdminView) => void;
}

function ReportDetailPage({ open, handleToggle, report, setRecords }: Props) {
  const { t } = useTranslation('adminReportPage');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const [reportState, setStateReport] = useState(report.status);

  const getStatusBackgroundGradient = (status: string) => {
    switch (status) {
      case 'PENDING':
        return isDark
          ? 'linear-gradient(135deg, rgba(255, 165, 0, 0.25), rgba(255, 140, 0, 0.15), rgba(255, 193, 7, 0.1))'
          : 'linear-gradient(135deg, rgba(255, 223, 70, 0.7), rgba(255, 200, 55, 0.5), rgba(255, 235, 100, 0.4))';

      case 'REVIEWED':
        return isDark
          ? 'linear-gradient(135deg, rgba(46, 213, 115, 0.25), rgba(0, 206, 209, 0.15), rgba(39, 174, 96, 0.1))'
          : 'linear-gradient(135deg, rgba(0, 230, 118, 0.7), rgba(0, 255, 180, 0.5), rgba(129, 255, 186, 0.4))';

      case 'REJECTED':
        return isDark
          ? 'linear-gradient(135deg, rgba(231, 76, 60, 0.25), rgba(192, 57, 43, 0.15), rgba(255, 82, 82, 0.1))'
          : 'linear-gradient(135deg, rgba(255, 94, 98, 0.7), rgba(255, 70, 70, 0.5), rgba(255, 150, 150, 0.4))';

      default:
        return isDark
          ? 'linear-gradient(135deg, rgba(108, 117, 125, 0.15), rgba(73, 80, 87, 0.1), rgba(134, 142, 150, 0.05))'
          : 'linear-gradient(135deg, rgba(200, 200, 200, 0.5), rgba(230, 230, 230, 0.35), rgba(250, 250, 250, 0.25))';
    }
  };

  const themeColors = {
    bg: isDark ? '#0a0e1a' : '#fafbfc',
    paper: isDark ? '#1a1f2e' : '#ffffff',
    text: isDark ? '#f8fafc' : '#1e293b',
    textSecondary: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? '#334155' : '#e2e8f0',
    accent: '#3b82f6',
    accentHover: '#2563eb',
    surface: isDark ? '#0f172a' : '#f1f5f9',
    surfaceHover: isDark ? '#1e293b' : '#e2e8f0',
    cardBg: isDark ? '#1e293b' : '#ffffff',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    purple: '#8b5cf6',
    pink: '#ec4899',
    indigo: '#6366f1',
    gradient: {
      primary: isDark
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      accent: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
      surface: isDark
        ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      glow: isDark
        ? 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
        : 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
    },
  };

  const infoList = [
    {
      label: 'ID',
      value: report.id,
      icon: '🆔',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      label: t('username'),
      value: report.username,
      icon: '👤',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      label: t('contentType'),
      value: t(report.contentType as any),
      icon: '📄',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      label: t('contentId'),
      value: report.contentId,
      icon: '🔗',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
    {
      label: t('createdAt'),
      value: report.createdAt,
      icon: '📅',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
      label: t('reason'),
      value: report.reason,
      icon: '⚠️',
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
  ];

  const [status, setStatus] = useState<'PENDING' | 'REVIEWED' | 'REJECTED'>(
    report.status as 'PENDING' | 'REVIEWED' | 'REJECTED',
  );

  useEffect(() => {
    if (open) {
      setStatus(report.status as 'PENDING' | 'REVIEWED' | 'REJECTED');
      setStateReport(report.status);
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      const result = await updateStatus(
        report.id,
        status as 'PENDING' | 'REVIEWED' | 'REJECTED',
      );
      if (result.success) {
        setRecords({
          ...report,
          status,
        });

        setStateReport(status);
        notifications.show({
          message: t('updateStatusSuccess'),
          color: 'green',
        });
      } else {
        notifications.show({
          message: t('updateStatusFail'),
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        message: t('updateStatusFail'),
        color: 'red',
      });
    }
  };

  const [dataContent, setDataContent] = useState<any | null>(null);
  const [openContent, setOpenContent] = useState(false);
  const handleToggleContent = () => setOpenContent((prev) => !prev);

  const handleOpenContent = async (report: ReportAdminView) => {
    try {
      const data = await getReportedContentDetails(
        report.contentType as 'QUESTION' | 'ANSWER' | 'COMMENT',
        report.contentId,
      );
      if (data.success) {
        setDataContent(data);
        setOpenContent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'REVIEWED':
        return '✅';
      case 'REJECTED':
        return '❌';
      default:
        return '❓';
    }
  };

  const getStatusGradient = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)';
      case 'REVIEWED':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'REJECTED':
        return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      default:
        return 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
    }
  };

  return (
    <>
      <Notifications zIndex={9999} />
      <Modal
        open={open}
        onClose={handleToggle}
        sx={{
          backdropFilter: 'blur(16px)',
          '& .MuiBackdrop-root': {
            backgroundColor: alpha('#000000', 0.7),
          },
        }}>
        <Fade in={open} timeout={600}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}>
            {/* Animated background glow */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '50%',
                width: '600px',
                height: '600px',
                transform: 'translate(-50%, -50%)',
                background: themeColors.gradient.glow,
                borderRadius: '50%',
                filter: 'blur(100px)',
                opacity: 0.6,
                animation: 'pulse 4s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
                  '50%': { transform: 'translate(-50%, -50%) scale(1.1)' },
                },
                zIndex: 0,
              }}
            />

            <Grow in={open} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  width: { xs: '95%', sm: '85%', md: '70%', lg: '50%' },
                  maxWidth: '650px',
                  maxHeight: '90vh',
                  position: 'relative',
                  overflowY: 'auto',
                  borderRadius: '32px',
                  background: getStatusBackgroundGradient(reportState),
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(themeColors.border, 0.3)}`,
                  boxShadow: isDark
                    ? `0 32px 64px -12px ${alpha('#000000', 0.4)}, 0 0 0 1px ${alpha('#ffffff', 0.05)}`
                    : `0 32px 64px -12px ${alpha('#000000', 0.15)}, 0 0 0 1px ${alpha('#000000', 0.05)}`,

                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },

                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: themeColors.accent,
                    borderRadius: '6px',
                  },
                  zIndex: 1,
                }}>
                {/* Enhanced Header */}
                <Box
                  sx={{
                    background: themeColors.gradient.accent,
                    padding: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    borderRadius: '32px 32px 0 0',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      borderRadius: '32px 32px 0 0',
                    },
                  }}>
                  {/* Floating particles effect */}
                  {[...Array(6)].map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        width: '4px',
                        height: '4px',
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 15}%`,
                        animation: `float${i} ${3 + i * 0.5}s ease-in-out infinite`,
                        '@keyframes float0': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-10px)' },
                        },
                        '@keyframes float1': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-15px)' },
                        },
                        '@keyframes float2': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-8px)' },
                        },
                        '@keyframes float3': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-12px)' },
                        },
                        '@keyframes float4': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-18px)' },
                        },
                        '@keyframes float5': {
                          '0%, 100%': { transform: 'translateY(0px)' },
                          '50%': { transform: 'translateY(-6px)' },
                        },
                      }}
                    />
                  ))}

                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ position: 'relative', zIndex: 1 }}>
                    <Avatar
                      sx={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        width: 48,
                        height: 48,
                      }}>
                      <IconFileReport size={24} color="white" />
                    </Avatar>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        fontSize: '28px',
                        color: 'white',
                        textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        letterSpacing: '-0.5px',
                      }}>
                      {t('viewReport')}
                    </Typography>
                  </Stack>

                  {/* Enhanced Close button */}
                  <ActionIcon
                    onClick={handleToggle}
                    size={48}
                    variant="subtle"
                    style={{
                      position: 'absolute',
                      right: '24px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.25)',
                        transform: 'scale(1.1) rotate(90deg)',
                      },
                    }}>
                    <IconX size={20} color="white" />
                  </ActionIcon>
                </Box>

                {/* Enhanced Content */}
                <Box sx={{ padding: '40px', position: 'relative' }}>
                  {/* Enhanced Status Badge */}

                  {/* Enhanced Report Details */}
                  <Stack spacing={3} sx={{ mb: 4 }}>
                    {infoList.map((item, index) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 3,
                          backgroundColor: alpha(themeColors.surface, 0.5),
                          backdropFilter: 'blur(10px)',
                          borderRadius: '20px',
                          border: `1px solid ${alpha(themeColors.border, 0.3)}`,
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-4px) scale(1.02)',
                            boxShadow: isDark
                              ? `0 20px 40px ${alpha('#000000', 0.3)}`
                              : `0 20px 40px ${alpha('#000000', 0.1)}`,
                            '&::before': {
                              opacity: 1,
                            },
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '4px',
                            height: '100%',
                            background: item.gradient,
                            opacity: 0.7,
                            transition: 'opacity 0.3s ease',
                          },
                        }}>
                        <Stack
                          direction="row"
                          spacing={3}
                          alignItems="flex-start">
                          <Avatar
                            sx={{
                              background: item.gradient,
                              width: 48,
                              height: 48,
                              fontSize: '20px',
                              boxShadow: `0 8px 16px ${alpha('#000000', 0.15)}`,
                            }}>
                            {item.icon}
                          </Avatar>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '12px',
                                color: themeColors.textSecondary,
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                mb: 1,
                              }}>
                              {item.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '16px',
                                color: themeColors.text,
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                                fontWeight: 500,
                              }}>
                              {item.value}
                              {item.label === t('contentId') && (
                                <Tooltip
                                  label={t('openContentPage')}
                                  withinPortal
                                  zIndex={2000}>
                                  <ActionIcon
                                    size="lg"
                                    variant="gradient"
                                    gradient={{
                                      from: themeColors.accent,
                                      to: themeColors.indigo,
                                    }}
                                    style={{
                                      marginLeft: '12px',
                                      borderRadius: '12px',
                                      boxShadow: `0 4px 12px ${alpha(themeColors.accent, 0.3)}`,
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'scale(1.1)',
                                        boxShadow: `0 8px 20px ${alpha(themeColors.accent, 0.4)}`,
                                      },
                                    }}
                                    onClick={() => handleOpenContent(report)}>
                                    <IconEye size={18} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </Typography>
                          </Box>
                        </Stack>
                      </Paper>
                    ))}
                  </Stack>

                  <Divider
                    sx={{
                      my: 4,
                      background: themeColors.gradient.accent,
                      height: '2px',
                      borderRadius: '1px',
                    }}
                  />

                  {/* Enhanced Status Update Section */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      background: themeColors.gradient.surface,
                      borderRadius: '24px',
                      border: `2px solid ${alpha(themeColors.accent, 0.3)}`,
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background:
                          'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
                      },
                    }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ mb: 3, position: 'relative', zIndex: 1 }}>
                      <Avatar
                        sx={{
                          background: themeColors.gradient.accent,
                          width: 40,
                          height: 40,
                        }}>
                        <IconShield size={20} />
                      </Avatar>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '20px',
                          color: themeColors.text,
                          letterSpacing: '-0.3px',
                        }}>
                        {t('updateStatus')}
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={3}
                      sx={{ position: 'relative', zIndex: 1 }}>
                      <TextField
                        label={t('status')}
                        select
                        fullWidth
                        value={status}
                        onChange={(e) =>
                          setStatus(
                            e.target.value as
                              | 'PENDING'
                              | 'REVIEWED'
                              | 'REJECTED',
                          )
                        }
                        sx={{
                          flex: 1,
                          '& .MuiInputBase-root': {
                            height: '64px',
                            borderRadius: '20px',
                            backgroundColor: alpha(themeColors.cardBg, 0.8),
                            backdropFilter: 'blur(10px)',
                            fontSize: '16px',
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: alpha(themeColors.border, 0.3),
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: themeColors.accent,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: themeColors.accent,
                              boxShadow: `0 0 0 4px ${alpha(themeColors.accent, 0.1)}`,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: themeColors.textSecondary,
                            fontWeight: 600,
                            '&.Mui-focused': {
                              color: themeColors.accent,
                            },
                          },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                backgroundColor: alpha(
                                  themeColors.cardBg,
                                  0.95,
                                ),
                                backdropFilter: 'blur(20px)',
                                border: `1px solid ${alpha(themeColors.border, 0.3)}`,
                                borderRadius: '16px',
                                mt: 1,
                              },
                            },
                          },
                        }}>
                        {['PENDING', 'REVIEWED', 'REJECTED'].map(
                          (statusOption) => (
                            <MenuItem
                              key={statusOption}
                              value={statusOption}
                              sx={{
                                py: 1.5,
                                borderRadius: '12px',
                                mx: 1,
                                my: 0.5,
                                '&:hover': {
                                  backgroundColor: alpha(
                                    themeColors.accent,
                                    0.1,
                                  ),
                                },
                                '&.Mui-selected': {
                                  backgroundColor: alpha(
                                    themeColors.accent,
                                    0.15,
                                  ),
                                  '&:hover': {
                                    backgroundColor: alpha(
                                      themeColors.accent,
                                      0.2,
                                    ),
                                  },
                                },
                              }}>
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}>
                                <Box
                                  sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '8px',
                                    background: getStatusGradient(statusOption),
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px',
                                  }}>
                                  {getStatusIcon(statusOption)}
                                </Box>
                                <Typography
                                  sx={{
                                    color: themeColors.text,
                                    fontWeight: 600,
                                  }}>
                                  {t(statusOption as any)}
                                </Typography>
                              </Stack>
                            </MenuItem>
                          ),
                        )}
                      </TextField>

                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        startIcon={<IconEyeSpark size={20} />}
                        sx={{
                          height: '64px',
                          minWidth: '160px',
                          borderRadius: '20px',
                          background: themeColors.gradient.accent,
                          fontSize: '16px',
                          fontWeight: 700,
                          textTransform: 'none',
                          boxShadow: `0 8px 24px ${alpha(themeColors.accent, 0.3)}`,
                          border: `1px solid ${alpha('#ffffff', 0.2)}`,
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-2px) scale(1.05)',
                            boxShadow: `0 16px 40px ${alpha(themeColors.accent, 0.4)}`,
                          },
                          '&:active': {
                            transform: 'translateY(0) scale(1.02)',
                          },
                        }}>
                        {t('updateStatus')}
                      </Button>
                    </Stack>
                  </Paper>
                </Box>
              </Paper>
            </Grow>
          </Box>
        </Fade>
      </Modal>

      {dataContent && (
        <ContentTypePage
          open={openContent}
          handleToggle={handleToggleContent}
          data={dataContent}
        />
      )}
    </>
  );
}

export default ReportDetailPage;

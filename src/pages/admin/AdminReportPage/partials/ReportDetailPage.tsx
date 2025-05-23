import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
  Chip,
  Fade,
  Grow,
} from '@mui/material';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconX, IconFileReport, IconEye } from '@tabler/icons-react';
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

  const themeColors = {
    bg: isDark ? '#0f1419' : '#ffffff',
    paper: isDark ? ' #1a1f2e' : '#ffffff',
    text: isDark ? ' #ffffff' : '#1a1a1a',
    textSecondary: isDark ? '#a0a0a0' : '#666666',
    border: isDark ? '#2a2f3e' : '#e0e0e0',
    accent: isDark ? ' #3b82f6' : ' #2563eb',
    surface: isDark ? ' #252a3a' : '#f8fafc',
    hover: isDark ? ' #2a2f3e' : '#f0f0f0',
    gradient: isDark
      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    cardBg: isDark ? '#1e2333' : '#ffffff',
    success: isDark ? '#10b981' : '#059669',
    warning: isDark ? '#f59e0b' : '#d97706',
    error: isDark ? '#ef4444' : '#dc2626',
  };

  const infoList = [
    { label: 'ID', value: report.id, icon: '🆔' },
    { label: t('username'), value: report.username, icon: '👤' },
    {
      label: t('contentType'),
      value: t(report.contentType as any),
      icon: '📄',
    },
    { label: t('contentId'), value: report.contentId, icon: '🔗' },
    { label: t('createdAt'), value: report.createdAt, icon: '📅' },
    { label: t('reason'), value: report.reason, icon: '⚠️' },
  ];

  const [status, setStatus] = useState<'PENDING' | 'REVIEWED' | 'REJECTED'>(
    report.status as 'PENDING' | 'REVIEWED' | 'REJECTED',
  );

  useEffect(() => {
    if (open) {
      setStatus(report.status as 'PENDING' | 'REVIEWED' | 'REJECTED');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return themeColors.warning;
      case 'REVIEWED':
        return themeColors.success;
      case 'REJECTED':
        return themeColors.error;
      default:
        return themeColors.textSecondary;
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

  return (
    <>
      <Notifications zIndex={9999} />
      <Modal open={open} onClose={handleToggle}>
        <Fade in={open}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <Grow in={open} timeout={500}>
              <Paper
                elevation={24}
                sx={{
                  width: { xs: '90%', sm: '80%', md: '60%', lg: '45%' },
                  maxWidth: '600px',
                  maxHeight: '85vh',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  margin: 'auto',
                  position: 'absolute',
                  overflowY: 'auto',
                  borderRadius: '24px',
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
                    padding: '24px 32px',
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
                      fontSize: '24px',
                      textAlign: 'center',
                      margin: 'auto',
                      color: themeColors.text,
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                      letterSpacing: '0.5px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}>
                    <IconFileReport size={28} />
                    {t('viewReport')}
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
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        transform: 'scale(1.1) rotate(90deg)',
                      },
                    }}
                    onClick={handleToggle}>
                    <IconX
                      style={{ color: themeColors.text, fontSize: '20px' }}
                    />
                  </Box>
                </Box>

                {/* Content */}
                <Box sx={{ padding: '32px', position: 'relative', zIndex: 1 }}>
                  {/* Status Badge */}
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Chip
                      label={`${getStatusIcon(reportState)} ${t(reportState as any)}`}
                      sx={{
                        backgroundColor: getStatusColor(reportState),
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: 600,
                        padding: '12px 24px',
                        height: 'auto',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        '& .MuiChip-label': {
                          padding: '8px 16px',
                        },
                      }}
                    />
                  </Box>

                  {/* Report Details */}
                  <Box sx={{ mb: 4 }}>
                    {infoList.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          mb: 3,
                          p: 3,
                          backgroundColor: themeColors.surface,
                          borderRadius: '16px',
                          border: `1px solid ${themeColors.border}`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: isDark
                              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                              : '0 8px 32px rgba(0, 0, 0, 0.08)',
                          },
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                          }}>
                          <Typography
                            sx={{ fontSize: '24px', minWidth: '32px' }}>
                            {item.icon}
                          </Typography>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 600,
                                fontSize: '14px',
                                color: themeColors.textSecondary,
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
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
                                      to: '#6366f1',
                                    }}
                                    style={{
                                      marginLeft: '12px',
                                      borderRadius: '12px',
                                    }}
                                    onClick={() => handleOpenContent(report)}>
                                    <IconEye size={20} />
                                  </ActionIcon>
                                </Tooltip>
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* Status Update Section */}
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: themeColors.cardBg,
                      borderRadius: '20px',
                      border: `2px solid ${themeColors.accent}`,
                      boxShadow: isDark
                        ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                        : '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '18px',
                        color: themeColors.text,
                        mb: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}>
                      ⚙️ {t('updateStatus')}
                    </Typography>

                    <Box display="flex" alignItems="stretch" sx={{ gap: 2 }}>
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
                            height: '56px',
                            borderRadius: '16px',
                            backgroundColor: themeColors.surface,
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: themeColors.border,
                              borderWidth: '2px',
                            },
                            '&:hover fieldset': {
                              borderColor: themeColors.accent,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: themeColors.accent,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: themeColors.textSecondary,
                            '&.Mui-focused': {
                              color: themeColors.accent,
                            },
                          },
                          '& .MuiSvgIcon-root': {
                            color: themeColors.textSecondary,
                          },
                        }}
                        SelectProps={{
                          MenuProps: {
                            PaperProps: {
                              sx: {
                                backgroundColor: themeColors.bg,
                                color: '#fff',
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
                                backgroundColor: themeColors.bg,
                                '&:hover': {
                                  backgroundColor: themeColors.border,
                                },
                              }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  color: themeColors.text,
                                }}>
                                <span>{getStatusIcon(statusOption)}</span>
                                {t(statusOption as any)}
                              </Box>
                            </MenuItem>
                          ),
                        )}
                      </TextField>

                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                          height: '56px',
                          minWidth: '140px',
                          borderRadius: '16px',
                          background: `linear-gradient(135deg, ${themeColors.accent} 0%, #6366f1 100%)`,
                          fontSize: '16px',
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                          },
                        }}>
                        🚀 {t('updateStatus')}
                      </Button>
                    </Box>
                  </Box>
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

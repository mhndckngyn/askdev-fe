import {
  Box,
  Paper,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Chip,
} from '@mui/material';
import { X, Eye, Hash, Globe, FileText, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

export interface TagAdminView {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}

interface Props {
  open: boolean;
  handleToggle: () => void;
  tag: TagAdminView;
}

function TagDetailPage({ open, handleToggle, tag }: Props) {
  const { t } = useTranslation('adminTagPage');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const infoList = [
    {
      label: 'ID',
      value: tag.id,
      icon: <Hash size={18} />,
      type: 'id',
    },
    {
      label: t('name'),
      value: tag.name,
      icon: <FileText size={18} />,
      type: 'name',
    },
    {
      label: t('descriptionVi'),
      value: tag.descriptionVi,
      icon: <Globe size={18} />,
      type: 'description',
    },
    {
      label: t('descriptionEn'),
      value: tag.descriptionEn,
      icon: <Globe size={18} />,
      type: 'description',
    },
  ];

  const paperStyles = {
    width: { xs: '95%', sm: '85%', md: '70%', lg: '50%' },
    maxWidth: '600px',
    maxHeight: '85vh',
    position: 'absolute',
    overflowY: 'auto',
    top: '50%',
    left: '50%',
    borderRadius: '24px',
    transform: 'translate(-50%, -50%)',
    background: isDark
      ? 'linear-gradient(145deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.98) 100%)'
      : 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
    backdropFilter: 'blur(20px)',
    border: isDark
      ? '1px solid rgba(255,255,255,0.1)'
      : '1px solid rgba(0,0,0,0.08)',
    boxShadow: isDark
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.05)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.8)',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
    },
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'id':
        return {
          bg: 'rgba(99, 102, 241, 0.1)',
          border: 'rgba(99, 102, 241, 0.3)',
          text: '#6366f1',
        };
      case 'name':
        return {
          bg: 'rgba(16, 185, 129, 0.1)',
          border: 'rgba(16, 185, 129, 0.3)',
          text: '#10b981',
        };
      case 'description':
        return {
          bg: 'rgba(245, 158, 11, 0.1)',
          border: 'rgba(245, 158, 11, 0.3)',
          text: '#f59e0b',
        };
      default:
        return {
          bg: 'rgba(107, 114, 128, 0.1)',
          border: 'rgba(107, 114, 128, 0.3)',
          text: '#6b7280',
        };
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
            sx: {
              background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
            },
          },
        }}>
        <Fade in={open} timeout={500}>
          <Box
            sx={{
              width: '100%',
              height: '100vh',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Paper elevation={0} sx={paperStyles}>
              {/* Background decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '30px',
                  right: '30px',
                  opacity: 0.04,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'float 8s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-15px) rotate(120deg)' },
                    '66%': { transform: 'translateY(-5px) rotate(240deg)' },
                  },
                }}>
                <Sparkles size={150} color={isDark ? '#ffffff' : '#000000'} />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '30px',
                  left: '30px',
                  opacity: 0.02,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'pulse 6s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 0.02,
                      transform: 'scale(1) rotate(0deg)',
                    },
                    '50%': {
                      opacity: 0.05,
                      transform: 'scale(1.1) rotate(180deg)',
                    },
                  },
                }}>
                <Eye size={120} color={isDark ? '#ffffff' : '#000000'} />
              </Box>

              {/* Header */}
              <Box
                sx={{
                  paddingBlock: 3,
                  paddingInline: { xs: 3, sm: 4 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'sticky',
                  top: 0,
                  zIndex: 10,
                  background: isDark
                    ? 'rgba(30,30,30,0.9)'
                    : 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderBottom: isDark
                    ? '1px solid rgba(255,255,255,0.1)'
                    : '1px solid rgba(0,0,0,0.08)',
                  borderRadius: '24px 24px 0 0',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      background:
                        'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                      borderRadius: '12px',
                      padding: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)',
                      animation: 'glow 3s ease-in-out infinite alternate',
                      '@keyframes glow': {
                        '0%': {
                          boxShadow: '0 8px 32px rgba(6, 182, 212, 0.3)',
                        },
                        '100%': {
                          boxShadow: '0 12px 40px rgba(6, 182, 212, 0.5)',
                        },
                      },
                    }}>
                    <Eye size={24} color="white" />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '20px', sm: '24px' },
                      background: isDark
                        ? 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)'
                        : 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.5px',
                    }}>
                    {t('viewTag')}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'absolute',
                    right: '20px',
                    cursor: 'pointer',
                    background: isDark
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.05)',
                    padding: '12px',
                    borderRadius: '16px',
                    border: isDark
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid rgba(0,0,0,0.1)',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: isDark
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.1)',
                      transform: 'scale(1.05)',
                      boxShadow: isDark
                        ? '0 8px 25px rgba(255,255,255,0.15)'
                        : '0 8px 25px rgba(0,0,0,0.15)',
                    },
                    '&:active': {
                      transform: 'scale(0.95)',
                    },
                  }}
                  onClick={handleToggle}>
                  <X size={20} color={isDark ? '#ffffff' : '#374151'} />
                </Box>
              </Box>

              {/* Content */}
              <Box sx={{ padding: { xs: 3, sm: 4 }, paddingTop: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {infoList.map((item, index) => {
                    const colors = getItemColor(item.type);
                    return (
                      <Box
                        key={index}
                        sx={{
                          background: isDark
                            ? 'rgba(255,255,255,0.03)'
                            : 'rgba(0,0,0,0.02)',
                          borderRadius: '20px',
                          padding: 3,
                          border: isDark
                            ? '1px solid rgba(255,255,255,0.08)'
                            : '1px solid rgba(0,0,0,0.06)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: isDark
                              ? '0 12px 30px rgba(0,0,0,0.3)'
                              : '0 12px 30px rgba(0,0,0,0.1)',
                            border: isDark
                              ? '1px solid rgba(255,255,255,0.15)'
                              : '1px solid rgba(0,0,0,0.12)',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: `linear-gradient(90deg, ${colors.text} 0%, ${colors.text}80 100%)`,
                            borderRadius: '20px 20px 0 0',
                          },
                        }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            mb: 1.5,
                          }}>
                          <Box
                            sx={{
                              background: colors.bg,
                              border: `1px solid ${colors.border}`,
                              borderRadius: '12px',
                              padding: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              minWidth: '40px',
                              height: '40px',
                              color: colors.text,
                            }}>
                            {item.icon}
                          </Box>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                              }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '16px',
                                  color: isDark ? '#ffffff' : '#1f2937',
                                  letterSpacing: '-0.3px',
                                }}>
                                {item.label}
                              </Typography>

                              {item.type === 'name' && (
                                <Chip
                                  label="Tag"
                                  size="small"
                                  sx={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    fontSize: '10px',
                                    height: '20px',
                                    fontWeight: 600,
                                    border: `1px solid ${colors.border}`,
                                  }}
                                />
                              )}
                            </Box>

                            <Typography
                              variant="body1"
                              sx={{
                                color: isDark
                                  ? 'rgba(255,255,255,0.8)'
                                  : 'rgba(0,0,0,0.7)',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.6,
                                fontSize: '15px',
                                fontFamily:
                                  item.type === 'id' ? 'monospace' : 'inherit',
                                background:
                                  item.type === 'id'
                                    ? isDark
                                      ? 'rgba(255,255,255,0.05)'
                                      : 'rgba(0,0,0,0.03)'
                                    : 'transparent',
                                padding: item.type === 'id' ? '8px 12px' : '0',
                                borderRadius: item.type === 'id' ? '8px' : '0',
                                border:
                                  item.type === 'id'
                                    ? isDark
                                      ? '1px solid rgba(255,255,255,0.1)'
                                      : '1px solid rgba(0,0,0,0.08)'
                                    : 'none',
                              }}>
                              {item.value || (
                                <span
                                  style={{
                                    fontStyle: 'italic',
                                    opacity: 0.5,
                                  }}>
                                  No data available
                                </span>
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default TagDetailPage;

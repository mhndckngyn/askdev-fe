import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  Fade,
  Backdrop,
} from '@mui/material';
import { X, Flag, AlertTriangle, Send } from 'lucide-react';
import { useMantineColorScheme } from '@mantine/core';
import { createReport } from './Services/ReportServices';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  open: boolean;
  handleToggle: () => void;
  contentType: string;
  contentId: string;
  content: string;
}

function ReportPage({
  open,
  handleToggle,
  contentType,
  contentId,
  content,
}: Props) {
  const { t } = useTranslation('question');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (open) {
      setReason('');
      setError('');
      setIsSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (reason.trim() === '') {
      setError('Lý do không thể để trống!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await createReport(
        contentType as 'QUESTION' | 'ANSWER' | 'COMMENT',
        contentId,
        reason,
      );
      if (response.success) {
        handleToggle();
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContentTypeColor = () => {
    switch (contentType.toLowerCase()) {
      case 'question':
        return '#3b82f6';
      case 'answer':
        return '#10b981';
      case 'comment':
        return '#f59e0b';
      default:
        return '#6b7280';
    }
  };

  const getContentTypeIcon = () => {
    switch (contentType.toLowerCase()) {
      case 'question':
        return '❓';
      case 'answer':
        return '💡';
      case 'comment':
        return '💬';
      default:
        return '📝';
    }
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
          backdropFilter: 'blur(8px)',
          backgroundColor: isDark
            ? 'rgba(0, 0, 0, 0.7)'
            : 'rgba(255, 255, 255, 0.2)',
        },
      }}>
      <Fade in={open}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}>
          <Paper
            elevation={24}
            sx={{
              width: { xs: '95%', sm: '85%', md: '65%', lg: '45%' },
              maxWidth: '600px',
              height: 'auto',
              maxHeight: '90vh',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              background: isDark
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: isDark
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.8)',
              transform: 'translateZ(0)',
            }}>
            {/* Background Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
                opacity: 0.1,
                filter: 'blur(20px)',
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '-5%',
                left: '-5%',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: isDark
                  ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                  : 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
                opacity: 0.1,
                filter: 'blur(15px)',
                zIndex: 0,
              }}
            />

            {/* Header */}
            <Box
              sx={{
                padding: '24px 32px',
                background: isDark
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(220, 38, 38, 0.02) 100%)',
                borderBottom: isDark
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
                position: 'relative',
                zIndex: 1,
              }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: isDark
                        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
                    }}>
                    <Flag size={24} color="white" />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: '24px',
                        color: isDark ? '#ffffff' : '#1f2937',
                        marginBottom: '4px',
                        letterSpacing: '-0.5px',
                      }}>
                      {t('report')}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    cursor: 'pointer',
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      transform: 'scale(1.05)',
                    },
                  }}
                  onClick={handleToggle}>
                  <X size={20} color={isDark ? '#ffffff' : '#374151'} />
                </Box>
              </Box>
            </Box>

            {/* Content */}
            <Box sx={{ padding: '32px', position: 'relative', zIndex: 1 }}>
              {/* Content Type Card */}
              <Box
                sx={{
                  padding: '20px',
                  borderRadius: '16px',
                  background: isDark
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(0, 0, 0, 0.02)',
                  border: isDark
                    ? '1px solid rgba(255, 255, 255, 0.1)'
                    : '1px solid rgba(0, 0, 0, 0.05)',
                  marginBottom: '24px',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    marginBottom: 2,
                  }}>
                  <Box
                    sx={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: getContentTypeColor(),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                    }}>
                    {getContentTypeIcon()}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? '#ffffff' : '#1f2937',
                      textTransform: 'capitalize',
                    }}>
                    {contentType}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#6b7280',
                    lineHeight: 1.6,
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.03)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: isDark
                      ? '1px solid rgba(255, 255, 255, 0.1)'
                      : '1px solid rgba(0, 0, 0, 0.05)',
                    maxHeight: '100px',
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: isDark
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                      borderRadius: '2px',
                    },
                  }}>
                  {content || 'Không có nội dung hiển thị'}
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Box
                  sx={{
                    padding: '16px',
                    borderRadius: '12px',
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
                      : 'linear-gradient(135deg, rgba(254, 226, 226, 0.8) 0%, rgba(252, 165, 165, 0.4) 100%)',
                    border: `1px solid ${isDark ? 'rgba(239, 68, 68, 0.3)' : '#fca5a5'}`,
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}>
                  <AlertTriangle
                    size={20}
                    color={isDark ? '#fca5a5' : '#dc2626'}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? '#fca5a5' : '#dc2626',
                      fontWeight: 500,
                    }}>
                    {error}
                  </Typography>
                </Box>
              )}

              {/* Reason Input */}
              <TextField
                label={t('reportReason')}
                placeholder={t('reportPlaceholder')}
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (error) setError('');
                }}
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.03)'
                      : 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '& fieldset': {
                      borderColor: isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: isDark
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(0, 0, 0, 0.2)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#ef4444',
                      borderWidth: '2px',
                    },
                    '& .MuiInputBase-input': {
                      color: isDark ? '#ffffff' : '#1f2937',
                      '&::placeholder': {
                        color: isDark
                          ? 'rgba(255, 255, 255, 0.4)'
                          : 'rgba(0, 0, 0, 0.4)',
                      },
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#6b7280',
                    '&.Mui-focused': {
                      color: '#ef4444',
                    },
                  },
                }}
                error={!!error}
              />

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting || !reason.trim()}
                sx={{
                  height: '56px',
                  borderRadius: '16px',
                  background:
                    isSubmitting || !reason.trim()
                      ? isDark
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'rgba(0, 0, 0, 0.1)'
                      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  border: 'none',
                  boxShadow:
                    isSubmitting || !reason.trim()
                      ? 'none'
                      : '0 8px 25px rgba(239, 68, 68, 0.3)',
                  fontSize: '16px',
                  fontWeight: 600,
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background:
                      isSubmitting || !reason.trim()
                        ? isDark
                          ? 'rgba(255, 255, 255, 0.1)'
                          : 'rgba(0, 0, 0, 0.1)'
                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    transform:
                      isSubmitting || !reason.trim()
                        ? 'none'
                        : 'translateY(-2px)',
                    boxShadow:
                      isSubmitting || !reason.trim()
                        ? 'none'
                        : '0 12px 35px rgba(239, 68, 68, 0.4)',
                  },
                  '&:disabled': {
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.3)'
                      : 'rgba(0, 0, 0, 0.3)',
                  },
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Send size={20} />
                  {isSubmitting
                    ? t('reportButton.submitting')
                    : t('reportButton.submit')}
                </Box>
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ReportPage;

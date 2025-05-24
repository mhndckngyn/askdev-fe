import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  Fade,
  Backdrop,
  Chip,
} from '@mui/material';
import { X, Merge, GitMerge, Sparkles } from 'lucide-react';
import { mergeTags } from '../services';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { notifications, Notifications } from '@mantine/notifications';
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
  selectedTags: TagAdminView[];
  onMergeSuccess: () => void;
}

function MergePage({
  open,
  handleToggle,
  selectedTags,
  onMergeSuccess,
}: Props) {
  const [name, setName] = useState('');
  const [descriptionVi, setDescriptionVi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [submit, setSubmit] = useState(false);
  const { t } = useTranslation('adminTagPage');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (open) {
      setName('');
      setDescriptionEn('');
      setDescriptionVi('');
      setSubmit(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (
      name.trim() === '' ||
      descriptionEn.trim() === '' ||
      descriptionVi.trim() === ''
    ) {
      notifications.show({ message: t('pleaseFillAllFields') });
      return;
    }

    const sourceTagIds = selectedTags.map((tag) => tag.id);

    try {
      const result = await mergeTags({
        sourceTagIds,
        name,
        descriptionVi,
        descriptionEn,
      });

      if (result.success) {
        notifications.show({
          message: t('tagMergeSuccess'),
          color: 'green',
        });
        onMergeSuccess();
        handleToggle();
      } else {
        notifications.show({
          message: t('tagMergeFailed'),
          color: 'red',
        });
      }
    } catch (error: any) {
      notifications.show({
        message: t('tagMergeFailed'),
        color: 'red',
      });
      console.error(error);
    }
  };

  const paperStyles = {
    width: { xs: '95%', sm: '85%', md: '70%', lg: '60%' },
    maxWidth: '700px',
    height: 'auto',
    maxHeight: '90vh',
    position: 'absolute',
    overflowY: 'auto',
    top: '50%',
    left: '50%',
    borderRadius: '24px',
    transform: 'translate(-50%, -50%)',
    background: isDark
      ? 'linear-gradient(145deg, rgba(20,30,25,0.95) 0%, rgba(15,25,20,0.98) 100%)'
      : 'linear-gradient(145deg, rgba(248,255,252,0.95) 0%, rgba(240,253,244,0.98) 100%)',
    backdropFilter: 'blur(20px)',
    border: isDark
      ? '1px solid rgba(76,175,80,0.2)'
      : '1px solid rgba(76,175,80,0.15)',
    boxShadow: isDark
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(76,175,80,0.1)'
      : '0 25px 50px -12px rgba(76,175,80, 0.25), 0 0 0 1px rgba(76,175,80,0.1)',
    '&::-webkit-scrollbar': {
      display: 'none',
    },

    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: isDark ? 'rgba(76,175,80,0.3)' : 'rgba(76,175,80,0.2)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: isDark ? 'rgba(76,175,80,0.4)' : 'rgba(76,175,80,0.3)',
    },
  };

  return (
    <>
      <Notifications zIndex={9999} />

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
                  top: '15px',
                  right: '15px',
                  opacity: 0.04,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'rotate 20s linear infinite',
                  '@keyframes rotate': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}>
                <GitMerge size={140} color={isDark ? '#4caf50' : '#2e7d32'} />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  opacity: 0.03,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'pulse 3s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.03, transform: 'scale(1)' },
                    '50%': { opacity: 0.06, transform: 'scale(1.1)' },
                  },
                }}>
                <Sparkles size={80} color={isDark ? '#4caf50' : '#2e7d32'} />
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
                    ? 'rgba(20,30,25,0.9)'
                    : 'rgba(248,255,252,0.9)',
                  backdropFilter: 'blur(15px)',
                  borderBottom: isDark
                    ? '1px solid rgba(76,175,80,0.2)'
                    : '1px solid rgba(76,175,80,0.15)',
                  borderRadius: '24px 24px 0 0',
                }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      background:
                        'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                      borderRadius: '16px',
                      padding: 1.8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 12px 40px rgba(76, 175, 80, 0.4)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '16px',
                        background:
                          'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                        pointerEvents: 'none',
                      },
                    }}>
                    <Merge size={28} color="white" />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '20px', sm: '24px' },
                      background: isDark
                        ? 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)'
                        : 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '-0.5px',
                    }}>
                    {t('merge')}
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
                {/* Selected Tags Display */}
                <Box sx={{ marginBottom: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 2,
                      color: isDark
                        ? 'rgba(255,255,255,0.9)'
                        : 'rgba(0,0,0,0.8)',
                      fontSize: '16px',
                    }}>
                    {t('selectedCount', { count: selectedTags.length })}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                    {selectedTags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        sx={{
                          background: isDark
                            ? 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(46,125,50,0.3) 100%)'
                            : 'linear-gradient(135deg, rgba(76,175,80,0.1) 0%, rgba(129,199,132,0.2) 100%)',
                          color: isDark ? '#4caf50' : '#2e7d32',
                          fontWeight: 500,
                          fontSize: '14px',
                          borderRadius: '12px',
                          border: isDark
                            ? '1px solid rgba(76,175,80,0.3)'
                            : '1px solid rgba(76,175,80,0.2)',
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    label={t('generalName') + '*'}
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={4}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={submit && !name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.3)'
                            : 'rgba(76,175,80,0.4)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.5)'
                            : 'rgba(76,175,80,0.6)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.15)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#4caf50',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: isDark ? '#ffffff' : '#2d3748',
                      },
                    }}
                  />

                  <TextField
                    label={t('generalDescriptionVi') + '*'}
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={6}
                    value={descriptionVi}
                    onChange={(e) => setDescriptionVi(e.target.value)}
                    error={submit && !descriptionVi}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.3)'
                            : 'rgba(76,175,80,0.4)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.5)'
                            : 'rgba(76,175,80,0.6)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.15)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#4caf50',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: isDark ? '#ffffff' : '#2d3748',
                      },
                    }}
                  />

                  <TextField
                    label={t('generalDescriptionEn') + '*'}
                    fullWidth
                    multiline
                    minRows={4}
                    maxRows={6}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    error={submit && !descriptionEn}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '16px',
                        background: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.02)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '16px',
                        transition: 'all 0.3s ease',
                        '& fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.3)'
                            : 'rgba(76,175,80,0.4)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(76,175,80,0.5)'
                            : 'rgba(76,175,80,0.6)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#4caf50',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.15)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#4caf50',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: isDark ? '#ffffff' : '#2d3748',
                      },
                    }}
                  />

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    startIcon={<GitMerge size={20} />}
                    sx={{
                      borderRadius: '16px',
                      padding: '16px 24px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      background:
                        'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                      boxShadow: '0 8px 32px rgba(76, 175, 80, 0.4)',
                      border: 'none',
                      color: 'white',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #43a047 0%, #1b5e20 100%)',
                        boxShadow: '0 12px 40px rgba(76, 175, 80, 0.5)',
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        boxShadow: '0 4px 20px rgba(76, 175, 80, 0.4)',
                      },
                    }}>
                    {t('buttonMerge')}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default MergePage;

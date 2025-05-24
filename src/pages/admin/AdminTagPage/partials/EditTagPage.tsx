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
import { X, Edit, Sparkles, Settings } from 'lucide-react';
import { editTag } from '../services';
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
  tag: TagAdminView | null;
  setRecords: (updatedTag: TagAdminView) => void;
}

function EditPage({ open, handleToggle, tag, setRecords }: Props) {
  const [name, setName] = useState('');
  const [descriptionVi, setDescriptionVi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const { t } = useTranslation('adminTagPage');
  const [submit, setSubmit] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (open) {
      setName(tag ? tag.name : '');
      setDescriptionEn(tag ? tag.descriptionEn : '');
      setDescriptionVi(tag ? tag.descriptionVi : '');
      setSubmit(false);
    }
  }, [open, tag]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (
      name.trim() === '' ||
      descriptionEn.trim() === '' ||
      descriptionVi.trim() === '' ||
      tag === null
    ) {
      notifications.show({
        message: t('pleaseFillAllFields'),
        color: 'red',
        radius: 'lg',
      });
      return;
    }

    try {
      const result = await editTag({
        id: tag.id,
        name,
        descriptionVi,
        descriptionEn,
      });

      if (result.success) {
        setRecords({ ...tag, name, descriptionVi, descriptionEn });
        handleToggle();
        notifications.show({
          message: t('tagEditSuccess'),
          color: 'green',
          radius: 'lg',
        });
      } else if (result.message === 'api:tag.duplicate-name') {
        notifications.show({
          message: t('tagNameAlreadyExists'),
          color: 'red',
          radius: 'lg',
        });
      } else {
        notifications.show({
          message: t('tagEditFailed'),
          color: 'red',
          radius: 'lg',
        });
      }
    } catch (error: any) {
      notifications.show({
        message: t('tagEditFailed'),
        color: 'red',
        radius: 'lg',
      });
      console.error(error);
    }
  };

  const paperStyles = {
    width: { xs: '95%', sm: '85%', md: '65%', lg: '55%' },
    maxWidth: '600px',
    height: 'auto',
    maxHeight: '90vh',
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
                  top: '20px',
                  right: '20px',
                  opacity: 0.05,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-10px) rotate(5deg)' },
                  },
                }}>
                <Sparkles size={120} color={isDark ? '#ffffff' : '#000000'} />
              </Box>

              <Box
                sx={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '20px',
                  opacity: 0.03,
                  zIndex: 0,
                  pointerEvents: 'none',
                  animation: 'pulse 4s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { opacity: 0.03, transform: 'scale(1)' },
                    '50%': { opacity: 0.06, transform: 'scale(1.05)' },
                  },
                }}>
                <Settings size={100} color={isDark ? '#ffffff' : '#000000'} />
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
                    ? 'rgba(30,30,30,0.8)'
                    : 'rgba(255,255,255,0.8)',
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
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      borderRadius: '12px',
                      padding: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
                    }}>
                    <Edit size={24} color="white" />
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
                    {t('editTag')}
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
                  <TextField
                    label={t('name') + '*'}
                    fullWidth
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
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(0,0,0,0.2)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(0,0,0,0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f093fb',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#f093fb',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: isDark ? '#ffffff' : '#2d3748',
                      },
                    }}
                  />

                  <TextField
                    label={t('descriptionVi') + '*'}
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
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(0,0,0,0.2)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(0,0,0,0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f093fb',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#f093fb',
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: isDark ? '#ffffff' : '#2d3748',
                      },
                    }}
                  />

                  <TextField
                    label={t('descriptionEn') + '*'}
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
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(0,0,0,0.2)',
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: isDark
                            ? 'rgba(255,255,255,0.4)'
                            : 'rgba(0,0,0,0.4)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#f093fb',
                          borderWidth: '2px',
                          boxShadow: '0 0 0 3px rgba(240, 147, 251, 0.1)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: '#f093fb',
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
                    sx={{
                      borderRadius: '16px',
                      padding: '16px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      background:
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)',
                      border: 'none',
                      color: 'white',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #e879f9 0%, #ef4444 100%)',
                        boxShadow: '0 12px 40px rgba(240, 147, 251, 0.4)',
                        transform: 'translateY(-2px)',
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        boxShadow: '0 4px 20px rgba(240, 147, 251, 0.3)',
                      },
                    }}>
                    {t('buttonEdit')}
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

export default EditPage;

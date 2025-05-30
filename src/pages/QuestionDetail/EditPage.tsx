import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  IconButton,
  Fade,
  Alert,
} from '@mui/material';
import { X, Edit, Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateAnswer } from './Services/AnswersServices';
import { updateComment } from './Services/CommentServices';
import { useMantineColorScheme } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  handleToggle: () => void;
  id: string;
  type: string;
  oldContent: string;
  oldImages: string[];
}

function EditPage({
  open,
  handleToggle,
  id,
  type,
  oldContent,
  oldImages,
}: Props) {
  const { t } = useTranslation('question');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [keepOldImages, setKeepOldImages] = useState<boolean[]>([]);

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    if (open) {
      setNewContent(oldContent);
      setError(null);
      setSelectedImages([]);
      setImagePreviewUrls([]);
      setKeepOldImages(oldImages.map(() => true));
    }
  }, [open, oldContent, oldImages]);

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImageUpload = (files: File[]) => {
    if (files.length === 0) return;

    const newFiles = [...selectedImages, ...files];
    setSelectedImages(newFiles);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => {
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newPreviewUrls;
    });
  };

  const removeNewImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newUrls = imagePreviewUrls.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviewUrls[index]);

    setSelectedImages(newFiles);
    setImagePreviewUrls(newUrls);
  };

  const toggleOldImage = (index: number) => {
    const newKeepOldImages = [...keepOldImages];
    newKeepOldImages[index] = !newKeepOldImages[index];
    setKeepOldImages(newKeepOldImages);
  };

  const handleSubmit = async () => {
    if (newContent.trim() === '') {
      setError('trống');
      return;
    }

    setIsSubmitting(true);
    try {
      let response;
      if (type === 'ANSWER') {
        response = await updateAnswer(id, newContent, selectedImages);
      } else if (type === 'COMMENT') {
        response = await updateComment(id, newContent, selectedImages);
      }
      if (response?.success) {
        setError(null);
        handleToggle();
      }
    } catch (err) {
      setError('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleToggle} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            position: 'relative',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Paper
            elevation={24}
            sx={{
              width: { xs: '90%', sm: '80%', md: '70%', lg: '60%' },
              maxHeight: '90vh',
              position: 'relative',
              overflowY: 'auto',
              borderRadius: '24px',
              background: isDarkMode
                ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              border: isDarkMode
                ? '1px solid rgba(100, 181, 246, 0.2)'
                : '1px solid rgba(25, 118, 210, 0.1)',
              boxShadow: isDarkMode
                ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(100, 181, 246, 0.1)'
                : '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(25, 118, 210, 0.05)',

              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: isDarkMode ? '#64b5f6' : '#1976d2',
                borderRadius: '3px',
                '&:hover': {
                  background: isDarkMode ? '#1565c0' : '#0d47a1',
                },
              },
            }}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                zIndex: 0,
                pointerEvents: 'none',
                background: isDarkMode
                  ? 'radial-gradient(circle at 20% 20%, #64b5f6 0%, transparent 50%), radial-gradient(circle at 80% 80%, #90caf9 0%, transparent 50%)'
                  : 'radial-gradient(circle at 20% 20%, #1976d2 0%, transparent 50%), radial-gradient(circle at 80% 80%, #42a5f5 0%, transparent 50%)',
              }}
            />

            <Box
              sx={{
                paddingBlock: 2,
                paddingInline: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: isDarkMode
                  ? 'rgba(26, 26, 26, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${isDarkMode ? 'rgba(100, 181, 246, 0.2)' : 'rgba(25, 118, 210, 0.1)'}`,
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    padding: '8px',
                    borderRadius: '12px',
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #64b5f6, #90caf9)'
                      : 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Edit size={20} color="white" />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #64b5f6, #90caf9)'
                      : 'linear-gradient(135deg, #1976d2, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                  {t('edit')}
                  <Sparkles
                    size={18}
                    style={{ color: isDarkMode ? '#64b5f6' : '#1976d2' }}
                  />
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={handleToggle}
                  sx={{
                    background: 'rgba(255, 82, 82, 0.1)',
                    '&:hover': {
                      background: 'rgba(255, 82, 82, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                  }}>
                  <X size={18} style={{ color: '#ff5252' }} />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ padding: 3, zIndex: 5, position: 'relative' }}>
              {error && (
                <Alert
                  severity="error"
                  sx={{
                    marginBottom: 2,
                    borderRadius: '12px',
                    '& .MuiAlert-icon': {
                      fontSize: '20px',
                    },
                  }}>
                  {error}
                </Alert>
              )}

              <TextField
                label={t('newContent')}
                fullWidth
                multiline
                minRows={4}
                maxRows={8}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                sx={{
                  marginBottom: 3,
                  '& .MuiInputLabel-root': {
                    fontWeight: 500,
                    color: isDarkMode ? '#a0a0a0' : '#718096',
                  },
                  '& .MuiOutlinedInput-root': {
                    color: isDarkMode ? '#ffffff' : '#1a202c',
                    transition: 'all 0.3s ease',
                    borderRadius: '16px',

                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#444' : '#cbd5e0',
                    },

                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#90caf9' : '#42a5f5',
                      borderWidth: '2px',
                    },

                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDarkMode ? '#64b5f6' : '#1976d2',
                      borderWidth: '2px',
                    },
                  },
                }}
              />

              {oldImages.length > 0 && (
                <Paper
                  elevation={2}
                  sx={{
                    padding: 2.5,
                    marginBottom: 3,
                    borderRadius: '16px',
                    background: isDarkMode
                      ? 'rgba(45, 45, 45, 0.8)'
                      : 'rgba(248, 250, 252, 0.8)',
                    border: isDarkMode
                      ? '1px solid rgba(100, 181, 246, 0.15)'
                      : '1px solid rgba(25, 118, 210, 0.1)',
                    backdropFilter: 'blur(10px)',
                  }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 2,
                      color: isDarkMode ? '#64b5f6' : '#1976d2',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}>
                    <ImageIcon size={18} />
                    Hình ảnh hiện tại
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}>
                    {oldImages.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: keepOldImages[index]
                            ? `2px solid ${isDarkMode ? '#64b5f6' : '#1976d2'}`
                            : `2px solid ${isDarkMode ? '#666' : '#ccc'}`,
                          opacity: keepOldImages[index] ? 1 : 0.5,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                        onClick={() => toggleOldImage(index)}>
                        <img
                          src={image}
                          alt={`Old image ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        {!keepOldImages[index] && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <X size={24} color="white" />
                          </Box>
                        )}
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            backgroundColor: keepOldImages[index]
                              ? isDarkMode
                                ? '#64b5f6'
                                : '#1976d2'
                              : '#666',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {keepOldImages[index] && (
                            <Typography
                              sx={{ color: 'white', fontSize: '12px' }}>
                              ✓
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDarkMode ? '#a0a0a0' : '#718096',
                      marginTop: 1,
                      display: 'block',
                    }}>
                    Nhấp vào hình ảnh để chọn/bỏ chọn
                  </Typography>
                </Paper>
              )}

              <Paper
                elevation={2}
                sx={{
                  padding: 2.5,
                  marginBottom: 3,
                  borderRadius: '16px',
                  background: isDarkMode
                    ? 'rgba(45, 45, 45, 0.8)'
                    : 'rgba(248, 250, 252, 0.8)',
                  border: isDarkMode
                    ? '1px dashed rgba(100, 181, 246, 0.3)'
                    : '1px dashed rgba(25, 118, 210, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 2,
                  }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconPhoto
                      size={18}
                      style={{ color: isDarkMode ? '#64b5f6' : '#1976d2' }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 600,
                        color: isDarkMode ? '#64b5f6' : '#1976d2',
                      }}>
                      Thêm hình ảnh mới
                    </Typography>
                  </Box>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      handleImageUpload(files);
                      e.target.value = '';
                    }}
                    style={{ display: 'none' }}
                    id="image-upload-edit"
                  />
                  <Button
                    component="label"
                    htmlFor="image-upload-edit"
                    variant="outlined"
                    startIcon={<Upload size={16} />}
                    sx={{
                      borderColor: isDarkMode ? '#64b5f6' : '#1976d2',
                      color: isDarkMode ? '#64b5f6' : '#1976d2',
                      '&:hover': {
                        borderColor: isDarkMode ? '#90caf9' : '#42a5f5',
                        backgroundColor: isDarkMode
                          ? 'rgba(100, 181, 246, 0.1)'
                          : 'rgba(25, 118, 210, 0.1)',
                      },
                    }}>
                    Chọn ảnh
                  </Button>
                </Box>

                {imagePreviewUrls.length > 0 && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                    }}>
                    {imagePreviewUrls.map((url, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 120,
                          borderRadius: '12px',
                          overflow: 'hidden',
                          border: `2px solid ${isDarkMode ? '#64b5f6' : '#1976d2'}`,
                        }}>
                        <img
                          src={url}
                          alt={`New image ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                        <IconButton
                          onClick={() => removeNewImage(index)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            width: 30,
                            height: 30,
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 1)',
                            },
                          }}>
                          <X size={14} color="red" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>

              <Button
                variant="contained"
                fullWidth
                onClick={handleSubmit}
                disabled={isSubmitting || newContent.trim() === ''}
                sx={{
                  height: '48px',
                  background: isDarkMode
                    ? 'linear-gradient(135deg, #64b5f6, #42a5f5)'
                    : 'linear-gradient(135deg, #1976d2, #1565c0)',
                  '&:hover': {
                    background: isDarkMode
                      ? 'linear-gradient(135deg, #42a5f5, #1e88e5)'
                      : 'linear-gradient(135deg, #1565c0, #0d47a1)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: isDarkMode
                      ? 'rgba(100, 181, 246, 0.3)'
                      : 'rgba(25, 118, 210, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}>
                {isSubmitting ? t('updating') : t('updateContent')}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditPage;

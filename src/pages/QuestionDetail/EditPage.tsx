import {
  Stack as Stackk,
  Group as Groupp,
  Text as Textt,
  Alert as Alertt,
  Button as Buttonn,
  Modal as Modall,
} from '@mantine/core';

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

import {
  X,
  Edit,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateAnswer } from './Services/AnswersServices';
import { updateComment } from './Services/CommentServices';
import { getToxicityGrading } from './Services/AnswersServices';
import { useMantineColorScheme } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  handleToggle: () => void;
  id: string;
  titleContent: string;
  type: string;
  oldContent: string;
  oldImages: string[];
}

interface ToxicityResult {
  toxicity_score: number;
  justification: string;
}

function EditPage({
  open,
  handleToggle,
  id,
  titleContent,
  type,
  oldContent,
  oldImages,
}: Props) {
  const { t } = useTranslation('question');
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [keepOldImages, setKeepOldImages] = useState<boolean[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);

  // Toxicity check states
  const [isCheckingToxicity, setIsCheckingToxicity] = useState(false);
  const [toxicityModalOpen, setToxicityModalOpen] = useState(false);
  const [toxicityResult, setToxicityResult] = useState<ToxicityResult | null>(
    null,
  );

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const MAX_IMAGES = 5;

  useEffect(() => {
    if (open) {
      setNewContent(oldContent);
      setError(null);
      setSelectedImages([]);
      setToxicityResult(null);
      setToxicityModalOpen(false);

      setKeepOldImages(oldImages.map(() => true));
      setNewImages([]);
      setNewImagePreviewUrls([]);
    }
  }, [open, oldContent, oldImages]);

  useEffect(() => {
    return () => {
      newImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  useEffect(() => {
    const updateSelectedImages = async () => {
      const allImages: File[] = [];

      for (let i = 0; i < oldImages.length; i++) {
        if (keepOldImages[i]) {
          try {
            const file = await urlToFile(oldImages[i], `old_image_${i}`);
            allImages.push(file);
          } catch (error) {
            console.error(error);
          }
        }
      }

      allImages.push(...newImages);

      setSelectedImages(allImages);
    };

    updateSelectedImages();
  }, [keepOldImages, newImages, oldImages]);

  const handleImageUpload = (files: File[]) => {
    if (files.length === 0) return;

    const currentKeptOldImages = keepOldImages.filter(Boolean).length;
    const currentNewImages = newImages.length;
    const currentTotal = currentKeptOldImages + currentNewImages;

    const remainingSlots = MAX_IMAGES - currentTotal;

    if (remainingSlots <= 0) {
      setError(`Chỉ được phép tối đa ${MAX_IMAGES} ảnh`);
      return;
    }

    const filesToAdd = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      setError(
        `Chỉ có thể thêm ${remainingSlots} ảnh nữa (tối đa ${MAX_IMAGES} ảnh)`,
      );
    }

    const updatedNewImages = [...newImages, ...filesToAdd];
    setNewImages(updatedNewImages);

    const newPreviewUrls = updatedNewImages.map((file) =>
      URL.createObjectURL(file),
    );
    setNewImagePreviewUrls((prevUrls) => {
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newPreviewUrls;
    });
  };

  const removeNewImage = (index: number) => {
    const updatedNewImages = newImages.filter((_, i) => i !== index);
    const updatedNewUrls = newImagePreviewUrls.filter((_, i) => i !== index);

    URL.revokeObjectURL(newImagePreviewUrls[index]);

    setNewImages(updatedNewImages);
    setNewImagePreviewUrls(updatedNewUrls);

    if (error && error.includes('tối đa')) {
      setError(null);
    }
  };

  const toggleOldImage = (index: number) => {
    const newKeepOldImages = [...keepOldImages];
    const willKeep = !newKeepOldImages[index];

    if (willKeep) {
      const currentKeptOldImages = newKeepOldImages.filter(Boolean).length;
      const currentNewImages = newImages.length;
      const currentTotal = currentKeptOldImages + currentNewImages;

      if (currentTotal >= MAX_IMAGES) {
        setError(`Chỉ được phép tối đa ${MAX_IMAGES} ảnh`);
        return;
      }
    }

    newKeepOldImages[index] = willKeep;
    setKeepOldImages(newKeepOldImages);

    if (error && error.includes('tối đa')) {
      const totalAfterToggle =
        newKeepOldImages.filter(Boolean).length + newImages.length;
      if (totalAfterToggle <= MAX_IMAGES) {
        setError(null);
      }
    }
  };

  // Toxicity check function
  const checkToxicity = async (
    content: string,
    title: string = '',
  ): Promise<ToxicityResult | null> => {
    try {
      setIsCheckingToxicity(true);
      const response = await getToxicityGrading(title, content);

      if (response.success) {
        return response.content;
      } else {
        console.error(response.message);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsCheckingToxicity(false);
    }
  };

  const getToxicityColor = (score: number) => {
    if (score <= 2) return '#4caf50'; // green
    if (score <= 4) return '#2196f3'; // blue
    if (score <= 6) return '#ff9800'; // orange
    if (score <= 8) return '#ff5722'; // deep orange
    return '#f44336'; // red
  };

  const getToxicityIcon = (score: number) => {
    if (score <= 6) return <Shield size={20} />;
    return <AlertTriangle size={20} />;
  };

  const handleSubmit = async () => {
    if (newContent.trim() === '') {
      setError('Nội dung không được để trống');
      return;
    }

    const totalImages = keepOldImages.filter(Boolean).length + newImages.length;
    if (totalImages > MAX_IMAGES) {
      setError(`Chỉ được phép tối đa ${MAX_IMAGES} ảnh`);
      return;
    }

    // Check toxicity before submitting
    const toxicityResult = await checkToxicity(newContent, titleContent);

    if (toxicityResult) {
      setToxicityResult(toxicityResult);
      setToxicityModalOpen(true);
      return;
    }

    await submitUpdate();
  };

  const submitUpdate = async () => {
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
        setToxicityResult(null);
        handleToggle();
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedWithSubmission = async () => {
    setToxicityModalOpen(false);
    await submitUpdate();
  };

  const handleCancelSubmission = () => {
    setToxicityModalOpen(false);
    setToxicityResult(null);
  };

  // Calculate current image count for display
  const currentImageCount =
    keepOldImages.filter(Boolean).length + newImages.length;
  const canAddMoreImages = currentImageCount < MAX_IMAGES;

  return (
    <>
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
                  label={t('Content')}
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
                      {t('currentImage')}
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
                      {t('clickImageToToggle')}
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
                        {t('addNewImageWithCount', {
                          currentImageCount,
                          MAX_IMAGES,
                        })}
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
                      disabled={!canAddMoreImages}
                      sx={{
                        borderColor: isDarkMode ? '#64b5f6' : '#1976d2',
                        color: isDarkMode ? '#64b5f6' : '#1976d2',
                        '&:hover': {
                          borderColor: isDarkMode ? '#90caf9' : '#42a5f5',
                          backgroundColor: isDarkMode
                            ? 'rgba(100, 181, 246, 0.1)'
                            : 'rgba(25, 118, 210, 0.1)',
                        },
                        '&:disabled': {
                          borderColor: isDarkMode ? '#666' : '#ccc',
                          color: isDarkMode ? '#666' : '#ccc',
                        },
                      }}>
                      {canAddMoreImages ? t('chooseImage') : t('enoughImages')}
                    </Button>
                  </Box>

                  {newImagePreviewUrls.length > 0 && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                      }}>
                      {newImagePreviewUrls.map((url, index) => (
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
                  disabled={
                    isSubmitting ||
                    newContent.trim() === '' ||
                    isCheckingToxicity
                  }
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
                  {isCheckingToxicity
                    ? t('checkingContent')
                    : isSubmitting
                      ? t('updating')
                      : t('updateContent')}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>

      <Modall
        zIndex={9999}
        opened={toxicityModalOpen}
        onClose={handleCancelSubmission}
        title={
          <Groupp align="center" gap="xs">
            {toxicityResult && getToxicityIcon(toxicityResult.toxicity_score)}
            <Textt fw={700} size="xl">
              {toxicityResult && toxicityResult.toxicity_score >= 7
                ? t('toxicityWarningTitle')
                : t('contentCheckNotification')}
            </Textt>
          </Groupp>
        }
        centered
        radius="md"
        size="xl">
        {toxicityResult && (
          <Stackk gap="md">
            <Alertt
              color={getToxicityColor(toxicityResult.toxicity_score)}
              icon={getToxicityIcon(toxicityResult.toxicity_score)}
              title={t('toxicityScoreTitle', {
                toxicity_score: toxicityResult.toxicity_score,
              })}
              radius="md">
              <Textt size="md">{toxicityResult.justification}</Textt>
            </Alertt>

            {toxicityResult.toxicity_score >= 7 ? (
              <Stackk gap="md">
                <Textt size="md" c="dimmed">
                  {t('toxicityWarningBody')}
                </Textt>
                <Groupp justify="flex-end" gap="xs">
                  <Buttonn
                    variant="light"
                    color="gray"
                    onClick={handleCancelSubmission}
                    radius="md"
                    size="md">
                    {t('editAgain')}
                  </Buttonn>
                  <Buttonn
                    color="red"
                    onClick={handleProceedWithSubmission}
                    radius="md"
                    size="md">
                    {t('submitAnyway')}
                  </Buttonn>
                </Groupp>
              </Stackk>
            ) : (
              <Stackk gap="md">
                <Textt size="md" c="dimmed">
                  {t('toxicityReviewPrompt')}
                </Textt>
                <Groupp justify="flex-end" gap="xs">
                  <Buttonn
                    variant="light"
                    color="gray"
                    onClick={handleCancelSubmission}
                    radius="md"
                    size="md">
                    {t('review')}
                  </Buttonn>
                  <Buttonn
                    color="blue"
                    onClick={handleProceedWithSubmission}
                    radius="md"
                    size="md">
                    {t('continueSending')}
                  </Buttonn>
                </Groupp>
              </Stackk>
            )}
          </Stackk>
        )}
      </Modall>
    </>
  );
}

export default EditPage;

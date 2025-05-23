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
import { X, Edit, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateAnswer } from './Services/AnswersServices';
import { updateComment } from './Services/CommentServices';
import { useMantineColorScheme } from '@mantine/core';

interface Props {
  open: boolean;
  handleToggle: () => void;
  id: string;
  type: string;
  oldContent: string;
}

function EditPage({ open, handleToggle, id, type, oldContent }: Props) {
  const [newContent, setNewContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { colorScheme } = useMantineColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    if (open) {
      setNewContent('');
      setError(null);
    }
  }, [open]);

  const handleSubmit = async () => {
    if (newContent.trim() === '') {
      setError('Nội dung không thể trống');
      return;
    }

    setIsSubmitting(true);
    try {
      let response;
      if (type === 'ANSWER') {
        response = await updateAnswer(id, newContent);
      } else if (type === 'COMMENT') {
        response = await updateComment(id, newContent);
      }
      if (response?.success) {
        setError(null);
        handleToggle();
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.');
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
              width: { xs: '90%', sm: '80%', md: '60%', lg: '45%' },
              maxHeight: '85vh',
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
            {/* Background Animation */}
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

            {/* Header */}
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
                  Chỉnh sửa nội dung
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

            {/* Content */}
            <Box sx={{ padding: 3, zIndex: 5, position: 'relative' }}>
              {/* Old Content Display */}
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
                    marginBottom: 1.5,
                    color: isDarkMode ? '#64b5f6' : '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                  📝 Nội dung hiện tại
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: isDarkMode ? '#ffffff' : '#1a202c',
                    lineHeight: 1.6,
                    padding: 2,
                    borderRadius: '12px',
                    background: isDarkMode
                      ? 'rgba(26, 26, 26, 0.5)'
                      : 'rgba(255, 255, 255, 0.7)',
                    border: isDarkMode
                      ? '1px solid rgba(100, 181, 246, 0.1)'
                      : '1px solid rgba(25, 118, 210, 0.05)',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    maxWidth: '100%',
                    overflowWrap: 'break-word',
                  }}>
                  {oldContent}
                </Typography>
              </Paper>

              {/* Error Alert */}
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

              {/* New Content Input */}
              <TextField
                label="✨ Nội dung mới"
                fullWidth
                multiline
                minRows={6}
                maxRows={12}
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
                  '& .MuiFormHelperText-root': {
                    color: isDarkMode ? '#a0a0a0' : '#718096',
                  },
                }}
                error={!!error}
                helperText={error ? error : 'Nhập nội dung mới để thay thế'}
              />

              {/* Submit Button */}
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
                  },
                  '&:disabled': {
                    background: isDarkMode
                      ? 'rgba(100, 181, 246, 0.3)'
                      : 'rgba(25, 118, 210, 0.3)',
                  },
                }}>
                {isSubmitting ? '⏳ Đang cập nhật...' : '🚀 Cập nhật nội dung'}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Modal>
  );
}

export default EditPage;

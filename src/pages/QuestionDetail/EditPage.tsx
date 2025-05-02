import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import { X, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { updateAnswer } from './Services/AnswersServices';
import { updateComment } from './Services/CommentServices';

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
      alert(err);
    }
  };

  return (
    <Modal open={open} onClose={handleToggle}>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          position: 'relative',
        }}>
        <Paper
          elevation={0}
          sx={{
            width: '35%',
            height: 'auto',
            position: 'absolute',
            overflowY: 'auto',
            top: '50%',
            left: '50%',
            borderRadius: '10px',
            transform: 'translate(-50%, -50%)',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.1,
              zIndex: 0,
              pointerEvents: 'none',
            }}>
            <Edit size={200} color="#0288d1" />
          </Box>
          <Box
            sx={{
              paddingBlock: 1.4,
              paddingInline: 9,
              display: 'flex',
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              borderBottom: '1px solid black',
            }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: '23px',
                textAlign: 'center',
                margin: 'auto',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              Chỉnh sửa
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                right: '16px',
                top: '8px',
                cursor: 'pointer',
                backgroundColor: 'white',
                padding: '5px',
                borderRadius: '50%',
                border: '1px solid black',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={handleToggle}>
              <X style={{ color: 'var(--text-color)', fontSize: '18px' }} />
            </Box>
          </Box>

          <Box sx={{ padding: 2 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Nội dung cũ:</strong> {oldContent}
            </Typography>

            <TextField
              label="Nội dung mới"
              fullWidth
              multiline
              minRows={6}
              maxRows={12}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!error}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}>
              Chỉnh sửa
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default EditPage;

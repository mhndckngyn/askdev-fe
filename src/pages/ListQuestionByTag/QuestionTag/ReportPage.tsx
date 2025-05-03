import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import { X, Flag } from 'lucide-react';
import { createReport } from './ReportServices';
import { useState, useEffect } from 'react';

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
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setReason('');
      setError('');
    }
  }, [open]);

  const handleSubmit = async () => {
    if (reason.trim() === '') {
      setError('Lý do không thể để trống!');
      return;
    }

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
            <Flag size={200} color="#f57c00" />
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
              Báo cáo
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
              <strong>Loại nội dung:</strong> {contentType}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              <strong>Nội dung:</strong> {content}
            </Typography>

            <TextField
              label="Lý do báo cáo"
              fullWidth
              multiline
              minRows={4}
              maxRows={12}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={!!error}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}>
              Gửi báo cáo
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default ReportPage;

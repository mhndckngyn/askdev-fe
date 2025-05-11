import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import { X, Edit } from 'lucide-react';
import { editTag } from '../services';
import { useState, useEffect } from 'react';

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

  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (open) {
      setName(tag ? tag.name : '1');
      setDescriptionEn(tag ? tag.descriptionEn : '');
      setDescriptionVi(tag ? tag.descriptionVi : '');
      setSubmit(false);
    }
  }, [open]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (
      name.trim() === '' ||
      descriptionEn.trim() === '' ||
      descriptionVi.trim() === '' ||
      tag === null
    ) {
      return;
    }

    try {
      const result = await editTag({
        id: tag.id,
        name,
        descriptionVi,
        descriptionEn,
      });

      if (result) {
        setRecords({ ...tag, name, descriptionVi, descriptionEn });
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
            width: '50%',
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
            <Edit size={200} color="orange" />
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
              Gộp thẻ
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
            <TextField
              label="Tên chủ đề chung"
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={submit && !name}
            />

            <TextField
              label="Mô tả chủ đề chung Tiếng Việt"
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              value={descriptionVi}
              onChange={(e) => setDescriptionVi(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={submit && !descriptionVi}
            />

            <TextField
              label="Mô tả chủ đề chung Tiếng Anh"
              fullWidth
              multiline
              minRows={4}
              maxRows={6}
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              sx={{ marginBottom: 2 }}
              error={submit && !descriptionEn}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}>
              Gộp các chủ đề đã chọn
            </Button>
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
}

export default EditPage;

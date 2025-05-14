import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
} from '@mui/material';
import { X, Edit } from 'lucide-react';
import { createTag } from '../services';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { notifications, Notifications } from '@mantine/notifications';

interface Props {
  open: boolean;
  handleToggle: () => void;
  onSuccess: () => void;
}

function EditPage({ open, handleToggle, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [descriptionVi, setDescriptionVi] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const { t } = useTranslation('adminTagPage');
  const [submit, setSubmit] = useState(false);

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
      notifications.show({ message: t('pleaseFillAllFields'), color: 'red' });
      return;
    }

    try {
      const result = await createTag({
        name,
        descriptionVi,
        descriptionEn,
      });

      if (result.success) {
        notifications.show({
          message: t('tagCreateSuccess'),
          color: 'green',
        });
        onSuccess();
        handleToggle();
      } else if (result.message === 'api:tag.duplicate-name') {
        notifications.show({
          message: t('tagNameAlreadyExists'),
          color: 'red',
        });
      } else {
        notifications.show({
          message: t('tagCreateFailed'),
          color: 'red',
        });
      }
    } catch (error: any) {
      notifications.show({
        message: t('tagCreateFailed'),
        color: 'red',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Notifications zIndex={9999} />

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
                zIndex: 0,
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
                {t('addTag')}
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
                label={t('name') + '*'}
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
                label={t('descriptionVi') + '*'}
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
                label={t('descriptionEn') + '*'}
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
                {t('buttonAdd')}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default EditPage;

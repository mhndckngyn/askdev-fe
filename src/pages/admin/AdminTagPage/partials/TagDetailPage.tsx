import { Box, Paper, Typography, Modal } from '@mui/material';

import { IconX, IconClipboard } from '@tabler/icons-react';

import { useTranslation } from 'react-i18next';

export interface TagAdminView {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}

interface Props {
  open: boolean;
  handleToggle: () => void;
  tag: TagAdminView;
}

function TagDetailPage({ open, handleToggle, tag }: Props) {
  const { t } = useTranslation('adminTagPage');
  const infoList = [
    { label: 'ID', value: tag.id },
    { label: t('name'), value: tag.name },
    { label: t('descriptionVi'), value: tag.descriptionVi },
    { label: t('descriptionEn'), value: tag.descriptionEn },
  ];

  return (
    <>
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
              maxHeight: '80vh',
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
                opacity: 0.25,
                zIndex: 0,
                pointerEvents: 'none',
              }}>
              <IconClipboard size={200} color="pink" />
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
                {t('viewTag')}
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
                <IconX
                  style={{ color: 'var(--text-color)', fontSize: '18px' }}
                />
              </Box>
            </Box>

            <Box sx={{ padding: 2 }}>
              {infoList.map((item, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{
                    marginBottom: 2,
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}>
                  <strong>{item.label}:</strong> {item.value}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default TagDetailPage;

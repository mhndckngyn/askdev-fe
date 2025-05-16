import {
  Box,
  Paper,
  Typography,
  Modal,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconX, IconClipboard } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { updateStatus } from '../services';
import { notifications, Notifications } from '@mantine/notifications';
import { getReportedContentDetails } from '../services';
import ContentTypePage from './ContentTypePage';

export interface ReportAdminView {
  id: string;
  username?: string;
  contentType: string;
  contentId: string;
  reason: string;
  status: string;
  createdAt: string;
  isHidden: boolean;
}

interface Props {
  open: boolean;
  handleToggle: () => void;
  report: ReportAdminView;
  setRecords: (updatedStatus: ReportAdminView) => void;
}

function ReportDetailPage({ open, handleToggle, report, setRecords }: Props) {
  const { t } = useTranslation('adminReportPage');
  const infoList = [
    { label: 'ID', value: report.id },
    { label: t('username'), value: report.username },
    { label: t('contentType'), value: t(report.contentType as any) },
    { label: t('contentId'), value: report.contentId },
    { label: t('createdAt'), value: report.createdAt },
    { label: t('reason'), value: report.reason },
  ];

  const [status, setStatus] = useState<'PENDING' | 'REVIEWED' | 'REJECTED'>(
    report.status as 'PENDING' | 'REVIEWED' | 'REJECTED',
  );

  useEffect(() => {
    if (open) {
      setStatus(report.status as 'PENDING' | 'REVIEWED' | 'REJECTED');
    }
  }, [open]);

  const handleSubmit = async () => {
    try {
      const result = await updateStatus(
        report.id,
        status as 'PENDING' | 'REVIEWED' | 'REJECTED',
      );
      if (result.success) {
        setRecords({
          ...report,
          status,
        });

        notifications.show({
          message: t('updateStatusSuccess'),
          color: 'green',
        });
      } else {
        notifications.show({
          message: t('updateStatusFail'),
          color: 'red',
        });
      }
    } catch (error) {
      notifications.show({
        message: t('updateStatusFail'),
        color: 'red',
      });
    }
  };

  const [dataContent, setDataContent] = useState<any | null>(null);
  const [openContent, setOpenContent] = useState(false);
  const handleToggleContent = () => setOpenContent((prev) => !prev);

  const handleOpenContent = async (report: ReportAdminView) => {
    try {
      const data = await getReportedContentDetails(
        report.contentType as 'QUESTION' | 'ANSWER' | 'COMMENT',
        report.contentId,
      );
      if (data.success) {
        setDataContent(data);
        setOpenContent(true);
      }
    } catch (err) {
      console.error(err);
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
                {t('viewReport')}
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
                  {item.label === t('contentId') && (
                    <Tooltip
                      label={t('openContentPage')}
                      withinPortal
                      zIndex={2000}>
                      <ActionIcon
                        size="sm"
                        variant="subtle"
                        color="blue"
                        style={{
                          position: 'relative',
                          left: '13px',
                          top: '6px',
                        }}
                        onClick={() => handleOpenContent(report)}>
                        <IconClipboard size={25} />
                      </ActionIcon>
                    </Tooltip>
                  )}
                </Typography>
              ))}

              <Box display="flex" alignItems="stretch" sx={{ gap: 2 }}>
                <TextField
                  label={t('status')}
                  select
                  fullWidth
                  value={status}
                  onChange={(e) =>
                    setStatus(
                      e.target.value as 'PENDING' | 'REVIEWED' | 'REJECTED',
                    )
                  }
                  sx={{
                    flex: 1,
                    '& .MuiInputBase-root': {
                      height: '50px',
                    },
                  }}
                  inputProps={{
                    style: {
                      height: '50px',
                    },
                  }}>
                  {['PENDING', 'REVIEWED', 'REJECTED'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {t(status as any)}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    height: '50px',
                    flexShrink: 0,
                  }}>
                  {t('updateStatus')}
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Modal>
      {dataContent && (
        <ContentTypePage
          open={openContent}
          handleToggle={handleToggleContent}
          data={dataContent}
        />
      )}
    </>
  );
}

export default ReportDetailPage;

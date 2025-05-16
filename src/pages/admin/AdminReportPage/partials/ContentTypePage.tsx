import { Box, Paper, Typography, Modal, Avatar, Divider } from '@mui/material';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import FormatTime from './formatTime';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import dayjs from 'dayjs';

interface Props {
  open: boolean;
  handleToggle: () => void;
  data: any;
}

function ContentTypePage({ open, handleToggle, data }: Props) {
  const { t } = useTranslation('adminReportPage');

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
              width: '50%',
              height: '90vh',
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
                mb: 2,
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
                {t('openContentPage')}
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

            <Box
              sx={{
                borderRadius: '13px',
                width: '90%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                scrollbarGutter: 'stable',
                justifyContent: 'space-between',
                overflow: 'auto',
                margin: '0 auto',
                mb: 2,
                backgroundColor:
                  data.content.answer === null ? '#ffe6e6' : 'transparent',
              }}>
              <Box
                width="100%"
                height="100%"
                display="flex"
                flexDirection="column">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Box sx={{ display: 'flex', alignContent: 'center' }}>
                    <Avatar
                      src={data.content.question.user.profilePicture}
                      alt=""
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        marginRight: '12px',
                      }}
                    />
                    <Box>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: '1.5px',
                          }}>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '15px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: 'black',
                            }}>
                            {data.content.question.user.username}
                          </Typography>

                          <Typography
                            sx={{
                              backgroundColor: 'black',
                              color: 'white',
                              padding: '3px 9px',
                              borderRadius: '13px',
                              fontSize: '13px',
                              fontWeight: 'medium',
                              height: 'fit-content',
                            }}>
                            <FormatTime
                              createdAt={data.content.question.createdAt}
                            />
                          </Typography>
                        </Box>

                        <Typography
                          variant="h6"
                          sx={{
                            mt: '10px',
                            ml: '6px',
                            backgroundColor: 'yellow',
                            color: 'black',
                            padding: '3px 10px',
                            borderRadius: '13px',
                            fontSize: '13px',
                            fontWeight: 'medium',
                            height: 'fit-content',
                            display: 'inline-block',
                          }}>
                          {data.content.question.tags
                            ?.map((tag: any) => tag.name)
                            .join(', ')}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ mt: '20px', borderColor: 'black' }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '20px',
                    mt: '20px',
                    fontWeight: 'Bold',
                    color: 'black',
                  }}>
                  {data.content.question.title}
                </Typography>

                <QuestionContent content={data.content.question.content} />

                {data.content.question.images?.length > 0 && (
                  <Box>
                    <ImageGrid files={data.content.question.images} />
                  </Box>
                )}
              </Box>
            </Box>

            {data.content.answer && (
              <Box
                sx={{
                  width: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  scrollbarGutter: 'stable',
                  justifyContent: 'space-between',
                  overflow: 'auto',
                  margin: '0 auto',
                  mb: 5,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  p: 1.5,
                  backgroundColor:
                    data.content.comment === null ? '#ffe6e6' : '#f9f9f9',
                }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                  }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Avatar
                      src={data.content.answer.user.profilePicture}
                      sx={{ width: 50, height: 50 }}></Avatar>
                    <Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight="bold" fontSize={20}>
                          {data.content.answer.user.username}
                        </Typography>
                        <Typography fontSize={14} color="gray">
                          {dayjs(data.content.answer.createdAt).format(
                            'HH:mm DD/MM/YYYY',
                          )}
                        </Typography>
                      </Box>
                      <Typography fontSize={20}>
                        {data.content.answer.content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {data.content.comment && (
                  <Box sx={{ ml: 5, mt: 2 }}>
                    <Box
                      sx={{
                        mt: 1,
                        display: 'flex',
                        gap: 1,
                        alignItems: 'flex-start',
                        border: '1px solid #ddd',
                        borderRadius: 2,
                        p: 1,
                        backgroundColor: data.content.comment
                          ? '#ffe6e6'
                          : '#fff',
                      }}>
                      <Avatar
                        src={data.content.comment.user.profilePicture}
                        sx={{ width: 40, height: 40, fontSize: 12 }}></Avatar>
                      <Box>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                          }}>
                          <Typography fontWeight="bold" fontSize={17}>
                            {data.content.comment.user.username}
                          </Typography>
                          <Typography fontSize={13} color="gray">
                            {dayjs(data.content.comment.createdAt).format(
                              'HH:mm DD/MM/YYYY',
                            )}
                          </Typography>
                        </Box>
                        <Typography fontSize={17}>
                          {data.content.comment.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default ContentTypePage;

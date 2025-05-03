import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Modal,
  IconButton,
} from '@mui/material';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import FormatTime from './formatTime';
import { X, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { getEditHistory } from './QuestionServices';
import { useState, useEffect } from 'react';

interface Props {
  open: boolean;
  handleToggle: () => void;
  question: any;
}

interface History {
  title: string;
  content: string;
  createdAt: string;
  images: string[];
}

function QuestionHistory({ open, handleToggle, question }: Props) {
  const [history, setHistory] = useState<History>(question);
  const [prevHistory, setPrevHistory] = useState<any>(null);
  const [nextHistory, setNextHistory] = useState<any>(null);

  const fetchHistory = async (history: any) => {
    if (history) {
      try {
        const responsePrev = await getEditHistory(
          question.id,
          new Date(history.createdAt),
          -1,
        );
        setPrevHistory(responsePrev.content);

        const responseNext = await getEditHistory(
          question.id,
          new Date(history.createdAt),
          1,
        );
        setNextHistory(responseNext.content);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (history.createdAt) {
      fetchHistory(history);
    }
  }, [history.createdAt]);

  const handlePrev = () => {
    if (prevHistory) {
      setHistory(prevHistory);
    }
  };

  const handleNext = () => {
    if (nextHistory) {
      setHistory(nextHistory);
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
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.1,
            zIndex: 1,
            pointerEvents: 'none',
          }}>
          <History size={400} color="#388e3c" />
        </Box>
        <Paper
          elevation={0}
          sx={{
            width: '70%',
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
            backgroundColor: 'white',
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
              {'Lịch sử câu hỏi'}
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

          <Box
            sx={{
              width: '100%',
              padding: '20px 12px 20px 19px',
              display: 'flex',
              flexDirection: 'column',
              scrollbarGutter: 'stable',
              justifyContent: 'space-between',
              overflow: 'auto',
            }}>
            <Box
              width="100%"
              height="100%"
              display="flex"
              flexDirection="column">
              <Box sx={{ display: 'flex', alignContent: 'center' }}>
                <Avatar
                  src={'https://i.pravatar.cc/150?img=7'}
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
                        {question.username}
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
                        <FormatTime createdAt={history.createdAt} />
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
                      {question.tags?.map((tag: any) => tag.name).join(', ')}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mt: '20px', borderColor: 'black' }} />
              <Typography
                variant="h6"
                sx={{
                  fontSize: '20px',
                  mt: '20px',
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {history.title}
              </Typography>

              <QuestionContent content={history.content} />

              {history.images?.length > 0 && (
                <Box>
                  <ImageGrid files={history.images} />
                </Box>
              )}
            </Box>
          </Box>
        </Paper>

        <IconButton
          sx={{
            display: prevHistory ? 'flex' : 'none',
            position: 'absolute',
            top: '50%',
            left: 'calc(15% - 60px)',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={handlePrev}>
          <ChevronLeft />
        </IconButton>

        <IconButton
          sx={{
            display: nextHistory ? 'flex' : 'none',
            position: 'absolute',
            top: '50%',
            right: 'calc(15% - 60px)',
            transform: 'translateY(-50%)',
            backgroundColor: 'white',
            border: '1px solid black',
            borderRadius: '50%',
            width: '40px',
            height: '40px',

            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
          onClick={handleNext}>
          <ChevronRight />
        </IconButton>
      </Box>
    </Modal>
  );
}

export default QuestionHistory;

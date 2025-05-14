import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  IconButton,
} from '@mui/material';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import { getQuestion } from './QuestionServices';
import { ApiResponse } from '@/types';
import FormatTime from './formatTime';
import QuestionHistory from './QuestionHistory';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HistoryIcon from '@mui/icons-material/History';
import FlagIcon from '@mui/icons-material/Flag';
import ReportPage from './ReportPage';
import { useUserStore } from '../../../stores/useUserStore';
import { Link } from 'react-router-dom';
import memberRoutePaths from '@/routes/user/member/paths';

type Props = {
  question: any;
};

export default function QuestionView({ question }: Props) {
  const { user } = useUserStore();


  const id = question.id;
  const [data, setData] = useState<any>(null);
  const [openHistory, setOpenHistory] = useState(false);
  const [openReport, setOpenReport] = useState(false);

  const handleToggleHistory = () => {
    setOpenHistory((prev) => !prev);
  };

  const handleToggleReport = () => {
    setOpenReport((prev) => !prev);
  };

  const handleDelete = () => {};
  const handleEdit = () => {};

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      try {
        const response: ApiResponse = await getQuestion(id);
        if (response.success) {
          setData(response.content);
        } else {
        }
      } catch (err) {}
    };

    fetchQuestion();
  }, [id]);

  if (!data) {
    return <div>Đang tải...</div>;
  }

  return (
    <Paper elevation={0}>
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
        <Box width="100%" height="100%" display="flex" flexDirection="column">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
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
                      {data.username}
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
                      <FormatTime createdAt={data.createdAt} />
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
                    {data.tags?.map((tag: any) => tag.name).join(', ')}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {user?.id == data.userId ? (
                <>
                  <Tooltip title="Lịch sử chỉnh sửa">
                    <IconButton onClick={handleToggleHistory}>
                      <HistoryIcon
                        sx={{ color: '#388e3c' }}
                        fontSize="medium"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton
                      component={Link}
                      to={memberRoutePaths.editQuestion.replace(':id', question.id)}
                    >
                      <EditIcon sx={{ color: '#1976d2' }} fontSize="medium" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Xóa">
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon sx={{ color: '#d32f2f' }} fontSize="medium" />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Báo cáo">
                  <IconButton onClick={handleToggleReport}>
                    <FlagIcon sx={{ color: '#f57c00' }} fontSize="medium" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>

          <Divider sx={{ mt: '20px', zIndex: '1', borderColor: 'black' }} />
          <Typography
            variant="h6"
            sx={{
              fontSize: '20px',
              mt: '20px',
              fontWeight: 'Bold',
              color: 'black',
            }}>
            {data.title}
          </Typography>

          <QuestionContent content={data.content} />

          {data.images?.length > 0 && (
            <Box>
              <ImageGrid files={data.images} />
            </Box>
          )}
        </Box>
      </Box>
      <QuestionHistory
        open={openHistory}
        handleToggle={handleToggleHistory}
        question={data}
      />
      <ReportPage
        open={openReport}
        handleToggle={handleToggleReport}
        contentType="QUESTION"
        contentId={id || ''}
        content={data.title}
      />
    </Paper>
  );
}

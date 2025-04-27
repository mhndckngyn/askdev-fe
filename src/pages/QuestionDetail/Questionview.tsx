import { useEffect, useState } from 'react';
import { Box, Paper, Typography, Avatar, Divider } from '@mui/material';
import QuestionContent from './QuestionContent';
import ImageGrid from './ImageGrid';
import { getQuestion } from './Services/QuestionServices';
import { ApiResponse } from '@/types';
import { useParams } from 'react-router-dom';
import FormatTime from './formatTime';

const QuestionView = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

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
    <Paper>
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
    </Paper>
  );
};

export default QuestionView;

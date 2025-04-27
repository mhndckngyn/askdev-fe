import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Popover } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useParams } from 'react-router-dom';
import {
  voteQuestion,
  getQuestion,
  getVoteStatus,
} from './Services/QuestionServices';
import { ApiResponse } from '@/types';

export default function InteractionBar() {
  const [data, setData] = useState<any>(null);
  const { id } = useParams<{ id: string }>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [interaction, setInteraction] = useState<'like' | 'dislike' | null>(
    null,
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchQuestion = async () => {
      try {
        const response: ApiResponse = await getQuestion(id);
        if (response.success) {
          setData(response.content);
        }

        const voteStatusResponse: ApiResponse = await getVoteStatus(id);
        if (voteStatusResponse.success) {
          setInteraction(voteStatusResponse.content.status);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl((prevAnchorEl) => (prevAnchorEl ? null : event.currentTarget));
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleLike = async () => {
    if (!id || id.trim() === '') return;

    try {
      await voteQuestion(id, 1);
      const response: ApiResponse = await getQuestion(id);
      if (response.success) {
        setData(response.content);
      }
      setInteraction((prev) => (prev === 'like' ? null : 'like'));
      setAnchorEl(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async () => {
    if (!id || id.trim() === '') return;

    try {
      await voteQuestion(id, -1);
      const response: ApiResponse = await getQuestion(id);
      if (response.success) {
        setData(response.content);
      }
      setInteraction((prev) => (prev === 'dislike' ? null : 'dislike'));
      setAnchorEl(null);
    } catch (error) {
      console.error(error);
    }
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? 'interaction-popover' : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
        onClick={handleClick}>
        <IconButton sx={{ fontSize: '32px', cursor: 'pointer' }}>
          {interaction === 'like' ? (
            <ThumbUpIcon sx={{ fontSize: '32px', color: 'green' }} />
          ) : interaction === 'dislike' ? (
            <ThumbDownIcon sx={{ fontSize: '32px', color: 'red' }} />
          ) : (
            <ThumbUpIcon sx={{ fontSize: '32px' }} />
          )}
          <Typography
            variant="body1"
            sx={{
              marginLeft: '8px',
              fontSize: '18px',
              color:
                interaction === 'like'
                  ? 'green'
                  : interaction === 'dislike'
                    ? 'red'
                    : 'grey',
            }}>
            Tương tác
          </Typography>
        </IconButton>

        <Popover
          id={popoverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleMouseLeave}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          aria-hidden={!open}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton onClick={handleLike}>
                <ThumbUpIcon
                  sx={{
                    fontSize: '32px',
                    color: interaction === 'like' ? 'green' : 'grey',
                  }}
                />
              </IconButton>
              <IconButton onClick={handleDislike}>
                <ThumbDownIcon
                  sx={{
                    fontSize: '32px',
                    color: interaction === 'dislike' ? 'red' : 'grey',
                  }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box
            sx={{ display: 'flex', justifyContent: 'center', marginTop: -1 }}>
            <Typography variant="body2" sx={{ marginX: 2 }}>
              {data ? data.upvotes : 0}
            </Typography>
            <Typography variant="body2" sx={{ marginX: 2 }}>
              {data ? data.downvotes : 0}
            </Typography>
          </Box>
        </Popover>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton sx={{ fontSize: '32px', cursor: 'pointer' }}>
          <CommentIcon sx={{ fontSize: '32px' }} />
          <Typography
            variant="body1"
            sx={{ marginLeft: '8px', fontSize: '18px' }}>
            Bình luận
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
}

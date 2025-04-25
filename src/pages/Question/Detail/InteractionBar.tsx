import { Box, IconButton, Typography, Popover } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from 'react';

export default function InteractionBar() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [interaction, setInteraction] = useState<'like' | 'dislike' | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setInteraction((prev) => (prev === 'like' ? null : 'like'));
    setAnchorEl(null);
  };

  const handleDislike = () => {
    setInteraction((prev) => (prev === 'dislike' ? null : 'dislike'));
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'interaction-popover' : undefined;

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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <IconButton sx={{ fontSize: '32px', cursor: 'pointer' }}>
          {interaction === 'like' ? (
            <ThumbUpIcon sx={{ fontSize: '32px', color: 'green' }} />
          ) : interaction === 'dislike' ? (
            <ThumbDownIcon sx={{ fontSize: '32px', color: 'red' }} />
          ) : (
            <FavoriteIcon sx={{ fontSize: '32px' }} />
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
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleMouseLeave}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton onClick={handleLike}>
              <ThumbUpIcon
                sx={{ fontSize: '32px', color: interaction === 'like' ? 'green' : 'grey' }}
              />
            </IconButton>
            <IconButton onClick={handleDislike}>
              <ThumbDownIcon
                sx={{ fontSize: '32px', color: interaction === 'dislike' ? 'red' : 'grey' }}
              />
            </IconButton>
          </Box>
        </Popover>
      </Box>

     
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton sx={{ fontSize: '32px', cursor: 'pointer' }}>
          <CommentIcon sx={{ fontSize: '32px' }} />
          <Typography variant="body1" sx={{ marginLeft: '8px', fontSize: '18px' }}>
            Bình luận
          </Typography>
        </IconButton>
      </Box>
    </Box>
  );
}

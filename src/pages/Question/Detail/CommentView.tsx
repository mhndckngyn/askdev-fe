import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Collapse,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface Reply {
  id: number;
  name: string;
  text: string;
  likeStatus?: boolean;
  likeCount: number;
  dislikeCount: number;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  replies: Reply[];
  likeStatus?: boolean;
  likeCount: number;
  dislikeCount: number;
}

export default function CommentView() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replies, setReplies] = useState<{ [id: number]: string }>({});
  const [replyingId, setReplyingId] = useState<number | null>(null);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now(),
      name: 'Bạn',
      text: newComment,
      replies: [],
      likeCount: 0,
      dislikeCount: 0,
    };
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleReplyChange = (id: number, text: string) => {
    setReplies({ ...replies, [id]: text });
  };

  const handleReplySubmit = (id: number) => {
    const replyText = replies[id]?.trim();
    if (!replyText) return;

    const newReply: Reply = {
      id: Date.now(),
      name: 'Người khác',
      text: replyText,
      likeCount: 0,
      dislikeCount: 0,
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, replies: [...c.replies, newReply] } : c,
      ),
    );
    setReplies({ ...replies, [id]: '' });
    setReplyingId(null);
  };

  const handleLike = (
    id: number,
    isReply: boolean = false,
    replyId: number = 0,
  ) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (isReply) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId
                ? { ...r, likeStatus: true, likeCount: r.likeCount + 1 }
                : r,
            ),
          };
        } else {
          return {
            ...c,
            likeStatus: true,
            likeCount: c.likeCount + 1,
          };
        }
      }),
    );
  };

  const handleDislike = (
    id: number,
    isReply: boolean = false,
    replyId: number = 0,
  ) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (isReply) {
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId
                ? { ...r, likeStatus: false, dislikeCount: r.dislikeCount + 1 }
                : r,
            ),
          };
        } else {
          return {
            ...c,
            likeStatus: false,
            dislikeCount: c.dislikeCount + 1,
          };
        }
      }),
    );
  };

  return (
    <Box sx={{ padding: '12px' }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Viết bình luận..."
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddComment}>
          Gửi
        </Button>
      </Box>

      {comments.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            mb: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 1.5,
            backgroundColor: '#f9f9f9',
          }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {comment.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography fontWeight="bold" fontSize={14}>
                {comment.name}
              </Typography>
              <Typography fontSize={14}>{comment.text}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 0.5,
              ml: 5,
              alignItems: 'center',
            }}>
            <IconButton size="small" onClick={() => handleLike(comment.id)}>
              <ThumbUpIcon
                fontSize="small"
                sx={{ color: comment.likeStatus === true ? 'green' : 'gray' }}
              />
            </IconButton>
            <Typography variant="caption">{comment.likeCount}</Typography>
            <IconButton size="small" onClick={() => handleDislike(comment.id)}>
              <ThumbDownIcon
                fontSize="small"
                sx={{ color: comment.likeStatus === false ? 'red' : 'gray' }}
              />
            </IconButton>

            <Typography variant="caption">{comment.dislikeCount}</Typography>
            <Button
              size="small"
              onClick={() =>
                setReplyingId(replyingId === comment.id ? null : comment.id)
              }>
              Phản hồi
            </Button>
          </Box>

          <Collapse in={replyingId === comment.id} sx={{ mt: 1, ml: 5 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Phản hồi..."
                value={replies[comment.id] || ''}
                onChange={(e) => handleReplyChange(comment.id, e.target.value)}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleReplySubmit(comment.id)}>
                Gửi
              </Button>
            </Box>
          </Collapse>

          <Box sx={{ ml: 5, mt: 1 }}>
            {comment.replies.map((reply) => (
              <Box
                key={reply.id}
                sx={{
                  mt: 1,
                  display: 'flex',
                  gap: 1,
                  alignItems: 'flex-start',
                  border: '1px solid #ddd',
                  borderRadius: 2,
                  p: 1,
                  backgroundColor: '#fff',
                }}>
                <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                  {reply.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold" fontSize={13}>
                    {reply.name}
                  </Typography>
                  <Typography fontSize={13}>{reply.text}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      mt: 0.5,
                    }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLike(comment.id, true, reply.id)}>
                      <ThumbUpIcon
                        fontSize="small"
                        sx={{
                          color: reply.likeStatus === true ? 'green' : 'gray',
                        }}
                      />
                    </IconButton>
                    <Typography variant="caption">{reply.likeCount}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDislike(comment.id, true, reply.id)}>
                      <ThumbDownIcon
                        fontSize="small"
                        sx={{
                          color: reply.likeStatus === false ? 'red' : 'gray',
                        }}
                      />
                    </IconButton>
                    <Typography variant="caption">
                      {reply.dislikeCount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

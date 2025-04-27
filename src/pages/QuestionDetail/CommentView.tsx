import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Collapse,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useParams } from 'react-router-dom';
import {
  createAnswer,
  voteAnswers,
  getAnswersByQuestionId,
  getVoteStatus,
} from './Services/AnswersServices';
import {
  createComment,
  getCommentsByAnswerId,
  voteComment,
  getVoteStatusComment,
} from './Services/CommentServices';

export default function answerView() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [answers, setAnswers] = useState<any[]>([]);
  const [newanswer, setNewanswer] = useState('');
  const [commentingId, setcommentingId] = useState<number | null>(null);
  type NewComment = {
    [key: string]: string;
  };

  const [newcomment, setNewComment] = useState<NewComment>({});

  const handleAddanswer = async () => {
    if (!newanswer.trim()) return;
    if (!id) return;
    try {
      const response = await createAnswer(id, newanswer);
      if (response.success) {
        fetchAnswers();
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAnswers = async () => {
    if (!id) return;

    try {
      const response = await getAnswersByQuestionId(id);
      if (response.success) {
        const answersWithVoteStatus = await Promise.all(
          response.content.map(async (answer: any) => {
            const voteStatusResponse = await getVoteStatus(answer.id);
            if (voteStatusResponse.success) {
              answer.voteStatus = voteStatusResponse.content.status;
            }
            return answer;
          }),
        );
        setAnswers(answersWithVoteStatus);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers();
  }, [id]);

  const handlecommentChange = (answerId: string, content: string) => {
    setNewComment((prev) => ({
      ...prev,
      [answerId]: content,
    }));
  };

  const handlecommentSubmit = async (answerId: string) => {
    const content = newcomment[answerId];
    if (!content) return;

    try {
      const response = await createComment(answerId, content);
      if (response.success) {
        setNewComment((prev) => ({ ...prev, [answerId]: '' }));

        fetchComments(answerId);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async (answerId: string) => {
    try {
      const response = await getCommentsByAnswerId(answerId);
      if (response.success) {
        // Kiểm tra xem response.content có phải là một mảng không
        if (Array.isArray(response.content)) {
          const commentsWithVoteStatus = await Promise.all(
            response.content.map(async (comment: any) => {
              const voteStatusResponse = await getVoteStatusComment(comment.id);
              if (voteStatusResponse.success) {
                comment.voteStatus = voteStatusResponse.content.status;
              }
              return comment;
            }),
          );
          setComments((prevComments) => ({
            ...prevComments,
            [answerId]: commentsWithVoteStatus,
          }));
        } else {
          console.error('Comments data is not an array');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    answers.forEach((answer) => {
      if (answer.id) {
        fetchComments(answer.id);
      }
    });
  }, [answers]);

  const handleLike = async (answerId: string) => {
    const response = await voteAnswers(answerId, 1);
    if (response.success) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, likeStatus: true, upvotes: answer.upvotes + 1 }
            : answer,
        ),
      );
    }
    fetchAnswers();
  };

  const handleDislike = async (answerId: string) => {
    const response = await voteAnswers(answerId, -1);
    if (response.success) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer) =>
          answer.id === answerId
            ? { ...answer, likeStatus: false, downvotes: answer.downvotes + 1 }
            : answer,
        ),
      );
    }
    fetchAnswers();
  };

  const handleLikeComment = async (commentId: string, answerId: string) => {
    const response = await voteComment(commentId, 1);
    if (response.success) {
      setComments((prevComments) => {
        const updatedComments = prevComments[answerId]?.map((comment) =>
          comment.id === commentId
            ? { ...comment, voteStatus: 'like', upvotes: comment.upvotes + 1 }
            : comment,
        );
        return {
          ...prevComments,
          [answerId]: updatedComments,
        };
      });
    }
    fetchComments(answerId);
  };

  const handleDislikeComment = async (commentId: string, answerId: string) => {
    const response = await voteComment(commentId, -1);
    if (response.success) {
      setComments((prevComments) => {
        const updatedComments = prevComments[answerId]?.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                voteStatus: 'dislike',
                downvotes: comment.downvotes + 1,
              }
            : comment,
        );
        return {
          ...prevComments,
          [answerId]: updatedComments,
        };
      });
    }
    fetchComments(answerId);
  };

  return (
    <Box sx={{ padding: '12px' }}>
      <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
        <TextField
          fullWidth
          placeholder="Viết bình luận..."
          size="small"
          value={newanswer}
          onChange={(e) => setNewanswer(e.target.value)}
        />
        <Button variant="contained" onClick={handleAddanswer}>
          Gửi
        </Button>
      </Box>

      {answers.map((answer) => (
        <Box
          key={answer.id}
          sx={{
            mb: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
            p: 1.5,
            backgroundColor: '#f9f9f9',
          }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.5 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {!answer.user.profilePicture && answer.user.username[0]}
            </Avatar>
            <Box>
              <Typography fontWeight="bold" fontSize={14}>
                {answer.user.username}
              </Typography>
              <Typography fontSize={14}>{answer.content}</Typography>
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
            <IconButton size="small" onClick={() => handleLike(answer.id)}>
              <ThumbUpIcon
                fontSize="small"
                sx={{ color: answer.voteStatus === 'like' ? 'green' : 'gray' }}
              />
            </IconButton>
            <Typography variant="caption">{answer.upvotes}</Typography>
            <IconButton size="small" onClick={() => handleDislike(answer.id)}>
              <ThumbDownIcon
                fontSize="small"
                sx={{ color: answer.voteStatus === 'dislike' ? 'red' : 'gray' }}
              />
            </IconButton>

            <Typography variant="caption">{answer.downvotes}</Typography>
            <Button
              size="small"
              onClick={() =>
                setcommentingId(commentingId === answer.id ? null : answer.id)
              }>
              Phản hồi
            </Button>
          </Box>

          <Collapse in={commentingId === answer.id} sx={{ mt: 1, ml: 5 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Phản hồi..."
                value={newcomment[answer.id] || ''}
                onChange={(e) => handlecommentChange(answer.id, e.target.value)}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  handlecommentSubmit(answer.id);
                  setcommentingId(null);
                }}>
                Gửi
              </Button>
            </Box>
          </Collapse>

          <Box sx={{ ml: 5, mt: 1 }}>
            {comments[answer.id]?.map((comment) => (
              <Box
                key={comment.id}
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
                  {!comment.user.profilePicture && comment.user.username[0]}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold" fontSize={13}>
                    {comment.user.username}
                  </Typography>
                  <Typography fontSize={13}>{comment.content}</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 1,
                      alignItems: 'center',
                      mt: 0.5,
                    }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLikeComment(comment.id, answer.id)}>
                      <ThumbUpIcon
                        fontSize="small"
                        sx={{
                          color:
                            comment.voteStatus === 'like' ? 'green' : 'gray',
                        }}
                      />
                    </IconButton>
                    <Typography variant="caption">{comment.upvotes}</Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        handleDislikeComment(comment.id, answer.id)
                      }>
                      <ThumbDownIcon
                        fontSize="small"
                        sx={{
                          color:
                            comment.voteStatus === 'dislike' ? 'red' : 'gray',
                        }}
                      />
                    </IconButton>
                    <Typography variant="caption">
                      {comment.downvotes}
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

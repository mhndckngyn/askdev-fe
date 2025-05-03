import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import ReplyIcon from '@mui/icons-material/Reply';
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
import ReportPage from './ReportPage';
import EditPage from './EditPage';
import { useUserStore } from '../../stores/useUserStore';

export default function answerView() {
  const { user, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [answers, setAnswers] = useState<any[]>([]);
  const [newanswer, setNewanswer] = useState('');
  const [commentingId, setcommentingId] = useState<number | null>(null);

  type NewComment = {
    [key: string]: string;
  };

  const handleDelete = () => {};

  const [editingId, setEditingId] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingType, setEditingType] = useState('');
  const [openEditingModal, setOpenEditingModal] = useState(false);

  const handleEdit = (item: any, type: 'ANSWER' | 'COMMENT') => {
    setEditingType(type);
    setEditingContent(item.content);
    setEditingId(item.id);
    setOpenEditingModal(true);
  };

  const handleCloseEditingModal = () => {
    setOpenEditingModal(false);
    fetchAnswers();
  };

  const [openReportModal, setOpenReportModal] = useState(false);
  const [reportContentType, setReportContentType] = useState('');
  const [reportContentId, setReportContentId] = useState('');
  const [reportContent, setReportContent] = useState('');

  const handleReport = (item: any, type: string) => {
    setReportContentType(type);
    setReportContentId(item.id);
    setReportContent(item.content);
    setOpenReportModal(true);
  };

  const handleCloseReportModal = () => {
    setOpenReportModal(false);
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1,
            }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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

            <Box sx={{ display: 'flex', gap: 1 }}>
              {user?.id == answer.userId ? (
                <>
                  <Tooltip title="Chỉnh sửa">
                    <IconButton onClick={() => handleEdit(answer, 'ANSWER')}>
                      <EditIcon sx={{ fontSize: 20, color: '#0288d1' }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Xóa">
                    <IconButton onClick={handleDelete}>
                      <DeleteIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Tooltip title="Báo cáo">
                  <IconButton onClick={() => handleReport(answer, 'ANSWER')}>
                    <FlagIcon sx={{ fontSize: 20, color: '#f57c00' }} />
                  </IconButton>
                </Tooltip>
              )}
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

            <Tooltip title="Phản hồi">
              <IconButton
                onClick={() =>
                  setcommentingId(commentingId === answer.id ? null : answer.id)
                }>
                <ReplyIcon sx={{ fontSize: 24, color: '#1976d2' }} />
              </IconButton>
            </Tooltip>
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

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    ml: 'auto',
                  }}>
                  {user?.id == comment.userId ? (
                    <>
                      <Tooltip title="Chỉnh sửa">
                        <IconButton
                          onClick={() => handleEdit(comment, 'COMMENT')}
                          size="small">
                          <EditIcon sx={{ fontSize: 20, color: '#0288d1' }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDelete()} size="small">
                          <DeleteIcon sx={{ fontSize: 20, color: '#d32f2f' }} />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <Tooltip title="Báo cáo">
                      <IconButton
                        onClick={() => handleReport(comment, 'COMMENT')}
                        size="small">
                        <FlagIcon sx={{ fontSize: 20, color: '#f57c00' }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}

      <ReportPage
        open={openReportModal}
        handleToggle={handleCloseReportModal}
        contentType={reportContentType}
        contentId={reportContentId}
        content={reportContent}
      />

      <EditPage
        open={openEditingModal}
        handleToggle={handleCloseEditingModal}
        id={editingId}
        type={editingType}
        oldContent={editingContent}
      />
    </Box>
  );
}

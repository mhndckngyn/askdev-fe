import { useState, useEffect } from 'react';
import {
  Box,
  TextInput,
  Button,
  Text,
  Avatar,
  Collapse,
  ActionIcon,
  Tooltip,
  Badge,
  Transition,
  Group,
  Stack,
  Textarea,
  Container,
  ThemeIcon,
  Card,
  useMantineColorScheme,
  useMantineTheme,
  Flex,
  rem,
} from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconEdit,
  IconTrash,
  IconFlag,
  IconMessageCircle,
  IconSend,
} from '@tabler/icons-react';
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
import { useTranslation } from 'react-i18next';
import FormatTime from './formatTime';

export default function AnswerView() {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';
  const { user } = useUserStore();

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
        setNewanswer('');
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

  const gradientBg = isDark
    ? 'linear-gradient(135deg, rgba(55, 59, 83, 0.8) 0%, rgba(28, 30, 41, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)';

  const cardBg = isDark
    ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)';

  const commentBg = isDark
    ? 'rgba(30, 35, 50, 0.6)'
    : 'rgba(248, 250, 252, 0.8)';

  return (
    <Container size="lg" px="md">
      <Box
        style={{
          background: gradientBg,
          backdropFilter: 'blur(20px)',
          borderRadius: rem(20),
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
          padding: rem(32),
          marginBottom: rem(24),
        }}>
        {/* Answer Input Section */}
        <Card
          shadow="xl"
          radius="xl"
          withBorder
          style={{
            background: cardBg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            marginBottom: rem(32),
            overflow: 'visible',
          }}>
          <Card.Section p="xl">
            <Group align="center" mb="lg">
              <ThemeIcon
                size="lg"
                radius="xl"
                variant="gradient"
                gradient={{ from: 'violet', to: 'indigo', deg: 45 }}>
                <IconMessageCircle size={20} />
              </ThemeIcon>
              <Text
                size="xl"
                fw={700}
                variant="gradient"
                gradient={{ from: 'violet', to: 'indigo', deg: 45 }}>
                {t('shareAnswer')}
              </Text>
            </Group>

            <Stack gap="md">
              <Textarea
                placeholder={t('writeDetailedAnswer')}
                value={newanswer}
                onChange={(e) => setNewanswer(e.currentTarget.value)}
                minRows={4}
                maxRows={8}
                radius="xl"
                size="lg"
                styles={{
                  input: {
                    backgroundColor: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(255, 255, 255, 0.8)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                    '&:focus': {
                      borderColor: theme.colors.violet[6],
                      boxShadow: `0 0 0 2px ${theme.colors.violet[2]}`,
                    },
                  },
                }}
              />
              <Flex justify="flex-end">
                <Button
                  onClick={handleAddanswer}
                  disabled={!newanswer.trim()}
                  rightSection={<IconSend size={18} />}
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'indigo', deg: 45 }}
                  radius="xl"
                  size="lg"
                  style={{
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                    transform: newanswer.trim() ? 'translateY(-2px)' : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                  {t('sendAnswer')}
                </Button>
              </Flex>
            </Stack>
          </Card.Section>
        </Card>

        {/* Answers List */}
        <Stack gap="xl">
          {answers.map((answer) => (
            <Transition
              key={answer.id}
              mounted={true}
              transition="slide-up"
              duration={500}
              timingFunction="ease">
              {(styles) => (
                <Card
                  shadow="xl"
                  radius="xl"
                  withBorder
                  style={{
                    ...styles,
                    background: cardBg,
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = isDark
                      ? '0 20px 40px rgba(0, 0, 0, 0.4)'
                      : '0 20px 40px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = isDark
                      ? '0 8px 32px rgba(0, 0, 0, 0.2)'
                      : '0 8px 32px rgba(0, 0, 0, 0.05)';
                  }}>
                  <Card.Section p="xl">
                    {/* Answer Header */}
                    <Group justify="space-between" align="flex-start" mb="lg">
                      <Group align="flex-start" gap="md">
                        <Avatar
                          src={answer.user.profilePicture}
                          size={60}
                          radius="xl"
                          style={{
                            background:
                              'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                            boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                          }}>
                          {!answer.user.profilePicture &&
                            answer.user.username[0].toUpperCase()}
                        </Avatar>
                        <Stack gap="xs" style={{ flex: 1 }}>
                          <Group gap="md" align="center">
                            <Text
                              size="lg"
                              fw={700}
                              c={isDark ? 'white' : 'dark'}>
                              {answer.user.username}
                            </Text>
                            <Badge
                              variant="gradient"
                              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                              radius="xl"
                              size="lg">
                              <FormatTime createdAt={answer.createdAt} />
                            </Badge>
                          </Group>
                          <Text
                            size="lg"
                            c={isDark ? 'gray.3' : 'gray.7'}
                            style={{
                              lineHeight: 1.6,
                              wordBreak: 'break-word',
                              whiteSpace: 'pre-wrap',
                              maxWidth: '590px',
                              overflowWrap: 'break-word',
                            }}>
                            {answer.content}
                          </Text>
                        </Stack>
                      </Group>

                      {/* Action Buttons */}
                      <Group gap="xs">
                        {user?.id == answer.userId ? (
                          <>
                            <Tooltip label={t('edit')} position="top">
                              <ActionIcon
                                onClick={() => handleEdit(answer, 'ANSWER')}
                                variant="light"
                                color="blue"
                                size="lg"
                                radius="xl"
                                style={{
                                  transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}>
                                <IconEdit size={20} />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip label={t('delete')} position="top">
                              <ActionIcon
                                onClick={handleDelete}
                                variant="light"
                                color="red"
                                size="lg"
                                radius="xl"
                                style={{
                                  transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                }}>
                                <IconTrash size={20} />
                              </ActionIcon>
                            </Tooltip>
                          </>
                        ) : (
                          <Tooltip label={t('report')} position="top">
                            <ActionIcon
                              onClick={() => handleReport(answer, 'ANSWER')}
                              variant="light"
                              color="yellow"
                              size="lg"
                              radius="xl"
                              style={{
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}>
                              <IconFlag size={20} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Group>
                    </Group>

                    {/* Vote and Reply Section */}
                    <Group gap="lg" align="center" mb="md">
                      <Group gap="xs" align="center">
                        <ActionIcon
                          onClick={() => handleLike(answer.id)}
                          variant={
                            answer.voteStatus === 'like' ? 'filled' : 'light'
                          }
                          color="green"
                          size="lg"
                          radius="xl"
                          style={{
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}>
                          <IconThumbUp size={25} />
                        </ActionIcon>
                        <Badge
                          variant={
                            answer.voteStatus === 'like' ? 'filled' : 'light'
                          }
                          color="green"
                          radius="xl"
                          size="xl">
                          {answer.upvotes}
                        </Badge>
                      </Group>

                      <Group gap="xs" align="center">
                        <ActionIcon
                          onClick={() => handleDislike(answer.id)}
                          variant={
                            answer.voteStatus === 'dislike' ? 'filled' : 'light'
                          }
                          color="red"
                          size="lg"
                          radius="xl"
                          style={{
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}>
                          <IconThumbDown size={25} />
                        </ActionIcon>
                        <Badge
                          variant={
                            answer.voteStatus === 'dislike' ? 'filled' : 'light'
                          }
                          color="red"
                          radius="xl"
                          size="xl">
                          {answer.downvotes}
                        </Badge>
                      </Group>

                      <Button
                        leftSection={<IconMessageCircle size={18} />}
                        onClick={() =>
                          setcommentingId(
                            commentingId === answer.id ? null : answer.id,
                          )
                        }
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                        radius="xl"
                        size="md"
                        style={{
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}>
                        {t('feedback')}
                      </Button>
                    </Group>

                    {/* Comment Input */}
                    <Collapse in={commentingId === answer.id}>
                      <Box
                        p="lg"
                        style={{
                          backgroundColor: commentBg,
                          borderRadius: rem(16),
                          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                        }}>
                        <Group gap="md" align="flex-end">
                          <TextInput
                            placeholder={t('writeFeedback')}
                            value={newcomment[answer.id] || ''}
                            onChange={(e) =>
                              handlecommentChange(
                                answer.id,
                                e.currentTarget.value,
                              )
                            }
                            radius="xl"
                            size="md"
                            style={{ flex: 1 }}
                            styles={{
                              input: {
                                backgroundColor: isDark
                                  ? 'rgba(255, 255, 255, 0.05)'
                                  : 'rgba(255, 255, 255, 0.8)',
                                border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                              },
                            }}
                          />
                          <Button
                            onClick={() => {
                              handlecommentSubmit(answer.id);
                              setcommentingId(null);
                            }}
                            disabled={!newcomment[answer.id]?.trim()}
                            variant="gradient"
                            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                            radius="xl"
                            size="md">
                            {t('send')}
                          </Button>
                        </Group>
                      </Box>
                    </Collapse>
                  </Card.Section>

                  {/* Comments Section */}
                  {comments[answer.id]?.length > 0 && (
                    <Card.Section
                      style={{
                        borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                        backgroundColor: commentBg,
                      }}>
                      {comments[answer.id]?.map((comment, commentIndex) => (
                        <Transition
                          key={comment.id}
                          mounted={true}
                          transition="slide-right"
                          duration={300}
                          timingFunction="ease">
                          {(styles) => (
                            <Box
                              p="lg"
                              style={{
                                ...styles,
                                borderTop:
                                  commentIndex > 0
                                    ? `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`
                                    : 'none',
                                transition: 'background-color 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark
                                  ? 'rgba(255, 255, 255, 0.02)'
                                  : 'rgba(0, 0, 0, 0.02)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  'transparent';
                              }}>
                              <Group align="flex-start" gap="md">
                                <Avatar
                                  src={comment.user.profilePicture}
                                  size={40}
                                  radius="xl"
                                  style={{
                                    background:
                                      'linear-gradient(45deg, #74b9ff, #0984e3)',
                                  }}>
                                  {!comment.user.profilePicture &&
                                    comment.user.username[0].toUpperCase()}
                                </Avatar>

                                <Stack gap="xs" style={{ flex: 1 }}>
                                  <Group gap="sm" align="center">
                                    <Text
                                      size="sm"
                                      fw={600}
                                      c={isDark ? 'white' : 'dark'}>
                                      {comment.user.username}
                                    </Text>
                                    <Badge
                                      variant="light"
                                      color="cyan"
                                      radius="xl"
                                      size="sm">
                                      <FormatTime
                                        createdAt={comment.createdAt}
                                      />
                                    </Badge>
                                  </Group>

                                  <Text
                                    size="md"
                                    c={isDark ? 'gray.3' : 'gray.7'}
                                    style={{
                                      lineHeight: 1.5,
                                      wordBreak: 'break-word',
                                      whiteSpace: 'pre-wrap',
                                      maxWidth: '100%',
                                      overflowWrap: 'break-word',
                                    }}>
                                    {comment.content}
                                  </Text>

                                  <Group gap="lg" align="center">
                                    <Group gap="xs" align="center">
                                      <ActionIcon
                                        onClick={() =>
                                          handleLikeComment(
                                            comment.id,
                                            answer.id,
                                          )
                                        }
                                        variant={
                                          comment.voteStatus === 'like'
                                            ? 'filled'
                                            : 'light'
                                        }
                                        color="green"
                                        size="lg"
                                        radius="xl">
                                        <IconThumbUp size={18} />
                                      </ActionIcon>
                                      <Text size="md" c="dimmed">
                                        {comment.upvotes}
                                      </Text>
                                    </Group>

                                    <Group gap="xs" align="center">
                                      <ActionIcon
                                        onClick={() =>
                                          handleDislikeComment(
                                            comment.id,
                                            answer.id,
                                          )
                                        }
                                        variant={
                                          comment.voteStatus === 'dislike'
                                            ? 'filled'
                                            : 'light'
                                        }
                                        color="red"
                                        size="lg"
                                        radius="xl">
                                        <IconThumbDown size={18} />
                                      </ActionIcon>
                                      <Text size="md" c="dimmed">
                                        {comment.downvotes}
                                      </Text>
                                    </Group>
                                  </Group>
                                </Stack>

                                {/* Comment Actions */}
                                <Group gap="xs">
                                  {user?.id == comment.userId ? (
                                    <>
                                      <Tooltip label={t('edit')}>
                                        <ActionIcon
                                          onClick={() =>
                                            handleEdit(comment, 'COMMENT')
                                          }
                                          variant="light"
                                          color="blue"
                                          size="lg"
                                          radius="xl">
                                          <IconEdit size={20} />
                                        </ActionIcon>
                                      </Tooltip>
                                      <Tooltip label={t('delete')}>
                                        <ActionIcon
                                          onClick={() => handleDelete()}
                                          variant="light"
                                          color="red"
                                          size="lg"
                                          radius="xl">
                                          <IconTrash size={20} />
                                        </ActionIcon>
                                      </Tooltip>
                                    </>
                                  ) : (
                                    <Tooltip label={t('report')}>
                                      <ActionIcon
                                        onClick={() =>
                                          handleReport(comment, 'COMMENT')
                                        }
                                        variant="light"
                                        color="yellow"
                                        size="lg"
                                        radius="xl">
                                        <IconFlag size={20} />
                                      </ActionIcon>
                                    </Tooltip>
                                  )}
                                </Group>
                              </Group>
                            </Box>
                          )}
                        </Transition>
                      ))}
                    </Card.Section>
                  )}
                </Card>
              )}
            </Transition>
          ))}
        </Stack>

        {/* Empty State */}
        {answers.length === 0 && (
          <Card
            shadow="xl"
            radius="xl"
            withBorder
            style={{
              background: cardBg,
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
              textAlign: 'center',
              padding: rem(48),
            }}>
            <Stack align="center" gap="lg">
              <ThemeIcon
                size={80}
                radius="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>
                <IconMessageCircle size={40} />
              </ThemeIcon>
              <Stack align="center" gap="xs">
                <Text size="xl" fw={700} c={isDark ? 'white' : 'dark'}>
                  Chưa có câu trả lời nào
                </Text>
                <Text size="md" c="dimmed">
                  Hãy là người đầu tiên chia sẻ câu trả lời cho câu hỏi này!
                </Text>
              </Stack>
            </Stack>
          </Card>
        )}
      </Box>

      {/* Modals */}
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
    </Container>
  );
}

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
  Card,
  useMantineColorScheme,
  rem,
} from '@mantine/core';
import {
  IconThumbUp,
  IconThumbDown,
  IconEdit,
  IconTrash,
  IconFlag,
  IconMessageCircle,
} from '@tabler/icons-react';
import { voteAnswers } from './Services/AnswersServices';
import {
  createComment,
  getCommentsByAnswerId,
  getVoteStatusComment,
} from './Services/CommentServices';
import FormatTime from './formatTime';
import CommentItem from './CommentItem';

interface AnswerItemProps {
  answer: any;
  user: any;
  onEdit: (item: any, type: 'ANSWER' | 'COMMENT') => void;
  onReport: (item: any, type: string) => void;
  onRefresh: () => void;
  t: (key: string) => string;
}

export default function AnswerItem({
  answer,
  user,
  onEdit,
  onReport,
  onRefresh,
  t,
}: AnswerItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [comments, setComments] = useState<any[]>([]);
  const [commentingId, setCommentingId] = useState<number | null>(null);
  const [newcomment, setNewComment] = useState('');

  const handleDelete = () => {};

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
          setComments(commentsWithVoteStatus);
        } else {
          console.error('Comments data is not an array');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (answer.id) {
      fetchComments(answer.id);
    }
  }, [answer.id, onEdit]);

  const handleCommentSubmit = async (answerId: string) => {
    const content = newcomment;
    if (!content) return;

    try {
      const response = await createComment(answerId, content);
      if (response.success) {
        setNewComment('');
        fetchComments(answerId);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async (answerId: string) => {
    const response = await voteAnswers(answerId, 1);
    if (response.success) {
      onRefresh();
    }
  };

  const handleDislike = async (answerId: string) => {
    const response = await voteAnswers(answerId, -1);
    if (response.success) {
      onRefresh();
    }
  };

  const cardBg = isDark
    ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)';

  const commentBg = isDark
    ? 'rgba(30, 35, 50, 0.6)'
    : 'rgba(248, 250, 252, 0.8)';

  return (
    <Transition
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
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                    boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                  }}>
                  {!answer.user.profilePicture &&
                    answer.user.username[0].toUpperCase()}
                </Avatar>
                <Stack gap="xs" style={{ flex: 1 }}>
                  <Group gap="md" align="center">
                    <Text size="lg" fw={700} c={isDark ? 'white' : 'dark'}>
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
                        onClick={() => onEdit(answer, 'ANSWER')}
                        variant="light"
                        color="blue"
                        size="lg"
                        radius="xl"
                        style={{ transition: 'all 0.2s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
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
                        style={{ transition: 'all 0.2s ease' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.1)';
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
                      onClick={() => onReport(answer, 'ANSWER')}
                      variant="light"
                      color="yellow"
                      size="lg"
                      radius="xl"
                      style={{ transition: 'all 0.2s ease' }}
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
                  variant={answer.voteStatus === 'like' ? 'filled' : 'light'}
                  color="green"
                  size="lg"
                  radius="xl"
                  style={{ transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                  <IconThumbUp size={25} />
                </ActionIcon>
                <Badge
                  variant={answer.voteStatus === 'like' ? 'filled' : 'light'}
                  color="green"
                  radius="xl"
                  size="xl">
                  {answer.upvotes}
                </Badge>
              </Group>

              <Group gap="xs" align="center">
                <ActionIcon
                  onClick={() => handleDislike(answer.id)}
                  variant={answer.voteStatus === 'dislike' ? 'filled' : 'light'}
                  color="red"
                  size="lg"
                  radius="xl"
                  style={{ transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                  <IconThumbDown size={25} />
                </ActionIcon>
                <Badge
                  variant={answer.voteStatus === 'dislike' ? 'filled' : 'light'}
                  color="red"
                  radius="xl"
                  size="xl">
                  {answer.downvotes}
                </Badge>
              </Group>

              <Button
                leftSection={<IconMessageCircle size={18} />}
                onClick={() =>
                  setCommentingId(commentingId === answer.id ? null : answer.id)
                }
                variant="gradient"
                gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                radius="xl"
                size="md"
                style={{ transition: 'all 0.2s ease' }}
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
                    value={newcomment}
                    onChange={(e) => setNewComment(e.currentTarget.value)}
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
                      handleCommentSubmit(answer.id);
                      setCommentingId(null);
                    }}
                    disabled={!newcomment?.trim()}
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

          {comments.length > 0 && (
            <Card.Section
              style={{
                borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
                backgroundColor: commentBg,
              }}>
              {comments.map((comment, commentIndex) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  commentIndex={commentIndex}
                  answerId={answer.id}
                  user={user}
                  onEdit={onEdit}
                  onReport={onReport}
                  onRefreshComments={() => fetchComments(answer.id)}
                  t={t}
                />
              ))}
            </Card.Section>
          )}
        </Card>
      )}
    </Transition>
  );
}

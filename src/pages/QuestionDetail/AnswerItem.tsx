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
  Image,
  SimpleGrid,
  FileInput,
  Paper,
} from '@mantine/core';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import {
  IconThumbUp,
  IconThumbDown,
  IconEdit,
  IconTrash,
  IconFlag,
  IconMessageCircle,
  IconPhoto,
  IconUpload,
  IconX,
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

  const [selectedCommentImages, setSelectedCommentImages] = useState<File[]>(
    [],
  );
  const [commentImagePreviewUrls, setCommentImagePreviewUrls] = useState<
    string[]
  >([]);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

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
    return () => {
      commentImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [answer.id, onEdit]);

  const handleCommentImageUpload = (files: File[]) => {
    if (files.length === 0) return;

    const newFiles = [...selectedCommentImages, ...files].slice(0, 5);
    setSelectedCommentImages(newFiles);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setCommentImagePreviewUrls((prevUrls) => {
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newPreviewUrls;
    });
  };

  // Remove comment image
  const removeCommentImage = (index: number) => {
    const newFiles = selectedCommentImages.filter((_, i) => i !== index);
    const newUrls = commentImagePreviewUrls.filter((_, i) => i !== index);

    URL.revokeObjectURL(commentImagePreviewUrls[index]);

    setSelectedCommentImages(newFiles);
    setCommentImagePreviewUrls(newUrls);
  };

  const handleCommentSubmit = async (answerId: string) => {
    const content = newcomment;
    if (!content.trim() && selectedCommentImages.length === 0) return;

    try {
      const response = await createComment(
        answerId,
        content,
        selectedCommentImages,
      );
      if (response.success) {
        setNewComment('');
        setSelectedCommentImages([]);
        commentImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setCommentImagePreviewUrls([]);
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

  const handleImageClick = (images: string[], index: number) => {
    setCurrentImages(images);
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  const renderAnswerImages = (images: string[]) => {
    if (!images || images.length === 0) return null;

    const displayImages = images.slice(0, 3);
    const remainingCount = images.length - 3;

    return (
      <Box mt="md">
        <SimpleGrid
          cols={images.length === 1 ? 1 : images.length === 2 ? 2 : 3}
          spacing="sm">
          {displayImages.map((image, index) => (
            <Box
              key={index}
              style={{
                position: 'relative',
                cursor: 'pointer',
                borderRadius: rem(12),
                overflow: 'hidden',
              }}
              onClick={() => handleImageClick(images, index)}>
              <Image
                src={image}
                alt={`Answer image ${index + 1}`}
                radius="md"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
              {index === 2 && remainingCount > 0 && (
                <Box
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: rem(12),
                  }}>
                  <Text
                    size="xl"
                    fw={700}
                    c="white"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    +{remainingCount}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  const cardBg = isDark
    ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)';

  const commentBg = isDark
    ? 'rgba(30, 35, 50, 0.6)'
    : 'rgba(248, 250, 252, 0.8)';

  return (
    <>
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
            <Card.Section pt="xl" pl="xl" pr="xl">
              <Box mb="lg">
                <Group justify="space-between" align="flex-start">
                  <Group
                    align="flex-start"
                    gap="md"
                    style={{ flex: 1, minWidth: 0 }}>
                    <Avatar
                      src={answer.user.profilePicture}
                      size={60}
                      radius="xl"
                      style={{
                        background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                        boxShadow: '0 8px 24px rgba(255, 107, 107, 0.3)',
                        flexShrink: 0,
                      }}>
                      {!answer.user.profilePicture &&
                        answer.user.username[0].toUpperCase()}
                    </Avatar>
                    <Stack
                      gap="xs"
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}>
                      <Group gap="md" align="center">
                        <Text size="lg" fw={700} c={isDark ? 'white' : 'dark'}>
                          {answer.user.username}
                        </Text>
                        <Badge
                          variant="gradient"
                          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                          radius="xl"
                          size="lg"
                          style={{ textTransform: 'none' }}>
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
                          overflowWrap: 'break-word',
                          maxWidth: '100%',
                        }}>
                        {answer.content}
                      </Text>

                      <Box style={{ maxWidth: '100%', overflow: 'hidden' }}>
                        {renderAnswerImages(answer.images)}
                      </Box>

                      <Group gap="lg" align="center">
                        <Group gap="xs" align="center">
                          <ActionIcon
                            onClick={() => handleLike(answer.id)}
                            variant={
                              answer.voteStatus === 'like' ? 'filled' : 'light'
                            }
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
                              answer.voteStatus === 'dislike'
                                ? 'filled'
                                : 'light'
                            }
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
                            variant={
                              answer.voteStatus === 'dislike'
                                ? 'filled'
                                : 'light'
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
                            setCommentingId(
                              commentingId === answer.id ? null : answer.id,
                            )
                          }
                          variant="gradient"
                          gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                          radius="xl"
                          size="md"
                          style={{ transition: 'all 0.2s ease' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                          {t('feedback')}
                        </Button>
                      </Group>
                    </Stack>
                  </Group>

                  <Group gap="xs" style={{ flexShrink: 0 }}>
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
              </Box>

              <Collapse mb="lg" in={commentingId === answer.id}>
                <Box
                  p="lg"
                  style={{
                    backgroundColor: commentBg,
                    borderRadius: rem(16),
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                  }}>
                  <Stack gap="md">
                    <TextInput
                      placeholder={t('writeFeedback')}
                      value={newcomment}
                      onChange={(e) => setNewComment(e.currentTarget.value)}
                      radius="xl"
                      size="md"
                      styles={{
                        input: {
                          backgroundColor: isDark
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(255, 255, 255, 0.8)',
                          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                        },
                      }}
                    />

                    <Paper
                      p="md"
                      radius="xl"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(255, 255, 255, 0.03)'
                          : 'rgba(255, 255, 255, 0.6)',
                        border: `1px dashed ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                      }}>
                      <Group justify="space-between" align="center" mb="md">
                        <Group align="center" gap="xs">
                          <IconPhoto size={16} />
                          <Text size="sm" fw={500}>
                            Thêm hình ảnh
                          </Text>
                        </Group>
                        <FileInput
                          placeholder="Chọn ảnh"
                          accept="image/*"
                          multiple
                          onChange={handleCommentImageUpload}
                          style={{ display: 'none' }}
                          id={`comment-image-upload-${answer.id}`}
                        />
                        <Button
                          component="label"
                          htmlFor={`comment-image-upload-${answer.id}`}
                          leftSection={<IconUpload size={14} />}
                          variant="light"
                          size="xs"
                          radius="xl"
                          disabled={selectedCommentImages.length >= 5}>
                          Chọn ảnh
                        </Button>
                      </Group>

                      {commentImagePreviewUrls.length > 0 && (
                        <SimpleGrid
                          cols={
                            commentImagePreviewUrls.length > 2
                              ? 3
                              : commentImagePreviewUrls.length
                          }
                          spacing="sm">
                          {commentImagePreviewUrls.map((url, index) => (
                            <Box key={index} style={{ position: 'relative' }}>
                              <Image
                                src={url}
                                alt={`Preview ${index + 1}`}
                                radius="md"
                                style={{ maxHeight: 80, objectFit: 'cover' }}
                              />
                              <ActionIcon
                                onClick={() => removeCommentImage(index)}
                                style={{
                                  position: 'absolute',
                                  top: 4,
                                  right: 4,
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }}
                                size="sm"
                                radius="xl"
                                color="red"
                                variant="filled">
                                <IconX size={12} color="black" />
                              </ActionIcon>
                            </Box>
                          ))}
                        </SimpleGrid>
                      )}
                    </Paper>

                    <Group justify="flex-end">
                      <Button
                        onClick={() => {
                          handleCommentSubmit(answer.id);
                          setCommentingId(null);
                        }}
                        disabled={
                          !newcomment?.trim() &&
                          selectedCommentImages.length === 0
                        }
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                        radius="xl"
                        size="md">
                        {t('send')}
                      </Button>
                    </Group>
                  </Stack>
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

      <Lightbox
        open={imageModalOpen}
        close={() => setImageModalOpen(false)}
        slides={currentImages.map((src) => ({ src }))}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 4,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100,
        }}
        index={selectedImageIndex}
      />
    </>
  );
}

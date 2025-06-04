import { useState } from 'react';
import {
  Box,
  Text,
  Avatar,
  ActionIcon,
  Tooltip,
  Badge,
  Transition,
  Group,
  Stack,
  useMantineColorScheme,
  Image,
  SimpleGrid,
  rem,
  Button,
} from '@mantine/core';
import { IconTrash as DeleteIcon } from '@tabler/icons-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import {
  IconThumbUp,
  IconThumbDown,
  IconEdit,
  IconTrash,
  IconFlag,
} from '@tabler/icons-react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { voteComment, toggleHiddenComment } from './Services/CommentServices';
import FormatTime from './formatTime';

interface CommentItemProps {
  comment: any;
  commentIndex: number;
  answerId: string;
  user: any;
  answer: any;
  onEdit: (item: any, type: 'ANSWER' | 'COMMENT', title: string) => void;
  onReport: (item: any, type: string) => void;
  onRefreshComments: () => void;
  t: (key: string) => string;
}

export default function CommentItem({
  comment,
  commentIndex,
  user,
  answer,
  onEdit,
  onReport,
  onRefreshComments,
  t,
}: CommentItemProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (toggleHiddenComment) {
      try {
        await toggleHiddenComment(comment.id);
        setDeleteDialogOpen(false);
        onRefreshComments();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await voteComment(commentId, 1);
      if (response.success) {
        onRefreshComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislikeComment = async (commentId: string) => {
    try {
      const response = await voteComment(commentId, -1);
      if (response.success) {
        onRefreshComments();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (images: string[], index: number) => {
    setCurrentImages(images);
    setSelectedImageIndex(index);
    setImageModalOpen(true);
  };

  const renderCommentImages = (images: string[]) => {
    if (!images || images.length === 0) return null;

    const displayImages = images.slice(0, 3);
    const remainingCount = images.length - 3;

    return (
      <Box mt="md">
        <SimpleGrid cols={3} spacing="sm">
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
                alt={`Comment image ${index + 1}`}
                radius="md"
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.2s ease',
                  maxHeight: '150px',
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

  return (
    <>
      <Transition
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
              e.currentTarget.style.backgroundColor = 'transparent';
            }}>
            <Group align="flex-start" gap="md">
              <Avatar
                src={comment.user.profilePicture}
                size={40}
                radius="xl"
                style={{
                  background: 'linear-gradient(45deg, #74b9ff, #0984e3)',
                  flexShrink: 0,
                }}>
                {!comment.user.profilePicture &&
                  comment.user.username[0].toUpperCase()}
              </Avatar>

              <Stack gap="xs" style={{ flex: 1, minWidth: 0 }}>
                <Group gap="sm" align="center">
                  <Text size="sm" fw={600} c={isDark ? 'white' : 'dark'}>
                    {comment.user.username}
                  </Text>
                  <Badge
                    variant="light"
                    color="cyan"
                    radius="xl"
                    size="lg"
                    style={{ textTransform: 'none' }}>
                    <FormatTime createdAt={comment.createdAt} />
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

                {/* Comment Images */}
                <Box style={{ maxWidth: '100%', overflow: 'hidden' }}>
                  {renderCommentImages(comment.images)}
                </Box>

                <Group gap="lg" align="center">
                  <Group gap="xs" align="center">
                    <ActionIcon
                      onClick={() => handleLikeComment(comment.id)}
                      variant={
                        comment.voteStatus === 'like' ? 'filled' : 'light'
                      }
                      color="green"
                      size="lg"
                      radius="xl"
                      style={{ transition: 'all 0.2s ease' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}>
                      <IconThumbUp size={18} />
                    </ActionIcon>
                    <Text size="md" c="dimmed">
                      {comment.upvotes || 0}
                    </Text>
                  </Group>

                  <Group gap="xs" align="center">
                    <ActionIcon
                      onClick={() => handleDislikeComment(comment.id)}
                      variant={
                        comment.voteStatus === 'dislike' ? 'filled' : 'light'
                      }
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
                      <IconThumbDown size={18} />
                    </ActionIcon>
                    <Text size="md" c="dimmed">
                      {comment.downvotes || 0}
                    </Text>
                  </Group>
                </Group>
              </Stack>

              {/* Comment Actions */}
              <Group gap="xs" style={{ flexShrink: 0 }}>
                {user?.id == comment.userId ? (
                  <>
                    <Tooltip label={t('edit')} position="top">
                      <ActionIcon
                        onClick={() =>
                          onEdit(comment, 'COMMENT', answer.content)
                        }
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
                        onClick={() => openDeleteDialog()}
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
                      onClick={() => onReport(comment, 'COMMENT')}
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

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
            bgcolor: isDark ? '#2c3e50' : 'white',
          },
        }}>
        <DialogTitle
          sx={{
            bgcolor: '#ff7675',
            color: 'white',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}>
          <DeleteIcon />
          {t('deleteTitle')}
        </DialogTitle>
        <DialogContent sx={{ p: 3, mt: 2 }}>
          <DialogContentText
            sx={{
              fontSize: '1rem',
              color: isDark ? '#ecf0f1' : '#2c3e50',
            }}>
            {t('deleteCommentMessage')}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            style={{
              backgroundColor: 'transparent',
              borderRadius: 10,
              color: isDark ? ' #bdc3c7' : ' #2c3e50',
            }}>
            {t('cancel')}
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            style={{
              borderRadius: 10,
              background: 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
            }}>
            {t('delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

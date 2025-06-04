import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Text,
  Stack,
  Textarea,
  ThemeIcon,
  Card,
  useMantineColorScheme,
  useMantineTheme,
  Flex,
  rem,
  Group,
  FileInput,
  Image,
  SimpleGrid,
  ActionIcon,
  Paper,
  Modal,
  Alert,
  Loader,
} from '@mantine/core';
import {
  IconMessageCircle,
  IconSend,
  IconPhoto,
  IconX,
  IconUpload,
  IconAlertTriangle,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import {
  createAnswer,
  getAnswersByQuestionId,
  getVoteStatus,
  getToxicityGrading,
} from './Services/AnswersServices';
import ReportPage from './ReportPage';
import EditPage from './EditPage';
import { useUserStore } from '../../stores/useUserStore';
import { useTranslation } from 'react-i18next';
import AnswerItem from './AnswerItem';

interface ToxicityResult {
  toxicity_score: number;
  justification: string;
}

export default function AnswerView() {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';
  const { user } = useUserStore();

  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<any[]>([]);
  const [newanswer, setNewanswer] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [questionTitle, setQuestionTitle] = useState('');

  const [isCheckingToxicity, setIsCheckingToxicity] = useState(false);
  const [toxicityModalOpen, setToxicityModalOpen] = useState(false);
  const [toxicityResult, setToxicityResult] = useState<ToxicityResult | null>(
    null,
  );

  const [editingId, setEditingId] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingImages, setEditingImages] = useState([]);
  const [editingType, setEditingType] = useState('');
  const [openEditingModal, setOpenEditingModal] = useState(false);
  const [titleContent, setTitleContent] = useState('');

  const handleEdit = (item: any, type: 'ANSWER' | 'COMMENT', title: string) => {
    setEditingType(type);
    setEditingContent(item.content);
    setEditingImages(item.images);
    setEditingId(item.id);
    setOpenEditingModal(true);
    setTitleContent(title);
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

  const handleAnswerChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewanswer(event.currentTarget.value);
    },
    [],
  );

  const handleImageUpload = (files: File[]) => {
    if (files.length === 0) return;

    const newFiles = [...selectedImages, ...files].slice(0, 5);
    setSelectedImages(newFiles);

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => {
      prevUrls.forEach((url) => URL.revokeObjectURL(url));
      return newPreviewUrls;
    });
  };

  const removeImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newUrls = imagePreviewUrls.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviewUrls[index]);

    setSelectedImages(newFiles);
    setImagePreviewUrls(newUrls);
  };

  const checkToxicity = async (
    content: string,
    title: string,
  ): Promise<ToxicityResult | null> => {
    try {
      setIsCheckingToxicity(true);
      const response = await getToxicityGrading(title, content);

      if (response.success) {
        return response.content;
      } else {
        console.error(response.message);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsCheckingToxicity(false);
    }
  };

  const handleAddanswer = async () => {
    const content = newanswer;
    if (!content.trim() && selectedImages.length === 0) return;
    if (!id) return;

    const toxicityResult = await checkToxicity(content, questionTitle);

    if (toxicityResult) {
      setToxicityResult(toxicityResult);
      setToxicityModalOpen(true);
      return;
    }

    await submitAnswer();
  };

  const submitAnswer = async () => {
    if (!id) return;

    try {
      const response = await createAnswer(id, newanswer, selectedImages);
      if (response.success) {
        setNewanswer('');
        setSelectedImages([]);

        imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
        setImagePreviewUrls([]);
        fetchAnswers();

        setToxicityResult(null);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProceedWithSubmission = async () => {
    setToxicityModalOpen(false);
    await submitAnswer();
  };

  const handleCancelSubmission = () => {
    setToxicityModalOpen(false);
    setToxicityResult(null);
  };

  const fetchAnswers = async () => {
    if (!id) return;

    try {
      const response = await getAnswersByQuestionId(id);
      if (response.success) {
        const answersWithVoteStatus = await Promise.all(
          response.content.answers.map(async (answer: any) => {
            const voteStatusResponse = await getVoteStatus(answer.id);
            if (voteStatusResponse.success) {
              answer.voteStatus = voteStatusResponse.content.status;
            }
            return answer;
          }),
        );
        setAnswers(answersWithVoteStatus);

        setQuestionTitle(response?.content?.title || '');
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAnswers();
    return () => {
      imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [id]);

  const gradientBg = isDark
    ? 'linear-gradient(135deg, rgba(55, 59, 83, 0.8) 0%, rgba(28, 30, 41, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)';

  const cardBg = isDark
    ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)';

  const getToxicityColor = (score: number) => {
    if (score <= 2) return 'green';
    if (score <= 4) return 'blue';
    if (score <= 6) return 'yellow';
    if (score <= 8) return 'orange';
    return 'red';
  };

  const getToxicityIcon = (score: number) => {
    if (score <= 6) return <IconShieldCheck size={20} />;
    return <IconAlertTriangle size={20} />;
  };

  return (
    <>
      <Box
        style={{
          background: gradientBg,
          backdropFilter: 'blur(20px)',
          borderRadius: rem(20),
          border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
          padding: rem(32),
          marginBottom: rem(24),
        }}>
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
                autosize
                placeholder={t('writeDetailedAnswer')}
                value={newanswer} // Fixed: Added value prop back
                onChange={handleAnswerChange} // Fixed: Use optimized handler
                minRows={5}
                maxRows={5}
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
                    <IconPhoto size={20} />
                    <Text size="sm" fw={500}>
                      {t('addImage')}
                    </Text>
                  </Group>
                  <FileInput
                    placeholder={t('chooseImage')}
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <Button
                    component="label"
                    htmlFor="image-upload"
                    leftSection={<IconUpload size={16} />}
                    variant="light"
                    size="xs"
                    radius="xl"
                    disabled={selectedImages.length >= 5}>
                    {t('chooseImage')}
                  </Button>
                </Group>

                {imagePreviewUrls.length > 0 && (
                  <SimpleGrid cols={3} spacing="sm">
                    {imagePreviewUrls.map((url, index) => (
                      <Box key={index} style={{ position: 'relative' }}>
                        <Image
                          src={url}
                          alt={`Preview ${index + 1}`}
                          radius="md"
                          style={{ maxHeight: 120, objectFit: 'cover' }}
                        />
                        <ActionIcon
                          onClick={() => removeImage(index)}
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

              <Flex justify="flex-end">
                <Button
                  onClick={handleAddanswer}
                  disabled={
                    (!newanswer.trim() && selectedImages.length === 0) ||
                    isCheckingToxicity
                  }
                  rightSection={
                    isCheckingToxicity ? (
                      <Loader size={18} />
                    ) : (
                      <IconSend size={18} />
                    )
                  }
                  variant="gradient"
                  gradient={{ from: 'violet', to: 'indigo', deg: 45 }}
                  radius="xl"
                  size="lg"
                  style={{
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)',
                    transform:
                      newanswer.trim() || selectedImages.length > 0
                        ? 'translateY(-2px)'
                        : 'none',
                    transition: 'all 0.3s ease',
                  }}>
                  {isCheckingToxicity ? t('checkingContent') : t('sendAnswer')}
                </Button>
              </Flex>
            </Stack>
          </Card.Section>
        </Card>

        <Stack gap="xl">
          {answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              answer={answer}
              user={user}
              onEdit={handleEdit}
              questionTitle={questionTitle}
              onReport={handleReport}
              onRefresh={fetchAnswers}
              t={t as unknown as (key: string) => string}
            />
          ))}
        </Stack>

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
                  {t('noAnswers')}
                </Text>
                <Text size="md" c="dimmed">
                  {t('beFirstToAnswer')}
                </Text>
              </Stack>
            </Stack>
          </Card>
        )}
      </Box>

      <Modal
        opened={toxicityModalOpen}
        onClose={handleCancelSubmission}
        title={
          <Group align="center" gap="xs">
            {toxicityResult && getToxicityIcon(toxicityResult.toxicity_score)}
            <Text fw={700} size="xl">
              {toxicityResult && toxicityResult.toxicity_score >= 7
                ? t('toxicityWarningTitle')
                : t('contentCheckNotification')}
            </Text>
          </Group>
        }
        centered
        radius="md"
        size="xl">
        {toxicityResult && (
          <Stack gap="md">
            <Alert
              color={getToxicityColor(toxicityResult.toxicity_score)}
              icon={getToxicityIcon(toxicityResult.toxicity_score)}
              title={t('toxicityScoreTitle', {
                toxicity_score: toxicityResult.toxicity_score,
              })}
              radius="md">
              <Text size="md">{toxicityResult.justification}</Text>
            </Alert>

            {toxicityResult.toxicity_score >= 7 ? (
              <Stack gap="md">
                <Text size="md" c="dimmed">
                  {t('toxicityWarningBody')}
                </Text>
                <Group justify="flex-end" gap="xs">
                  <Button
                    variant="light"
                    color="gray"
                    onClick={handleCancelSubmission}
                    radius="md"
                    size="md">
                    {t('editAgain')}
                  </Button>
                  <Button
                    color="red"
                    onClick={handleProceedWithSubmission}
                    radius="md"
                    size="md">
                    {t('submitAnyway')}
                  </Button>
                </Group>
              </Stack>
            ) : (
              <Stack gap="md">
                <Text size="md" c="dimmed">
                  {t('toxicityReviewPrompt')}
                </Text>
                <Group justify="flex-end" gap="xs">
                  <Button
                    variant="light"
                    color="gray"
                    onClick={handleCancelSubmission}
                    radius="md"
                    size="md">
                    {t('review')}
                  </Button>
                  <Button
                    color="blue"
                    onClick={handleProceedWithSubmission}
                    radius="md"
                    size="md">
                    {t('continueSending')}
                  </Button>
                </Group>
              </Stack>
            )}
          </Stack>
        )}
      </Modal>

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
        oldImages={editingImages}
        titleContent={titleContent}
      />
    </>
  );
}

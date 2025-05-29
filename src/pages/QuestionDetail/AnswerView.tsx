import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Text,
  Stack,
  Textarea,
  Container,
  ThemeIcon,
  Card,
  useMantineColorScheme,
  useMantineTheme,
  Flex,
  rem,
  Group,
} from '@mantine/core';
import { IconMessageCircle, IconSend } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';
import {
  createAnswer,
  getAnswersByQuestionId,
  getVoteStatus,
} from './Services/AnswersServices';
import ReportPage from './ReportPage';
import EditPage from './EditPage';
import { useUserStore } from '../../stores/useUserStore';
import { useTranslation } from 'react-i18next';
import AnswerItem from './AnswerItem';

export default function AnswerView() {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';
  const { user } = useUserStore();

  const { id } = useParams<{ id: string }>();
  const [answers, setAnswers] = useState<any[]>([]);
  const [newanswer, setNewanswer] = useState('');

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

  const gradientBg = isDark
    ? 'linear-gradient(135deg, rgba(55, 59, 83, 0.8) 0%, rgba(28, 30, 41, 0.9) 100%)'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)';

  const cardBg = isDark
    ? 'linear-gradient(145deg, rgba(45, 48, 68, 0.95) 0%, rgba(35, 38, 54, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)';

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

        <Stack gap="xl">
          {answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              answer={answer}
              user={user}
              onEdit={handleEdit}
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

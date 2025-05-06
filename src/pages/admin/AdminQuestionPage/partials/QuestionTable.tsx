import adminRoutePaths from '@/routes/admin/paths';
import publicRoutePaths from '@/routes/user/public/paths';
import { QuestionAdminView } from '@/types';
import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconClipboard,
  IconEye,
  IconEyeOff,
  IconMessageShare,
  IconMoodSad,
  IconX,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../AdminQuestionPage.module.css';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

type QuestionTableProps = {
  records: QuestionAdminView[];
  pagination: Pagination;
  isLoading: boolean;
  selected: QuestionAdminView[];
  setSelected: (ids: QuestionAdminView[]) => void;
  setHide: (question: QuestionAdminView) => void;
  setUnhide: (question: QuestionAdminView) => void;
};

export default function QuestionTable({
  records,
  pagination,
  isLoading,
  selected,
  setSelected,
  setHide,
  setUnhide,
}: QuestionTableProps) {
  const { t } = useTranslation('adminQuestionPage');
  const clipboard = useClipboard();

  const renderRecordActions = (question: QuestionAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip label={t('toggleVisibility')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="pink"
          onClick={() => {
            if (question.isHidden) {
              setUnhide(question);
            } else {
              setHide(question);
            }
          }}>
          {question.isHidden ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyQuestionId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            clipboard.copy(question.id);
            notifications.show({
              message: t('copySuccess', { id: question.id }),
            });
          }}>
          <IconClipboard size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('viewAnswers')}>
        <ActionIcon
          component={Link}
          to={`${adminRoutePaths.answers}?questionId=${question.id}`}
          size="sm"
          variant="subtle"
          color="green">
          <IconMessageShare size={18} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
  return (
    <DataTable
      records={records}
      /* phân trang */
      totalRecords={pagination.totalRecords}
      recordsPerPage={pagination.pageSize}
      page={pagination.currentPage}
      onPageChange={pagination.setPage}
      /* chọn hàng */
      selectedRecords={selected}
      onSelectedRecordsChange={setSelected}
      /* loading state */
      fetching={isLoading}
      /* tô màu cho record có isHidden === true */
      rowClassName={({ isHidden }) =>
        isHidden ? styles.hiddenQuestion : undefined
      }
      columns={[
        {
          accessor: 'title',
          title: t('title'),
          width: 400,
          render: (row) => (
            <Anchor
              component={Link}
              to={publicRoutePaths.questionDetail.replace(':id', row.id)}
              lineClamp={2}>
              {row.title}
            </Anchor>
          ),
        },
        {
          accessor: 'tags',
          title: t('tags'),
          width: 120,
          render: (row) => (
            <Tooltip.Floating
              label={row.tags.map((tag) => tag.name).join(', ')}>
              <Badge size="lg" color="green">
                +{row.tags.length} tags
              </Badge>
            </Tooltip.Floating>
          ),
        },
        {
          accessor: 'user.username',
          width: 160,
          title: t('poster'),
        },
        {
          accessor: 'views',
          width: 80,
          title: t('views'),
          textAlign: 'right',
        },
        {
          accessor: 'votes',
          width: 80,
          title: t('votes'),
          textAlign: 'right',
        },
        {
          accessor: 'answers',
          width: 80,
          title: t('answers'),
          textAlign: 'right',
        },
        {
          accessor: 'isAnswered',
          title: t('answered'),
          textAlign: 'center',
          render: (row) => (
            <ThemeIcon color={row.isAnswered ? 'blue' : 'red'}>
              {row.isAnswered ? <IconCheck size={16} /> : <IconX size={16} />}
            </ThemeIcon>
          ),
        },
        {
          accessor: 'createdAt',
          title: t('postedOn'),
          width: '10%',
          render: (row) => (
            <Text size="sm">
              {dayjs(row.createdAt).format('DD/MM/YYYY, HH:mm')}
            </Text>
          ),
        },
        {
          accessor: 'editedAt',
          title: t('lastEdited'),
          textAlign: 'center',
          width: '10%',
          render: (row) => (
            /* hiển thị ngày edit chỉ khi khác ngày tạo */
            <Text size="sm">
              {row.updatedAt === ''
                ? '-'
                : dayjs(row.updatedAt).format('DD/MM/YYYY, HH:mm')}
            </Text>
          ),
        },
        {
          accessor: 'actions',
          title: t('actions'),
          render: renderRecordActions,
        },
      ]}
      /* set style */
      withTableBorder
      withColumnBorders
      noRecordsIcon={
        <Box>
          <IconMoodSad size={36} strokeWidth={1.5} />
        </Box>
      }
      noRecordsText={t('noResults')}
    />
  );
}

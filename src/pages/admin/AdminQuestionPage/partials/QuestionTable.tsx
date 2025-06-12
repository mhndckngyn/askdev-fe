import adminRoutePaths from '@/routes/admin/paths';
import publicRoutePaths from '@/routes/user/public/paths';
import { QuestionAdminView } from '@/types';
import formatDate from '@/utils/formatDate';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconClipboard,
  IconEye,
  IconEyeOff,
  IconMessage2Code,
  IconMessageShare,
  IconMoodSad,
  IconX,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React from 'react';
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

function QuestionTableComponent({
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

  const renderTagCell = ({ tags }: QuestionAdminView) => {
    return (
      <Group gap="xs">
        {tags.map((tag) => (
          <Badge key={tag.id} size="md" color="pink" variant="light">
            {tag.name}
          </Badge>
        ))}
      </Group>
    );
  };

  const renderUserCell = ({ user }: QuestionAdminView) => (
    <Button
      component={Link}
      to={publicRoutePaths.profilePage.replace(':username', user.username)}
      size="lg"
      variant="subtle"
      w="100%">
      <Group gap="sm" justify="center" wrap="nowrap">
        <Avatar src={user.profilePicture} />
        <Text>{user.username}</Text>
      </Group>
    </Button>
  );

  const renderStatCell = ({ views, votes, answers }: QuestionAdminView) => {
    return (
      <Group gap="xs" justify='center'>
        <Tooltip label="Views" withArrow>
          <Badge
            variant="light"
            size="lg"
            color="grape"
            leftSection={<IconEye size={14} />}>
            {views}
          </Badge>
        </Tooltip>

        <Tooltip label="Votes" withArrow>
          <Badge
            variant="light"
            size="lg"
            color={votes > 10 ? 'green' : votes > 0 ? 'yellow' : 'red'}
            leftSection={
              votes >= 0 ? (
                <IconArrowUp size={14} />
              ) : (
                <IconArrowDown size={14} />
              )
            }>
            {votes}
          </Badge>
        </Tooltip>

        <Tooltip label="Answers" withArrow>
          <Badge
            variant="light"
            size="lg"
            color={answers > 5 ? 'blue' : answers > 0 ? 'cyan' : 'gray'}
            leftSection={<IconMessage2Code size={14} />}>
            {answers}
          </Badge>
        </Tooltip>
      </Group>
    );
  };

  const renderRecordActions = (question: QuestionAdminView) => (
    <Group gap={4} justify="center">
      <Tooltip label={t('toggleVisibility')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="orange"
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
          color="pink">
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
          width: 200,
          render: renderTagCell,
        },
        {
          accessor: 'user.username',
          width: 250,
          textAlign: 'center',
          title: t('poster'),
          render: renderUserCell,
        },
        {
          accessor: 'stats',
          width: 225,
          title: t('stats'),
          textAlign: 'center',
          render: renderStatCell,
        },
        {
          accessor: 'isAnswered',
          title: t('answered'),
          textAlign: 'center',
          width: 100,
          render: (row) => (
            <ThemeIcon
              color={row.isAnswered ? 'red' : 'green'}
              size="lg"
              radius="xl">
              {row.isAnswered ? <IconCheck size={16} /> : <IconX size={16} />}
            </ThemeIcon>
          ),
        },
        {
          accessor: 'createdAt',
          title: t('postedOn'),
          width: 160,
          render: (row) => <Text size="sm">{formatDate(row.createdAt)}</Text>,
        },
        {
          accessor: 'editedAt',
          title: t('lastEdited'),
          width: 160,
          render: (row) => (
            <Text size="sm">
              {row.updatedAt ? (
                formatDate(row.updatedAt)
              ) : (
                <Text size="sm" c="dimmed">
                  {t('notAvailable')}
                </Text>
              )}
            </Text>
          ),
        },
        {
          accessor: 'actions',
          title: t('actions'),
          width: 100,
          textAlign: 'center',
          render: renderRecordActions,
        },
      ]}
      /* set style */
      verticalSpacing="md"
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

function areEqual(
  prevProps: QuestionTableProps,
  nextProps: QuestionTableProps,
): boolean {
  return (
    prevProps.records === nextProps.records &&
    prevProps.pagination.currentPage === nextProps.pagination.currentPage &&
    prevProps.pagination.totalRecords === nextProps.pagination.totalRecords &&
    prevProps.pagination.pageSize === nextProps.pagination.pageSize &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.selected === nextProps.selected &&
    prevProps.setSelected === nextProps.setSelected &&
    prevProps.setHide === nextProps.setHide &&
    prevProps.setUnhide === nextProps.setUnhide
  );
}

const QuestionTable = React.memo(QuestionTableComponent, areEqual);
export default QuestionTable;

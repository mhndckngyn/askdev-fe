import publicRoutePaths from '@/routes/user/public/paths';
import { AnswerAdminView } from '@/types/AnswerAdminView';
import formatDate from '@/utils/formatDate';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconArrowDown,
  IconArrowUp,
  IconClipboard,
  IconEye,
  IconEyeOff,
  IconMessageCircle,
  IconMoodSad,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../AdminAnswerPage.module.css';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

type Selection = {
  selected: AnswerAdminView[];
  setSelected: (values: AnswerAdminView[]) => void;
};

type Visiblity = {
  setHide: (id: string) => void;
  setUnhide: (id: string) => void;
};

type Props = {
  records: AnswerAdminView[];
  pagination: Pagination;
  selection: Selection;
  isLoading: boolean;
  visibility: Visiblity;
};

function AnswerTableComponent({
  records,
  pagination,
  selection,
  isLoading,
  visibility,
}: Props) {
  const { t } = useTranslation('adminAnswerPage');
  const clipboard = useClipboard();

  const toggleVisibility = (answer: AnswerAdminView) => {
    if (answer.isHidden) {
      visibility.setUnhide(answer.id);
    } else {
      visibility.setHide(answer.id);
    }
  };

  const copy = (value: string) => {
    clipboard.copy(value);
  };

  const renderQuestionCell = (answer: AnswerAdminView) => (
    <Group gap={8}>
      <Link
        to={publicRoutePaths.questionDetail.replace(':id', answer.question.id)}
        className={styles.questionIdText}>
        {answer.question.title}
      </Link>

      <Tooltip label={t('copyQuestionId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => copy(answer.question.id)}>
          <IconClipboard className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const renderUserCell = (answer: AnswerAdminView) => (
    <Button
      component={Link}
      to={publicRoutePaths.profilePage.replace(':username', answer.user.username)}
      size="lg"
      variant="subtle"
      w="100%">
      <Group gap="sm" justify="center" wrap="nowrap">
        <Avatar src={answer.user.profilePicture} />
        <Text>{answer.user.username}</Text>
      </Group>
    </Button>
  );

  const renderVoteCell = ({ votes }: AnswerAdminView) => {
    return (
      <Tooltip label="Total votes" withArrow>
        <Badge
          size="lg"
          color={votes > 10 ? 'green' : votes > 0 ? 'yellow' : 'red'}
          leftSection={
            votes >= 0 ? <IconArrowUp size={14} /> : <IconArrowDown size={14} />
          }
          variant="light">
          {votes}
        </Badge>
      </Tooltip>
    );
  };

  const renderCommentCell = ({ comments }: AnswerAdminView) => {
    return (
      <Tooltip label="Total comments" withArrow>
        <Badge
          size="lg"
          color={comments > 5 ? 'blue' : comments > 0 ? 'gray' : 'red'}
          leftSection={<IconMessageCircle size={14} />}
          variant="light">
          {comments}
        </Badge>
      </Tooltip>
    );
  };

  const renderRecordActions = (answer: AnswerAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip
        label={t('toggleVisibility')}
        onClick={() => toggleVisibility(answer)}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => toggleVisibility(answer)}>
          {answer.isHidden ? (
            <IconEye className={styles.tableIcon} color="orange"/>
          ) : (
            <IconEyeOff className={styles.tableIcon} color="orange"/>
          )}
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyAnswerId')}>
        <ActionIcon size="sm" variant="subtle" onClick={() => copy(answer.id)}>
          <IconClipboard className={styles.tableIcon} color="green" />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  return (
    <DataTable
      records={records}
      /* phan trang */
      page={pagination.currentPage}
      onPageChange={pagination.setPage}
      totalRecords={pagination.totalRecords}
      recordsPerPage={pagination.pageSize}
      /* chon hang */
      selectedRecords={selection.selected}
      onSelectedRecordsChange={selection.setSelected}
      /* tô màu cho record có isHidden === true */
      rowClassName={({ isHidden }) =>
        isHidden ? styles.hiddenAnswer : undefined
      }
      columns={[
        {
          accessor: 'content',
          title: t('content'),
          width: 400,
          render: (row) => (
            <Text lineClamp={2} size="sm">
              {row.content}
            </Text>
          ),
        },
        {
          accessor: 'question',
          title: t('question'),
          width: 350,
          render: renderQuestionCell
        },
        {
          accessor: 'user.username',
          title: t('poster'),
          textAlign: 'center',
          width: 250,
          render: renderUserCell,
        },
        {
          accessor: 'votes',
          title: t('votes'),
          textAlign: 'center',
          width: 100,
          render: renderVoteCell,
        },
        {
          accessor: 'comments',
          title: t('comments'),
          textAlign: 'center',
          width: 100,
          render: renderCommentCell,
        },
        {
          accessor: 'createdAt',
          title: t('postedOn'),
          textAlign: 'center',
          width: 150,
          render: (row) => formatDate(row.createdAt),
        },
        {
          accessor: 'updatedAt',
          title: t('lastEdited'),
          textAlign: 'center',
          width: 150,
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
          width: '0%',
          render: renderRecordActions,
        },
      ]}
      /* set style */
      fetching={isLoading}
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

const AnswerTable = React.memo(AnswerTableComponent);
export default AnswerTable;

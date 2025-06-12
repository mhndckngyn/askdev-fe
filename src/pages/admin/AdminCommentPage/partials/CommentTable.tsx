import publicRoutePaths from '@/routes/user/public/paths';
import { CommentAdminView } from '@/types/CommentAdminView';
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
  IconArrowUp,
  IconClipboard,
  IconExternalLink,
  IconEye,
  IconEyeOff,
  IconMoodSad,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../AdminCommentPage.module.css';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

type Selection = {
  selected: CommentAdminView[];
  setSelected: (values: CommentAdminView[]) => void;
};

type Visiblity = {
  setHide: (id: string) => void;
  setUnhide: (id: string) => void;
};

type Props = {
  records: CommentAdminView[];
  pagination: Pagination;
  selection: Selection;
  isLoading: boolean;
  visibility: Visiblity;
};

function CommentTableComponent({
  records,
  pagination,
  selection,
  isLoading,
  visibility,
}: Props) {
  const { t } = useTranslation('adminCommentPage');
  const clipboard = useClipboard();

  const toggleVisibility = (comment: CommentAdminView) => {
    if (comment.isHidden) {
      visibility.setUnhide(comment.id);
    } else {
      visibility.setHide(comment.id);
    }
  };

  const copy = (value: string) => {
    clipboard.copy(value);
  };

  const renderAnswerCell = ({ answer }: CommentAdminView) => (
    <Group gap={8} wrap="nowrap">
      <Text size="sm" lineClamp={2} flex={1}>
        {answer.content}
      </Text>

      <Tooltip label={t('copy-answer-id')}>
        <ActionIcon size="sm" variant="subtle" onClick={() => copy(answer.id)}>
          <IconClipboard className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const renderUserCell = ({ user }: CommentAdminView) => (
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

  const renderVoteCell = ({ votes }: CommentAdminView) => {
    return (
      <Tooltip label="Total votes" withArrow>
        <Badge
          size="lg"
          color={votes > 10 ? 'green' : votes > 0 ? 'yellow' : 'red'}
          leftSection={<IconArrowUp size={14} />}
          variant="light">
          {votes}
        </Badge>
      </Tooltip>
    );
  };

  const renderActionCell = (comment: CommentAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip
        label={t('toggle-visibility')}
        onClick={() => toggleVisibility(comment)}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color='orange'
          onClick={() => toggleVisibility(comment)}>
          {comment.isHidden ? (
            <IconEye className={styles.tableIcon} />
          ) : (
            <IconEyeOff className={styles.tableIcon} />
          )}
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copy-comment-id')}>
        <ActionIcon size="sm" variant="subtle" onClick={() => copy(comment.id)}>
          <IconClipboard className={styles.tableIcon} color='lime'/>
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('open-question-page')}>
        <ActionIcon
          component={Link}
          to={publicRoutePaths.questionDetail.replace(
            ':id',
            comment.question.id,
          )}
          size="sm"
          variant="subtle">
          <IconExternalLink className={styles.tableIcon} color='indigo'/>
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
        isHidden ? styles.hiddenComment : undefined
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
          accessor: 'answer.content',
          title: t('answer'),
          width: 350,
          render: renderAnswerCell,
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
          accessor: 'createdAt',
          title: t('posted-on'),
          textAlign: 'center',
          width: 150,
          render: (row) => formatDate(row.createdAt),
        },
        {
          accessor: 'updatedAt',
          title: t('last-edited'),
          textAlign: 'center',
          width: 150,
          render: (row) => (
            <Text size="sm">
              {row.updatedAt ? (
                formatDate(row.updatedAt)
              ) : (
                <Text size="sm" c="dimmed">
                  {t('not-available')}
                </Text>
              )}
            </Text>
          ),
        },
        {
          accessor: 'actions',
          title: t('actions'),
          render: renderActionCell,
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
      noRecordsText={t('no-results')}
    />
  );
}

const CommentTable = React.memo(CommentTableComponent);
export default CommentTable;

import publicRoutePaths from '@/routes/user/public/paths';
import { AnswerAdminView } from '@/types/AnswerAdminView';
import { ActionIcon, Box, Group, Text, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import {
  IconClipboard,
  IconEye,
  IconEyeOff,
  IconMessageShare,
  IconMoodSad,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
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

  const formatDate = (day: string) => {
    return dayjs(day).format('HH:mm, DD/MM/YYYY');
  };

  const renderQuestionIdCell = (answer: AnswerAdminView) => (
    <Group gap={8}>
      <Text size="sm" lineClamp={1} className={styles.questionIdText}>
        {answer.questionId}
      </Text>

      <ActionIcon
        size="sm"
        variant="light"
        onClick={() => copy(answer.questionId)}>
        <IconClipboard className={styles.tableIcon} />
      </ActionIcon>

      <Tooltip label={t('openQuestionPage')}>
        <ActionIcon
          component={Link}
          to={publicRoutePaths.questionDetail.replace(':id', answer.questionId)}
          size="sm"
          variant="light">
          <IconMessageShare className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const renderRecordActions = (answer: AnswerAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip
        label={t('toggleVisibility')}
        onClick={() => toggleVisibility(answer)}>
        <ActionIcon
          size="sm"
          variant="light"
          onClick={() => toggleVisibility(answer)}>
          {answer.isHidden ? (
            <IconEye className={styles.tableIcon} />
          ) : (
            <IconEyeOff className={styles.tableIcon} />
          )}
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyAnswerId')}>
        <ActionIcon size="sm" variant="light" onClick={() => copy(answer.id)}>
          <IconClipboard className={styles.tableIcon} />
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
          accessor: 'questionId',
          title: t('questionId'),
          width: 250,
          render: renderQuestionIdCell /* TODO: Link to question */,
        },
        {
          accessor: 'content',
          title: t('content'),
          width: 400,
          render: (row) => <Text lineClamp={2}>{row.content}</Text>,
        },
        {
          accessor: 'user.username',
          title: t('poster'),
          width: 160,
        },
        {
          accessor: 'votes',
          title: t('votes'),
          textAlign: 'right',
          width: 100,
        },
        {
          accessor: 'comments',
          title: t('comments'),
          textAlign: 'right',
          width: 100,
        },
        {
          accessor: 'createdAt',
          title: t('postedOn'),
          width: '10%',
          render: (row) => formatDate(row.createdAt),
        },
        {
          accessor: 'updatedAt',
          title: t('lastEdited'),
          width: '10%',
          render: (row) => formatDate(row.updatedAt),
        },
        {
          accessor: 'actions',
          title: t('actions'),
          render: renderRecordActions,
        },
      ]}
      /* set style */
      fetching={isLoading}
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

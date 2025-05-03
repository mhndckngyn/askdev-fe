import publicRoutePaths from '@/routes/user/public/paths';
import { QuestionAdminView } from '@/types';
import { Anchor, Badge, Box, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { IconCheck, IconMoodSad, IconX } from '@tabler/icons-react';
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
  setSelected: (questions: QuestionAdminView[]) => void;
};

export default function QuestionTable({
  records,
  pagination,
  isLoading,
  selected,
  setSelected,
}: QuestionTableProps) {
  const { t } = useTranslation('adminQuestionPage');

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
          width: '25%',
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
          width: 'fit-content',
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
          title: t('poster'),
        },
        {
          accessor: 'views',
          title: t('views'),
          textAlign: 'right',
        },
        {
          accessor: 'votes',
          title: t('votes'),
          textAlign: 'right',
        },
        {
          accessor: 'answers',
          title: t('answers'),
          textAlign: 'right',
        },
        {
          accessor: 'isAnswered',
          title: t('answered'),
          textAlign: 'right',
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
          width: '10%',
          render: (row) => (
            /* hiển thị ngày edit chỉ khi khác ngày tạo */
            <Text size="sm">
              {row.editedAt === ''
                ? '-'
                : dayjs(row.editedAt).format('DD/MM/YYYY, HH:mm')}
            </Text>
          ),
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

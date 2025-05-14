import adminRoutePaths from '@/routes/admin/paths';
import publicRoutePaths from '@/routes/user/public/paths';
import { ActionIcon, Box, Group, Text, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
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
import styles from '../AdminReportPage.module.css';

export interface ReportAdminView {
  id: string;
  username?: string;
  contentType: string;
  contentId: string;
  reason: string;
  status: string;
  createdAt: string;
  isHidden: boolean;
}

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

type ReportTableProps = {
  records: ReportAdminView[];
  pagination: Pagination;
  isLoading: boolean;
  selected: ReportAdminView[];
  setSelected: (ids: ReportAdminView[]) => void;
  setHide: (Report: ReportAdminView) => void;
  setUnhide: (Report: ReportAdminView) => void;
};

function ReportTableComponent({
  records,
  pagination,
  isLoading,
  selected,
  setSelected,
  setHide,
  setUnhide,
}: ReportTableProps) {
  const { t } = useTranslation('adminQuestionPage');
  const clipboard = useClipboard();

  const formatDate = (day: string) => {
    return dayjs(day).format('HH:mm, DD/MM/YYYY');
  };

  const renderContentIdCell = (report: ReportAdminView) => (
    <Group gap={8}>
      <Text size="sm" lineClamp={1} className={styles.reportIdText}>
        {report.contentId}
      </Text>

      <ActionIcon
        size="sm"
        variant="light"
        onClick={() => navigator.clipboard.writeText(report.contentId)}>
        <IconClipboard className={styles.tableIcon} />
      </ActionIcon>

      <Tooltip label={'openQuestionPage'}>
        <ActionIcon
          component={Link}
          to={publicRoutePaths.questionDetail.replace(':id', report.contentId)}
          size="sm"
          variant="light">
          <IconMessageShare className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const renderRecordActions = (Report: ReportAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip label={t('toggleVisibility')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="orange"
          onClick={() => {
            if (Report.isHidden) {
              setUnhide(Report);
            } else {
              setHide(Report);
            }
          }}>
          {Report.isHidden ? <IconEye size={18} /> : <IconEyeOff size={18} />}
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyQuestionId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            clipboard.copy(Report.id);
            notifications.show({
              message: t('copySuccess', { id: Report.id }),
            });
          }}>
          <IconClipboard size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={'viewreports'}>
        <ActionIcon
          component={Link}
          to={`${adminRoutePaths.reports}?ReportId=${Report.id}`}
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
      totalRecords={pagination.totalRecords}
      recordsPerPage={pagination.pageSize}
      page={pagination.currentPage}
      onPageChange={pagination.setPage}
      selectedRecords={selected}
      onSelectedRecordsChange={setSelected}
      fetching={isLoading}
      rowClassName={({ isHidden }) =>
        isHidden ? styles.hiddenReport : undefined
      }
      columns={[
        {
          accessor: 'contentId',
          title: t('poster'),
          width: 300,
          render: renderContentIdCell,
        },
        {
          accessor: 'username',
          width: 180,
          title: t('views'),
          textAlign: 'left',
        },
        {
          accessor: 'contentType',
          width: 100,
          title: t('votes'),
          textAlign: 'center',
        },
        {
          accessor: 'reason',
          width: 300,
          title: 'reports',
          textAlign: 'left',
        },
        {
          accessor: 'status',
          width: 100,
          title: 'reports',
          textAlign: 'center',
        },

        {
          accessor: 'createdAt',
          title: t('postedOn'),
          width: '10%',
          render: (row) => <Text size="sm">{formatDate(row.createdAt)}</Text>,
        },
        {
          accessor: 'actions',
          title: t('actions'),
          textAlign: 'center',
          render: renderRecordActions,
        },
      ]}
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
  prevProps: ReportTableProps,
  nextProps: ReportTableProps,
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

const ReportTable = React.memo(ReportTableComponent, areEqual);
export default ReportTable;

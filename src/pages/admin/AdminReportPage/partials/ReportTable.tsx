import adminRoutePaths from '@/routes/admin/paths';
import publicRoutePaths from '@/routes/user/public/paths';
import {
  ActionIcon,
  Box,
  Group,
  Text,
  Tooltip,
  Badge,
  Flex,
} from '@mantine/core';
import { IconClock, IconCheck, IconX } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCopy,
  IconEye,
  IconEyeOff,
  IconClipboard,
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
  const { t } = useTranslation('adminReportPage');
  const clipboard = useClipboard();

  const formatDate = (day: string) => {
    return dayjs(day).format('HH:mm, DD/MM/YYYY');
  };

  const renderContentIdCell = (report: ReportAdminView) => (
    <Group gap={8}>
      <Text size="sm" lineClamp={1} className={styles.reportIdText}>
        {report.contentId}
      </Text>

      <Tooltip label={t('openContentPage')}>
        <ActionIcon
          component={Link}
          to={publicRoutePaths.questionDetail.replace(':id', report.contentId)}
          size="sm"
          variant="light">
          <IconClipboard className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyContentId')}>
        <ActionIcon
          size="sm"
          variant="light"
          onClick={() => {
            navigator.clipboard.writeText(report.contentId);
            notifications.show({
              message: t('copyContentSuccess', { id: report.contentId }),
            });
          }}>
          <IconCopy className={styles.tableIcon} />
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

      <Tooltip label={t('viewReport')}>
        <ActionIcon
          component={Link}
          to={`${adminRoutePaths.reports}?ReportId=${Report.id}`}
          size="sm"
          variant="subtle"
          color="pink">
          <IconClipboard size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyReportId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            clipboard.copy(Report.id);
            notifications.show({
              message: t('copyReportSuccess', { id: Report.id }),
            });
          }}>
          <IconCopy size={18} />
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
          title: t('contentId'),
          width: 220,
          render: renderContentIdCell,
        },
        {
          accessor: 'username',
          width: 180,
          title: t('username'),
          textAlign: 'left',
        },
        {
          accessor: 'contentType',
          width: 120,
          title: t('contentType'),
          textAlign: 'center',
          render: ({ contentType }) => {
            let color: 'blue' | 'green' | 'yellow' | 'gray' = 'gray';
            let label = contentType;

            switch (contentType) {
              case 'QUESTION':
                color = 'blue';
                break;
              case 'ANSWER':
                color = 'green';
                break;
              case 'COMMENT':
                color = 'yellow';
                break;
            }

            return (
              <Badge
                color={color}
                variant="light"
                radius="sm"
                size="lg"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                }}>
                {t(label as any)}
              </Badge>
            );
          },
        },

        {
          accessor: 'reason',
          width: 300,
          title: t('reason'),
          textAlign: 'left',
          render: (record) => (
            <div
              style={{
                maxWidth: 360,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
              {record.reason}
            </div>
          ),
        },

        {
          accessor: 'status',
          width: 140,
          title: t('status'),
          textAlign: 'center',
          render: ({ status }) => {
            let color = '';
            let label = '';
            let IconComponent = null;

            switch (status) {
              case 'PENDING':
                color = 'orange';
                label = 'PENDING';
                IconComponent = IconClock;
                break;
              case 'REVIEWED':
                color = 'green';
                label = 'REVIEWED';
                IconComponent = IconCheck;
                break;
              case 'REJECTED':
                color = 'red';
                label = 'REJECTED';
                IconComponent = IconX;
                break;
              default:
                color = 'gray';
                label = status;
            }

            return (
              <Badge
                color={color}
                variant="light"
                radius="sm"
                size="lg"
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  padding: '8px 12px',
                }}>
                <Flex align="center" gap={6}>
                  {IconComponent && <IconComponent size={16} />}
                  {t(label as any)}
                </Flex>
              </Badge>
            );
          },
        },

        {
          accessor: 'createdAt',
          title: t('createdAt'),
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

import formatDate from '@/utils/formatDate';
import {
  ActionIcon,
  Badge,
  Box,
  Flex,
  Group,
  Text,
  Tooltip,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck, IconClipboard, IconClock, IconCopy,
  IconEye,
  IconEyeOff, IconMoodSad, IconX
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../AdminReportPage.module.css';
import { getReportedContentDetails } from '../services';
import ContentTypePage from './ContentTypePage';
import ReportDetailPage from './ReportDetailPage';

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
  setRecords: (updatedStatus: ReportAdminView) => void;
};

function ReportTableComponent({
  records,
  pagination,
  isLoading,
  selected,
  setSelected,
  setHide,
  setUnhide,
  setRecords,
}: ReportTableProps) {
  const { t } = useTranslation('adminReportPage');
  const clipboard = useClipboard();

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const [report, setReport] = useState<ReportAdminView | null>(null);
  const handleReportDetailPage = (selectedReport: ReportAdminView) => {
    setReport(selectedReport);
    setOpen(true);
  };

  const [dataContent, setDataContent] = useState<any | null>(null);
  const [openContent, setOpenContent] = useState(false);
  const handleToggleContent = () => setOpenContent((prev) => !prev);

  const handleOpenContent = async (report: ReportAdminView) => {
    try {
      const data = await getReportedContentDetails(
        report.contentType as 'QUESTION' | 'ANSWER' | 'COMMENT',
        report.contentId,
      );
      if (data.success) {
        setDataContent(data);
        setOpenContent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const renderContentIdCell = (report: ReportAdminView) => (
    <Group gap={8}>
      <Text size="sm" lineClamp={1} className={styles.reportIdText}>
        {report.contentId}
      </Text>

      <Tooltip label={t('openContentPage')}>
        <ActionIcon
          size="sm"
          variant="light"
          onClick={() => handleOpenContent(report)}>
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
          size="sm"
          variant="subtle"
          color="pink"
          onClick={() => {
            handleReportDetailPage(Report);
          }}>
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
    <>
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
            render: (record) => (
              <div
                style={{
                  maxWidth: 360,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                {record.username}
              </div>
            ),
          },
          {
            accessor: 'contentType',
            width: 140,
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
            width: 280,
            title: t('reason'),
            textAlign: 'left',
            render: (record) => <Text lineClamp={2}>{record.reason}</Text>,
          },

          {
            accessor: 'status',
            width: 160,
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

      {report && (
        <ReportDetailPage
          open={open}
          handleToggle={handleToggle}
          report={report}
          setRecords={setRecords}
        />
      )}

      {dataContent && (
        <ContentTypePage
          open={openContent}
          handleToggle={handleToggleContent}
          data={dataContent}
        />
      )}
    </>
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

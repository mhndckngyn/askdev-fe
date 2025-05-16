import { useErrorStore } from '@/stores/useErrorStore';
import { ApiResponse } from '@/types';
import { Button, Group, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFilterEdit } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminReportPage.module.css';
import FilterModal from './partials/FilterModal';
import ReportTable from './partials/ReportTable';
import SelectedRowActions from './partials/SelectedRowActions';
import { getReports, hideReports, unhideReports } from './services';

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

export type Filter = {
  reasonKeyword?: string;
  reportedusername?: string;
  contentType?: string;
  contentId?: string;
  status?: string;
  hiddenOption?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 10;

export default function AdminReportPage() {
  const { t } = useTranslation('adminReportPage');
  const setError = useErrorStore((state) => state.setError);

  const [opened, { open, close }] = useDisclosure(false);

  const [reports, setReports] = useState<ReportAdminView[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [isLoading, setLoading] = useState(false);

  const [selectedReports, setSelectedReports] = useState<ReportAdminView[]>([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter({ ...filter, reasonKeyword: inputValue });
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(delay);
    };
  }, [inputValue]);

  useEffect(() => {
    setLoading(true);

    const handleGetReports = async () => {
      const params = {
        ...filter,
        page,
        pageSize: PAGE_SIZE,
      };

      const response = await getReports(params);
      if (response.success) {
        setReports(response.content.Reports);
        setTotalRecords(response.content.pagination.total);
      } else {
        setReports([]);
      }

      setLoading(false);
    };

    handleGetReports();
  }, [filter, page, render]);

  const handleToggleVisibility = useCallback(
    async (service: (ids: string[]) => Promise<ApiResponse>, id?: string) => {
      const ReportIds = id ? [id] : selectedReports.map((q) => q.id);

      const response = await service(ReportIds);

      if (response.success) {
        notifications.show({ message: t('toggleHideSuccess') });
        setRender((prev) => prev + 1);
      } else {
        setError(t('toggleHideError'));
      }
    },
    [selectedReports, setError, t],
  );

  const pagination = useMemo(
    () => ({
      totalRecords,
      currentPage: page,
      pageSize: PAGE_SIZE,
      setPage,
    }),
    [totalRecords, page, setPage],
  );

  const handleSetSelected = useCallback((selected: ReportAdminView[]) => {
    setSelectedReports(selected);
  }, []);

  const setHide = useCallback(
    (Report: ReportAdminView) => {
      handleToggleVisibility(hideReports, Report.id);
    },
    [handleToggleVisibility],
  );

  const setUnhide = useCallback(
    (Report: ReportAdminView) => {
      handleToggleVisibility(unhideReports, Report.id);
    },
    [handleToggleVisibility],
  );

  const setAdvancedFilter = (values: Partial<Filter>) => {
    setFilter({ ...filter, ...values });
  };

  const resetFilter = () => {
    setFilter({ reasonKeyword: filter.reasonKeyword });
  };

  const handleEditSuccess = (updatedTag: ReportAdminView) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === updatedTag.id ? updatedTag : report,
      ),
    );
  };

  return (
    <div className={styles.page}>
      <FilterModal
        currentFilter={filter}
        setFilter={setAdvancedFilter}
        resetFilter={resetFilter}
        opened={opened}
        onClose={close}
      />

      <Group gap="xs">
        <TextInput
          placeholder={t('searchReason')}
          className={styles.searchInput}
          onChange={(e) => {
            const value = e.target.value;
            if (filter.reasonKeyword === '' && value === '') {
              return;
            }
            setInputValue(value);
          }}
        />
        <Button onClick={open} leftSection={<IconFilterEdit size={18} />}>
          {t('filters')}
        </Button>
      </Group>
      <Space h="md" />

      <div className={styles.tableContainer}>
        <ReportTable
          records={reports}
          pagination={pagination}
          isLoading={isLoading}
          selected={selectedReports}
          setSelected={handleSetSelected}
          setHide={setHide}
          setUnhide={setUnhide}
          setRecords={handleEditSuccess}
        />
      </div>
      <Space h="xs" />

      <SelectedRowActions
        selectedReports={selectedReports}
        onHideReports={() => handleToggleVisibility(hideReports)}
        onUnhideReports={() => handleToggleVisibility(unhideReports)}
      />
    </div>
  );
}

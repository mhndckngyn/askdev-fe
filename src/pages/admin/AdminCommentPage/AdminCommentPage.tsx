import { ApiResponse } from '@/types';
import { CommentAdminView } from '@/types/CommentAdminView';
import { Button, Group, Space } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconFilterEdit, IconX } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminCommentPage.module.css';
import CommentFilterModal from './partials/CommentFilterModal';
import CommentTable from './partials/CommentTable';
import SearchInputs from './partials/SearchInputs';
import SelectedRowActions from './partials/SelectedRowActions';
import { getComments, hideComments, unhideComments } from './services';

export type CommentFilter = {
  content?: string;
  parentId?: string;
  username?: string;
  hiddenOption?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 10;

export default function AdminCommentPage() {
  const { t } = useTranslation('adminCommentPage');

  const [filter, setFilter] = useState<CommentFilter>({});
  const [records, setRecords] = useState<CommentAdminView[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedRecords, setSelectedRecords] = useState<CommentAdminView[]>(
    [],
  );

  const [contentInput, setContentInput] = useState(''); // tim kiem theo noi dung comment
  const [parentIdInput, setParentIdInput] = useState(''); // tim kiem theo id cau hoi/cau tra loi

  const [opened, { open, close }] = useDisclosure(false); // filter modal
  const [isLoading, setLoading] = useState(false);
  const [render, setRender] = useState(0);

  useEffect(() => {
    setLoading(true);

    (async () => {
      const params = {
        ...filter,
        page,
        pageSize: PAGE_SIZE,
      };

      const response = await getComments(params);
      if (response.success) {
        setRecords(response.content.comments);
        setTotalRecords(response.content.pagination.total);
      } else {
        setRecords([]);
      }

      setLoading(false);
    })();
  }, [filter, page, render]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter({
        ...filter,
        content: contentInput,
        parentId: parentIdInput,
      });
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [contentInput, parentIdInput]);

  const setAdvancedFilter = (values: Partial<CommentFilter>) => {
    setFilter({ ...filter, ...values });
  };

  const resetFilter = () => {
    setFilter({
      parentId: filter.parentId,
      content: filter.content,
    });
  };

  const handleToggleVisibility = useCallback(
    async (service: (ids: string[]) => Promise<ApiResponse>, id?: string) => {
      const commentIds = id ? [id] : selectedRecords.map((a) => a.id);

      const response = await service(commentIds);
      if (response.success) {
        notifications.show({ message: t('toggle-visibility-success') });
        setRender((render) => render + 1); // dùng hàm updater thì không cần thêm render vào depList
      } else {
        notifications.show({
          message: t('toggle-visibility-error'),
          color: 'red',
          icon: <IconX />,
        });
      }
    },
    [selectedRecords, t],
  );

  const pagination = useMemo(
    () => ({
      pageSize: PAGE_SIZE,
      currentPage: page,
      totalRecords,
      setPage,
    }),
    [page, totalRecords, setPage],
  );

  const selection = useMemo(
    () => ({
      selected: selectedRecords,
      setSelected: setSelectedRecords,
    }),
    [selectedRecords, setSelectedRecords],
  );

  const visibility = useMemo(
    () => ({
      setHide: (id: string) => handleToggleVisibility(hideComments, id),
      setUnhide: (id: string) => handleToggleVisibility(unhideComments, id),
    }),
    [handleToggleVisibility],
  );

  return (
    <div className={styles.page}>
      <CommentFilterModal
        opened={opened}
        onClose={close}
        currentFilter={filter}
        setFilter={setAdvancedFilter}
        resetFilter={resetFilter}
      />

      <Group gap="sm">
        <SearchInputs
          content={{
            value: contentInput,
            set: setContentInput,
          }}
          parent={{
            value: parentIdInput,
            set: setParentIdInput,
          }}
        />

        <Button
          onClick={open}
          className={styles.filterBtn}
          leftSection={<IconFilterEdit className={styles.tableIcon} />}>
          {t('advanced-filters')}
        </Button>
      </Group>

      <Space h="md" />

      <div className={styles.tableContainer}>
        <CommentTable
          records={records}
          pagination={pagination}
          selection={selection}
          isLoading={isLoading}
          visibility={visibility}
        />
      </div>

      <Space h="xs" />
      <SelectedRowActions
        selectedRecords={selectedRecords}
        onHideComments={() => handleToggleVisibility(hideComments)}
        onUnhideComments={() => handleToggleVisibility(unhideComments)}
      />
    </div>
  );
}

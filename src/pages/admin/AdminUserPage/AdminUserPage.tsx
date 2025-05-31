import { UserAdminView } from '@/types/UserAdminView';
import { Button, Group, Space, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconFilterEdit } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminUserPage.module.css';
import UserFilterModal from './partials/UserFilter';
import UserTable from './partials/UserTable';
import BanLog from './partials/BanLog';
import { getUsers } from './services';

export type UserFilter = {
  usernameKeyword?: string;
  startDate?: Date;
  endDate?: Date;
  isBanned?: boolean;
  sortBy: 'username' | 'joinedOn' | 'contributions';
  sortMode: 'asc' | 'desc';
};

const initialFilter: UserFilter = {
  sortBy: 'username',
  sortMode: 'asc',
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 6;

export default function AdminUserPage() {
  const { t } = useTranslation('adminUserPage');

  const [filter, setFilter] = useState<UserFilter>(initialFilter);
  const [records, setRecords] = useState<UserAdminView[]>([]);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [inputValue, setInputValue] = useState(''); // giá trị tìm kiếm username

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

      const response = await getUsers(params);

      if (response.success) {
        setRecords(response.content.users);
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
        usernameKeyword: inputValue,
      });
    }, SEARCH_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  const setAdvancedFilter = (values: UserFilter) => {
    setFilter({ ...filter, ...values });
  };

  const resetFilter = () => {
    setFilter({
      ...initialFilter,
      usernameKeyword: filter.usernameKeyword,
    });
  };

  const pagination = useMemo(
    () => ({
      pageSize: PAGE_SIZE,
      currentPage: page,
      totalRecords,
      setPage,
    }),
    [page, totalRecords, setPage],
  );

  return (
    <div className={styles.page}>
      <UserFilterModal
        opened={opened}
        onClose={close}
        currentFilter={filter}
        setFilter={setAdvancedFilter}
        resetFilter={resetFilter}
      />

      <Group gap="sm">
        <TextInput
          placeholder={t('search-username')}
          onChange={(e) => setInputValue(e.target.value)}
          flex="1"
        />

        <Button
          onClick={open}
          className={styles.filterBtn}
          leftSection={<IconFilterEdit className={styles.tableIcon} />}>
          {t('advanced-filters')}
        </Button>

        <BanLog />
      </Group>

      <Space h="md" />

      <div className={styles.tableContainer}>
        <UserTable
          records={records}
          pagination={pagination}
          isLoading={isLoading}
          setRender={setRender}
        />
      </div>
    </div>
  );
}

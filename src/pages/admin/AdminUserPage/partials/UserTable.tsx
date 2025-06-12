import { UserAdminView } from '@/types/UserAdminView';
import { ActionIcon, Box, Group, Tooltip } from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconClipboard,
  IconMoodSad,
  IconUser,
  IconUserOff,
  IconX,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../AdminUserPage.module.css';
import { banUser, unbanUser } from '../services';
import BanUserDialog from './BanUserDialog';
import {
  renderBannedCell,
  renderContributionCell,
  renderReputationCell,
  renderRoleCell,
  renderUserCell,
} from './TableCellRender';
import formatDate from '@/utils/formatDate';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

type Props = {
  records: UserAdminView[];
  pagination: Pagination;
  isLoading: boolean;
  setRender: Dispatch<SetStateAction<number>>;
};

export type BanTarget = {
  username: string;
  userId: string;
  action: 'ban' | 'unban';
};

function UserTableComponent({
  records,
  pagination,
  isLoading,
  setRender,
}: Props) {
  const { t } = useTranslation('adminUserPage');
  const clipboard = useClipboard();

  const copy = (value: string) => {
    clipboard.copy(value);
  };

  const [banTarget, setBanTarget] = useState<BanTarget | null>(null);
  const [opened, { open, close }] = useDisclosure();

  const handleCloseBanDialog = () => {
    close();
    setBanTarget(null);
  };

  const handleBanConfirm = async (reason: string) => {
    if (!banTarget) {
      return;
    }

    const [action, message, error] =
      banTarget.action === 'ban'
        ? [banUser, t('ban-successful'), t('ban-failed')]
        : [unbanUser, t('unban-successful'), t('unban-failed')];
    const response = await action(banTarget.userId, reason);

    if (response.success) {
      setRender((cur) => cur + 1);
      notifications.show({ message });
    } else {
      notifications.show({ message: error, color: 'red', icon: <IconX /> });
    }
  };

  const handleSelectBanTarget = (
    userId: string,
    username: string,
    action: BanTarget['action'],
  ) => {
    setBanTarget({ userId, username, action });
    open();
  };

  const renderActionCell = (user: UserAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      {user.role !== 'ADMIN' && (
        <Tooltip label={user.isBanned ? t('unban-user') : t('ban-user')}>
          <ActionIcon
            onClick={() => {
              handleSelectBanTarget(
                user.id,
                user.username,
                user.isBanned ? 'unban' : 'ban',
              );
            }}
            size="sm"
            variant="subtle">
            {user.isBanned ? (
              <IconUser className={styles.tableIcon} color="lime" />
            ) : (
              <IconUserOff className={styles.tableIcon} color="red" />
            )}
          </ActionIcon>
        </Tooltip>
      )}
      <Tooltip label={t('copy-username')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => copy(user.username)}>
          <IconClipboard className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  const table = useMemo(
    () => (
      <DataTable
        records={records}
        /* phan trang */
        page={pagination.currentPage}
        onPageChange={pagination.setPage}
        totalRecords={pagination.totalRecords}
        recordsPerPage={pagination.pageSize}
        rowClassName={({ isBanned }) =>
          isBanned ? styles.bannedUser : undefined
        }
        columns={[
          {
            accessor: 'username',
            title: t('username'),
            textAlign: 'center',
            render: renderUserCell,
          },
          {
            accessor: 'role',
            title: t('role'),
            textAlign: 'center',
            width: 200,
            render: renderRoleCell,
          },
          {
            accessor: 'contribution',
            title: t('contribution'),
            textAlign: 'center',
            width: 180,
            render: renderContributionCell,
          },
          {
            accessor: 'reputation',
            title: t('reputation'),
            textAlign: 'center',
            width: 160,
            render: renderReputationCell,
          },
          {
            accessor: 'joinedOn',
            title: t('joined-on'),
            textAlign: 'center',
            width: 160,
            render: ({ joinedOn }) => formatDate(joinedOn),
          },
          {
            accessor: 'isBanned',
            title: t('is-active'),
            textAlign: 'center',
            width: 100,
            render: renderBannedCell,
          },
          {
            accessor: 'actions',
            title: t('actions'),
            textAlign: 'center',
            render: renderActionCell,
          },
        ]}
        /* set style */
        fetching={isLoading}
        verticalSpacing="md"
        withTableBorder
        withColumnBorders
        noRecordsText={t('no-results')}
        noRecordsIcon={
          <Box>
            <IconMoodSad size={36} strokeWidth={1.5} />
          </Box>
        }
      />
    ),
    [records, pagination, isLoading, t],
  );

  return (
    <>
      <BanUserDialog
        opened={opened}
        target={banTarget}
        onConfirm={handleBanConfirm}
        onClose={handleCloseBanDialog}
      />

      {table}
    </>
  );
}

const UserTable = React.memo(UserTableComponent);
export default UserTable;

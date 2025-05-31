import publicRoutePaths from '@/routes/user/public/paths';
import { UserAdminView } from '@/types/UserAdminView';
import formatDate from '@/utils/formatDate';
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconAlertTriangle,
  IconCheck,
  IconClipboard,
  IconMessage2Code,
  IconMessageCircle,
  IconMoodSad,
  IconQuestionMark,
  IconUser,
  IconUserOff,
  IconX,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../AdminUserPage.module.css';
import { banUser, unbanUser } from '../services';
import BanUserDialog from './BanUserDialog';

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
  setRender: () => void;
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

  useEffect(() => {
    if (banTarget) {
      open();
    }
  }, [banTarget]);

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
      setRender();
      notifications.show({ message });
    } else {
      notifications.show({ message: error, color: 'red', icon: <IconX /> });
    }
  };

  const renderUserCell = (user: UserAdminView) => (
    <Button
      component={Link}
      to={publicRoutePaths.profilePage.replace(':username', user.username)}
      size="lg"
      variant="subtle"
      w="100%">
      <Group gap="sm" justify="center" wrap="nowrap">
        <Avatar src={user.avatar} />
        <Text>{user.username}</Text>
      </Group>
    </Button>
  );

  const renderRoleCell = (user: UserAdminView) => {
    return (
      <Badge size="lg" color={user.role === 'ADMIN' ? 'orange' : 'blue'}>
        {user.role}
      </Badge>
    );
  };

  const renderContributionCell = (
    contribution: UserAdminView['contribution'],
  ) => {
    // Hàm xác định màu theo tổng đóng góp
    const getTotalColor = (total: number) => {
      if (total > 12) return 'var(--mantine-color-indigo-6)'; // cao
      if (total >= 6) return 'var(--mantine-color-orange-6)'; // trung bình
      return 'var(--mantine-color-red-6)'; // thấp
    };

    return (
      <Group justify="center" gap="lg">
        <Text size="28px" fw="bold" c={getTotalColor(contribution.total)}>
          {contribution.total}
        </Text>
        <Stack gap="xs">
          <Badge
            color="blue"
            size="md"
            variant="light"
            leftSection={<IconQuestionMark size={14} />}>
            {contribution.questions}
          </Badge>
          <Badge
            color="green"
            size="md"
            variant="light"
            leftSection={<IconMessage2Code size={14} />}>
            {contribution.answers}
          </Badge>
          <Badge
            color="gray"
            size="md"
            variant="light"
            leftSection={<IconMessageCircle size={14} />}>
            {contribution.comments}
          </Badge>
          <Badge
            color="red"
            size="md"
            variant="light"
            leftSection={<IconAlertTriangle size={14} />}>
            {contribution.reports}
          </Badge>
        </Stack>
      </Group>
    );
  };

  const renderReputationCell = (reputation: UserAdminView['reputation']) => {
    const getTotalColor = (total: number) => {
      if (total > 12) return 'var(--mantine-color-teal-6)';
      if (total >= 6) return 'var(--mantine-color-yellow-6)';
      return 'var(--mantine-color-red-6)';
    };

    return (
      <Group justify="center" gap="lg">
        <Text size="28px" fw="bold" c={getTotalColor(reputation.total)}>
          {reputation.total}
        </Text>
        <Stack gap="xs">
          <Badge
            color="blue"
            size="md"
            variant="light"
            leftSection={<IconQuestionMark size={14} />}>
            {reputation.questions}
          </Badge>
          <Badge
            color="green"
            size="md"
            variant="light"
            leftSection={<IconMessage2Code size={14} />}>
            {reputation.answers}
          </Badge>
          <Badge
            color="gray"
            size="md"
            variant="light"
            leftSection={<IconMessageCircle size={14} />}>
            {reputation.comments}
          </Badge>
        </Stack>
      </Group>
    );
  };

  const renderBannedCell = (user: UserAdminView) => {
    return (
      <ThemeIcon color={user.isBanned ? 'red' : 'green'} size="lg" radius="xl">
        {user.isBanned ? <IconX size={16} /> : <IconCheck size={16} />}
      </ThemeIcon>
    );
  };

  const renderActionCell = (user: UserAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip label={user.isBanned ? t('unban-user') : t('ban-user')}>
        <ActionIcon
          onClick={() => {
            setBanTarget({
              userId: user.id,
              username: user.username,
              ...(user.isBanned ? { action: 'unban' } : { action: 'ban' }),
            });
          }}
          size="sm"
          variant="light">
          {user.isBanned ? (
            <IconUser className={styles.tableIcon} />
          ) : (
            <IconUserOff className={styles.tableIcon} />
          )}
        </ActionIcon>
      </Tooltip>
      <Tooltip label={t('copy-username')}>
        <ActionIcon
          size="sm"
          variant="light"
          onClick={() => copy(user.username)}>
          <IconClipboard className={styles.tableIcon} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  return (
    <>
      <BanUserDialog
        opened={opened}
        target={banTarget}
        onConfirm={handleBanConfirm}
        onClose={handleCloseBanDialog}
      />

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
            render: ({ contribution }) => renderContributionCell(contribution),
          },
          {
            accessor: 'reputation',
            title: t('reputation'),
            textAlign: 'center',
            width: 160,
            render: ({ reputation }) => renderReputationCell(reputation),
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
    </>
  );
}

const UserTable = React.memo(UserTableComponent);
export default UserTable;

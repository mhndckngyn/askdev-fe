import visitorRoutePaths from '@/routes/user/visitor/paths';
import { useUserStore } from '@/stores/useUserStore';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconHistory,
  IconHome,
  IconKey,
  IconLogout,
  IconUser,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './UserMenu.module.css';
import memberRoutePaths from '@/routes/user/member/paths';
import publicRoutePaths from '@/routes/user/public/paths';
import adminRoutePaths from '@/routes/admin/paths';

export default function UserMenu({ bottom = false }: { bottom: boolean }) {
  const { t } = useTranslation('userMenu');
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  const location = useLocation();

  const [opened, setOpened] = useState(false); // dùng để animate icon mũi tên

  const isAdminRoute = location.pathname.startsWith('/admin');

  const handleLogout = () => {
    logout();
    navigate(visitorRoutePaths.welcome);
  };

  const ChevronIcon = bottom ? IconChevronUp : IconChevronDown;

  if (!user) {
    return <></>;
  }

  const userLinks = (
    <>
      <Menu.Item
        component={Link}
        to={publicRoutePaths.profilePage.replace(':username', user.username)}
        leftSection={<IconUser size={16} />}>
        {t('profile')}
      </Menu.Item>
      <Menu.Item
        component={Link}
        to={memberRoutePaths.historyPage}
        leftSection={<IconHistory size={16} />}>
        {t('history')}
      </Menu.Item>
      <Menu.Item
        component={Link}
        to={memberRoutePaths.changePassword}
        leftSection={<IconKey size={16} />}>
        {t('account-settings')}
      </Menu.Item>
    </>
  );

  const adminLinks = (
    <>
      {isAdminRoute ? (
        <>
          <Menu.Item
            component={Link}
            to={publicRoutePaths.homepage}
            leftSection={<IconHome size={16} />}>
            {t('homepage')}
          </Menu.Item>
        </>
      ) : (
        <Menu.Item
          component={Link}
          to={adminRoutePaths.dashboard}
          leftSection={<LayoutDashboard size={16} />}>
          {t('manage')}
        </Menu.Item>
      )}
      <Menu.Divider />
    </>
  );

  return (
    <Menu
      opened={opened}
      onChange={setOpened}
      shadow="md"
      width={220}
      position={bottom ? 'bottom' : 'top'}>
      <Menu.Target>
        <UnstyledButton className={styles.userMenuButton}>
          <Group gap="xs">
            <Avatar src={user.avatar} size="sm" />
            <ChevronIcon
              size={16}
              className={clsx(styles.chevron, opened && styles.chevronOpen)}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Group gap="xs" px="sm" py="xs">
          <Avatar src={user.avatar} size="sm" radius="xl" />
          <Text fw={500}>{user.username}</Text>
        </Group>

        <Menu.Divider />

        {userLinks}

        <Menu.Divider />

        {user.role === 'ADMIN' && adminLinks}

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}>
          {t('logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

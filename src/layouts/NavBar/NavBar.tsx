import { logo } from '@/assets/images';
import { useUserStore } from '@/stores/useUserStore';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Menu,
  Popover,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconLogout,
  IconSearch,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import LanguageSelector from './LanguageSelector';
import styles from './Navbar.module.css';
import ThemeSwitcher from './ThemeSwitcher';

const searchTips = [
  {
    label: '[tag]',
    description: 'search-tag',
  },
  {
    label: 'user:abc',
    description: 'search-user',
  },
  {
    label: 'answered:yes',
    description: 'search-question-status',
  },
  {
    label: '"keyword"',
    description: 'search-exact-phrase',
  },
];

export default function NavBar() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('navbar');

  const { user, logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const hideSearchBar = ['/welcome'].includes(location.pathname);
  const hideLogins = ['/welcome'].includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/welcome');
  };

  return (
    <>
      <div className={styles.navbar}>
        {/* Home button */}
        <Box>
          <Link to="/" className={styles.homeButton}>
            <Image hidden src={logo} h={32} w={32} />
            <Text visibleFrom="sm" size="xl" fw="bold">
              AskDev
            </Text>
          </Link>
        </Box>

        {/* Search bar with search tips */}
        <Center flex={1}>
          {!hideSearchBar && (
            <Popover width="target">
              <Popover.Target>
                <TextInput
                  placeholder={t('search-placeholder')}
                  leftSection={<IconSearch size={16} />}
                  radius="md"
                  className={styles.search}
                />
              </Popover.Target>

              <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                <Stack
                  align="stretch"
                  gap="xs"
                  className={styles.searchPopover}>
                  {searchTips.map(({ label, description }) => (
                    <Flex justify="space-between" key={label}>
                      <Text className={styles.helper}>{label}</Text>
                      <Text className={styles.helperDescription}>
                        {t(description)}
                      </Text>
                    </Flex>
                  ))}
                </Stack>
              </Popover.Dropdown>
            </Popover>
          )}
        </Center>

        <Flex align="center" justify="end" gap="sm">
          <ThemeSwitcher />
          <LanguageSelector />

          {/* Login and Signup */}
          {!hideLogins && !user && (
            <Fragment>
              <Button
                component={Link}
                to="/welcome?tab=login"
                variant="default">
                {tCommon('login')}
              </Button>
              <Button component={Link} to="/welcome?tab=signup">
                {tCommon('signup')}
              </Button>
            </Fragment>
          )}

          {user && (
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className={styles.userMenuButton}>
                  <Group gap="xs">
                    <Avatar src={user.avatar} size="sm" />
                    <IconChevronDown size={16} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Group gap="xs" px="sm" py="xs">
                  <Avatar src={user.avatar} size="sm" radius="xl" />
                  <Text fw={500}>{user.username}</Text>
                </Group>

                <Menu.Divider />

                <Menu.Item leftSection={<IconUser size={16} />}>
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={16} />}>
                  Account Settings
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                  color="red"
                  leftSection={<IconLogout size={16} />}
                  onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Flex>
      </div>
    </>
  );
}

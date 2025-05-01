import { logo } from '@/assets/images';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import UserMenu from '@/components/UserMenu';
import { useUserStore } from '@/stores/useUserStore';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Popover,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import styles from './Navbar.module.css';
import visitorRoutePaths from '@/routes/user/visitor/paths';

const descriptions = {
  tag: 'search-tag',
  user: 'search-user',
  answered: 'search-question-status',
  keyword: 'search-exact-phrase',
} as const;

type Description = (typeof descriptions)[keyof typeof descriptions];

const searchTips: { label: string; description: Description }[] = [
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

  const { user } = useUserStore();
  const location = useLocation();

  const hideSearchBar = ['/welcome'].includes(location.pathname);
  const hideLogins = ['/welcome'].includes(location.pathname);

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
                to={`${visitorRoutePaths.welcome}?tab=login`}
                variant="default">
                {tCommon('login')}
              </Button>
              <Button
                component={Link}
                to={`${visitorRoutePaths.welcome}?tab=signup`}>
                {tCommon('signup')}
              </Button>
            </Fragment>
          )}

          <UserMenu bottom={false} />
        </Flex>
      </div>
    </>
  );
}

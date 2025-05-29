import { logo } from '@/assets/images';
import LanguageSelector from '@/components/LanguageSelector';
import NotificationBell from '@/components/NotificationBell';
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
  Text,
  TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import styles from './Navbar.module.css';
import visitorRoutePaths from '@/routes/user/visitor/paths';
import { useState } from 'react';

export default function NavBar() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('navbar');

  const { user } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  const hideSearchBar = ['/welcome'].includes(location.pathname);
  const hideLogins = ['/welcome'].includes(location.pathname);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    const trimmed = searchValue.trim();
    if (trimmed) {
      navigate('/search', { state: { keyword: searchValue } });
    }
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
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </Popover.Target>
            </Popover>
          )}
        </Center>

        <Flex align="center" justify="end" gap="sm">
          {user && <NotificationBell />}
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

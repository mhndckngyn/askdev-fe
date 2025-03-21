import { logo } from "@/assets/images";
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
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import LanguageSelector from "./LanguageSelector";
import styles from "./Navbar.module.css";
import ThemeSwitcher from "./ThemeSwitcher";

const searchTips = [
  {
    label: "[tag]",
    description: "search-tag",
  },
  {
    label: "user:abc",
    description: "search-user",
  },
  {
    label: "answered:yes",
    description: "search-question-status",
  },
  {
    label: '"keyword"',
    description: "search-exact-phrase",
  },
];

export default function NavBar() {
  const { t } = useTranslation();

  const location = useLocation();

  const hideSearchBar = ["/welcome"].includes(location.pathname);
  const hideLogins = ["/welcome"].includes(location.pathname);

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
                  placeholder={t("search-placeholder")}
                  leftSection={<IconSearch size={16} />}
                  radius="md"
                  className={styles.search}
                />
              </Popover.Target>

              <Popover.Dropdown style={{ pointerEvents: "none" }}>
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
          {!hideLogins && (
            <Fragment>
              <Button
                component={Link}
                to="/welcome?tab=login"
                variant="default">
                {t("login")}
              </Button>
              <Button component={Link} to="/welcome?tab=signup">
                {t("signup")}
              </Button>
            </Fragment>
          )}
        </Flex>
      </div>
    </>
  );
}

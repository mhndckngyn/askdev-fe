import {
  Anchor,
  Box,
  Flex,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import styles from './Footer.module.css';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const { colorScheme } = useMantineColorScheme();
  const footerClassName =
    colorScheme === 'dark' ? styles.footerDark : styles.footer;

  return (
    <Box component="footer" py="md" className={footerClassName}>
      <Flex justify="space-between" align="center" wrap="wrap">
        <Stack gap="0">
          <Text size="lg" fw={600}>
            AskDev
          </Text>
          <Text size="sm" c="dimmed">
            {t('dev-community')}
          </Text>
        </Stack>

        <Flex gap="md">
          <Anchor href="https://github.com" target="_blank">
            <IconBrandGithub size={20} />
          </Anchor>
          <Anchor href="https://twitter.com" target="_blank">
            <IconBrandTwitter size={20} />
          </Anchor>
        </Flex>

        <Text size="sm" c="dimmed">
          contact@askdev.com
        </Text>
      </Flex>
    </Box>
  );
}

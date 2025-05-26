import {
  Anchor,
  Box,
  Flex,
  Stack,
  Text
} from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

export default function Footer() {
  const { t } = useTranslation('common');

  return (
    <Box component="footer" py="md" className={styles.footer}>
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

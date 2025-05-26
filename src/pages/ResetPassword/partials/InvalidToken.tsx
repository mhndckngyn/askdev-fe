import {
  Button,
  Center,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useNavigationType } from 'react-router-dom';
import styles from '../ResetPassword.module.css';
import publicRoutePaths from '@/routes/user/public/paths';

export default function InvalidToken() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('resetPassword');

  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const handleGoBack = () => {
    if (navigationType === 'POP') {
      navigate(publicRoutePaths.homepage);
    } else {
      navigate(-1);
    }
  };

  return (
    <Center className={styles.invalidTokenError} p="xl" style={{ minHeight: '70vh' }}>
      <Stack align="center" gap="xl">
        <Group>
          <Stack align="center" gap={0}>
            <IconAlertTriangle size={48} color="orange" />
            <Title order={1} style={{ fontSize: '3.5rem' }}>
              400
            </Title>
          </Stack>

          <Divider mx="sm" />

          <Stack gap="sm">
            <Title order={3}>{t('token-invalid-title')}</Title>
            <Text size="sm" c="dimmed" maw={400}>
              {t('token-invalid-description')}
            </Text>
            <Button onClick={handleGoBack}>{tCommon('go-back.label')}</Button>
          </Stack>
        </Group>
      </Stack>
    </Center>
  );
}

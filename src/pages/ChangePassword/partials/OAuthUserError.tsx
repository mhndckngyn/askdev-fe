import publicRoutePaths from '@/routes/user/public/paths';
import { Button, Center, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useNavigationType } from 'react-router-dom';
import styles from '../ChangePassword.module.css';

export default function OAuthUserError() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('changePassword');

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
    <Center className={styles.oauthError} p="xl" style={{ minHeight: '70vh' }}>
      <Stack align="center" gap="xl">
        <Group>
          <Stack align="center" gap={0}>
            <IconAlertTriangle size={48} color="orange" />
            <Title order={1} style={{ fontSize: '3.5rem' }}>
              400
            </Title>
          </Stack>

          <Divider mx='sm'/>

          <Stack gap="sm">
            <Title order={3}>
              {t('oauth-user-error-title')}
            </Title>
            <Text size="sm" c="dimmed" maw={400}>
              {t('oauth-user-error')}
            </Text>
            <Button onClick={handleGoBack}>
              {tCommon('go-back.label')}
            </Button>
          </Stack>
        </Group>
      </Stack>
    </Center>
  );
}

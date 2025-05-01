import publicRoutePaths from '@/routes/user/public/paths';
import { Button, Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AccountSuspended() {
  const { t } = useTranslation('statics');

  return (
    <Container size="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <Title>{t('suspended.banned-title')}</Title>

      <Text size="sm" c="dimmed" mt="sm">
        {t('suspended.banned-description-1')}
      </Text>

      <Text size="sm" c="dimmed" mt="sm">
        {t('suspended.banned-description-2')}
      </Text>

      <Button
        component={Link}
        to={publicRoutePaths.homepage}
        variant="filled"
        mt="lg">
        {t('go-home')}
      </Button>
    </Container>
  );
}

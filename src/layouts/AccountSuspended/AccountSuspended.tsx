import { Button, Container, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AccountSuspended() {
  const { t } = useTranslation();

  return (
    <Container size="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <Title>{t('error.banned-title')}</Title>

      <Text size="sm" c="dimmed" mt="sm">
        {t('error.banned-description-1')}
      </Text>

      <Text size="sm" c="dimmed" mt="sm">
        {t('error.banned-description-2')}
      </Text>

      <Button component={Link} to="/" variant="filled" mt="lg">
        {t('go-home')}
      </Button>
    </Container>
  );
}

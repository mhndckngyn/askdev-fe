import { Button, Container, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('statics');

  return (
    <Container size="sm" style={{ textAlign: 'center', marginTop: '10vh' }}>
      <Title order={1} size={50}>
        404
      </Title>

      <Text size="lg" c="dimmed" mt="sm">
        {t('not-found.page-not-found')}
      </Text>

      <Button component={Link} to="/" variant="filled" mt="lg">
        {t('go-home')}
      </Button>
    </Container>
  );
}

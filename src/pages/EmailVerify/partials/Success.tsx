import { Button, Text, Title } from '@mantine/core';
import { IconProgressCheck } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../EmailVerify.module.css';
import visitorRoutePaths from '@/routes/user/visitor/paths';

export default function Success() {
  const { t } = useTranslation('emailVerify');

  return (
    <div>
      <IconProgressCheck className={clsx(styles.icon, styles.iconSuccess)} />
      <Title size="h2">{t('title-success')}</Title>
      <Text size="sm" c="dimmed" mt="sm">
        {t('subtitle-success')}
      </Text>
      <Button component={Link} to={visitorRoutePaths.welcome} variant="filled" mt="lg">
        {t('loginButton')}
      </Button>
    </div>
  );
}

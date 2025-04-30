import { Button, Text, Title } from '@mantine/core';
import { IconTimeDurationOff } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../EmailVerify.module.css';
import visitorRoutePaths from '@/routes/user/visitor/paths';

type ExpiredProps = {
  email: string;
  onResend: () => Promise<void>;
  isResending: boolean;
};

export default function Expired({
  email,
  onResend,
  isResending,
}: ExpiredProps) {
  const { t } = useTranslation('emailVerify');

  return (
    <div>
      <IconTimeDurationOff className={clsx(styles.icon, styles.iconExpired)} />
      <Title size="h2">{t('title-expired')}</Title>

      {email ? (
        <>
          <Text size="sm" c="dimmed" mt="sm">
            {t('subtitle-expired')}
          </Text>
          <Button mt="lg" onClick={onResend} loading={isResending}>
            {t('resendButton')}
          </Button>
        </>
      ) : (
        <>
          <Text size="sm" c="dimmed" mt="sm">
            {t('subtitle-expired-no-email')}
          </Text>
          <Button component={Link} to={visitorRoutePaths.welcome} mt="lg">
            {t('toHomepage')}
          </Button>
        </>
      )}
    </div>
  );
}

import { Text, Title } from '@mantine/core';
import { IconFaceIdError } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from '../EmailVerify.module.css';

export default function Invalid() {
  const { t } = useTranslation('emailVerify');

  return (
    <div>
      <IconFaceIdError className={clsx(styles.icon, styles.iconInvalid)} />
      <Title size="h2">{t('title-invalid')}</Title>
      <Text size="sm" c="dimmed" mt="sm">
        {t('subtitle-invalid')}
      </Text>
    </div>
  );
}

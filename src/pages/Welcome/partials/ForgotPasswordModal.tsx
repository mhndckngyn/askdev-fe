import { Button, Group, Modal, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconExclamationCircle,
  IconMailCheck,
  IconUserQuestion,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Welcome.module.css';
import { submitPasswordResetRequest } from '../services';

type Props = {
  opened: boolean;
  close: () => void;
};

type ModalStatus = 'FORM' | 'SUCCESS' | 'FAILED' | 'NOT_FOUND';

export default function ForgotPasswordModal({ opened, close }: Props) {
  const { t } = useTranslation('resetPassword');

  const [isSubmitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<ModalStatus>('FORM');

  const form = useForm({
    initialValues: {
      email: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setSubmitting(true);
    const response = await submitPasswordResetRequest(values.email);
    if (response.success) {
      setStatus('SUCCESS');
    } else {
      if (response.statusCode === 404) {
        setStatus('NOT_FOUND');
      } else {
        setStatus('FAILED');
      }
    }
    setSubmitting(false);
  };

  const closeForm = () => {
    close();
    form.reset();
    setStatus('FORM');
    setSubmitting(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={closeForm}
      title={<Title size="h4">{t('title')}</Title>}>
      {status === 'SUCCESS' ? (
        <div className={styles.resetPasswordSendContainer}>
          <IconMailCheck size="40" className={styles.resetPasswordIconSent} />
          <div>
            <Text>{t('password-reset-send-title')}</Text>
            <Text size="sm" c="dimmed">
              {t('password-reset-send-description')}
            </Text>
          </div>
        </div>
      ) : (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {status === 'FAILED' && (
            <div className={styles.errorResetPasswordContainer}>
              <IconExclamationCircle
                size="28"
                className={styles.errorResetPasswordIcon}
              />
              <Text size="sm" className={styles.errorResetPasswordText}>
                {t('password-reset-send-failed')}
              </Text>
            </div>
          )}
          {status === 'NOT_FOUND' && (
            <div className={styles.errorResetPasswordContainer}>
              <IconUserQuestion
                size="36"
                className={styles.errorResetPasswordIcon}
              />
              <Text size="sm" className={styles.errorResetPasswordText}>
                {t('password-reset-email-not-found')}
              </Text>
            </div>
          )}
          <TextInput
            required
            type="email"
            {...form.getInputProps('email')}
            label={t('fill-email')}
            description={t('oauth-not-supported')}
          />
          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={isSubmitting}>
              {t('continue')}
            </Button>
          </Group>
        </form>
      )}
    </Modal>
  );
}

import PageLoader from '@/components/PageLoader';
import PasswordStrengthInput, {
  getPasswordStrengthError,
} from '@/components/PasswordStrengthInput';
import { Button, Container, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getConfirmPasswordError, getCurrentPasswordError } from './schemas';

export default function ChangePassword() {
  const { t } = useTranslation('changePassword');
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: getCurrentPasswordError,
      newPassword: getPasswordStrengthError,
      confirmPassword: (value, values) =>
        getConfirmPasswordError(value, values.newPassword),
    },
  });

  const handleSubmitForm = (values: typeof form.values) => {
    console.log(values);
    setSubmitting(true);
  };

  const onNewPasswordChange = (value: string) => {
    form.setFieldValue('newPassword', value);
  };

  if (isSubmitting) return <PageLoader />;

  return (
    <Container size="xs" my={40}>
      <Stack>
        <Title size="h2">{t('change-password')}</Title>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <Stack>
            {/* Current Password */}
            <PasswordInput
              label={t('current-password')}
              placeholder={t('enter-current-password')}
              {...form.getInputProps('currentPassword')}
              required
            />

            <PasswordStrengthInput
              value={form.values.newPassword}
              onChange={onNewPasswordChange}
              error={form.errors.password}
              label={t('new-password')}
              placeholder={t('enter-new-password')}
            />

            {/* Confirm New Password */}
            <PasswordInput
              label={t('confirm-new-password')}
              placeholder={t('confirm-new-password')}
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Button type="submit" mt="sm">
              {t('change-password')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

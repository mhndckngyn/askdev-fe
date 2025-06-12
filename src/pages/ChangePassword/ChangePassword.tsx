import GoBack from '@/components/GoBack';
import PageLoader from '@/components/PageLoader';
import PasswordStrengthInput, {
  getPasswordStrengthError,
} from '@/components/PasswordStrengthInput';
import publicRoutePaths from '@/routes/user/public/paths';
import { useActionStore } from '@/stores/useActionModalStore';
import { useErrorStore } from '@/stores/useErrorStore';
import { useUserStore } from '@/stores/useUserStore';
import { Button, Group, Image, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';
import OAuthUserError from './partials/OAuthUserError';
import {
  getConfirmPasswordError,
  getCurrentAndNewPasswordError,
  getCurrentPasswordError,
} from './schemas';
import { changePassword, checkOAuth } from './services';
import { passwordLogo } from '@/assets/images';

export default function ChangePassword() {
  const { t } = useTranslation('changePassword');
  const { t: tApi } = useTranslation('api');
  const { t: tCommon } = useTranslation('common');
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const setAction = useActionStore((state) => state.setAction);
  const setError = useErrorStore((state) => state.setError);

  const [isFetching, setFetching] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isOAuth, setIsOAuth] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: getCurrentPasswordError,
      newPassword: (value, values) => {
        return (
          getCurrentAndNewPasswordError(value, values.currentPassword) ||
          getPasswordStrengthError(value)
        );
      },
      confirmPassword: (value, values) =>
        getConfirmPasswordError(value, values.newPassword),
    },
  });

  useEffect(() => {
    if (!user) {
      navigate(-1);
      return;
    }

    (async () => {
      const response = await checkOAuth(user.id);
      if (response.success) {
        setIsOAuth(response.content.isOAuth);
      } else {
      }
      setFetching(false);
    })();
  }, []);

  const handleSubmitForm = async (values: typeof form.values) => {
    setSubmitting(true);
    const payload = {
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    };
    const response = await changePassword(user?.id!, payload); // neu user === null thi da thoat tu truoc
    if (response.success) {
      setAction(t('password-change-successful'), tCommon('go-home'), () =>
        navigate(publicRoutePaths.homepage),
      );
      form.reset();
    } else {
      setError(
        tApi(
          response?.message ?? 'common.something-went-wrong',
          'common.something-went-wrong',
        ),
      );
    }
    setSubmitting(false);
  };

  const onNewPasswordChange = (value: string) => {
    form.setFieldValue('newPassword', value);
  };

  if (isFetching) return <PageLoader />;
  if (isOAuth) return <OAuthUserError />;

  return (
    <Group>
      <Stack className={styles.stack}>
        <Title size="h2">{t('change-password')}</Title>
        <GoBack />
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <Stack>
            {/* Current Password */}
            <PasswordInput
              label={t('current-password')}
              placeholder={t('enter-current-password')}
              error={form.errors.currentPassword}
              {...form.getInputProps('currentPassword')}
              required
            />

            <PasswordStrengthInput
              value={form.values.newPassword}
              onChange={onNewPasswordChange}
              error={form.errors.newPassword}
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
            <Button type="submit" mt="sm" loading={isSubmitting}>
              {t('change-password')}
            </Button>
          </Stack>
        </form>
      </Stack>
      <Image src={passwordLogo} w='500'/>
    </Group>
  );
}

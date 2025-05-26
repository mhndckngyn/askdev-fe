import PageLoader from '@/components/PageLoader';
import PasswordStrengthInput, {
  getPasswordStrengthError,
} from '@/components/PasswordStrengthInput';
import visitorRoutePaths from '@/routes/user/visitor/paths';
import { useActionStore } from '@/stores/useActionModalStore';
import { Button, Center, PasswordInput, Stack, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getConfirmPasswordError } from '../ChangePassword/schemas';
import InvalidToken from './partials/InvalidToken';
import styles from './ResetPassword.module.css';
import { resetPassword, verifyToken } from './services';
import { useErrorStore } from '@/stores/useErrorStore';

type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

type PageStatus = 'LOADING' | 'VALID' | 'INVALID';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const setAction = useActionStore((state) => state.setAction);
  const setError = useErrorStore(state => state.setError);

  const { t } = useTranslation('resetPassword');
  const { t: tCp } = useTranslation('changePassword');
  const { t: tApi } = useTranslation('api');

  const [status, setStatus] = useState<PageStatus>('LOADING');
  const [isSubmitting, setSubmitting] = useState(false);
  const tokenRef = useRef<string | null>(null);

  const form = useForm<ResetPasswordForm>({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      newPassword: getPasswordStrengthError,
      confirmPassword: (value, values) =>
        getConfirmPasswordError(value, values.newPassword),
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('INVALID');
      return;
    }

    tokenRef.current = token;

    (async () => {
      const response = await verifyToken(token);
      if (response.success) {
        setStatus('VALID');
      } else {
        setStatus('INVALID');
      }
    })();
  }, []);

  const onNewPasswordChange = (value: string) => {
    form.setFieldValue('newPassword', value);
  };

  const handleSubmitForm = async (values: ResetPasswordForm) => {
    setSubmitting(true);
    const response = await resetPassword(tokenRef.current!, values.newPassword); // ref đã được set từ useEffect
    if (response.success) {
      setAction(t('password-reset-successful'), t('go-to-login'), () =>
        navigate(visitorRoutePaths.welcome),
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

  if (status === 'LOADING') return <PageLoader />;
  if (status === 'INVALID') return <InvalidToken />;

  return (
    <Center>
      <Stack className={styles.stack}>
        <Title size="h2" className={styles.title}>
          {t('title')}
        </Title>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <Stack>
            <PasswordStrengthInput
              value={form.values.newPassword}
              onChange={onNewPasswordChange}
              error={form.errors.newPassword}
              label={tCp('new-password')}
              placeholder={tCp('enter-new-password')}
            />
            <PasswordInput
              label={tCp('confirm-new-password')}
              placeholder={tCp('confirm-new-password')}
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Button type="submit" mt="sm" loading={isSubmitting}>
              {tCp('change-password')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
}

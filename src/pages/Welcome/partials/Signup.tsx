import PasswordStrengthInput, {
  getPasswordStrengthError,
} from '@/components/PasswordStrengthInput';
import { useActionStore } from '@/stores/useActionModalStore';
import { useErrorStore } from '@/stores/useErrorStore';
import {
  Button,
  Divider,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../Welcome.module.css';
import {
  getConfirmPasswordError,
  getEmailLoginError,
  getUsernameLoginError,
} from '../schemas';
import { submitSignupForm } from '../services';
import { SignupFormValues, SignupPayload } from '../types';
import { ApiResponse } from '@/types';

export default function Signup() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('welcome');
  const { t: tApi } = useTranslation('api');

  const setError = useErrorStore((state) => state.setError);
  const setAction = useActionStore((state) => state.setAction);

  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<SignupFormValues>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: getEmailLoginError,
      username: getUsernameLoginError,
      password: getPasswordStrengthError,
      confirmPassword: (value, values) =>
        getConfirmPasswordError(value, values.password),
    },
  });

  const onPasswordChange = (value: string) => {
    form.setFieldValue('password', value);
  };

  const handleSubmit = async (values: SignupFormValues) => {
    setSubmitting(true);

    const payload: SignupPayload = {
      email: values.email,
      username: values.username,
      password: values.password,
    };

    const response: ApiResponse = await submitSignupForm(payload);

    if (response.success) {
      form.reset();
      setAction(tApi('user.signup-check-email'), tCommon('ok'));
    } else {
      setError(tApi(response.error) || tApi('user.signup-error'));
    }

    setSubmitting(false);
  };

  return (
    <Stack>
      <Title size="h2" className={styles.welcomeMessage}>
        {t('join-community')}
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder={t('enter-email')}
            {...form.getInputProps('email')}
            required
          />

          <TextInput
            label={t('username')}
            placeholder={t('choose-username')}
            {...form.getInputProps('username')}
            required
          />

          <PasswordStrengthInput
            value={form.values.password}
            onChange={onPasswordChange}
            error={form.errors.password}
            label={t('password')}
            placeholder={t('enter-password')}
          />

          <PasswordInput
            label={t('confirm-password')}
            placeholder={t('confirm-password')}
            {...form.getInputProps('confirmPassword')}
            required
          />

          <Button fullWidth type="submit" mt="sm" loading={isSubmitting}>
            {tCommon('signup')}
          </Button>

          <Divider label={t('continue-with')} labelPosition="center" />

          {/* Social Login */}
          <Group grow>
            <Button
              component="a"
              href="http://localhost:3000/auth/google"
              leftSection={<IconBrandGoogleFilled size={16} />}
              variant="default">
              Google
            </Button>
            <Button
              component="a"
              href="http://localhost:3000/auth/github"
              leftSection={<IconBrandGithubFilled size={16} />}
              variant="default">
              GitHub
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}

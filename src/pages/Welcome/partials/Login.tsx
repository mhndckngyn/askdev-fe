import { useErrorStore } from '@/stores/useErrorStore';
import { useUserStore } from '@/stores/useUserStore';
import {
  Anchor,
  Button,
  Divider,
  Flex,
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
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Welcome.module.css';
import { getEmailLoginError } from '../schemas';
import { submitLoginForm } from '../services';
import { LoginFormValues } from '../types';

export default function Login() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('welcome');
  const { t: tApi } = useTranslation('api');

  const fetchUser = useUserStore((state) => state.fetchUser);
  const setError = useErrorStore((state) => state.setError);

  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: getEmailLoginError,
    },
  });

  const handleSubmit = async (payload: LoginFormValues) => {
    setSubmitting(true);

    const response = await submitLoginForm(payload);

    if (response.success) {
      fetchUser();
      navigate('/', {
        replace: true,
      });
    } else {
      setError(tApi(response.error) || tApi('auth.login-error'));
    }

    setSubmitting(false);
  };

  return (
    <Stack>
      <Title size="h2" className={styles.welcomeMessage}>
        {t('welcome-back')}
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder={t('enter-email')}
            {...form.getInputProps('email')}
            required
          />

          <PasswordInput
            label={t('password')}
            placeholder={t('enter-password')}
            {...form.getInputProps('password')}
            required
          />
          <Flex justify="flex-end">
            <Anchor component={Link} to="/password-reset" size="sm">
              {t('forgot-password')}
            </Anchor>
          </Flex>

          <Button fullWidth type="submit" loading={isSubmitting}>
            {tCommon('login')}
          </Button>

          <Divider label={t('continue-with')} labelPosition="center" />
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

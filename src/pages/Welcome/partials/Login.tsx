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
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getEmailLoginError } from '../schemas';
import { submitLoginForm } from '../services';
import { LoginFormValues } from '../types';
import ForgotPasswordModal from './ForgotPasswordModal';
import visitorRoutePaths from '@/routes/user/visitor/paths';

export default function Login() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('welcome');
  const { t: tApi } = useTranslation('api');

  const fetchUser = useUserStore((state) => state.fetchUser);
  const setError = useErrorStore((state) => state.setError);

  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);

  const [opened, { open, close }] = useDisclosure();

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
      const message = response.message;
      switch (message) {
        case 'auth.account-banned':
          navigate(visitorRoutePaths.accountSuspended);
          break;
        case 'auth.incorrect-login-data':
          setError(tApi(message));
          break;
        default:
          setError(t('login-error'));
      }
    }

    setSubmitting(false);
  };

  return (
    <>
      <ForgotPasswordModal opened={opened} close={close} />
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
          <Button fullWidth type="submit" loading={isSubmitting}>
            {tCommon('login')}
          </Button>
          <Flex justify="flex-end">
            <Anchor component="button" onClick={open} size="sm">
              {t('forgot-password')}
            </Anchor>
          </Flex>
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
    </>
  );
}

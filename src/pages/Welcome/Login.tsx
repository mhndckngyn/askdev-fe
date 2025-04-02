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
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css';

export default function Login() {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : t('invalid-email'),
    },
  });

  return (
    <Stack>
      <Title size="h2" className={styles.welcomeMessage}>
        {t('welcome-back')}
      </Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

          <Button fullWidth type="submit">
            {t('login')}
          </Button>

          <Divider label={t('continue-with')} labelPosition="center" />
          <Group grow>
            <Button
              leftSection={<IconBrandGoogleFilled size={16} />}
              variant="default">
              Google
            </Button>
            <Button
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

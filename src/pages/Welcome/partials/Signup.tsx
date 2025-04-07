import PasswordStrengthInput, {
  getPasswordStrengthError,
} from '@/components/PasswordStrengthInput';
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
import { useTranslation } from 'react-i18next';
import styles from '../Welcome.module.css';
import {
  getConfirmPasswordError,
  getEmailLoginError,
  getUsernameLoginError,
} from '../schemas';

export default function Signup() {
  const { t: tCommon } = useTranslation('common');
  const { t } = useTranslation('welcome');

  const form = useForm({
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

  return (
    <Stack>
      <Title size="h2" className={styles.welcomeMessage}>
        {t('join-community')}
      </Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

          <Button fullWidth type="submit" mt="sm">
            {tCommon('signup')}
          </Button>

          <Divider label={t('continue-with')} labelPosition="center" />

          {/* Social Login */}
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

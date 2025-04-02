import {
  Box,
  Button,
  Divider,
  Group,
  PasswordInput,
  Popover,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Welcome.module.css';

const passwordChecks = [
  { label: 'password-lowercase', re: '[a-z]' },
  { label: 'password-uppercase', re: '[A-Z]' },
  { label: 'password-number-symbol', re: "[0-9]|[$&+,:;=?@#|'<>.^*()%!-]" },
  { label: 'password-length', re: '.{8,}' },
];

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? 'teal' : 'red'}
      style={{ display: 'flex', alignItems: 'center' }}
      size="sm">
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}
      <Box ml="xs">{label}</Box>
    </Text>
  );
}

function getStrength(password: string) {
  let multiplier = 0;
  passwordChecks.forEach((rule) => {
    if (!new RegExp(rule.re).test(password)) multiplier += 1;
  });
  return Math.max(100 - (100 / (passwordChecks.length + 1)) * multiplier, 10);
}

export default function Signup() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [popoverOpened, setPopoverOpened] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : t('invalid-email'),
      username: (value) => (value.length >= 5 ? null : t('username-length')),
      password: (value) =>
        passwordChecks.every((rule) => new RegExp(rule.re).test(value))
          ? null
          : t('invalid-password'),
      confirmPassword: (value, values) =>
        value === values.password ? null : t('password-mismatch'),
    },
  });

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

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

          {/* Password Input with Strength Checker */}
          <Popover opened={popoverOpened} position="bottom" width="target">
            <Popover.Target>
              <div
                onFocusCapture={() => setPopoverOpened(true)}
                onBlurCapture={() => setPopoverOpened(false)}>
                <PasswordInput
                  label={t('password')}
                  placeholder={t('enter-password')}
                  {...form.getInputProps('password')}
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                />
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <Progress color={color} value={strength} size={5} mb="xs" />
              <SimpleGrid cols={2} verticalSpacing="xs">
                {passwordChecks.map((check) => (
                  <PasswordRequirement
                    key={check.label}
                    label={t(check.label)}
                    meets={new RegExp(check.re).test(password)}
                  />
                ))}
              </SimpleGrid>
            </Popover.Dropdown>
          </Popover>

          <PasswordInput
            label={t('confirm-password')}
            placeholder={t('confirm-password')}
            {...form.getInputProps('confirmPassword')}
            required
          />

          <Button fullWidth type="submit" mt="sm">
            {t('signup')}
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

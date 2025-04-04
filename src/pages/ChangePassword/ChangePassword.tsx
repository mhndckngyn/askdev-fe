import PageLoader from '@/components/PageLoader';
import {
  Box,
  Button,
  Container,
  PasswordInput,
  Popover,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ChangePassword.module.css';

const passwordChecks = [
  { label: 'password-lowercase', re: '[a-z]' },
  { label: 'password-uppercase', re: '[A-Z]' },
  {
    label: 'password-number-symbol',
    re: "[0-9]|[$&+,:;=?@#|'<>.^*()%!-]",
  },
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

export default function ChangePassword() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: (value) =>
        value.length > 0 ? null : t('changePassword.current-password-required'),
      newPassword: (value) =>
        passwordChecks.every((rule) => new RegExp(rule.re).test(value))
          ? null
          : t('changePassword.invalid-password'),
      confirmPassword: (value, values) =>
        value === values.newPassword
          ? null
          : t('changePassword.password-mismatch'),
    },
  });

  const handleSubmitForm = (values) => {
    console.log(values);
    setSubmitting(true);
  };

  const strength = getStrength(password);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  if (isSubmitting) return <PageLoader />;

  return (
    <Container size="xs" my={40}>
      <Stack>
        <Title size="h2">{t('changePassword.change-password')}</Title>
        <form onSubmit={form.onSubmit(handleSubmitForm)}>
          <Stack>
            {/* Current Password */}
            <PasswordInput
              label={t('changePassword.current-password')}
              placeholder={t('changePassword.enter-current-password')}
              {...form.getInputProps('currentPassword')}
              required
            />
            {/* New Password with Strength Checker */}
            <Popover opened={popoverOpened} position="bottom" width="target">
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}>
                  <PasswordInput
                    label={t('changePassword.new-password')}
                    placeholder={t('changePassword.enter-new-password')}
                    {...form.getInputProps('newPassword')}
                    required
                    value={password}
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                      form.setFieldValue(
                        'newPassword',
                        event.currentTarget.value,
                      );
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
            {/* Confirm New Password */}
            <PasswordInput
              label={t('changePassword.confirm-new-password')}
              placeholder={t('changePassword.confirm-new-password')}
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Button type="submit" mt="sm">
              {t('changePassword.change-password')}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}

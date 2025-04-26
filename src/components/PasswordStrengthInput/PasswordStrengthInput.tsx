import {
  Box,
  PasswordInput,
  Popover,
  Progress,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { getStrength, passwordChecks } from './schemas';
import { ReactNode } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: ReactNode; // For error message on inputs, Mantine requires any react node or string (but only string will be used here)
  label: string;
  placeholder: string;
};

export default function PasswordStrengthInput({
  value,
  onChange,
  error,
  label,
  placeholder,
}: Props) {
  const { t } = useTranslation('passwordStrengthInput');
  const [opened, { open, close }] = useDisclosure();
  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';

  return (
    <Popover opened={opened} position="bottom" width="target">
      <Popover.Target>
        <div onFocusCapture={open} onBlurCapture={close}>
          <PasswordInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
            error={error}
          />
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <SimpleGrid cols={2} spacing="xs">
          {passwordChecks.map((check, index) => (
            <PasswordRequirement
              key={index}
              label={t(check.label)}
              meets={new RegExp(check.re).test(value)}
            />
          ))}
        </SimpleGrid>
      </Popover.Dropdown>
    </Popover>
  );
}

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

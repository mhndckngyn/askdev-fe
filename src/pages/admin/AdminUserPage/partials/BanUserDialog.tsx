import { Button, Group, Modal, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BanTarget } from './UserTable';

interface BanUserDialogProps {
  target: BanTarget | null;
  opened: boolean;
  onConfirm: (reason: string) => void;
  onClose: () => void;
}

export default function BanUserDialog({
  target,
  opened,
  onConfirm,
  onClose,
}: BanUserDialogProps) {
  const { t } = useTranslation('adminUserPage');
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!target) {
      return;
    }

    setReason('');
    onConfirm(reason);
    onClose();
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  if (!target) return;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text fw="bold" size="lg">
          {target.action === 'ban'
            ? t('banUserDialog.title-ban')
            : t('banUserDialog.title-unban')}
          {` ${target.username}`}
        </Text>
      }
      centered>
      <TextInput
        label={t('banUserDialog.reasonLabel')}
        value={reason}
        onChange={(event) => setReason(event.currentTarget.value)}
        data-autofocus
        styles={{ label: { marginBottom: 6 } }}
      />
      <Group mt="md" gap="sm" justify="flex-end">
        <Button variant="subtle" color="dark" onClick={handleClose}>
          {t('banUserDialog.cancel')}
        </Button>
        <Button
          onClick={handleConfirm}
          color={target.action === 'ban' ? 'red' : 'blue'}>
          {t('banUserDialog.ok')}
        </Button>
      </Group>
    </Modal>
  );
}

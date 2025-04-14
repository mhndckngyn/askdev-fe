import { useErrorStore } from '@/stores/useErrorStore';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconCircleX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorModal.module.css';

export default function ErrorModal() {
  const { t } = useTranslation('common');
  const { message, opened, clearError } = useErrorStore();

  return (
    <Modal
      opened={opened}
      onClose={clearError}
      centered
      withCloseButton={false}
      padding="lg"
      radius="md">
      <Stack gap="md">
        <Group align="flex-start">
          <IconCircleX className={styles.icon} />
          <Text className={styles.message}>{message}</Text>
        </Group>
        
        <Group justify="flex-end">
          <Button variant="light" onClick={clearError} color="red.7">
            {t('ok')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

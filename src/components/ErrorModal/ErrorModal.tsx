import { useErrorStore } from '@/stores/useErrorStore';
import { Button, Group, Modal, Stack, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from './ErrorModal.module.css';

export default function ErrorModal() {
  const { t } = useTranslation();
  const { errorMessage, showError, clearError } = useErrorStore();

  return (
    <Modal
      opened={showError}
      onClose={clearError}
      title={t('errorModal.title')}
      centered
      withCloseButton={false}>
      <Stack gap="xl">
        <Text className={styles.message}>{errorMessage}</Text>
        <Group justify="flex-end">
          <Button onClick={clearError} variant="filled">
            {t('errorModal.ok')}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

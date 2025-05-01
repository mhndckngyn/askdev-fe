import { Modal, Stack, Group, Text, Button } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useActionStore } from '@/stores/useActionModalStore';
import styles from './ActionModal.module.css';

const ActionModal = () => {
  const { opened, message, actionName, clearAction, confirmAction } = useActionStore();

  return (
    <Modal
      opened={opened}
      onClose={clearAction}
      centered
      withCloseButton={false}
      padding="lg"
      radius="md">
      <Stack gap="md">
        <Group align="flex-start">
          <IconInfoCircle
            className={styles.icon}
          />
          <Text className={styles.message}>
            {message}
          </Text>
        </Group>

        <Group justify="flex-end" gap='xs'>
          <Button variant="filled" onClick={confirmAction}>
            {actionName}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default ActionModal;

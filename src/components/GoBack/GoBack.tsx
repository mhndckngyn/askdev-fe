import { useNavigate, useNavigationType } from 'react-router-dom';
import { Anchor, Button, Group, Modal, Stack, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';

interface GoBackProps {
  warnOnExit?: boolean;
}

export default function GoBack({ warnOnExit = false }: GoBackProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigationType = useNavigationType(); // Checks if there's a navigable history
  const [opened, { open, close }] = useDisclosure(false); // Modal state

  // Don't render if there is no navigable history
  if (navigationType === 'POP') {
    return null;
  }

  const handleClick = () => {
    if (warnOnExit) {
      open();
    } else {
      navigate(-1);
    }
  };

  const confirmNavigation = () => {
    close();
    navigate(-1);
  };

  return (
    <>
      <Anchor
        component="button"
        onClick={handleClick}
        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <IconArrowLeft size="18" />
        Go Back
      </Anchor>

      <Modal opened={opened} onClose={close} title={t('goBack.title')}>
        <Stack gap="xl">
          <Text>{t('goBack.description')}</Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={close}>
              {t('goBack.no')}
            </Button>
            <Button onClick={confirmNavigation}>{t('goBack.yes')}</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}

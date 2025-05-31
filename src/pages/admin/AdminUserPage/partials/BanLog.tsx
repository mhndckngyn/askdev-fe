import formatDate from '@/utils/formatDate';
import { Badge, Button, Loader, Modal, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogs } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../AdminUserPage.module.css';
import { getBanRecords } from '../services';

export interface BanLog {
  id: string;
  createdAt: string;
  admin: string;
  user: string;
  action: 'BAN' | 'UNBAN';
  reason: string;
}

export default function BanLog() {
  const { t } = useTranslation('adminUserPage');
  const [opened, { open, close }] = useDisclosure();

  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [logs, setLogs] = useState<BanLog[]>([]);

  useEffect(() => {
    (async () => {
      if (!opened) {
        return;
      }

      setLoading(true);
      setIsError(false);

      const response = await getBanRecords();
      if (response.success) {
        setLogs(response.content);
      } else {
        setLogs([]);
        setIsError(true);
      }

      setLoading(false);
    })();
  }, [opened]);

  return (
    <>
      <Button
        onClick={open}
        variant="light"
        color="orange"
        leftSection={<IconLogs />}>
        {t('ban-log')}
      </Button>
      <Modal
        title={
          <Text size="lg" fw="bold">
            {t('ban-log')}
          </Text>
        }
        opened={opened}
        onClose={close}
        size="xl">
        {isError ? (
          <Text>{t('ban-log-error-fetching')}</Text>
        ) : isLoading ? (
          <div className={styles['banLog-loaderContainer']}>
            <Loader type="dots" />
          </div>
        ) : (
          <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing="sm">
              <Table.Tr>
                <Table.Th>{t('ban-log-number')}</Table.Th>
                <Table.Th>{t('ban-log-user')}</Table.Th>
                <Table.Th>{t('ban-log-action')}</Table.Th>
                <Table.Th>{t('ban-log-reason')}</Table.Th>
                <Table.Th>{t('ban-log-actor')}</Table.Th>
                <Table.Th>{t('ban-log-time')}</Table.Th>
              </Table.Tr>
              {logs.map((log, i) => (
                <Table.Tr key={i}>
                  <Table.Td>{i + 1}</Table.Td>
                  <Table.Td>{log.user}</Table.Td>
                  <Table.Td>
                    <Badge color={log.action === 'BAN' ? 'red' : 'indigo'}>
                      {log.action}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{log.reason}</Table.Td>
                  <Table.Td>{log.admin}</Table.Td>
                  <Table.Td>{formatDate(log.createdAt)}</Table.Td>
                </Table.Tr>
              ))}
            </Table>
          </Table.ScrollContainer>
        )}
      </Modal>
    </>
  );
}

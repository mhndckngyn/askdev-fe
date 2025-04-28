import { Container, Group, Paper, Tabs, Text, Title } from '@mantine/core';
import {
  IconBulb,
  IconCode,
  IconLogin,
  IconMessageDots,
  IconThumbUp,
  IconUserPlus,
  IconWorld,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Login from './partials/Login';
import Signup from './partials/Signup';
import styles from './Welcome.module.css';
import { useSearchParams } from 'react-router-dom';

export default function Welcome() {
  const { t } = useTranslation('welcome');
  const { t: tCommon } = useTranslation('common');

  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'login';
  const [activeTab, setActiveTab] = useState<string | null>(initialTab);

  return (
    <div>
      <div className={styles.header}>
        <Title className={styles.title}>AskDev</Title>
        <Text c="dimmed">{t('slogan')}</Text>
        <Group gap="sm" className={styles.iconContainer}>
          <IconCode color="var(--mantine-color-teal-5)" />
          <IconMessageDots color="var(--mantine-color-pink-5)" />
          <IconWorld color="var(--mantine-color-lime-5)" />
          <IconThumbUp color="var(--mantine-color-blue-6)" />
          <IconBulb color="var(--mantine-color-yellow-7)" />
        </Group>
      </div>

      <Container size="xs" my={40}>
        <Tabs value={activeTab} onChange={setActiveTab} variant="outline">
          <Tabs.List grow>
            <Tabs.Tab
              p="sm"
              value="login"
              leftSection={<IconLogin size={16} />}>
              {tCommon('login')}
            </Tabs.Tab>
            <Tabs.Tab value="signup" leftSection={<IconUserPlus size={16} />}>
              {tCommon('signup')}
            </Tabs.Tab>
          </Tabs.List>
          <Paper withBorder shadow="sm" p="xl" className={styles.paper}>
            <Tabs.Panel value="login">
              <Login />
            </Tabs.Panel>
            <Tabs.Panel value="signup">
              <Signup />
            </Tabs.Panel>
          </Paper>
        </Tabs>
      </Container>
    </div>
  );
}

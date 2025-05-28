import { MemberProfile } from '@/types';
import { Group, Stack, Text } from '@mantine/core';
import {
  IconCake,
  IconMessages,
  IconQuestionMark,
  IconStar,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from '../ProfilePage.module.css';

type StatsProps = Pick<MemberProfile, 'stats'>;

export default function Stats({ stats }: StatsProps) {
  const { t } = useTranslation('profilePage');

  const statsData = [
    {
      icon: (
        <IconCake
          style={{ color: 'var(--mantine-color-pink-8)' }}
          className={styles['stats-icon']}
        />
      ),
      label: t('member-since'),
      value: new Date(stats.joinedOn).toLocaleDateString(),
    },
    {
      icon: (
        <IconQuestionMark
          style={{ color: 'var(--mantine-color-red-8)' }}
          className={styles['stats-icon']}
        />
      ),
      label: t('question-posted'),
      value: stats.questions.toLocaleString(),
    },
    {
      icon: (
        <IconMessages
          style={{ color: 'var(--mantine-color-blue-8)' }}
          className={styles['stats-icon']}
        />
      ),
      label: t('answer-given'),
      value: stats.answers.toLocaleString(),
    },
    {
      icon: (
        <IconStar
          style={{ color: 'var(--mantine-color-yellow-8)' }}
          className={styles['stats-icon']}
        />
      ),
      label: t('upvote-received'),
      value: stats.upvotesReceived.toLocaleString(),
    },
  ];

  return (
    <Group
      justify="space-between"
      className={clsx(
        styles['profilePage-section'],
        styles['stats-container'],
      )}>
      {statsData.map((item, i) => (
        <Group gap="sm" align="center" key={i}>
          {item.icon}
          <Stack gap="0">
            <Text className={styles['stats-label']}>{item.label}</Text>
            <Text className={styles['stats-number']}>{item.value}</Text>
          </Stack>
        </Group>
      ))}
    </Group>
  );
}

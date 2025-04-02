import { SimpleGrid, Stack, Text } from '@mantine/core';
import clsx from 'clsx';
import styles from '../ProfilePage.module.css';
import { MemberProfile } from '@/types';
import {
  IconClockHour12,
  IconMessages,
  IconQuestionMark,
  IconStar,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';

type StatsProps = {
  profile: MemberProfile;
};

export default function Stats({ profile }: StatsProps) {
  const { t } = useTranslation();

  return (
    <SimpleGrid cols={2} className={clsx(styles.box, styles.stats)}>
      <Stack gap="xs">
        <Text className={styles.statLabel}>
          <IconClockHour12 /> {t('profilePage.memberSince')}
        </Text>
        <Text className={styles.statNumber}>
          {new Date(profile.joinedOn).toLocaleDateString()}
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className={styles.statLabel}>
          <IconQuestionMark /> {t('profilePage.questionPosted')}
        </Text>
        <Text className={styles.statNumber}>
          {profile.questions.toLocaleString()}
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className={styles.statLabel}>
          <IconMessages /> {t('profilePage.answerGiven')}
        </Text>
        <Text className={styles.statNumber}>
          {profile.answers.toLocaleString()}
        </Text>
      </Stack>
      <Stack gap="xs">
        <Text className={styles.statLabel}>
          <IconStar /> {t('profilePage.upvoteReceived')}
        </Text>
        <Text className={styles.statNumber}>
          {profile.upvotesReceived.toLocaleString()}
        </Text>
      </Stack>
    </SimpleGrid>
  );
}

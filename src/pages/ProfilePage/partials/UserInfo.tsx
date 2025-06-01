import memberRoutePaths from '@/routes/user/member/paths';
import { MemberProfile } from '@/types';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconBrandGithubFilled, IconUserEdit } from '@tabler/icons-react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../ProfilePage.module.css';
import AboutMe from './AboutMe';

type Props = Pick<MemberProfile, 'info'> & { allowEdit: boolean };

export default function UserInfo({ info, allowEdit }: Props) {
  const { t } = useTranslation('profilePage');

  return (
    <div
      className={clsx(
        styles['profilePage-section'],
        styles['userInfo-container'],
      )}>
      <Stack align="center">
        <Avatar src={info.avatar} size={150} />
        <div className={styles['userInfo-socialLinks']}>
          {info.github && (
            <Anchor
              href={`https://github.com/${info.github}`}
              target="_blank"
              rel="noopener"
              variant="transparent"
              className={styles.github}>
              <IconBrandGithubFilled className={styles.icon} /> {info.github}
            </Anchor>
          )}
        </div>
      </Stack>
      <div className={styles['userInfo-content']}>
        <Group justify="space-between">
          <Title className={styles.name}>{info.username}</Title>
          {allowEdit && (
            <ActionIcon
              component={Link}
              to={memberRoutePaths.editProfile}
              radius="xl"
              size="lg">
              <IconUserEdit className={styles['userInfo-editIcon']} />
            </ActionIcon>
          )}
        </Group>
        <div className={clsx(styles.divider, styles.border)} />
        {info.bio ? (
          <AboutMe bio={info.bio} username={info.username} />
        ) : (
          <Text className={styles['userInfo-emptyBio']}>
            {info.username} {t('no-bio')}
          </Text>
        )}
      </div>
    </div>
  );
}

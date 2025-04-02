import { mockMemberProfile } from '@/mocks/';
import { useUserStore } from '@/stores/useUserStore';
import MemberProfile from '@/types/MemberProfile';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Loader,
  Stack,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconBrandGithub, IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import FeaturedPosts from './partials/FeaturedPosts';
import Stats from './partials/Stats';
import TagsOfInterest from './partials/TagsOfInterest';

export default function ProfilePage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const userId = useUserStore((state) => state.user?.id);
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  const allowEditing = id === userId;

  useEffect(() => {
    setProfile(mockMemberProfile);
  }, [id]);

  if (!profile)
    return (
      <Box className={styles.loader}>
        <Loader color="blue" />
      </Box>
    );

  return (
    <Stack gap="md">
      <Group>
        <Avatar src={profile.avatar} size={100} radius="sm" />
        <Stack gap="xs">
          <Group>
            <Title className={styles.name}>{profile.username}</Title>
            {allowEditing && (
              <Button leftSection={<IconEdit />}>
                {t('profilePage.editProfile')}
              </Button>
            )}
          </Group>
          {profile.github && (
            <div>
              <Anchor
                href={`https://github.com/${profile.github}`}
                className={styles.github}>
                <IconBrandGithub /> {profile.github}
              </Anchor>
            </div>
          )}
        </Stack>
      </Group>

      <Box className={styles.content}>
        <Stack>
          <Box className={styles.box}>
            <Title order={2} className={styles.sectionTitle}>
              {t('profilePage.aboutMe')}
            </Title>
            <TypographyStylesProvider>
              <p>Xin chào các bạn, tôi là Thắng Đinh</p>
              <p>Xin chào các bạn, tôi là Thắng Đinh</p>
              <p>Xin chào các bạn, tôi là Thắng Đinh</p>
              <p>Xin chào các bạn, tôi là Thắng Đinh</p>
              <p>Xin chào các bạn, tôi là Thắng Đinh</p>
            </TypographyStylesProvider>
          </Box>
          <Stats profile={profile} />
        </Stack>

        <Stack>
          <TagsOfInterest tags={profile.interestTags} />
          <FeaturedPosts
            title={t('profilePage.featuredQuestions')}
            posts={profile.featuredQuestions}
          />
          <FeaturedPosts
            title={t('profilePage.featuredAnswers')}
            posts={profile.featuredAnswers}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

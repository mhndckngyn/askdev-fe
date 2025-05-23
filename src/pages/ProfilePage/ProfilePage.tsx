import PageLoader from '@/components/PageLoader';
import { mockMemberProfile } from '@/mocks/';
import { useUserStore } from '@/stores/useUserStore';
import MemberProfile from '@/types/MemberProfile';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  Stack,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconBrandGithub, IconEdit } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import FeaturedPosts from './partials/FeaturedPosts';
import Stats from './partials/Stats';
import TagsOfInterest from './partials/TagsOfInterest';
import memberRoutePaths from '@/routes/user/member/paths';

export default function ProfilePage() {
  const { id } = useParams(); // use param to fetch user
  const { t } = useTranslation('profilePage');
  const userId = useUserStore((state) => state.user?.id);
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  // TODO: Nếu không có id từ param, thử lấy từ store, nếu không thì navigate

  useEffect(() => {
    // TODO
    const fetchProfile = async () => {
      setTimeout(() => {
        setProfile(mockMemberProfile);
      }, 1200);
    };

    fetchProfile();
  }, [id]);

  const allowEdit = id === userId;

  if (!profile) return <PageLoader />;

  return (
    <Stack gap="md">
      <Group>
        <Avatar src={profile.avatar} size={100} radius="sm" />
        <Stack gap="xs">
          <Group>
            <Title className={styles.name}>{profile.username}</Title>
            {allowEdit && (
              <Button
                component={Link}
                to={memberRoutePaths.editProfile}
                leftSection={<IconEdit />}>
                {t('edit-profile')}
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
              {t('about-me')}
            </Title>
            <TypographyStylesProvider>
              {/* TODO */}
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
            title={t('featured-questions')}
            posts={profile.featuredQuestions}
          />
          <FeaturedPosts
            title={t('featured-answers')}
            posts={profile.featuredAnswers}
          />
        </Stack>
      </Box>
    </Stack>
  );
}

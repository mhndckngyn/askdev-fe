import PageLoader from '@/components/PageLoader';
import publicRoutePaths from '@/routes/user/public/paths';
import { MemberProfile } from '@/types';
import { Stack } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import Stats from './partials/Stats';
import TagsOfInterest from './partials/TagsOfInterest';
import TopPosts from './partials/TopPosts';
import UserInfo from './partials/UserInfo';
import { getProfile } from './services';
import { useUserStore } from '@/stores/useUserStore';

export default function ProfilePage() {
  const { t } = useTranslation('profilePage');
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const { username } = useParams();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [allowEdit, setAllowEdit] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate(publicRoutePaths.notFound);
      return;
    }

    (async () => {
      const response = await getProfile(username);
      if (response.success) {
        setProfile(response.content);
        if (user?.username === username) {
          setAllowEdit(true);
        }
      } else {
        if (response.statusCode === 404) {
        }
      }
    })();
  }, [username]);

  if (!profile) return <PageLoader />;

  return (
    <Stack gap="md" align="center" className={styles['profilePage-container']}>
      <UserInfo info={profile.info} allowEdit={allowEdit}/>
      <Stats stats={profile.stats} />
      <TagsOfInterest tags={profile.interestTags} />
      <TopPosts sectionTitle={t('top-questions')} posts={profile.questions} />
      <TopPosts sectionTitle={t('top-answers')} posts={profile.answers} />
    </Stack>
  );
}

import GoBack from '@/components/GoBack';
import PageLoader from '@/components/PageLoader';
import RichTextEditor from '@/components/RichTextEditor';
import publicRoutePaths from '@/routes/user/public/paths';
import { useErrorStore } from '@/stores/useErrorStore';
import { useUserStore } from '@/stores/useUserStore';
import {
  Avatar,
  Button,
  Checkbox,
  Group,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { JSONContent } from '@tiptap/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.css';
import { getGithubError, getUsernameError } from './schemas';
import { getProfileById, updateProfile } from './services';

export type ProfileFormData = {
  username: string;
  avatar: File | null;
  github: string;
  showGithub: boolean;
  about: JSONContent | null;
};

export default function EditProfile() {
  const { t } = useTranslation('editProfile');
  const navigate = useNavigate();
  const setError = useErrorStore((state) => state.setError);
  const { user, fetchUser } = useUserStore(); // use user.id to fetch

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isFetching, setFetching] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const [initialAvatarUrl, setInitialAvatarUrl] = useState('');
  const form = useForm<ProfileFormData>({
    initialValues: {
      username: '',
      avatar: null,
      github: '',
      showGithub: false,
      about: null,
    },
    validate: {
      username: getUsernameError,
      github: (value, values) => getGithubError(value, values.showGithub),
    },
  });

  const avatarPreviewUrl = useMemo(() => {
    if (form.values.avatar) {
      return URL.createObjectURL(form.values.avatar);
    }

    return initialAvatarUrl;
  }, [form.values.avatar, initialAvatarUrl]);

  useEffect(() => {
    const fetchInfo = async () => {
      const userId = user?.id;

      if (!userId) {
        navigate(publicRoutePaths.homepage);
        return;
      }

      const response = await getProfileById(userId);
      if (response.success) {
        const about = JSON.parse(response.content.bio);
        const github = response.content.github ?? '';

        setInitialAvatarUrl(response.content.profilePicture);
        form.setValues({
          username: response.content.username,
          github,
          showGithub: response.content.showGithub,
          about,
          avatar: null,
        });
      } else {
        setError(t('fetchError'));
      }
    };

    fetchInfo();
    setFetching(false);
  }, []);

  useEffect(() => {
    return () => URL.revokeObjectURL(avatarPreviewUrl);
  }, [avatarPreviewUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      form.setFieldValue('avatar', file);
    }
  };

  const handleResetAvatar = () => {
    form.setFieldValue('avatar', null);
  };

  const handleSubmit = async (values: ProfileFormData) => {
    // mantine validates before running this function
    setSubmitting(true);

    const resBody = await updateProfile(values);
    if (resBody.success) {
      notifications.show({ message: t('updateSuccess') });
      fetchUser();
      navigate(publicRoutePaths.profileRedirect);
    } else {
      setError(t('updateError'));
    }

    setSubmitting(false);
  };

  if (isFetching) return <PageLoader />;

  return (
    <div className={styles.container}>
      <GoBack />
      <Space h="sm" />
      <Title size="h2" className={styles.title}>
        {t('title')}
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={styles.content}>
          <Stack className={styles.avatarSection}>
            <Avatar src={avatarPreviewUrl} size={200} mx="auto" />
            <Space />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className={styles.avatarInput}
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              {t('upload-profile-picture')}
            </Button>
            <Button
              onClick={handleResetAvatar}
              disabled={form.values.avatar == null}>
              {t('reset')}
            </Button>
          </Stack>
          <Stack gap="md">
            <Group align="flex-start" grow>
              <TextInput
                label={t('username-label')}
                placeholder={t('username-placeholder')}
                {...form.getInputProps('username')}
                classNames={{ label: styles.label }}
              />
              <Stack gap="sm">
                <TextInput
                  label={t('github-label')}
                  placeholder={t('github-placeholder')}
                  {...form.getInputProps('github')}
                  disabled={!form.values.showGithub}
                  classNames={{ label: styles.label }}
                />
                <Group justify="flex-end">
                  <Checkbox
                    label={t('show-github-label')}
                    {...form.getInputProps('showGithub', { type: 'checkbox' })}
                  />
                </Group>
              </Stack>
            </Group>
            <RichTextEditor
              value={form.values.about}
              onContentChange={(value) => form.setFieldValue('about', value)}
              label={t('about-me-label')}
              description={t('about-me-description')}
              plugins={{
                link: true,
              }}
              height={250}
            />
            <Group justify="flex-end">
              <Button type="submit" loading={isSubmitting}>
                {t('save-changes')}
              </Button>
            </Group>
          </Stack>
        </div>
      </form>
    </div>
  );
}

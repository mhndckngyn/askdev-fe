import GoBack from '@/components/GoBack';
import PageLoader from '@/components/PageLoader/PageLoader';
import RichTextEditor from '@/components/RichTextEditor';
import { mockMemberProfile } from '@/mocks';
import {
  Avatar,
  Button,
  Checkbox,
  Group,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { JSONContent } from '@tiptap/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './EditProfile.module.css';
import { getGithubError, getUsernameError } from './schemas';
import { useUserStore } from '@/stores/useUserStore';

type ProfileFormData = {
  username: string;
  avatar: File | null;
  github: string;
  showGithub: boolean;
  about: JSONContent | null;
};

export default function EditProfile() {
  const { t } = useTranslation('editProfile');
  const user = useUserStore((state) => state.user); // use user.id to fetch

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
      setTimeout(() => {
        setInitialAvatarUrl(mockMemberProfile.avatar);
        form.setValues({
          username: mockMemberProfile.username,
          github: mockMemberProfile.github,
          showGithub: mockMemberProfile.showGithub,
          about: null,
          avatar: null,
        });

        setFetching(false);
      }, 1200);
    };

    fetchInfo();
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

  const handleSubmit = (values: ProfileFormData) => {
    // mantine validates before running this function
    setSubmitting(true);
    // TODO
    console.log(values);
  };

  if (isFetching) return <PageLoader />;

  return (
    <div className={styles.container}>
      <GoBack />
      <Title className={styles.title}>{t('title')}</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className={styles.content}>
          <Stack>
            <Avatar src={avatarPreviewUrl} size={100} radius="sm" mx="auto" />
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
            <TextInput
              label={t('username-label')}
              placeholder={t('username-placeholder')}
              {...form.getInputProps('username')}
            />
            <TextInput
              label={t('github-label')}
              placeholder={t('github-placeholder')}
              {...form.getInputProps('github')}
              disabled={!form.values.showGithub}
            />
            <Group justify="flex-end">
              <Checkbox
                label={t('show-github-label')}
                {...form.getInputProps('showGithub', { type: 'checkbox' })}
              />
            </Group>
            <RichTextEditor
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

import RichTextEditor from '@/components/RichTextEditor';
import ImageDropzone from '@/pages/PostQuestion/partials/ImageDropzone';
import { Button, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { JSONContent } from '@tiptap/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PostQuestion.module.css';
import QuestionTips from './partials/QuestionTips';
import TagPicker from './partials/TagPicker';
import { getTagsError, getTitleError } from './schemas';

type QuestionFormData = {
  title: string;
  detail: JSONContent;
  tags: string[];
  images: File[];
};

export default function PostQuestion() {
  const { t } = useTranslation('postQuestion');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuestionFormData>({
    initialValues: {
      title: '',
      detail: {} as JSONContent,
      tags: [],
      images: [],
    },
    validate: {
      title: getTitleError,
      tags: getTagsError,
      // validate detail not empty
    },
  });

  const handleSubmitQuestion = (values: QuestionFormData) => {
    console.log(values);
    setIsSubmitting(true);
  };

  return (
    <div>
      <Title className={styles.title}>{t('post-question')}</Title>
      <div className={styles.content}>
        <form onSubmit={form.onSubmit(handleSubmitQuestion)}>
          <Stack gap="lg" pos="relative">
            <TextInput
              withAsterisk
              {...form.getInputProps('title')}
              label={t('title.question-title')}
              description={t('title.question-title-description')}
              placeholder={t('title.question-title-placeholder')}
              descriptionProps={{
                style: {
                  marginBottom: 'calc(0.85 * var(--mantine-spacing-xs))',
                },
              }}
            />
            <TagPicker
              selectedTags={form.values.tags}
              onSelectedTagChange={(value) => form.setFieldValue('tags', value)}
            />
            <RichTextEditor
              onContentChange={(value) => form.setFieldValue('detail', value)}
              label={t('detail.question-detail')}
              description={t('detail.question-detail-description')}
              plugins={{
                inline: true,
                code: true,
                heading: true,
                block: true,
                link: true,
                table: true,
              }}
              required
            />
            <ImageDropzone
              currentImages={form.values.images}
              onImageChange={(value) => form.setFieldValue('images', value)}
              maxImages={4}
            />
            <Button type="submit" variant="filled" loading={isSubmitting}>
              {t('submit')}
            </Button>
          </Stack>
        </form>
        <QuestionTips />
      </div>
    </div>
  );
}

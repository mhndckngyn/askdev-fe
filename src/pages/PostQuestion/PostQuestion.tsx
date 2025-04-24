import RichTextEditor from '@/components/RichTextEditor';
import ImageDropzone from '@/pages/PostQuestion/partials/ImageDropzone';
import { useErrorStore } from '@/stores/useErrorStore';
import { Button, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { JSONContent } from '@tiptap/core';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './PostQuestion.module.css';
import QuestionTips from './partials/QuestionTips';
import TagPicker from './partials/TagPicker';
import { getTagsError, getTitleError } from './schemas';
import { postQuestion } from './services';

export type TagData = {
  id: string;
  name: string;
};

export type QuestionFormData = {
  title: string;
  content: JSONContent;
  existingTags: TagData[];
  newTags: string[];
  images: File[];
};

export default function PostQuestion() {
  const { t } = useTranslation('postQuestion');
  const setError = useErrorStore((state) => state.setError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuestionFormData>({
    initialValues: {
      title: '',
      content: {} as JSONContent,
      existingTags: [],
      newTags: [],
      images: [],
    },
    validate: {
      title: getTitleError,
      existingTags: (_, values) => {
        const error = getTagsError([...values.existingTags, ...values.newTags]);
        if (error) {
          setError(error);
        }
        return error;
      },
    },
  });

  const handleSubmitQuestion = async (values: QuestionFormData) => {
    setIsSubmitting(true);

    const response = await postQuestion(values);

    if (response.success) {
      // TODO: chuyển hướng về trang câu hỏi
      form.reset();
    } else if (response.message) {
      setError(response.message);
    }

    setIsSubmitting(false);
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
              existingTags={form.values.existingTags}
              newTags={form.values.newTags}
              updateChosenExistingTags={(value) =>
                form.setFieldValue('existingTags', value)
              }
              updateChosenNewTags={(value) =>
                form.setFieldValue('newTags', value)
              }
            />
            <RichTextEditor
              onContentChange={(value) => form.setFieldValue('content', value)}
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

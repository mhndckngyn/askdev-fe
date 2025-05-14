import PageLoader from '@/components/PageLoader';
import RichTextEditor from '@/components/RichTextEditor';
import { useActionStore } from '@/stores/useActionModalStore';
import { useUserStore } from '@/stores/useUserStore';
import { Button, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { JSONContent } from '@tiptap/core';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import TagPicker from '../PostQuestion/partials/TagPicker';
import { QuestionFormData, TagData } from '../PostQuestion/PostQuestion';
import styles from './EditQuestion.module.css';
import EditQuestionImageDropzone from './partials/EditQuestionImageDropzone';
import { getQuestion, putQuestion } from './services';
import QuestionTips from '../PostQuestion/partials/QuestionTips';
import { useErrorStore } from '@/stores/useErrorStore';
import publicRoutePaths from '@/routes/user/public/paths';
import { notifications } from '@mantine/notifications';

export type QuestionEditData = Omit<QuestionFormData, 'images'> & {
  newImages: File[];
  currentImages: string[];
};

export default function EditQuestion() {
  const { id: paramId } = useParams();
  const navigate = useNavigate();
  const setAction = useActionStore((state) => state.setAction);
  const setError = useErrorStore((state) => state.setError);
  const user = useUserStore((state) => state.user);

  const { t } = useTranslation('editQuestion');
  const { t: tCommon } = useTranslation('common');
  const { t: tPost } = useTranslation('postQuestion');

  const [isFetching, setFetching] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<QuestionEditData>({
    initialValues: {
      title: '',
      content: {} as JSONContent,
      existingTags: [],
      newTags: [],
      currentImages: [],
      newImages: [],
    },
    validate: {
      /*       title: getTitleError,
      existingTags: (_, values) => {
        const error = getTagsError([...values.existingTags, ...values.newTags]);
        if (error) {
          setError(error); // setError bởi vì component TagPicker đang không hiển thị error trả về
        }
        return error;
      }, */
    },
  });

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!paramId || !user) {
      setAction(t('invalid-request'), tCommon('go-back.label'), goBack);
      return;
    }

    const fetchQuestion = async (id: string) => {
      const response = await getQuestion(id);
      if (response.success) {
        const fetched = response.content;
        // chỉ cho phép người đăng câu hỏi chỉnh sửa câu hỏi của họ
        if (fetched.userId !== user.id) {
          setAction(t('invalid-user'), tCommon('go-back.label'), goBack);
          return;
        }
        form.setValues({
          title: fetched.title,
          content: JSON.parse(fetched.content),
          existingTags: fetched.tags,
          currentImages: fetched.images,
        });
        setFetching(false);
      } else {
        console.error(response.error);
        setAction(t('fetch-error'), tCommon('go-back.label'), goBack);
      }
    };

    fetchQuestion(paramId);
  }, []);

  const handleSubmit = async (values: QuestionEditData) => {
    setSubmitting(true);

    const response = await putQuestion(paramId as string, values); // nếu id không phải string thì đã return từ trước

    if (response.success) {
      form.reset();
      notifications.show({ message: t('edit-successful') });
      navigate(
        publicRoutePaths.questionDetail.replace(':id', response.content.id),
      );
    } else if (response.message) {
      setError(response.message);
    }

    setSubmitting(false);
  };

  const handleUpdateExistingTags = (tags: TagData[]) => {
    form.setFieldValue('existingTags', tags);
  };

  const handleUpdateNewTags = (tags: string[]) => {
    form.setFieldValue('newTags', tags);
  };

  const handleChangeExistingImages = useCallback((value: string[]) => {
    form.setFieldValue('currentImages', value);
  }, []);

  const handleChangeNewImages = useCallback((value: File[]) => {
    form.setFieldValue('newImages', value);
  }, []);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <div>
      <Title className={styles.title}>{t('edit-question')}</Title>
      <div className={styles.content}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="lg">
            <TextInput
              withAsterisk
              {...form.getInputProps('title')}
              label={tPost('title.question-title')}
              description={tPost('title.question-title-description')}
              placeholder={tPost('title.question-title-placeholder')}
              descriptionProps={{
                style: {
                  marginBottom: styles.titleDescription,
                },
              }}
            />

            <TagPicker
              existingTags={form.values.existingTags}
              newTags={form.values.newTags}
              updateChosenExistingTags={handleUpdateExistingTags}
              updateChosenNewTags={handleUpdateNewTags}
            />

            <RichTextEditor
              value={form.values.content}
              onContentChange={(value) => form.setFieldValue('content', value)}
              label={tPost('detail.question-detail')}
              description={tPost('detail.question-detail-description')}
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

            <EditQuestionImageDropzone
              currentImages={form.values.currentImages}
              newImages={form.values.newImages}
              onChangeExistingImages={handleChangeExistingImages}
              onChangeNewImages={handleChangeNewImages}
              limit={Infinity}
            />
            <Button type="submit" variant="filled" loading={isSubmitting}>
              {t('save')}
            </Button>
          </Stack>
        </form>
        <QuestionTips />
      </div>
    </div>
  );
}

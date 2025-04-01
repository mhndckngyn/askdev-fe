import ImageDropzone from "@/pages/PostQuestion/partials/ImageDropzone";
import RichTextEditor from "@/pages/PostQuestion/partials/RichTextEditor";
import { useErrorStore } from "@/stores/useErrorStore";
import { Button, Stack, TextInput, Title } from "@mantine/core";
import { JSONContent } from "@tiptap/core";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PostQuestion.module.css";
import QuestionTips from "./partials/QuestionTips";
import TagPicker from "./partials/TagPicker";

type QuestionFormData = {
  title: string;
  detail: JSONContent;
  tags: string[];
  images: File[];
};

export default function PostQuestion() {
  const { t } = useTranslation();
  const setError = useErrorStore((state) => state.setError);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<QuestionFormData>({
    title: "",
    detail: {} as JSONContent,
    tags: [],
    images: [],
  });

  const handleSubmitQuestion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.title === "") {
      setError(t("questionForm.emptyTitle"));
    } else if (formData.tags.length === 0) {
      setError(t("questionForm.noTags"));
    } else {
      console.log(formData);
      setIsSubmitting(true);
    }
  };

  const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData({ ...formData, title: value });
  };

  const updateDetail = (value: JSONContent) => {
    setFormData({ ...formData, detail: value });
  };

  const updateTags = (value: string[]) => {
    setFormData({ ...formData, tags: value });
  };

  const updateImages = (value: File[]) => {
    setFormData({ ...formData, images: value });
  };

  return (
    <div>
      <Title className={styles.title}>{t("post-question")}</Title>
      <div className={styles.content}>
        <form onSubmit={handleSubmitQuestion}>
          <Stack gap="lg" pos="relative">
            <TextInput
              withAsterisk
              onChange={updateTitle}
              label={t("question-title")}
              description={t("question-title-description")}
              placeholder={t("question-title-placeholder")}
              descriptionProps={{
                style: {
                  marginBottom: "calc(0.85 * var(--mantine-spacing-xs))",
                },
              }}
            />
            <TagPicker
              selectedTags={formData.tags}
              onSelectedTagChange={updateTags}
            />
            <RichTextEditor
              onContentChange={updateDetail}
              label={t("question-detail")}
              description={t("question-detail-description")}
            />
            <ImageDropzone
              currentImages={formData.images}
              onImageChange={updateImages}
              maxImages={4}
            />
            <Button type="submit" variant="filled" loading={isSubmitting}>
              {t("questionForm.submit")}
            </Button>
          </Stack>
        </form>
        <QuestionTips />
      </div>
    </div>
  );
}

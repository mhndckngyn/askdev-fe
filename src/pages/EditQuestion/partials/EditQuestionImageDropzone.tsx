import styles from '@/pages/PostQuestion/partials/ImageDropzone/ImageDropzone.module.css';
import { Divider, Input, Stack, Text } from '@mantine/core';
import { Dropzone, type FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ImagePreview from './ImagePreview';

type Props = {
  currentImages: string[];
  newImages: File[];
  onChangeNewImages: (value: File[]) => void;
  onChangeExistingImages: (value: string[]) => void;
  limit: number;
};

export default function EditQuestionImageDropzone({
  currentImages,
  newImages,
  onChangeNewImages,
  onChangeExistingImages,
  limit,
}: Props) {
  const { t } = useTranslation('postQuestion');

  const handleDrop = (droppedImages: FileWithPath[]): void => {
    const availableSlots = limit - newImages.length - currentImages.length;
    if (availableSlots <= 0) return;

    // only take as many images as there are available slots
    const imagesToAdd = droppedImages.slice(0, availableSlots);
    onChangeNewImages([...newImages, ...imagesToAdd]);
  };

  const handleRemoveNewImage = (index: number) => {
    const removed = newImages.filter((_, i) => i !== index);
    onChangeNewImages(removed);
  };

  const handleRemoveExistingImage = (url: string) => {
    const removed = currentImages.filter((current) => current !== url);
    onChangeExistingImages(removed);
  };

  // using useMemo to avoid urls being re-created (caused by the text fields) and causing flashes
  // only create them when the list changes
  const newImagePreviewUrls = useMemo(() => {
    console.log('updated')
    return newImages.map((image) => URL.createObjectURL(image));
  }, [newImages]);

  // revoke the allocated images when the component unmounts or when currentImages updates:
  useEffect(() => {
    return () => newImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [newImagePreviewUrls]);

  const newImagePreviews = newImagePreviewUrls.map((url, index) => (
    <ImagePreview
      key={url}
      url={url}
      onDelete={() => handleRemoveNewImage(index)}
    />
  ));

  const currentImagePreviews = currentImages.map((url) => {
    return (
      <ImagePreview
        key={url}
        url={url}
        onDelete={() => handleRemoveExistingImage(url)}
      />
    );
  });

  const previews = [...currentImagePreviews, ...newImagePreviews];

  return (
    <div className={styles.container}>
      <div>
        <Input.Label>{t('image.image-upload')}</Input.Label>
        <Input.Description>
          {t('image.image-upload-description')}
        </Input.Description>
      </div>

      <div className={styles.content}>
        <Dropzone
          accept={{ 'image/*': [] }}
          onDrop={handleDrop}
          className={styles.dropzone}
          disabled={newImages.length >= limit}>
          <Stack
            align="center"
            justify="center"
            style={{ pointerEvents: 'none' }}
            gap="xs">
            <Dropzone.Accept>
              <IconUpload
                size={32}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={32}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                size={32}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>
            <Text size="sm" c="dimmed">
              {t('image.add-image')}
            </Text>
            <Text size="sm" c="dimmed">
              {t('image.image-upload-limit', { maxImages: limit })}
            </Text>
          </Stack>
        </Dropzone>

        <Divider orientation="vertical" className={styles.divider} />

        {previews.length > 0 ? (
          <div className={styles.imageList}>{previews}</div>
        ) : (
          <div className={styles.noImage}>
            <Text size="sm">{t('image.no-image-selected')}</Text>
          </div>
        )}
      </div>
    </div>
  );
}

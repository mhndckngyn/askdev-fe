import { ActionIcon, Divider, Input, Stack, Text } from '@mantine/core';
import { Dropzone, type FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import styles from './ImageDropzone.module.css';
import { useEffect, useMemo } from 'react';

type Props = {
  currentImages: File[];
  onImageChange: (value: File[]) => void;
  maxImages: number;
};

export default function ImageDropzone({
  currentImages,
  onImageChange,
  maxImages,
}: Props) {
  const { t } = useTranslation('postQuestion');

  const handleDrop = (newImages: FileWithPath[]): void => {
    const availableSlots = maxImages - currentImages.length;
    if (availableSlots <= 0) return;

    // only take as many images as there are available slots
    const imagesToAdd = newImages.slice(0, availableSlots);
    onImageChange([...currentImages, ...imagesToAdd]);
  };

  const handleRemoveImage = (index: number) => {
    const current = currentImages.filter((_, i) => i !== index);
    onImageChange(current);
  };

  // using useMemo to avoid urls being recreated (caused by the text editor)
  // only create them when currentImages change
  const previewsUrl = useMemo(
    () => currentImages.map((image) => URL.createObjectURL(image)),
    [currentImages],
  );

  // revoke the urls when the component unmounts or when currentImages updates:
  useEffect(() => {
    return () => previewsUrl.forEach((url) => URL.revokeObjectURL(url));
  }, [previewsUrl]);

  const previews = previewsUrl.map((preview, index) => (
    <div className={styles.imageContainer} key={preview}>
      <img src={preview} className={styles.imagePreview} />
      <ActionIcon
        className={styles.imageDelete}
        variant="default"
        size="sm"
        aria-label="Delete image from uploads"
        onClick={() => handleRemoveImage(index)}>
        <IconX />
      </ActionIcon>
    </div>
  ));

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
          disabled={currentImages.length >= maxImages}>
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
              {t('image.image-upload-limit', { maxImages })}
            </Text>
          </Stack>
        </Dropzone>

        <Divider orientation="vertical" className={styles.divider} />

        {currentImages.length > 0 ? (
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

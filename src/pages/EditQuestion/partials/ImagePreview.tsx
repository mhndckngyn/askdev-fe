import styles from '@/pages/PostQuestion/partials/ImageDropzone/ImageDropzone.module.css';
import { ActionIcon } from "@mantine/core";
import { IconX } from '@tabler/icons-react';

const ImagePreview = ({
  url,
  onDelete,
}: {
  url: string;
  onDelete: () => void;
}) => (
  <div className={styles.imageContainer} key={url}>
    <img src={url} className={styles.imagePreview} />
    <ActionIcon
      className={styles.imageDelete}
      variant="default"
      size="sm"
      aria-label="Delete image from uploads"
      onClick={onDelete}>
      <IconX />
    </ActionIcon>
  </div>
);
export default ImagePreview;

import { Button, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import MergePage from './MergeTagsPage';
import { useState } from 'react';

export interface TagAdminView {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}

type Props = {
  selectedTags: TagAdminView[];
  onMergeSuccess: () => void;
};

export default function SelectedRowActions({
  selectedTags,
  onMergeSuccess,
}: Props) {
  const { t } = useTranslation('adminTagPage');
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const onMergeTags = () => setOpen(true);

  return (
    <>
      <Group>
        <Button
          onClick={onMergeTags}
          disabled={selectedTags.length === 0}
          variant="light"
          color="green">
          {t('mergeTags')}
        </Button>
        {selectedTags.length > 0 && (
          <Text size="sm">
            {t('selectedCount', { count: selectedTags.length })}
          </Text>
        )}
      </Group>
      <MergePage
        open={open}
        handleToggle={handleToggle}
        selectedTags={selectedTags}
        onMergeSuccess={onMergeSuccess}
      />
    </>
  );
}

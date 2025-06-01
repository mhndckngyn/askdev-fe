import { CommentAdminView } from '@/types/CommentAdminView';
import { Button, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type Props = {
  selectedRecords: CommentAdminView[];
  onHideComments: () => void;
  onUnhideComments: () => void;
};

export default function SelectedRowActions({
  selectedRecords,
  onHideComments,
  onUnhideComments,
}: Props) {
  const { t } = useTranslation('adminCommentPage');

  return (
    <Group>
      <Button
        onClick={onHideComments}
        disabled={selectedRecords.length === 0}
        variant="light"
        color="orange">
        {t('hide-comments')}
      </Button>
      <Button
        onClick={onUnhideComments}
        disabled={selectedRecords.length === 0}
        variant="light"
        color="green">
        {t('unhide-comments')}
      </Button>
      {selectedRecords.length > 0 && (
        <Text size="sm">
          {t('selected-count', { count: selectedRecords.length })}
        </Text>
      )}
    </Group>
  );
}

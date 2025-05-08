import { AnswerAdminView } from '@/types/AnswerAdminView';
import { Button, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type Props = {
  selectedAnswers: AnswerAdminView[];
  onHideAnswers: () => void;
  onUnhideAnswers: () => void;
};

export default function SelectedRowActions({
  selectedAnswers,
  onHideAnswers,
  onUnhideAnswers,
}: Props) {
  const { t } = useTranslation('adminAnswerPage');

  return (
    <Group>
      <Button
        onClick={onHideAnswers}
        disabled={selectedAnswers.length === 0}
        variant="light"
        color="orange">
        {t('hideAnswers')}
      </Button>
      <Button
        onClick={onUnhideAnswers}
        disabled={selectedAnswers.length === 0}
        variant="light"
        color="green">
        {t('unhideAnswers')}
      </Button>
      {selectedAnswers.length > 0 && (
        <Text size="sm">
          {t('selectedCount', { count: selectedAnswers.length })}
        </Text>
      )}
    </Group>
  );
}

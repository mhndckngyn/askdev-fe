import { QuestionAdminView } from '@/types';
import { Button, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

type Props = {
  selectedQuestions: QuestionAdminView[];
  onHideQuestions: () => void;
  onUnhideQuestions: () => void;
};

export default function SelectedRowActions({
  selectedQuestions,
  onHideQuestions,
  onUnhideQuestions,
}: Props) {
  const { t } = useTranslation('adminQuestionPage');

  return (
    <Group>
      <Button
        onClick={onHideQuestions}
        disabled={selectedQuestions.length === 0}
        variant="light"
        color="orange">
        {t('hideQuestions')}
      </Button>
      <Button
        onClick={onUnhideQuestions}
        disabled={selectedQuestions.length === 0}
        variant="light"
        color="green">
        {t('unhideQuestions')}
      </Button>
      {selectedQuestions.length > 0 && (
        <Text size="sm">
          {t('selectedCount', { count: selectedQuestions.length })}
        </Text>
      )}
    </Group>
  );
}

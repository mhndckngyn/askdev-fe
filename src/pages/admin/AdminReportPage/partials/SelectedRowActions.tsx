import { Button, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

export interface ReportAdminView {
  id: string;
  username?: string;
  contentType: string;
  contentId: string;
  reason: string;
  status: string;
  createdAt: string;
  isHidden: boolean;
}

type Props = {
  selectedReports: ReportAdminView[];
  onHideReports: () => void;
  onUnhideReports: () => void;
};

export default function SelectedRowActions({
  selectedReports,
  onHideReports,
  onUnhideReports,
}: Props) {
  const { t } = useTranslation('adminQuestionPage');

  return (
    <Group>
      <Button
        onClick={onHideReports}
        disabled={selectedReports.length === 0}
        variant="light"
        color="orange">
        {'hideReports'}
      </Button>
      <Button
        onClick={onUnhideReports}
        disabled={selectedReports.length === 0}
        variant="light"
        color="green">
        {'unhideReports'}
      </Button>
      {selectedReports.length > 0 && (
        <Text size="sm">
          {t('selectedCount', { count: selectedReports.length })}
        </Text>
      )}
    </Group>
  );
}

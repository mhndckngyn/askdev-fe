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
  const { t } = useTranslation('adminReportPage');

  return (
    <Group>
      <Button
        onClick={onHideReports}
        disabled={selectedReports.length === 0}
        variant="light"
        color="orange">
        {t('hideReports')}
      </Button>
      <Button
        onClick={onUnhideReports}
        disabled={selectedReports.length === 0}
        variant="light"
        color="green">
        {t('unhideReports')}
      </Button>
      {selectedReports.length > 0 && (
        <Text size="sm">
          {t('selectedCount', { count: selectedReports.length })}
        </Text>
      )}
    </Group>
  );
}

import { Button, Group, Modal, Radio, Space, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { CommentFilter } from '../AdminCommentPage';
import UsernamePicker from '@/pages/admin/AdminQuestionPage/partials/UsernamePicker';

type Props = {
  currentFilter: CommentFilter;
  setFilter: (filter: CommentFilter) => void;
  resetFilter: () => void;
  opened: boolean;
  onClose: () => void;
};

export default function CommentFilterModal({
  currentFilter,
  setFilter,
  resetFilter,
  opened,
  onClose,
}: Props) {
  const { t } = useTranslation('adminCommentPage');

  const form = useForm<CommentFilter>({ initialValues: currentFilter });

  const applyFilter = (values: CommentFilter) => {
    setFilter(values);
    onClose();
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    form.setFieldValue('startDate', dates?.[0] ?? undefined);
    form.setFieldValue('endDate', dates?.[1] ?? undefined);
  };

  const handleHiddenOptionChange = (value: string) => {
    if (value === 'both') {
      form.setFieldValue('hiddenOption', undefined);
    } else {
      form.setFieldValue('hiddenOption', value === 'only');
    }
  };

  const handleResetFilter = () => {
    form.reset();
    resetFilter();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw="bold">
          {t('advanced-filters')}
        </Text>
      }>
      <form onSubmit={form.onSubmit(applyFilter)}>
        <Stack gap="md">
          <UsernamePicker
            value={form.values.content || null}
            onChange={(value) =>
              form.setFieldValue('username', value ? value : undefined)
            }
          />
          <DatePickerInput
            type="range"
            allowSingleDateInRange
            label={t('posted-on')}
            description={t('posted-on-description')}
            value={[form.values.startDate || null, form.values.endDate || null]}
            onChange={handleDateChange}
          />
          <Radio.Group
            name="isHidden"
            label={t('hidden')}
            description={t('default-both')}
            value={
              form.values.hiddenOption === undefined
                ? 'both'
                : form.values.hiddenOption
                  ? 'only'
                  : 'no'
            }
            onChange={handleHiddenOptionChange}>
            <Group mt="xs">
              <Radio value="both" label={t('both')} />
              <Radio value="only" label={t('only-hidden')} />
              <Radio value="no" label={t('no-hidden')} />
            </Group>
          </Radio.Group>

          <Space h="xs"></Space>

          <Group justify="flex-end" gap="xs">
            <Button type="button" onClick={handleResetFilter} variant="light">
              {t('reset')}
            </Button>
            <Button type="submit">{t('apply')}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

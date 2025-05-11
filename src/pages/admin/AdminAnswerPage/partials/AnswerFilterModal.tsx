import { Button, Modal, Text, Group, Radio, Stack, Space } from '@mantine/core';
import { useForm } from '@mantine/form';
import UsernamePicker from '../../AdminQuestionPage/partials/UsernamePicker';
import { AnswerFilter } from '../AdminAnswerPage';
import { useTranslation } from 'react-i18next';
import { DatePickerInput } from '@mantine/dates';

type Props = {
  currentFilter: AnswerFilter;
  setFilter: (filter: AnswerFilter) => void;
  resetFilter: () => void;
  opened: boolean;
  onClose: () => void;
};

export default function AnswerFilterModal({
  currentFilter,
  setFilter,
  resetFilter,
  opened,
  onClose,
}: Props) {
  const { t } = useTranslation('adminAnswerPage');

  const form = useForm<AnswerFilter>({ initialValues: currentFilter });

  const applyFilter = (values: AnswerFilter) => {
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
          {t('advancedFilters')}
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
            label={t('postedOn')}
            description={t('postedOnDescription')}
            value={[form.values.startDate || null, form.values.endDate || null]}
            onChange={handleDateChange}
          />
          <Radio.Group
            name="isHidden"
            label={t('hidden')}
            description={t('defaultBoth')}
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
              <Radio value="only" label={t('onlyHidden')} />
              <Radio value="no" label={t('noHidden')} />
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

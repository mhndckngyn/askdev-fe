import { Button, Group, Modal, Radio, Space, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { Filter } from '../AdminQuestionPage';
import TagPicker from './TagPickerForFilter';
import UsernamePicker from './UsernamePicker';

type FilterModalType = {
  currentFilter: Filter;
  setFilter: (filter: Filter) => void;
  opened: boolean;
  onClose: () => void;
  resetFilter: () => void;
};

export default function FilterModal({
  currentFilter,
  setFilter,
  opened,
  onClose,
  resetFilter,
}: FilterModalType) {
  const { t } = useTranslation('adminQuestionPage');

  const form = useForm<Filter>({
    initialValues: currentFilter,
  });

  const applyFilter = (values: Filter) => {
    setFilter(values);
    onClose();
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    form.setFieldValue('startDate', dates?.[0] ?? undefined);
    form.setFieldValue('endDate', dates?.[1] ?? undefined);
  };

  const handleAnsweredChange = (value: string) => {
    if (value === 'both') {
      form.setFieldValue('isAnswered', undefined);
    } else {
      form.setFieldValue('isAnswered', value === 'yes');
    }
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
          {t('filters')}
        </Text>
      }>
      <form onSubmit={form.onSubmit(applyFilter)}>
        <Stack gap="md">
          <TagPicker
            value={form.values.tags || []}
            onChange={(tags) => form.setFieldValue('tags', tags)}
          />

          <UsernamePicker
            value={form.values.username || null}
            onChange={(username) =>
              form.setFieldValue('username', username ?? undefined)
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
            name="isAnswered"
            label={t('answered')}
            description={t('defaultBoth')}
            value={
              form.values.isAnswered === undefined
                ? 'both'
                : form.values.isAnswered
                  ? 'yes'
                  : 'no'
            }
            onChange={handleAnsweredChange}>
            <Group mt="xs">
              <Radio value="both" label={t('both')} />
              <Radio value="yes" label={t('yes')} />
              <Radio value="no" label={t('no')} />
            </Group>
          </Radio.Group>

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

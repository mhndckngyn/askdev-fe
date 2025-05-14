import {
  Button,
  Group,
  Modal,
  Radio,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { Filter } from '../AdminReportPage';
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

  const handleContentTypeChange = (value: string) => {
    form.setFieldValue('contentType', value);
  };

  const handleStatusChange = (value: string) => {
    form.setFieldValue('status', value);
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
          <UsernamePicker
            value={form.values.reportedusername || null}
            onChange={(reportedusername) =>
              form.setFieldValue(
                'reportedusername',
                reportedusername ?? undefined,
              )
            }
          />

          <Radio.Group
            name="contentType"
            label={t('answered')}
            description={t('defaultBoth')}
            value={
              form.values.contentType === 'QUESTION'
                ? 'QUESTION'
                : form.values.contentType === 'ANSWER'
                  ? 'ANSWER'
                  : 'COMMENT'
            }
            onChange={handleContentTypeChange}>
            <Group mt="4">
              <Radio value="QUESTION" label={'QUESTION'} />
              <Radio value="ANSWER" label={'ANSWER'} />
              <Radio value="COMMENT" label={'COMMENT'} />
            </Group>
          </Radio.Group>

          <TextInput
            label="Content ID"
            placeholder="Enter Content ID"
            value={form.values.contentId || ''}
            onChange={(event) =>
              form.setFieldValue(
                'contentId',
                event.currentTarget.value.trim() === ''
                  ? undefined
                  : event.currentTarget.value,
              )
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
            name="status"
            label={t('answered')}
            description={t('defaultBoth')}
            value={
              form.values.status === 'PENDING'
                ? 'PENDING'
                : form.values.status === 'REVIEWED'
                  ? 'REVIEWED'
                  : 'REJECTED'
            }
            onChange={handleStatusChange}>
            <Group mt="4">
              <Radio value="PENDING" label={'PENDING'} />
              <Radio value="REVIEWED" label={'REVIEWED'} />
              <Radio value="REJECTED" label={'REJECTED'} />
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
            <Group mt="4">
              <Radio value="both" label={t('both')} />
              <Radio value="only" label={t('onlyHidden')} />
              <Radio value="no" label={t('noHidden')} />
            </Group>
          </Radio.Group>

          <Space h="0"></Space>
          <Group justify="flex-end" gap="4">
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

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
  const { t } = useTranslation('adminReportPage');

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

          <Group>
            <Text
              size="sm"
              mb={-10}
              style={{ display: 'block', width: '100%', fontWeight: '500' }}>
              {t('contentType')}
            </Text>
            {['QUESTION', 'ANSWER', 'COMMENT'].map((type) => (
              <Radio
                key={type}
                value={type}
                label={t(type as any)}
                checked={form.values.contentType === type}
                onClick={() =>
                  form.setFieldValue(
                    'contentType',
                    form.values.contentType === type ? undefined : type,
                  )
                }
              />
            ))}
          </Group>

          <TextInput
            label={t('contentId')}
            placeholder={t('inputContentId')}
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
            label={t('reportOn')}
            description={t('reportedOnDescription')}
            value={[form.values.startDate || null, form.values.endDate || null]}
            onChange={handleDateChange}
          />

          <Group>
            <Text
              size="sm"
              mb={-10}
              style={{ display: 'block', width: '100%', fontWeight: '500' }}>
              {t('status')}
            </Text>
            {['PENDING', 'REVIEWED', 'REJECTED'].map((status) => (
              <Radio
                key={status}
                value={status}
                label={t(status as any)}
                checked={form.values.status === status}
                onClick={() =>
                  form.setFieldValue(
                    'status',
                    form.values.status === status ? undefined : status,
                  )
                }
              />
            ))}
          </Group>

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
          <Group justify="flex-end" gap="sx">
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

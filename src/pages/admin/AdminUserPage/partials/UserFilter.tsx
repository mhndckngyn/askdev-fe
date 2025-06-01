import {
  Button,
  Group,
  Modal,
  Radio,
  Select,
  Space,
  Stack,
  Text
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { UserFilter } from '../AdminUserPage';

type Props = {
  currentFilter: UserFilter;
  setFilter: (filter: UserFilter) => void;
  resetFilter: () => void;
  opened: boolean;
  onClose: () => void;
};

export default function UserFilterModal({
  currentFilter,
  setFilter,
  resetFilter,
  opened,
  onClose,
}: Props) {
  const { t } = useTranslation('adminUserPage');

  const form = useForm<UserFilter>({ initialValues: currentFilter });

  const applyFilter = (values: UserFilter) => {
    setFilter(values);
    onClose();
  };

  const handleDateChange = (dates: [Date | null, Date | null] | null) => {
    form.setFieldValue('startDate', dates?.[0] ?? undefined);
    form.setFieldValue('endDate', dates?.[1] ?? undefined);
  };

  const handleBannedOptionChange = (value: string) => {
    if (value === 'both') {
      form.setFieldValue('isBanned', undefined);
    } else {
      form.setFieldValue('isBanned', value === 'only');
    }
  };

  const handleSortByChange = (value: UserFilter['sortBy']) =>
    form.setFieldValue('sortBy', value);

  const handleSortModeChange = (value: string) =>
    form.setFieldValue('sortMode', value === 'asc' ? 'asc' : 'desc');

  const handleResetFilter = () => {
    form.reset();
    resetFilter();
    onClose();
  };

  const sortOptions: {
    value: string;
    label: string;
  }[] = [
    {
      value: 'username',
      label: t('username'),
    },
    {
      value: 'joinedOn',
      label: t('joined-on'),
    },
    {
      value: 'contributions',
      label: t('contribution'),
    },
  ];

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
          <DatePickerInput
            type="range"
            allowSingleDateInRange
            label={t('joined-date')}
            description={t('joined-date-description')}
            value={[form.values.startDate || null, form.values.endDate || null]}
            onChange={handleDateChange}
          />
          <Radio.Group
            name="showBanned"
            label={t('banned-state')}
            description={`${t('default-value')}: ${t('show-both')}`}
            value={
              form.values.isBanned === undefined
                ? 'both'
                : form.values.isBanned
                  ? 'only'
                  : 'no'
            }
            onChange={handleBannedOptionChange}>
            <Group mt="xs">
              <Radio value="both" label={t('show-both')} />
              <Radio value="only" label={t('banned-only')} />
              <Radio value="no" label={t('no-banned')} />
            </Group>
          </Radio.Group>

          <Select
            label={t('sort-by')}
            description={`${t('default-value')}: ${t('username')}`}
            value={form.values.sortBy ?? 'username'}
            data={sortOptions}
            onChange={(value) =>
              handleSortByChange(
                (value ?? 'username') as UserFilter['sortBy'],
              )
            }
          />
          <Radio.Group
            label={t('order')}
            description={`${t('default-value')}: ${t('asc')}`}
            value={form.values.sortMode as string}
            onChange={handleSortModeChange}>
            <Group mt="xs">
              <Radio value="asc" label={t('asc')} />
              <Radio value="desc" label={t('desc')} />
            </Group>
          </Radio.Group>

          <Space h="xs" />

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

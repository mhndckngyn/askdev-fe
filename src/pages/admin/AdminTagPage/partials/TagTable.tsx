import publicRoutePaths from '@/routes/user/public/paths';
import { ActionIcon, Anchor, Box, Group, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconClipboard, IconMoodSad, IconEdit } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import EditPage from './EditTagPage';
import { useState } from 'react';

type Pagination = {
  pageSize: number;
  currentPage: number;
  totalRecords: number;
  setPage: (page: number) => void;
};

export interface TagAdminView {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}

type TagTableProps = {
  records: TagAdminView[];
  pagination: Pagination;
  isLoading: boolean;
  selected: TagAdminView[];
  setSelected: (ids: TagAdminView[]) => void;
  setRecords: (updatedTag: TagAdminView) => void;
};

function TagTableComponent({
  records,
  pagination,
  isLoading,
  selected,
  setSelected,
  setRecords,
}: TagTableProps) {
  const { t } = useTranslation('adminQuestionPage');
  const clipboard = useClipboard();

  const [open, setOpen] = useState(false);

  const [tag, setTag] = useState<TagAdminView | null>(null);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleEdit = (selectedTag: TagAdminView) => {
    setTag(selectedTag);
    setOpen(true);
  };

  const renderRecordActions = (tag: TagAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip label={'edit'}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="orange"
          onClick={() => handleEdit(tag)}>
          <IconEdit size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyQuestionId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            clipboard.copy(tag.id);
            notifications.show({
              message: t('copySuccess', { id: tag.id }),
            });
          }}>
          <IconClipboard size={18} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  return (
    <>
      <DataTable
        records={records}
        totalRecords={pagination.totalRecords}
        recordsPerPage={pagination.pageSize}
        page={pagination.currentPage}
        onPageChange={pagination.setPage}
        selectedRecords={selected}
        onSelectedRecordsChange={setSelected}
        fetching={isLoading}
        columns={[
          {
            accessor: 'title',
            title: t('title'),
            width: 300,
            render: (row) => (
              <Anchor
                component={Link}
                to={publicRoutePaths.questionDetail.replace(':id', row.id)}
                lineClamp={2}>
                {row.name}
              </Anchor>
            ),
          },
          {
            accessor: 'descriptionVi',
            width: 380,
            title: t('poster'),
            render: (record) =>
              record.descriptionVi ?? <em>Chưa có dữ liệu</em>,
          },
          {
            accessor: 'descriptionEn',
            width: 380,
            title: t('poster'),
            render: (record) =>
              record.descriptionEn ?? <em>Chưa có dữ liệu</em>,
          },
          {
            accessor: 'actions',
            title: t('actions'),
            render: renderRecordActions,
          },
        ]}
        withTableBorder
        withColumnBorders
        noRecordsIcon={
          <Box>
            <IconMoodSad size={36} strokeWidth={1.5} />
          </Box>
        }
        noRecordsText={t('noResults')}
      />

      <EditPage
        open={open}
        handleToggle={handleToggle}
        tag={tag}
        setRecords={setRecords}
      />
    </>
  );
}

function areEqual(prevProps: TagTableProps, nextProps: TagTableProps): boolean {
  return (
    prevProps.records === nextProps.records &&
    prevProps.pagination.currentPage === nextProps.pagination.currentPage &&
    prevProps.pagination.totalRecords === nextProps.pagination.totalRecords &&
    prevProps.pagination.pageSize === nextProps.pagination.pageSize &&
    prevProps.isLoading === nextProps.isLoading &&
    prevProps.selected === nextProps.selected &&
    prevProps.setSelected === nextProps.setSelected
  );
}

const TagTable = React.memo(TagTableComponent, areEqual);
export default TagTable;

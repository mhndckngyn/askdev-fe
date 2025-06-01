import { ActionIcon, Box, Group, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCopy,
  IconMoodSad,
  IconEdit,
  IconClipboard,
} from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import React from 'react';
import { useTranslation } from 'react-i18next';
import EditPage from './EditTagPage';
import { useState } from 'react';
import TagDetailPage from './TagDetailPage';

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
  const { t } = useTranslation('adminTagPage');
  const clipboard = useClipboard();

  const [open, setOpen] = useState(false);

  const [tag, setTag] = useState<TagAdminView | null>(null);
  const handleToggle = () => setOpen((prev) => !prev);

  const handleEdit = (selectedTag: TagAdminView) => {
    setTag(selectedTag);
    setOpen(true);
  };

  const [openDetail, setOpenDetail] = useState(false);
  const handleToggleDetail = () => setOpenDetail((prev) => !prev);
  const [tagDetail, setTagDetail] = useState<TagAdminView | null>(null);
  const handleTagDetailPage = (selectedTag: TagAdminView) => {
    setTagDetail(selectedTag);
    setOpenDetail(true);
  };

  const renderRecordActions = (tag: TagAdminView) => (
    <Group gap={4} justify="center" wrap="nowrap">
      <Tooltip label={t('edit')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="pink"
          onClick={() => handleEdit(tag)}>
          <IconEdit size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('viewTag')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="orange"
          onClick={() => {
            handleTagDetailPage(tag);
          }}>
          <IconClipboard size={18} />
        </ActionIcon>
      </Tooltip>

      <Tooltip label={t('copyTagId')}>
        <ActionIcon
          size="sm"
          variant="subtle"
          onClick={() => {
            clipboard.copy(tag.id);
            notifications.show({
              message: t('copySuccess', { id: tag.id }),
            });
          }}>
          <IconCopy size={18} />
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
            accessor: 'name',
            title: t('name'),
            width: 300,
          },
          {
            accessor: 'descriptionVi',
            width: 380,
            title: t('descriptionVi'),
            render: (record) => (
              <div
                style={{
                  maxWidth: 360,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                {record.descriptionVi ?? <em>{t('notFound')}</em>}
              </div>
            ),
          },

          {
            accessor: 'descriptionEn',
            width: 380,
            title: t('descriptionEn'),
            render: (record) => (
              <div
                style={{
                  maxWidth: 360,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                {record.descriptionEn ?? <em>{t('notFound')}</em>}
              </div>
            ),
          },
          {
            accessor: 'actions',
            title: t('actions'),
            render: renderRecordActions,
            textAlign: 'center',
          },
        ]}
        withTableBorder
        verticalSpacing='sm'
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

      {tagDetail && (
        <TagDetailPage
          open={openDetail}
          handleToggle={handleToggleDetail}
          tag={tagDetail}
        />
      )}
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

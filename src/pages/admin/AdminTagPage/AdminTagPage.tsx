import { Group, Space, TextInput, Button } from '@mantine/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './AdminTagPage.module.css';
import TagTable from './partials/TagTable';
import SelectedRowActions from './partials/SelectedRowActions';
import { getTags } from './services';
import { IconPlus } from '@tabler/icons-react';
import AddTagPage from './partials/AddTagPage';

export interface TagAdminView {
  id: string;
  name: string;
  descriptionVi: string;
  descriptionEn: string;
}

export type Filter = {
  keyword?: string;
  tags?: string[];
  username?: string;
  isAnswered?: boolean;
  hiddenOption?: boolean;
  isEdited?: boolean;
  startDate?: Date;
  endDate?: Date;
};

const SEARCH_DELAY_MS = 300;
const PAGE_SIZE = 12;

export default function AdminTagPage() {
  const { t } = useTranslation('adminTagPage');

  const [tags, setTags] = useState<TagAdminView[]>([]);
  const [filter, setFilter] = useState<Filter>({});
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<TagAdminView[]>([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setFilter({ ...filter, keyword: inputValue });
    }, SEARCH_DELAY_MS);

    return () => {
      clearTimeout(delay);
    };
  }, [inputValue]);

  useEffect(() => {
    setLoading(true);

    const handleGetTags = async () => {
      const params = {
        ...filter,
        page,
        pageSize: PAGE_SIZE,
      };

      const response = await getTags(params);

      if (response.success) {
        setTags(response.content.tags);
        setTotalRecords(response.content.pagination.total);
      } else {
        setTags([]);
      }

      setLoading(false);
    };

    handleGetTags();
  }, [filter, page, render]);

  const pagination = useMemo(
    () => ({
      totalRecords,
      currentPage: page,
      pageSize: PAGE_SIZE,
      setPage,
    }),
    [totalRecords, page, setPage],
  );

  const handleSetSelected = useCallback((selected: TagAdminView[]) => {
    setSelectedTags(selected);
  }, []);

  const handleTagMergeSuccess = () => {
    setRender((prev) => prev + 1);
    setSelectedTags([]);
  };

  const handleEditSuccess = (updatedTag: TagAdminView) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag)),
    );
  };

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const onAddTag = () => setOpen(true);

  return (
    <div className={styles.page}>
      <Group gap="xs">
        <TextInput
          placeholder={t('searchName')}
          className={styles.searchInput}
          onChange={(e) => {
            const value = e.target.value;
            if (filter.keyword === '' && value === '') {
              return;
            }
            setInputValue(value);
          }}
        />
        <Button onClick={onAddTag} leftSection={<IconPlus size={18} />}>
          {t('buttonAdd')}
        </Button>
      </Group>
      <Space h="md" />

      <div className={styles.tableContainer}>
        <TagTable
          records={tags}
          pagination={pagination}
          isLoading={isLoading}
          selected={selectedTags}
          setSelected={handleSetSelected}
          setRecords={handleEditSuccess}
        />
      </div>
      <Space h="xs" />

      <SelectedRowActions
        selectedTags={selectedTags}
        onMergeSuccess={handleTagMergeSuccess}
      />

      <AddTagPage
        open={open}
        handleToggle={handleToggle}
        onSuccess={handleTagMergeSuccess}
      />
    </div>
  );
}

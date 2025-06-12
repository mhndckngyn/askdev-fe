import Tag from '@/types/Tag';
import { Pagination, Text, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TagsPage.module.css';
import TagsList from './partials/TagsList';
import { searchTags } from './services';

const timeout = 700;
const pageSize = 12;

export default function TagsPage() {
  const { t } = useTranslation('tagsPage');

  const [keyword, setKeyword] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // clear existing timeout before setting new timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const value = event.target.value;
    debounceTimeout.current = setTimeout(() => {
      setKeyword(value);
    }, timeout);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const resBody = await searchTags(
        keyword
          ? { keyword, sortBy: 'popularity' }
          : {
              sortBy: 'popularity',
              pagination: { count: pageSize, page: currentPage },
            },
      );

      if (resBody.success) {
        setTags(resBody.content.tags);

        // Chỉ cập nhật totalPages khi đang không tìm kiếm. Nếu đang tìm kiếm thì chỉ hiển thị 1 page
        if (!keyword && resBody.content.pagination) {
          setTotalPages(resBody.content.pagination.totalPages);
        }
      }
    };

    fetchTags();
  }, [keyword, currentPage]);

  // clear timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <Title className={styles.title}>{t('tags-title')}</Title>
      <Text className={styles.titleDescription}>
        {t('tags-title-description')}
      </Text>
      <TextInput
        onChange={handleInput}
        radius='xl'
        placeholder={t('filter-tag')}
        leftSection={<IconSearch size={16} />}
        className={styles.search}
      />

      <TagsList tags={tags} />

      {keyword === '' && (
        <Pagination
          value={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
          className={styles.pagination}
        />
      )}
    </div>
  );
}

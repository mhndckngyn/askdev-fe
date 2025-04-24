import { useErrorStore } from '@/stores/useErrorStore';
import Tag from '@/types/Tag';
import { Pagination, Text, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TagsPage.module.css';
import TagsList from './partials/TagsList';
import { searchTags } from './services';

const timeout = 700;
const pageSize = 16;

export default function TagsPage() {
  const { t } = useTranslation('tagsPage');
  const setError = useErrorStore((state) => state.setError);

  const [keyword, setKeyword] = useState('');
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    // clear existing timeout and set new timeout: search after delay duration
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setKeyword(event.target.value);
    }, timeout);
  };

  useEffect(() => {
    if (keyword === '') {
      return;
    }

    const search = async () => {
      const resBody = await searchTags({ keyword, sortBy: 'popularity' });
      if (resBody.success) {
        setTags(resBody.content.tags);
      } else {
        setError(t('api:tag.search-failed'));
      }
    };

    search();
  }, [keyword]);

  useEffect(() => {
    const fetch = async () => {
      const resBody = await searchTags({
        sortBy: 'popularity',
        pagination: { count: pageSize, page: currentPage },
      });

      if (resBody.success) {
        setTags(resBody.content.tags);
        setTotalPages(resBody.content.pagination.totalPages);
      } else {
        setError(t('api:tag.search-failed'));
      }
    };

    fetch();
  }, [currentPage]);

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
        placeholder={t('filter-tag')}
        leftSection={<IconSearch size={16} />}
        className={styles.search}
      />

      <TagsList tags={tags} />

      {/* change total */}
      {keyword === '' && (
        <Pagination
          total={totalPages}
          onChange={(value) => setCurrentPage(value)}
          className={styles.pagination}
        />
      )}
    </div>
  );
}

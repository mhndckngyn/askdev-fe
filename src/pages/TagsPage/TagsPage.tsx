import { mockTagList } from '@/mocks';
import Tag from '@/types/Tag';
import { Pagination, Text, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TagsList from './partials/TagsList';
import styles from './TagsPage.module.css';

const timeout = 700;

export default function TagsPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [tags, setTags] = useState<Tag[]>(mockTagList);
  const [page, setPage] = useState(1);

  const handleInput = () => {
    // clear existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // set new timeout: search in 700s
    debounceTimeout.current = setTimeout(() => {
      setSearchTerm(searchInputRef.current?.value || '');
    }, timeout);
  };

  useEffect(() => {}, [searchTerm]);

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
        ref={searchInputRef}
        onChange={handleInput}
        placeholder={t('filter-tag')}
        leftSection={<IconSearch size={16} />}
        radius="md"
        className={styles.search}
      />
      <TagsList tags={tags} />
      {/* change total */}
      <Pagination total={20} onChange={setPage} className={styles.pagination} />
    </div>
  );
}

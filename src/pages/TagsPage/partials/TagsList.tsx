import TagHoverCard from '@/components/TagHoverCard';
import Tag from '@/types/Tag';
import { Grid, Group, Text } from '@mantine/core';
import styles from '../TagsPage.module.css';
import { useTranslation } from 'react-i18next';

type TagsListProps = {
  tags: Tag[];
};

export default function TagsList({ tags }: TagsListProps) {
  const { t, i18n } = useTranslation('tagsPage');
  const currentLang = i18n.language;

  const tagCards = tags.map((tag) => (
    <Grid.Col key={tag.id} span={{ base: 6, md: 4, lg: 3 }}>
      <div className={styles.tagItem}>
        <Group gap="xs">
          <TagHoverCard id={tag.name} name={tag.name} />
          <Text size="sm">
            {tag.questionCount} {t('questions-count')}
          </Text>
        </Group>
        <Text lineClamp={4} className={styles.tagDescription}>
          {currentLang === 'vi' ? tag.descriptionVi : tag.descriptionEn}
        </Text>
      </div>
    </Grid.Col>
  ));

  return <Grid>{tagCards}</Grid>;
}

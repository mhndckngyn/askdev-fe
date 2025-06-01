import TagHoverCard from '@/components/TagHoverCard';
import { InterestTags } from '@/types/MemberProfile';
import { Box, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import styles from '../ProfilePage.module.css';

type TagsOfInterestProps = {
  tags: InterestTags[];
};

export default function TagsOfInterest({ tags }: TagsOfInterestProps) {
  const { t } = useTranslation('profilePage');

  return (
    <Box className={styles['profilePage-section']}>
      <Title order={2} className={styles.sectionTitle}>
        {t('tags-of-interest')}
      </Title>
      {tags.length > 0 ? (
        <SimpleGrid cols={2} className={styles['tagsOfInterest-list']}>
          {tags.map((tag) => (
            <Group
              justify="space-between"
              className={styles['tagOfInterest-item']}
              key={tag.id}>
              <TagHoverCard key={tag.id} id={tag.id} name={tag.name} />
              <Group gap="sm">
                <Text>
                  {tag.contributions}{' '}
                  <span className={styles.subtext}>
                    {t('contribution-count')}
                  </span>
                </Text>
                <Text>
                  {tag.upvotes}{' '}
                  <span className={styles.subtext}>{t('upvote-count')}</span>
                </Text>
              </Group>
            </Group>
          ))}
        </SimpleGrid>
      ) : (
        <Text size="sm" c="dimmed" ta="center">
          {t('nothing-here')} (｡•́︿•̀｡)
        </Text>
      )}
    </Box>
  );
}

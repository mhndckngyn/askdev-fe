import TagHoverCard from '@/components/TagHoverCard';
import publicRoutePaths from '@/routes/user/public/paths';
import { PostPreview } from '@/types';
import { Badge, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../ProfilePage.module.css';

type Props = {
  sectionTitle: string;
  posts: PostPreview[];
};

export default function TopPosts({ sectionTitle, posts }: Props) {
  const { t } = useTranslation('profilePage');

  return (
    <div className={styles['profilePage-section']}>
      <Title order={2} className={styles.sectionTitle}>
        {sectionTitle}
      </Title>
      {posts.length > 0 ? (
        <SimpleGrid cols={2}>
          {posts.map((post) => (
            <div
              className={styles['featuredPosts-item']}
              key={post.id}
              style={{ textDecoration: 'none' }}>
              <Group justify="space-between">
                <Text size="sm" c="dimmed">
                  {new Date(post.postedOn).toLocaleDateString()}
                </Text>
                <Badge
                  variant="gradient"
                  size="lg"
                  radius="sm"
                  gradient={{ from: 'pink', to: 'grape', deg: 90 }}
                  className={styles.postUpvoteBadge}
                  rightSection={<IconHeart size="14" stroke={3} />}>
                  {post.upvotes}
                </Badge>
              </Group>
              <Text
                component={Link}
                to={publicRoutePaths.questionDetail.replace(
                  ':id',
                  post.questionId ?? post.id,
                )}
                lineClamp={1}>
                {post.questionTitle}
              </Text>
              <Group gap="xs" mt="sm">
                {post.tags.map((tag) => (
                  <TagHoverCard id={tag.id} name={tag.name} key={tag.id} />
                ))}
              </Group>
            </div>
          ))}
        </SimpleGrid>
      ) : (
        <Text size="sm" c="dimmed" ta="center">
          {t('nothing-here')} (｡•́︿•̀｡)
        </Text>
      )}
    </div>
  );
}

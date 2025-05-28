import publicRoutePaths from '@/routes/user/public/paths';
import { PostPreview } from '@/types';
import { Badge, Group, SimpleGrid, Text, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import styles from '../ProfilePage.module.css';
import TagHoverCard from '@/components/TagHoverCard';

type Props = {
  sectionTitle: string;
  posts: PostPreview[];
};

export default function TopPosts({ sectionTitle, posts }: Props) {
  return (
    <div className={styles['profilePage-section']}>
      <Title order={2} className={styles.sectionTitle}>
        {sectionTitle}
      </Title>
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
              to={publicRoutePaths.questionDetail.replace(':id', post.id)}
              lineClamp={1}
              className={styles.title}>
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
    </div>
  );
}

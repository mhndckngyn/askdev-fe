import { PostPreview } from "@/types";
import { Box, Text, Title, Group, Badge } from "@mantine/core";
import styles from "../ProfilePage.module.css";

type FeaturedPostsProps = {
  title: string;
  posts: PostPreview[];
};

export default function FeaturedPosts({ title, posts }: FeaturedPostsProps) {
  return (
    <div className={styles.box}>
      <Title order={2} className={styles.sectionTitle}>
        {title}
      </Title>
      {posts.map((post) => (
        <Box key={post.id} className={styles.postItem}>
          <Group>
            <Badge
              variant="gradient"
              size="lg"
              radius="sm"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              className={styles.postUpvoteBadge}>
              {post.upvotes}
            </Badge>
            <Text lineClamp={1} className={styles.postTitle}>
              {post.questionTitle}
            </Text>
            <Text size="sm" c="dimmed">
              {new Date(post.postedOn).toLocaleDateString()}
            </Text>
          </Group>
        </Box>
      ))}
    </div>
  );
}

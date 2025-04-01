import TagHoverCard from "@/components/TagHoverCard";
import { InterestTags } from "@/types/MemberProfile";
import { Box, Group, Stack, Text, Title } from "@mantine/core";
import styles from "../ProfilePage.module.css";

type TagsOfInterestProps = {
  tags: InterestTags[];
};

export default function TagsOfInterest({ tags }: TagsOfInterestProps) {
  return (
    <Box className={styles.box}>
      <Title order={2} className={styles.sectionTitle}>
        Tags of Interest
      </Title>
      <Stack>
        {tags.map((tag) => (
          <Group key={tag.id} justify="space-between">
            <TagHoverCard key={tag.id} id={tag.id} name={tag.name} />
            <Group gap="sm">
              <Text>
                {tag.contributions}{" "}
                <span className={styles.subtext}>contributions</span>
              </Text>
              <Text>
                {tag.upvotes} <span className={styles.subtext}>upvotes</span>
              </Text>
            </Group>
          </Group>
        ))}
      </Stack>
    </Box>
  );
}

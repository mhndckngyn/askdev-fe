import TagName from "@/components/TagName";
import { TagType } from "@/types/type";
import { Grid, Group, Text } from "@mantine/core";
import styles from "./TagsPage.module.css";
import { useTranslation } from "react-i18next";

type TagsListProps = {
  tags: TagType[];
};

export default function TagsList({ tags }: TagsListProps) {
  const { t } = useTranslation();

  return (
    <Grid>
      {tags.map((tag) => (
        <Grid.Col key={tag.id} span={{ base: 6, md: 4, lg: 3 }}>
          <div className={styles.tagItem}>
            <Group gap="xs">
              <TagName name={tag.name} />
              <Text size="sm">
                {tag.questionsAllTime} {t("questions-count")}
              </Text>
            </Group>
            <Text lineClamp={4} className={styles.tagDescription}>
              {tag.description}
            </Text>
          </div>
        </Grid.Col>
      ))}
    </Grid>
  );
}

import { Group, HoverCard, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "./TagName.module.css";

type TagNameProps = {
  name: string;
};

export default function TagName({ name }: TagNameProps) {
  const safeUriName = encodeURIComponent(name);

  return (
    <Group>
      <HoverCard
        width={280}
        shadow="md"
        openDelay={500}
        position="bottom-start">
        <HoverCard.Target>
          <Link to={`/questions/${safeUriName}`} className={styles.tag}>
            {name}
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            Hover card is revealed when user hovers over target element, it will
            be hidden once mouse is not over both target and dropdown elements
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}

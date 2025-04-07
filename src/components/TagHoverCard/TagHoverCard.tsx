import { Group, HoverCard, Loader, Text } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TagHoverCard.module.css';
import clsx from 'clsx';

type TagNameProps = {
  id: string;
  name: string;
};

export default function TagHoverCard({ id, name }: TagNameProps) {
  const [tagInfo, setTagInfo] = useState<string | null>(null); // it returns an object
  const [loading, setLoading] = useState(false);
  const safeUriName = encodeURIComponent(id);

  const fetchTagInfo = async () => {
    if (tagInfo) {
      return;
    }

    setLoading(true);
    try {
      const response = await new Promise<string>((resolve) =>
        setTimeout(() => resolve(`Details about ${name}`), 1000),
      );
      setTagInfo(response);
    } catch (error) {
      setTagInfo('Failed to load tag details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Group>
      <HoverCard
        width={280}
        shadow="md"
        openDelay={100}
        position="bottom-start"
        onOpen={fetchTagInfo} // Fetch data when the user hovers
      >
        <HoverCard.Target>
          <Link to={`/questions/${safeUriName}`} className={styles.tag}>
            {name}
          </Link>
        </HoverCard.Target>
        <HoverCard.Dropdown className={clsx(loading && styles.center)}>
          {loading ? (
            <Loader size="sm" />
          ) : (
            <Text size="sm">{tagInfo || 'No info available'}</Text>
          )}
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}

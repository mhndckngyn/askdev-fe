import { ActionIcon, Indicator } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';
import { useState } from 'react';

export default function NotificationBell() {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <Indicator color="red" size={8} offset={4} disabled={!hasNotification}>
      <ActionIcon
        variant="outline"
        size="input-sm"
        onClick={() => {
          setHasNotification(false);
        }}>
        <IconBell size={18} />
      </ActionIcon>
    </Indicator>
  );
}

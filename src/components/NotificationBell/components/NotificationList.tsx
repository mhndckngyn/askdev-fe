// NotificationList.tsx
import React, { useState, useEffect } from 'react';
import { List, Box, Typography, Button, Divider } from '@mui/material';
import { NotificationsOff as NotificationsOffIcon } from '@mui/icons-material';
import { Notification } from '../types/notification';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationListProps) {
  const [displayCount, setDisplayCount] = useState(10);

  const displayedNotifications = notifications.slice(0, displayCount);
  const hasMore = notifications.length > displayCount;
  const remainingCount = notifications.length - displayCount;

  // Reset display count when notifications change
  useEffect(() => {
    setDisplayCount(10);
  }, [notifications]);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 5);
  };

  if (notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <NotificationsOffIcon
          sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary">
          Không có thông báo nào
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxHeight: 350, overflow: 'auto' }}>
      <List sx={{ p: 0 }}>
        {displayedNotifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <NotificationItem
              notification={notification}
              onMarkAsRead={onMarkAsRead}
              onMarkAsUnread={onMarkAsUnread}
              onDelete={onDelete}
            />
            {index < displayedNotifications.length - 1 && <Divider />}
          </React.Fragment>
        ))}

        {hasMore && (
          <>
            <Divider />
            <Box
              sx={{
                p: 1.5,
                textAlign: 'center',
                backgroundColor: 'background.paper',
              }}>
              <Button
                variant="text"
                size="small"
                onClick={handleLoadMore}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}>
                Xem thêm thông báo ({remainingCount} còn lại)
              </Button>
            </Box>
          </>
        )}
      </List>
    </Box>
  );
}

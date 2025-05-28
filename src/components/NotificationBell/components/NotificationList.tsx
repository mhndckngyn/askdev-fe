import React, { useState, useEffect } from 'react';
import { List, Box, Typography, Button, Divider } from '@mui/material';
import { NotificationsOff as NotificationsOffIcon } from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';
import { Notification } from '../types/notification';
import NotificationItem from './NotificationItem';
import { useTranslation } from 'react-i18next';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function NotificationList({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClose,
}: NotificationListProps) {
  const { t } = useTranslation('notification');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
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
      <Box
        sx={{
          p: 6,
          textAlign: 'center',
          background: isDark
            ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.05), transparent)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.03), transparent)',
        }}>
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            mb: 3,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-10px',
              left: '-10px',
              right: '-10px',
              bottom: '-10px',
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
              borderRadius: '50%',
              animation: 'pulse 3s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
                '50%': { opacity: 0.8, transform: 'scale(1.05)' },
              },
            },
          }}>
          <NotificationsOffIcon
            sx={{
              fontSize: 80,
              color: isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
              position: 'relative',
              zIndex: 1,
            }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
            fontWeight: 600,
            mb: 1,
          }}>
          {t('NO_NOTIFICATIONS')}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            maxWidth: '200px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
          {t('NOTIFICATION_GUIDE')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxHeight: 400,
        overflow: 'hidden',
        position: 'relative',
      }}>
      <Box
        sx={{
          maxHeight: 400,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: isDark
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.05)',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: isDark
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5))'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))',
            borderRadius: '3px',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(139, 92, 246, 0.7))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5))',
            },
          },
        }}>
        <List sx={{ p: 0 }}>
          {displayedNotifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <NotificationItem
                notification={notification}
                onMarkAsRead={onMarkAsRead}
                onMarkAsUnread={onMarkAsUnread}
                onDelete={onDelete}
                onClose={onClose}
              />
              {index < displayedNotifications.length - 1 && (
                <Divider
                  sx={{
                    borderColor: isDark
                      ? 'rgba(255, 255, 255, 0.08)'
                      : 'rgba(0, 0, 0, 0.06)',
                    mx: 2,
                  }}
                />
              )}
            </React.Fragment>
          ))}

          {hasMore && (
            <>
              <Divider
                sx={{
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.08)'
                    : 'rgba(0, 0, 0, 0.06)',
                  mx: 2,
                }}
              />
              <Box
                sx={{
                  p: 2,
                  textAlign: 'center',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))'
                    : 'linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(139, 92, 246, 0.03))',
                }}>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleLoadMore}
                  sx={{
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                    color: isDark ? '#c7d2fe' : '#4f46e5',
                    borderRadius: '16px',
                    px: 3,
                    py: 1,
                    border: `1px solid ${isDark ? 'rgba(199, 210, 254, 0.2)' : 'rgba(79, 70, 229, 0.2)'}`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      background: isDark
                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
                        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                      transform: 'translateY(-1px)',
                      boxShadow: isDark
                        ? '0 8px 25px rgba(99, 102, 241, 0.3)'
                        : '0 8px 25px rgba(99, 102, 241, 0.2)',
                    },
                  }}>
                  {t('SEE_MORE', { count: remainingCount })}
                </Button>
              </Box>
            </>
          )}
        </List>
      </Box>
    </Box>
  );
}

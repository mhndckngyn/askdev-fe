import {
  deleteNotificationById,
  deleteAllNotificationss,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  markNotificationAsUnread,
  markAllNotificationsAsUnread,
  getAllNotifications,
} from './services';

import { useUserStore } from '../../../stores/useUserStore';
import { useTranslation } from 'react-i18next';

import { useState, useMemo, useEffect } from 'react';
import { Notification, FilterType } from '../types/notification';

export function useNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const user = useUserStore((state) => state.user);
  const { t } = useTranslation('notification');

  useEffect(() => {
    getAllNotifications()
      .then((res) => {
        if (res.success && res.content) {
          const withMessages = res.content.map((notification: Notification) => {
            let message = '';
            switch (notification.type) {
              case 'QUESTION_VOTE':
                message = t('QUESTION_VOTE', {
                  username: notification.actor.username,
                  title: notification.contentTitle,
                });
                break;
              case 'ANSWER_VOTE':
                message = t('ANSWER_VOTE', {
                  username: notification.actor.username,
                  title: notification.contentTitle,
                });
                break;
              case 'COMMENT':
                message = t('COMMENT', {
                  username: notification.actor.username,
                  title: notification.contentTitle,
                });
                break;
              case 'ANSWER':
                message = t('ANSWER', {
                  username: notification.actor.username,
                  title: notification.contentTitle,
                });
                break;
              case 'ANSWER_CHOSEN':
                message = t('ANSWER_CHOSEN', {
                  title: notification.contentTitle,
                });
                break;
              default:
                message = t('DEFAULT_MESSAGE');
            }

            return {
              ...notification,
              message,
            };
          });

          setNotifications(withMessages);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user, t]);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const readCount = notifications.filter((n) => n.isRead).length;

  const filteredNotifications = useMemo(() => {
    switch (currentFilter) {
      case 'unread':
        return notifications.filter((n) => !n.isRead);
      case 'all':
      default:
        return notifications;
    }
  }, [notifications, currentFilter]);

  const markAsRead = async (notificationId: string) => {
    const response = await markNotificationAsRead(notificationId);
    if (response.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
      );
    }
  };

  const markAsUnread = async (notificationId: string) => {
    const response = await markNotificationAsUnread(notificationId);
    if (response.success) {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: false } : n,
        ),
      );
    }
  };

  const markAllAsRead = async () => {
    const response = await markAllNotificationsAsRead();
    if (response.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  const markAllAsUnread = async () => {
    const response = await markAllNotificationsAsUnread();
    if (response.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: false })));
    }
  };

  const deleteNotification = async (notificationId: string) => {
    const response = await deleteNotificationById(notificationId);
    if (response.success) {
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    }
  };

  const deleteAllNotifications = async () => {
    const response = await deleteAllNotificationss();
    if (response.success) {
      setNotifications([]);
      setCurrentFilter('all');
    }
  };

  // Popover actions
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (
    _: React.SyntheticEvent,
    newValue: FilterType,
  ) => {
    setCurrentFilter(newValue);
  };

  return {
    // State
    notifications,
    anchorEl,
    currentFilter,

    // Computed values
    unreadCount,
    readCount,
    filteredNotifications,
    isOpen: Boolean(anchorEl),

    // Actions
    markAsRead,
    markAsUnread,
    markAllAsRead,
    markAllAsUnread,
    deleteNotification,
    deleteAllNotifications,
    handleClick,
    handleClose,
    handleFilterChange,
  };
}

// useNotification.ts
import { useState, useMemo } from 'react';
import { Notification, FilterType } from '../types/notification';
import { mockNotifications } from '../data/mockNotifications';

export function useNotification() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Computed values
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

  // Notification actions
  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)),
    );
  };

  const markAsUnread = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: false } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAllAsUnread = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: false })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setCurrentFilter('all');
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

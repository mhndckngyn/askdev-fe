import {
  Badge,
  IconButton,
  Popover,
  Typography,
  Box,
  Chip,
  Paper,
  Tooltip,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  DoneAll as DoneAllIcon,
  ClearAll as ClearAllIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
} from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';
import { useNotification } from './hooks/useNotifications';
import NotificationList from './components/NotificationList';
import { useTranslation } from 'react-i18next';

export default function NotificationComponent() {
  const { t } = useTranslation('notification');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    notifications,
    anchorEl,
    currentFilter,
    unreadCount,
    readCount,
    filteredNotifications,
    isOpen,
    markAsRead,
    markAsUnread,
    markAllAsRead,
    markAllAsUnread,
    deleteNotification,
    deleteAllNotifications,
    handleClick,
    handleClose,
    handleFilterChange,
  } = useNotification();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Badge
        badgeContent={unreadCount}
        color="error"
        max={99}
        invisible={unreadCount === 0}
        overlap="circular"
        sx={{
          '& .MuiBadge-badge': {
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.75rem',
            minWidth: '20px',
            height: '20px',
          },
        }}>
        <IconButton
          onClick={handleClick}
          sx={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
              : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
            backdropFilter: 'blur(10px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
            borderRadius: '16px',
            color: isDark ? '#e0e7ff' : '#4f46e5',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
              transform: 'translateY(-2px)',
              boxShadow: isDark
                ? '0 8px 32px rgba(99, 102, 241, 0.3)'
                : '0 8px 32px rgba(99, 102, 241, 0.2)',
            },
            '&:active': {
              transform: 'translateY(0px)',
            },
          }}>
          <NotificationsIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
      </Badge>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              width: 420,
              maxHeight: 700,
              background: isDark
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'}`,
              borderRadius: '24px',
              boxShadow: isDark
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              overflow: 'hidden',
            },
          },
        }}>
        <Paper
          elevation={0}
          sx={{
            background: 'transparent',
            borderRadius: '24px',
          }}>
          <Box
            sx={{
              p: 3,
              background: isDark
                ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05))'
                : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03))',
              borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: isDark
                    ? 'linear-gradient(135deg, #e0e7ff, #c7d2fe)'
                    : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  fontSize: '1.25rem',
                }}>
                {t('NOTIFICATIONS')}
              </Typography>
              {unreadCount > 0 && (
                <Chip
                  label={t('UNREAD_COUNT', { count: unreadCount })}
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: '24px',
                    borderRadius: '12px',
                    '& .MuiChip-label': {
                      px: 1.5,
                    },
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title={t('MARK_ALL_AS_READ')} arrow placement="top">
                <IconButton
                  size="small"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  sx={{
                    background: isDark
                      ? 'rgba(34, 197, 94, 0.1)'
                      : 'rgba(34, 197, 94, 0.05)',
                    color: '#22c55e',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(34, 197, 94, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    '&:disabled': {
                      background: 'transparent',
                      color: isDark
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.3)',
                    },
                  }}>
                  <DoneAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('MARK_ALL_AS_UNREAD')} arrow placement="top">
                <IconButton
                  size="small"
                  onClick={markAllAsUnread}
                  disabled={readCount === 0}
                  sx={{
                    background: isDark
                      ? 'rgba(59, 130, 246, 0.1)'
                      : 'rgba(59, 130, 246, 0.05)',
                    color: '#3b82f6',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(59, 130, 246, 0.2)',
                      transform: 'scale(1.05)',
                    },
                    '&:disabled': {
                      background: 'transparent',
                      color: isDark
                        ? 'rgba(255, 255, 255, 0.3)'
                        : 'rgba(0, 0, 0, 0.3)',
                    },
                  }}>
                  <MarkEmailUnreadIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title={t('DELETE_ALL')} arrow placement="top">
                <IconButton
                  size="small"
                  onClick={deleteAllNotifications}
                  sx={{
                    background: isDark
                      ? 'rgba(239, 68, 68, 0.1)'
                      : 'rgba(239, 68, 68, 0.05)',
                    color: '#ef4444',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 0.2)',
                      transform: 'scale(1.05)',
                    },
                  }}>
                  <ClearAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Filter Tabs */}
          <Box
            sx={{
              borderBottom: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
              px: 2,
              background: isDark
                ? 'rgba(17, 24, 39, 0.3)'
                : 'rgba(248, 250, 252, 0.5)',
            }}>
            <Tabs
              value={currentFilter}
              onChange={handleFilterChange}
              variant="fullWidth"
              sx={{
                '& .MuiTabs-indicator': {
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  height: '3px',
                  borderRadius: '2px',
                },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: isDark
                    ? 'rgba(255, 255, 255, 0.7)'
                    : 'rgba(0, 0, 0, 0.7)',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    background: isDark
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
                      : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                    color: isDark ? '#e0e7ff' : '#4f46e5',
                  },
                  '&:hover': {
                    background: isDark
                      ? 'rgba(255, 255, 255, 0.05)'
                      : 'rgba(0, 0, 0, 0.03)',
                  },
                },
              }}>
              <Tab
                label={t('ALL_TAB', { count: notifications.length })}
                value="all"
              />
              <Tab
                label={t('UNREAD_TAB', { count: unreadCount })}
                value="unread"
              />
            </Tabs>
          </Box>

          {/* Notification List */}
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDelete={deleteNotification}
            onClose={handleClose}
          />
        </Paper>
      </Popover>
    </Box>
  );
}

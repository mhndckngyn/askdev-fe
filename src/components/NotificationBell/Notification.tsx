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
import { useNotification } from './hooks/useNotifications';
import NotificationList from './components/NotificationList';

export default function NotificationComponent() {
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
        overlap="circular">
        <IconButton
          onClick={handleClick}
          sx={{
            color: 'text.primary',
            '&:hover': { backgroundColor: 'action.hover' },
          }}>
          <NotificationsIcon />
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
              width: 400,
              maxHeight: 650,
              boxShadow: 3,
              border: 1,
              borderColor: 'divider',
            },
          },
        }}>
        <Paper elevation={0}>
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Thông báo
              {unreadCount > 0 && (
                <Chip
                  label={`${unreadCount} chưa đọc`}
                  size="small"
                  color="primary"
                  sx={{ ml: 1, fontSize: '0.75rem' }}
                />
              )}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Đánh dấu tất cả đã đọc">
                <IconButton
                  size="small"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}>
                  <DoneAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Đánh dấu tất cả chưa đọc">
                <IconButton
                  size="small"
                  onClick={markAllAsUnread}
                  disabled={readCount === 0}>
                  <MarkEmailUnreadIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Xóa tất cả">
                <IconButton
                  size="small"
                  onClick={deleteAllNotifications}
                  sx={{ color: 'error.main' }}>
                  <ClearAllIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Filter Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
            <Tabs
              value={currentFilter}
              onChange={handleFilterChange}
              variant="fullWidth"
              textColor="primary"
              indicatorColor="primary">
              <Tab
                label={`Tất cả (${notifications.length})`}
                value="all"
                sx={{ textTransform: 'none', fontSize: '0.875rem' }}
              />
              <Tab
                label={`Chưa đọc (${unreadCount})`}
                value="unread"
                sx={{ textTransform: 'none', fontSize: '0.875rem' }}
              />
            </Tabs>
          </Box>

          {/* Notification List */}
          <NotificationList
            notifications={filteredNotifications}
            onMarkAsRead={markAsRead}
            onMarkAsUnread={markAsUnread}
            onDelete={deleteNotification}
          />
        </Paper>
      </Popover>
    </Box>
  );
}

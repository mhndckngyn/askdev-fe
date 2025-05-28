import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
} from '@mui/icons-material';
import { Notification } from '../types/notification';
import FormatTime from '../utils/timeUtils';
import NotificationIcon from './NotificationIcon';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}: NotificationItemProps) {
  return (
    <ListItem
      sx={{
        backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
        '&:hover': { backgroundColor: 'action.selected' },
        borderLeft: notification.isRead ? 'none' : '3px solid',
        borderLeftColor: 'primary.main',
        py: 1.5,
      }}>
      <ListItemAvatar>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={notification.actor.profilePicture}
            sx={{ width: 40, height: 40 }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              backgroundColor: 'background.paper',
              borderRadius: '50%',
              p: 0.25,
              border: '2px solid white',
            }}>
            <NotificationIcon type={notification.type} />
          </Box>
        </Box>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box>
            <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
              {notification.message}
            </Typography>
          </Box>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', mt: 0.5 }}>
            <FormatTime createdAt={notification.createdAt} />
          </Typography>
        }
      />

      <ListItemSecondaryAction>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip
            title={
              notification.isRead ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'
            }>
            <IconButton
              size="small"
              onClick={() =>
                notification.isRead
                  ? onMarkAsUnread(notification.id)
                  : onMarkAsRead(notification.id)
              }>
              {notification.isRead ? (
                <MarkEmailUnreadIcon fontSize="small" />
              ) : (
                <MarkEmailReadIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          <Tooltip title="Xóa thông báo">
            <IconButton
              size="small"
              onClick={() => onDelete(notification.id)}
              sx={{ color: 'error.main' }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

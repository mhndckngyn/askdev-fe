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
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Delete as DeleteIcon,
  MarkEmailRead as MarkEmailReadIcon,
  MarkEmailUnread as MarkEmailUnreadIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';
import { useState, MouseEvent } from 'react';
import { Notification } from '../types/notification';
import FormatTime from '../utils/timeUtils';
import NotificationIcon from './NotificationIcon';
import { useTranslation } from 'react-i18next';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClose,
}: NotificationItemProps) {
  const { t } = useTranslation('notification');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClick = () => {
    if (notification.questionId) {
      navigate(`/questions/${notification.questionId}`);
    }
  };

  const handleMenuClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id);
    handleMenuClose();
  };

  const handleMarkAsUnread = () => {
    onMarkAsUnread(notification.id);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(notification.id);
    handleMenuClose();
  };

  return (
    <ListItem
      onClick={() => {
        onMarkAsRead(notification.id);
        onClose();
        handleClick();
      }}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        background: notification.isRead
          ? 'transparent'
          : isDark
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05))'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.03))',
        borderLeft: notification.isRead ? 'none' : '4px solid',
        borderLeftColor: notification.isRead ? 'transparent' : 'primary.main',
        py: 2,
        px: 2,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          background: isDark
            ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.08))'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.05))',
          '& .notification-actions': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
        '&::before': notification.isRead
          ? {}
          : {
              content: '""',
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '0 2px 2px 0',
            },
      }}>
      <ListItemAvatar>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={notification.actor.profilePicture}
            sx={{
              width: 48,
              height: 48,
              border: `3px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
              boxShadow: isDark
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              background: isDark
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.9))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              p: 0.5,
              border: `2px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
              boxShadow: isDark
                ? '0 4px 12px rgba(0, 0, 0, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}>
            <NotificationIcon type={notification.type} />
          </Box>
        </Box>
      </ListItemAvatar>

      <ListItemText
        primary={
          <Box sx={{ pr: 8, ml: 1 }}>
            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.5,
                color: isDark
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(0, 0, 0, 0.87)',
                fontWeight: notification.isRead ? 400 : 600,
                mb: 0.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word',
                hyphens: 'auto',
              }}>
              {notification.message}
            </Typography>
          </Box>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              ml: 2,
              color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)',
              fontWeight: 500,
              display: 'block',
            }}>
            <FormatTime createdAt={notification.createdAt} />
          </Typography>
        }
      />

      <ListItemSecondaryAction
        className="notification-actions"
        sx={{
          opacity: 0.7,
          transform: 'translateX(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
        <Tooltip title={t('OPTIONS')} arrow placement="top">
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{
              background: isDark
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
                transform: 'scale(1.1)',
                color: isDark
                  ? 'rgba(255, 255, 255, 0.9)'
                  : 'rgba(0, 0, 0, 0.8)',
              },
            }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              background: isDark
                ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              borderRadius: '12px',
              boxShadow: isDark
                ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
                : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              mt: 1,
              minWidth: 200,
            },
          }}>
          <MenuItem
            onClick={
              notification.isRead ? handleMarkAsUnread : handleMarkAsRead
            }
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: '8px',
              mx: 1,
              mb: 0.5,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: notification.isRead
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgba(34, 197, 94, 0.1)',
              },
            }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              {notification.isRead ? (
                <MarkEmailUnreadIcon
                  fontSize="small"
                  sx={{ color: '#3b82f6' }}
                />
              ) : (
                <MarkEmailReadIcon fontSize="small" sx={{ color: '#22c55e' }} />
              )}
            </ListItemIcon>
            <Typography
              sx={{
                color: notification.isRead ? '#3b82f6' : '#22c55e',
                fontWeight: 500,
              }}>
              {notification.isRead ? t('MARK_AS_UNREAD') : t('MARK_AS_READ')}
            </Typography>
          </MenuItem>

          <MenuItem
            onClick={handleDelete}
            sx={{
              py: 1.5,
              px: 2,
              borderRadius: '8px',
              mx: 1,
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(239, 68, 68, 0.1)',
              },
            }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DeleteIcon fontSize="small" sx={{ color: '#ef4444' }} />
            </ListItemIcon>
            <Typography
              sx={{
                color: '#ef4444',
                fontWeight: 500,
              }}>
              {t('DELETE_NOTIFICATION')}
            </Typography>
          </MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

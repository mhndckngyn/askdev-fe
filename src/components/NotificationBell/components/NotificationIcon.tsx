import { Box } from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import { NotificationType } from '../types/notification';

interface NotificationIconProps {
  type: NotificationType;
}

export default function NotificationIcon({ type }: NotificationIconProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const getIconConfig = (notificationType: NotificationType) => {
    switch (notificationType) {
      case 'QUESTION_VOTE':
        return {
          icon: '⭐',
          gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
          shadowColor: 'rgba(59, 130, 246, 0.4)',
        };
      case 'ANSWER_VOTE':
        return {
          icon: '⭐',
          gradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
          shadowColor: 'rgba(99, 102, 241, 0.4)',
        };
      case 'COMMENT_VOTE':
        return {
          icon: '⭐',
          gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
          shadowColor: 'rgba(236, 72, 153, 0.4)',
        };
      case 'COMMENT':
        return {
          icon: '💬',
          gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
          shadowColor: 'rgba(245, 158, 11, 0.4)',
        };
      case 'ANSWER':
        return {
          icon: '💡',
          gradient: 'linear-gradient(135deg, #10b981, #059669)',
          shadowColor: 'rgba(16, 185, 129, 0.4)',
        };
      case 'ANSWER_CHOSEN':
        return {
          icon: '✅',
          gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
          shadowColor: 'rgba(34, 197, 94, 0.4)',
        };
      default:
        return {
          icon: '🔔',
          gradient: 'linear-gradient(135deg, #6b7280, #4b5563)',
          shadowColor: 'rgba(107, 114, 128, 0.4)',
        };
    }
  };

  const config = getIconConfig(type);

  return (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        background: config.gradient,
        color: 'white',
        fontWeight: 'bold',
        position: 'relative',
        boxShadow: `0 4px 12px ${config.shadowColor}`,
        border: `2px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: '-2px',
          background: config.gradient,
          borderRadius: '50%',
          opacity: 0.3,
          zIndex: -1,
          filter: 'blur(4px)',
        },
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: `0 6px 20px ${config.shadowColor}`,
        },
      }}>
      {config.icon}
    </Box>
  );
}

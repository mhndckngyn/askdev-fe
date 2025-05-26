import React from 'react';
import { NotificationType } from '../types/notification';

interface NotificationIconProps {
  type: NotificationType;
}

export default function NotificationIcon({ type }: NotificationIconProps) {
  const iconStyle: React.CSSProperties = {
    width: 16,
    height: 16,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'white',
    fontWeight: 'bold',
  };

  const getIconConfig = (notificationType: NotificationType) => {
    switch (notificationType) {
      case 'QUESTION_VOTE':
      case 'ANSWER_VOTE':
        return { icon: '👍', bg: '#1976d2' };
      case 'COMMENT':
        return { icon: '💬', bg: '#ed6c02' };
      case 'ANSWER':
        return { icon: '💡', bg: '#2e7d32' };
      case 'ANSWER_CHOSEN':
        return { icon: '✅', bg: '#2e7d32' };
      default:
        return { icon: '🔔', bg: '#757575' };
    }
  };

  const config = getIconConfig(type);

  return (
    <span style={{ ...iconStyle, backgroundColor: config.bg }}>
      {config.icon}
    </span>
  );
}

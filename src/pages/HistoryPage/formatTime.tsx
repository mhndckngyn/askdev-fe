import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

type FormatTimeProps = {
  createdAt: string;
};

const FormatTime: React.FC<FormatTimeProps> = ({ createdAt }) => {
  const { i18n } = useTranslation();

  const locale = i18n.language.startsWith('vi') ? vi : enUS;

  let timeAgo = formatDistanceToNow(new Date(createdAt), {
    locale,
    addSuffix: true,
  });

  timeAgo = timeAgo.charAt(0).toUpperCase() + timeAgo.slice(1);
  return <span>{timeAgo}</span>;
};

export default FormatTime;

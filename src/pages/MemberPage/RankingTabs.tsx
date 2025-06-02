import React from 'react';
import { Paper, Tabs, Tab } from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  QuestionAnswer as QuestionIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { RankingType, RankingTabConfig } from './types';

interface RankingTabsProps {
  selectedTab: RankingType;
  onTabChange: (event: React.SyntheticEvent, newValue: RankingType) => void;
}

export const RankingTabs: React.FC<RankingTabsProps> = ({
  selectedTab,
  onTabChange,
}) => {
  const { t } = useTranslation('member');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const rankingTabs: RankingTabConfig[] = [
    {
      label: t('tabs.reputation'),
      icon: <StarIcon />,
      value: 'reputation',
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    },
    {
      label: t('tabs.upvotes'),
      icon: <ThumbUpIcon />,
      value: 'upvotes',
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    },
    {
      label: t('tabs.chosen'),
      icon: <TrophyIcon />,
      value: 'chosen',
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)',
    },
    {
      label: t('tabs.answers'),
      icon: <QuestionIcon />,
      value: 'answers',
      color: '#6C5CE7',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
    },
  ];

  const getActiveTabConfig = () => {
    return (
      rankingTabs.find((tab) => tab.value === selectedTab) || rankingTabs[0]
    );
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 4,
        borderRadius: 4,
        background: isDark
          ? 'rgba(33, 37, 41, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
        overflow: 'hidden',
      }}>
      <Tabs
        value={selectedTab}
        onChange={onTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            fontWeight: 600,
            minHeight: 80,
            fontSize: '1.1rem',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
          },
          '& .Mui-selected': {
            background: getActiveTabConfig().gradient,
            color: 'white !important',
            '& .MuiTab-iconWrapper': {
              color: 'white',
            },
          },
        }}>
        {rankingTabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
          />
        ))}
      </Tabs>
    </Paper>
  );
};

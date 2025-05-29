import React from 'react';
import { Box, Typography, Tabs, Tab, Badge } from '@mui/material';
import { User, Tag, HelpCircle, Layers } from 'lucide-react';
import { MockResults } from './types';
import { useTranslation } from 'react-i18next';

interface SearchTabsProps {
  activeTab: number;
  onTabChange: (_event: React.SyntheticEvent, newValue: number) => void;
  mockResults: MockResults;
  isDark: boolean;
}

export default function SearchTabs({
  activeTab,
  onTabChange,
  mockResults,
  isDark,
}: SearchTabsProps) {
  const { t } = useTranslation('search');

  const getResultCount = () => {
    return (
      (mockResults?.questions.length ?? 0) +
      (mockResults?.tags.length ?? 0) +
      (mockResults?.users.length ?? 0)
    );
  };

  const tabData = [
    {
      icon: Layers,
      label: t('all'),
      count: getResultCount(),
      color: '#43e97b',
    },
    {
      icon: HelpCircle,
      label: t('question'),
      count: mockResults?.questions.length ?? 0,
      color: '#4facfe',
    },
    {
      icon: Tag,
      label: t('tag'),
      count: mockResults?.tags.length ?? 0,
      color: '#667eea',
    },
    {
      icon: User,
      label: t('member'),
      count: mockResults?.users.length ?? 0,
      color: '#f093fb',
    },
  ];

  return (
    <Box
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(25,25,25,0.9) 0%, rgba(40,40,40,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.95) 100%)',
        borderBottom: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${tabData[activeTab]?.color}40, transparent)`,
        },
      }}>
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="fullWidth"
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            minHeight: 72,
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'transparent',
              transition: 'all 0.3s ease',
              zIndex: 0,
            },
            '&:hover': {
              '&::before': {
                background: isDark
                  ? 'rgba(255,255,255,0.03)'
                  : 'rgba(0,0,0,0.02)',
              },
              transform: 'translateY(-2px)',
            },
            '&.Mui-selected': {
              '&::before': {
                background: `linear-gradient(135deg, ${tabData[activeTab]?.color}15, ${tabData[activeTab]?.color}08)`,
              },
            },
          },
          '& .MuiTabs-indicator': {
            height: 3,
            borderRadius: '3px 3px 0 0',
            background: `linear-gradient(90deg, ${tabData[activeTab]?.color}, ${tabData[activeTab]?.color}80)`,
            boxShadow: `0 0 10px ${tabData[activeTab]?.color}50`,
          },
        }}>
        {tabData.map((tab, index) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === index;

          return (
            <Tab
              key={index}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    position: 'relative',
                    zIndex: 1,
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: 2,
                      background: isActive
                        ? `linear-gradient(135deg, ${tab.color}, ${tab.color}80)`
                        : isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive
                        ? `0 4px 12px ${tab.color}30`
                        : 'none',
                    }}>
                    <IconComponent
                      size={16}
                      style={{
                        color: isActive
                          ? 'white'
                          : isDark
                            ? 'rgba(255,255,255,0.7)'
                            : 'rgba(0,0,0,0.6)',
                      }}
                    />
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: isActive ? 700 : 600,
                      color: isActive
                        ? tab.color
                        : isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(0,0,0,0.7)',
                      transition: 'all 0.3s ease',
                    }}>
                    {tab.label}
                  </Typography>

                  <Badge
                    badgeContent={tab.count}
                    sx={{
                      '& .MuiBadge-badge': {
                        background: isActive
                          ? `linear-gradient(135deg, ${tab.color}, ${tab.color}80)`
                          : isDark
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.1)',
                        color: isActive
                          ? 'white'
                          : isDark
                            ? 'rgba(255,255,255,0.7)'
                            : 'rgba(0,0,0,0.7)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 20,
                        minWidth: 20,
                        borderRadius: 2,
                        border: isActive
                          ? 'none'
                          : isDark
                            ? '1px solid rgba(255,255,255,0.1)'
                            : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: isActive
                          ? `0 2px 8px ${tab.color}30`
                          : 'none',
                        transition: 'all 0.3s ease',
                      },
                    }}>
                    <Box sx={{ width: 8, height: 8 }} />
                  </Badge>
                </Box>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

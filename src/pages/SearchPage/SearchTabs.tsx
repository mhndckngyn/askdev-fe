import React from 'react';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import {
  Person as PersonIcon,
  QuestionAnswer as QuestionIcon,
  Tag as TagIcon,
} from '@mui/icons-material';
import { MockResults } from './types';

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
  const getResultCount = () => {
    return (
      (mockResults?.questions.length ?? 0) +
      (mockResults?.tags.length ?? 0) +
      (mockResults?.users.length ?? 0)
    );
  };

  return (
    <Tabs
      value={activeTab}
      onChange={onTabChange}
      sx={{
        backgroundColor: isDark ? 'grey.900' : 'grey.50',
        '& .MuiTab-root': {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          minHeight: 56,
        },
      }}>
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>All</Typography>
            <Chip label={getResultCount()} size="small" />
          </Box>
        }
      />
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <QuestionIcon sx={{ fontSize: 18 }} />
            <Typography>Questions</Typography>
            <Chip label={mockResults?.questions.length ?? 0} size="small" />
          </Box>
        }
      />
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TagIcon sx={{ fontSize: 18 }} />
            <Typography>Tags</Typography>
            <Chip label={mockResults?.tags.length ?? 0} size="small" />
          </Box>
        }
      />
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ fontSize: 18 }} />
            <Typography>Users</Typography>
            <Chip label={mockResults?.users.length ?? 0} size="small" />
          </Box>
        }
      />
    </Tabs>
  );
}

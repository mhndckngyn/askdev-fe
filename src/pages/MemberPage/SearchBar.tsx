import React from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { t } = useTranslation('member');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        borderRadius: 4,
        background: isDark
          ? 'rgba(33, 37, 41, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 32px rgba(0, 0, 0, 0.1)',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          gap: 2,
        }}>
        <SearchIcon
          sx={{
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
            fontSize: 24,
          }}
        />
        <InputBase
          placeholder={t('search.placeholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{
            flex: 1,
            fontSize: '1.1rem',
            color: isDark ? 'white' : 'inherit',
            '& input::placeholder': {
              color: isDark ? 'rgba(255, 255, 255, 0.5)' : 'text.secondary',
              opacity: 1,
            },
          }}
        />
        {searchQuery && (
          <IconButton
            onClick={() => onSearchChange('')}
            sx={{
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.secondary',
              '&:hover': {
                background: isDark
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.04)',
              },
            }}>
            <ClearIcon />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

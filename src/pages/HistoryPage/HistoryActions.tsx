import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { Button, Stack, Badge, alpha } from '@mui/material';
import {
  Delete as DeleteIcon,
  SelectAll as SelectAllIcon,
} from '@mui/icons-material';

interface HistoryActionsProps {
  selectedCount: number;
  totalCount: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onDeleteSelected: () => void;
  onDeleteAll: () => void;
}

export const HistoryActions: React.FC<HistoryActionsProps> = ({
  selectedCount,
  totalCount,
  allSelected,
  onSelectAll,
  onDeleteSelected,
  onDeleteAll,
}) => {
  const { t } = useTranslation('history');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: 'stretch', sm: 'center' }}>
      <Button
        startIcon={<SelectAllIcon />}
        onClick={onSelectAll}
        disabled={totalCount === 0}
        variant="contained"
        sx={{
          borderRadius: 3,
          background: isDark
            ? 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)'
            : 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
          boxShadow: '0 4px 15px rgba(116, 185, 255, 0.4)',
          '&:hover': {
            background: isDark
              ? 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)'
              : 'linear-gradient(135deg, #0984e3 0%, #74b9ff 100%)',
            boxShadow: '0 6px 20px rgba(116, 185, 255, 0.6)',
          },
          '&:disabled': {
            background: isDark ? '#34495e' : '#bdc3c7',
            color: isDark ? '#7f8c8d' : '#fff',
          },
        }}>
        {allSelected
          ? t('history.actions.deselectAll')
          : t('history.actions.selectAll')}
      </Button>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Badge badgeContent={selectedCount} color="error">
          <Button
            startIcon={<DeleteIcon />}
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 3,
              background: isDark
                ? 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)'
                : 'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
              boxShadow: '0 4px 15px rgba(255, 118, 117, 0.4)',
              '&:hover': {
                background: isDark
                  ? 'linear-gradient(135deg, #d63031 0%, #ff7675 100%)'
                  : 'linear-gradient(135deg, #d63031 0%, #ff7675 100%)',
                boxShadow: '0 6px 20px rgba(255, 118, 117, 0.6)',
              },
              '&:disabled': {
                background: isDark ? '#34495e' : '#bdc3c7',
                color: isDark ? '#7f8c8d' : '#fff',
              },
            }}>
            {t('history.actions.deleteSelected')}
          </Button>
        </Badge>

        <Button
          startIcon={<DeleteIcon />}
          onClick={onDeleteAll}
          disabled={totalCount === 0}
          variant="outlined"
          color="error"
          sx={{
            borderRadius: 3,
            borderColor: isDark ? '#ff7675' : '#ff7675',
            color: isDark ? '#ff7675' : '#ff7675',
            '&:hover': {
              borderColor: isDark ? '#d63031' : '#d63031',
              color: isDark ? '#d63031' : '#d63031',
              bgcolor: alpha('#ff7675', 0.1),
            },
            '&:disabled': {
              borderColor: isDark ? '#7f8c8d' : '#bdc3c7',
              color: isDark ? '#7f8c8d' : '#bdc3c7',
            },
          }}>
          {t('history.actions.deleteAll')}
        </Button>
      </Stack>
    </Stack>
  );
};

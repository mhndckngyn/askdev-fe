import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import {
  Box,
  TextField,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Stack,
  Card,
  CardContent,
  Typography,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  HistoryFilters as IHistoryFilters,
  HistoryType,
  HISTORY_TYPE_LABELS,
  HistoryTypeColor,
} from './types';

interface HistoryFiltersProps {
  filters: IHistoryFilters;
  onFiltersChange: (filters: Partial<IHistoryFilters>) => void;
  onClearFilters: () => void;
}

export const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const { t } = useTranslation('history');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const cardBg = isDark
    ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    : 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)';

  const textFieldBg = isDark ? '#34495e' : '#f8f9fa';
  const textColor = isDark ? '#ecf0f1' : '#2c3e50';

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 3,
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        background: cardBg,
        border: '1px solid',
        borderColor: alpha(isDark ? '#7f8c8d' : '#667eea', 0.1),
      }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <FilterIcon sx={{ color: isDark ? '#74b9ff' : '#667eea', mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: textColor }}>
            {t('history.filters.title')}
          </Typography>
        </Box>

        <Stack spacing={3}>
          {/* Search Field */}
          <TextField
            fullWidth
            placeholder={t('history.filters.searchPlaceholder')}
            value={filters.searchQuery}
            onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: textFieldBg,
                color: textColor,
                '&:hover': {
                  bgcolor: isDark ? '#3d566e' : '#f1f3f4',
                },
                '&.Mui-focused': {
                  bgcolor: isDark ? '#2c3e50' : '#fff',
                  boxShadow: `0 4px 20px ${alpha(isDark ? '#74b9ff' : '#667eea', 0.15)}`,
                },
              },
              '& .MuiInputLabel-root': {
                color: textColor,
              },
            }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ mr: 1, color: isDark ? '#74b9ff' : '#667eea' }}
                />
              ),
            }}
          />
          {/* Activity Type Selector */}
          <FormControl fullWidth>
            <InputLabel
              sx={{ color: isDark ? '#74b9ff' : '#667eea', fontWeight: 600 }}>
              {t('history.filters.activityType')}
            </InputLabel>
            <Select
              multiple
              value={filters.types}
              onChange={(e) =>
                onFiltersChange({ types: e.target.value as HistoryType[] })
              }
              input={
                <OutlinedInput label={t('history.filters.activityType')} />
              }
              sx={{
                borderRadius: 3,
                bgcolor: textFieldBg,
                color: textColor,
                '&:hover': {
                  bgcolor: isDark ? '#3d566e' : '#f1f3f4',
                },
                '& .MuiSelect-icon': {
                  color: isDark ? '#74b9ff' : '#667eea',
                },
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={t(HISTORY_TYPE_LABELS[value] as any)}
                      size="small"
                      sx={{
                        bgcolor: HistoryTypeColor(value),
                        color: 'white',
                        fontWeight: 600,
                        '& .MuiChip-deleteIcon': {
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: 2,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                    mt: 1,
                    bgcolor: isDark ? '#2c3e50' : 'white',
                  },
                },
                MenuListProps: {
                  sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 1,
                    p: 2,
                  },
                },
              }}>
              {Object.values(HistoryType).map((type) => (
                <MenuItem
                  key={type}
                  value={type}
                  sx={{
                    borderRadius: 2,
                    color: textColor,
                    '&:hover': {
                      bgcolor: alpha(HistoryTypeColor(type), 0.1),
                    },
                  }}>
                  <Checkbox
                    checked={filters.types.includes(type)}
                    sx={{
                      color: HistoryTypeColor(type),
                      '&.Mui-checked': {
                        color: HistoryTypeColor(type),
                      },
                    }}
                  />
                  <ListItemText
                    primary={t(HISTORY_TYPE_LABELS[type] as any)}
                    sx={{ ml: 1 }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <DatePicker
              label={t('history.filters.fromDate')}
              value={filters.dateRange.start}
              onChange={(date) =>
                onFiltersChange({
                  dateRange: { ...filters.dateRange, start: date },
                })
              }
              slotProps={{
                textField: {
                  size: 'medium',
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: textFieldBg,
                      color: textColor,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: isDark ? '#3d566e' : '#f1f3f4',
                        transform: 'scale(1.02)',
                      },
                      '&.Mui-focused': {
                        bgcolor: isDark ? '#2c3e50' : '#fff',
                        boxShadow: `0 4px 20px ${alpha(isDark ? '#74b9ff' : '#667eea', 0.15)}`,
                        transform: 'scale(1.02)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: textColor,
                      '&.Mui-focused': {
                        color: isDark ? '#74b9ff' : '#667eea',
                        fontWeight: 600,
                      },
                    },

                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                      color: isDark ? '#74b9ff' : '#667eea',
                      transition: 'color 0.2s ease',
                    },
                  },
                },

                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: 3,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                      bgcolor: isDark ? '#2c3e50' : 'white',
                      border: '1px solid',
                      borderColor: alpha(isDark ? '#7f8c8d' : '#667eea', 0.1),
                    },
                  },
                },
              }}
            />
            <DatePicker
              label={t('history.filters.toDate')}
              value={filters.dateRange.end}
              onChange={(date) =>
                onFiltersChange({
                  dateRange: { ...filters.dateRange, end: date },
                })
              }
              slotProps={{
                textField: {
                  size: 'medium',
                  fullWidth: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      bgcolor: textFieldBg,
                      color: textColor,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: isDark ? '#3d566e' : '#f1f3f4',
                        transform: 'scale(1.02)',
                      },
                      '&.Mui-focused': {
                        bgcolor: isDark ? '#2c3e50' : '#fff',
                        boxShadow: `0 4px 20px ${alpha(isDark ? '#74b9ff' : '#667eea', 0.15)}`,
                        transform: 'scale(1.02)',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: textColor,
                      '&.Mui-focused': {
                        color: isDark ? '#74b9ff' : '#667eea',
                        fontWeight: 600,
                      },
                    },
                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                      color: isDark ? '#74b9ff' : '#667eea',
                      transition: 'color 0.2s ease',
                    },
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: 3,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
                      bgcolor: isDark ? '#2c3e50' : 'white',
                      border: '1px solid',
                      borderColor: alpha(isDark ? '#7f8c8d' : '#667eea', 0.1),
                    },
                  },
                },
              }}
            />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<ClearIcon />}
              onClick={onClearFilters}
              variant="outlined"
              size="large"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontSize: 16,
                fontWeight: 600,
                textTransform: 'none',
                borderColor: alpha(isDark ? '#e74c3c' : '#e74c3c', 0.5),
                color: isDark ? '#e74c3c' : '#e74c3c',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  borderColor: '#e74c3c',
                  bgcolor: '#e74c3c',
                  color: 'white',
                  boxShadow: '0 12px 32px rgba(231,76,60,0.4)',
                },
              }}>
              {t('history.filters.clear')}
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

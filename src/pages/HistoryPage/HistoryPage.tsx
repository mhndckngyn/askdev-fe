import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Chip,
  alpha,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Timeline as TimelineIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';
import { useHistory } from './useHistory';
import { HistoryFilters } from './HistoryFilters';
import { HistoryList } from './HistoryList';
import { HistoryActions } from './HistoryActions';
import { notifications, Notifications } from '@mantine/notifications';

const History: React.FC = () => {
  const { t } = useTranslation('history');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    displayedItems,
    filteredItems,
    filters,
    loading,
    selectedIds,
    pagination,
    setFilters,
    setSelectedIds,
    deleteHistoryItems,
    deleteAllHistory,
    clearFilters,
    loadMore,
  } = useHistory();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  const handleSelectAll = () => {
    if (selectedIds.length === displayedItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayedItems.map((item) => item.id));
    }
  };

  const handleItemSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteHistoryItems(selectedIds);
      notifications.show({
        message: t('history.messages.deleteSuccess'),
        color: 'green',
        radius: 'lg',
      });
    } catch (error) {
      notifications.show({
        message: t('history.messages.deleteError'),
        color: 'red',
        radius: 'lg',
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllHistory();

      notifications.show({
        message: t('history.messages.deleteAllSuccess'),
        color: 'green',
        radius: 'lg',
      });
    } catch (error) {
      notifications.show({
        message: t('history.messages.deleteAllError'),
        color: 'red',
        radius: 'lg',
      });
    }
    setDeleteAllDialogOpen(false);
  };

  return (
    <>
      <Notifications zIndex={9999} />

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
        <Box
          sx={{
            p: 3,
            width: '100%',
            mx: 'auto',
            background: isDark
              ? 'linear-gradient(135deg, #0c1726 0%, #1a2332 25%, #2c3e50 50%, #34495e 100%)'
              : 'linear-gradient(135deg, #3498db 0%, #2980b9 25%, #1abc9c 50%, #16a085 100%)',
            minHeight: '100vh',
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 4,
              p: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 4,
              color: 'white',
              boxShadow: isDark
                ? '0 8px 32px rgba(44, 62, 80, 0.3)'
                : '0 8px 32px rgba(102, 126, 234, 0.3)',
            }}>
            <TimelineIcon sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 700, mb: 0.5 }}>
                {t('history.title')}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                {t('history.subtitle')}
              </Typography>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Chip
                icon={<HistoryIcon />}
                label={t('history.activityCount', {
                  count: filteredItems.length,
                })}
                sx={{
                  bgcolor: alpha('#fff', 0.2),
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              />
            </Box>
          </Box>

          {/* Filters Section */}
          <HistoryFilters
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={clearFilters}
          />

          {/* Actions Section */}
          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
              background: isDark
                ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
                : 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
              border: '1px solid',
              borderColor: alpha(isDark ? '#7f8c8d' : '#667eea', 0.1),
            }}>
            <CardContent sx={{ p: 3 }}>
              <HistoryActions
                selectedCount={selectedIds.length}
                totalCount={displayedItems.length}
                allSelected={
                  selectedIds.length === displayedItems.length &&
                  displayedItems.length > 0
                }
                onSelectAll={handleSelectAll}
                onDeleteSelected={() => setDeleteDialogOpen(true)}
                onDeleteAll={() => setDeleteAllDialogOpen(true)}
              />
            </CardContent>
          </Card>

          {/* Loading State */}
          {loading && displayedItems.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 6,
                gap: 2,
              }}>
              <CircularProgress
                size={60}
                sx={{ color: isDark ? '#74b9ff' : '#667eea' }}
              />
              <Typography variant="h6" color="text.secondary">
                {t('history.loading')}
              </Typography>
            </Box>
          ) : (
            /* History List */
            <HistoryList
              items={displayedItems}
              selectedIds={selectedIds}
              pagination={pagination}
              onItemSelect={handleItemSelect}
              onLoadMore={loadMore}
            />
          )}

          {/* Delete Selected Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                bgcolor: isDark ? '#2c3e50' : 'white',
              },
            }}>
            <DialogTitle
              sx={{
                bgcolor: '#ff7675',
                color: 'white',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              <DeleteIcon />
              {t('history.dialogs.deleteSelected.title')}
            </DialogTitle>
            <DialogContent sx={{ p: 3, mt: 2 }}>
              <DialogContentText
                sx={{
                  fontSize: '1rem',
                  color: isDark ? '#ecf0f1' : '#2c3e50',
                }}>
                {t('history.dialogs.deleteSelected.message', {
                  count: selectedIds.length,
                })}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1 }}>
              <Button
                onClick={() => setDeleteDialogOpen(false)}
                sx={{
                  borderRadius: 2,
                  color: isDark ? '#bdc3c7' : '#2c3e50',
                }}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleDeleteSelected}
                color="error"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, #ff7675 0%, #d63031 100%)',
                }}>
                {t('common.delete')}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete All Dialog */}
          <Dialog
            open={deleteAllDialogOpen}
            onClose={() => setDeleteAllDialogOpen(false)}
            PaperProps={{
              sx: {
                borderRadius: 3,
                boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
                bgcolor: isDark ? '#2c3e50' : 'white',
              },
            }}>
            <DialogTitle
              sx={{
                bgcolor: '#e84393',
                color: 'white',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}>
              <DeleteIcon />
              {t('history.dialogs.deleteAll.title')}
            </DialogTitle>
            <DialogContent sx={{ p: 3, mt: 2 }}>
              <DialogContentText
                sx={{
                  fontSize: '1rem',
                  color: isDark ? '#ecf0f1' : '#2c3e50',
                }}>
                {t('history.dialogs.deleteAll.message')}
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 3, gap: 1 }}>
              <Button
                onClick={() => setDeleteAllDialogOpen(false)}
                sx={{
                  borderRadius: 2,
                  color: isDark ? '#bdc3c7' : '#2c3e50',
                }}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={handleDeleteAll}
                color="error"
                variant="contained"
                sx={{
                  borderRadius: 2,
                  background:
                    'linear-gradient(135deg, #e84393 0%, #fd79a8 100%)',
                }}>
                {t('common.deleteAll')}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default History;

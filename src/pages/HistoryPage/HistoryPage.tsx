import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Button,
  TextField,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress,
  Stack,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  SelectAll as SelectAllIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';
import { useHistory } from './useHistory';
import { HistoryType, HISTORY_TYPE_LABELS, HISTORY_TYPE_COLORS } from './types';

const History: React.FC = () => {
  const {
    filteredItems,
    filters,
    loading,
    selectedIds,
    setFilters,
    setSelectedIds,
    deleteHistoryItems,
    deleteAllHistory,
    clearFilters,
  } = useHistory();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Handle select all/none
  const handleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredItems.map((item) => item.id));
    }
  };

  // Handle individual item selection
  const handleItemSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Handle delete selected items
  const handleDeleteSelected = async () => {
    try {
      await deleteHistoryItems(selectedIds);
      setSnackbar({
        open: true,
        message: 'Đã xóa lịch sử thành công',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Lỗi khi xóa lịch sử',
        severity: 'error',
      });
    }
    setDeleteDialogOpen(false);
  };

  // Handle delete all history
  const handleDeleteAll = async () => {
    try {
      await deleteAllHistory();
      setSnackbar({
        open: true,
        message: 'Đã xóa toàn bộ lịch sử',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Lỗi khi xóa lịch sử',
        severity: 'error',
      });
    }
    setDeleteAllDialogOpen(false);
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Box sx={{ p: 3, width: '100%', mx: 'auto' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
          Lịch sử hoạt động
        </Typography>

        {/* Filters Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Stack spacing={2}>
              {/* Search */}
              <TextField
                fullWidth
                placeholder="Tìm kiếm theo tiêu đề hoặc tên người dùng..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ searchQuery: e.target.value })}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  ),
                }}
              />

              <FormControl fullWidth size="small">
                <InputLabel>Loại hoạt động</InputLabel>
                <Select
                  multiple
                  value={filters.types}
                  onChange={(e) =>
                    setFilters({ types: e.target.value as HistoryType[] })
                  }
                  input={<OutlinedInput label="Loại hoạt động" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={HISTORY_TYPE_LABELS[value]}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        
                      },
                    },
                    MenuListProps: {
                      disablePadding: true,
                      sx: {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 1,
                        px: 1,
                        py: 1,
                      },
                    },
                  }}>
                  {Object.values(HistoryType).map((type) => (
                    <MenuItem
                      key={type}
                      value={type}
                      sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox checked={filters.types.includes(type)} />
                      <ListItemText primary={HISTORY_TYPE_LABELS[type]} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction="row" spacing={1}>
                <DatePicker
                  label="Từ ngày"
                  value={filters.dateRange.start}
                  onChange={(date) =>
                    setFilters({
                      dateRange: { ...filters.dateRange, start: date },
                    })
                  }
                  slotProps={{
                    textField: { size: 'small', fullWidth: true },
                  }}
                />
                <DatePicker
                  label="Đến ngày"
                  value={filters.dateRange.end}
                  onChange={(date) =>
                    setFilters({
                      dateRange: { ...filters.dateRange, end: date },
                    })
                  }
                  slotProps={{
                    textField: { size: 'small', fullWidth: true },
                  }}
                />
              </Stack>

              {/* Action Buttons */}
              <Stack direction="row" spacing={1} justifyContent="space-between">
                <Button
                  startIcon={<ClearIcon />}
                  onClick={clearFilters}
                  variant="outlined"
                  size="small">
                  Xóa bộ lọc
                </Button>

                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<SelectAllIcon />}
                    onClick={handleSelectAll}
                    size="small"
                    disabled={filteredItems.length === 0}>
                    {selectedIds.length === filteredItems.length
                      ? 'Bỏ chọn tất cả'
                      : 'Chọn tất cả'}
                  </Button>

                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={selectedIds.length === 0}
                    color="error"
                    size="small">
                    Xóa đã chọn ({selectedIds.length})
                  </Button>

                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteAllDialogOpen(true)}
                    disabled={filteredItems.length === 0}
                    color="error"
                    variant="outlined"
                    size="small">
                    Xóa tất cả
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* History List */}
        <Paper>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="body1" color="text.secondary">
                Không có lịch sử hoạt động nào
              </Typography>
            </Box>
          ) : (
            <List>
              {filteredItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      <Checkbox
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleItemSelect(item.id)}
                      />
                    }>
                    <ListItemButton onClick={() => handleItemSelect(item.id)}>
                      <ListItemAvatar>
                        <Avatar
                          src={item.user.profilePicture}
                          alt={item.user.username}
                          sx={{ width: 40, height: 40 }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center">
                            <Chip
                              label={HISTORY_TYPE_LABELS[item.type]}
                              size="small"
                              sx={{
                                bgcolor: HISTORY_TYPE_COLORS[item.type],
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(item.createdAt)}
                            </Typography>
                          </Stack>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}>
                              {item.contentTitle}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              bởi {item.user.username}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < filteredItems.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {/* Delete Selected Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa {selectedIds.length} mục lịch sử đã
              chọn? Hành động này không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
            <Button
              onClick={handleDeleteSelected}
              color="error"
              variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete All Dialog */}
        <Dialog
          open={deleteAllDialogOpen}
          onClose={() => setDeleteAllDialogOpen(false)}>
          <DialogTitle>Xác nhận xóa tất cả</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Bạn có chắc chắn muốn xóa toàn bộ lịch sử hoạt động? Hành động này
              không thể hoàn tác.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteAllDialogOpen(false)}>Hủy</Button>
            <Button onClick={handleDeleteAll} color="error" variant="contained">
              Xóa tất cả
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default History;

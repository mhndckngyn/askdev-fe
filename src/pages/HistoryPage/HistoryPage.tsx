import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Chip,
  Divider,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Grid,
  Card,
  CardContent,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import {
  HelpOutline,
  QuestionAnswer,
  Comment,
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Visibility,
  Edit,
  Flag,
  Delete,
  Search,
  FilterList,
  Clear,
  DeleteOutline,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { vi } from 'date-fns/locale';

// Import types và data
import {
  ActivityData,
  ActivityType,
  ActivityFilter,
  ActivityTypeLabels,
  ReportStatusLabels,
  ContentTypeLabels,
} from './types';
import { mockActivityData, getActivityStats } from './mockData';

const ActivityManager: React.FC = () => {
  const [activities, setActivities] =
    useState<ActivityData[]>(mockActivityData);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [filter, setFilter] = useState<ActivityFilter>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Lọc và tìm kiếm hoạt động
  const filteredActivities = useMemo(() => {
    let result = activities;

    // Tìm kiếm theo text
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (activity) =>
          activity.title?.toLowerCase().includes(query) ||
          activity.content?.toLowerCase().includes(query) ||
          activity.questionTitle?.toLowerCase().includes(query) ||
          ActivityTypeLabels[activity.type].toLowerCase().includes(query),
      );
    }

    // Lọc theo loại hoạt động
    if (filter.types && filter.types.length > 0) {
      result = result.filter((activity) =>
        filter.types!.includes(activity.type),
      );
    }

    // Lọc theo thời gian
    if (filter.dateFrom) {
      result = result.filter(
        (activity) => new Date(activity.createdAt) >= filter.dateFrom!,
      );
    }
    if (filter.dateTo) {
      result = result.filter(
        (activity) => new Date(activity.createdAt) <= filter.dateTo!,
      );
    }

    return result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [activities, searchQuery, filter]);

  // Thống kê
  const stats = getActivityStats(filteredActivities);

  // Xử lý chọn hoạt động
  const handleSelectActivity = (activityId: string, checked: boolean) => {
    if (checked) {
      setSelectedActivities((prev) => [...prev, activityId]);
    } else {
      setSelectedActivities((prev) => prev.filter((id) => id !== activityId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedActivities(filteredActivities.map((a) => a.id));
    } else {
      setSelectedActivities([]);
    }
  };

  // Xử lý xóa
  const handleDeleteSelected = () => {
    setActivities((prev) =>
      prev.filter((a) => !selectedActivities.includes(a.id)),
    );
    setSelectedActivities([]);
    setShowDeleteDialog(false);
    setSnackbar({
      open: true,
      message: `Đã xóa ${selectedActivities.length} hoạt động`,
      severity: 'success',
    });
  };

  const handleDeleteAll = () => {
    setActivities([]);
    setSelectedActivities([]);
    setShowDeleteDialog(false);
    setSnackbar({
      open: true,
      message: 'Đã xóa tất cả hoạt động',
      severity: 'success',
    });
  };

  // Lấy icon cho loại hoạt động
  const getActivityIcon = (type: ActivityType) => {
    const iconStyle = { fontSize: 20 };
    switch (type) {
      case ActivityType.QUESTION:
        return <HelpOutline sx={iconStyle} />;
      case ActivityType.ANSWER:
        return <QuestionAnswer sx={iconStyle} />;
      case ActivityType.COMMENT:
        return <Comment sx={iconStyle} />;
      case ActivityType.QUESTION_VOTE:
      case ActivityType.ANSWER_VOTE:
      case ActivityType.COMMENT_VOTE:
        return <ThumbUp sx={iconStyle} />;
      case ActivityType.QUESTION_DOWNVOTE:
      case ActivityType.ANSWER_DOWNVOTE:
      case ActivityType.COMMENT_DOWNVOTE:
        return <ThumbDown sx={iconStyle} />;
      case ActivityType.QUESTION_EDIT:
      case ActivityType.ANSWER_EDIT:
      case ActivityType.COMMENT_EDIT:
        return <Edit sx={iconStyle} />;
      case ActivityType.REPORT:
        return <Flag sx={iconStyle} />;
      case ActivityType.ANSWER_CHOSEN:
        return <CheckCircle sx={iconStyle} />;
      case ActivityType.QUESTION_DELETE:
      case ActivityType.ANSWER_DELETE:
      case ActivityType.COMMENT_DELETE:
        return <Delete sx={iconStyle} />;
      default:
        return <HelpOutline sx={iconStyle} />;
    }
  };

  // Lấy màu cho loại hoạt động
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.QUESTION:
        return '#1976d2';
      case ActivityType.ANSWER:
        return '#2e7d32';
      case ActivityType.COMMENT:
        return '#f57c00';
      case ActivityType.QUESTION_VOTE:
      case ActivityType.ANSWER_VOTE:
      case ActivityType.COMMENT_VOTE:
        return '#4caf50';
      case ActivityType.QUESTION_DOWNVOTE:
      case ActivityType.ANSWER_DOWNVOTE:
      case ActivityType.COMMENT_DOWNVOTE:
        return '#f44336';
      case ActivityType.QUESTION_EDIT:
      case ActivityType.ANSWER_EDIT:
      case ActivityType.COMMENT_EDIT:
        return '#5d4037';
      case ActivityType.REPORT:
        return '#d32f2f';
      case ActivityType.ANSWER_CHOSEN:
        return '#ff9800';
      case ActivityType.QUESTION_DELETE:
      case ActivityType.ANSWER_DELETE:
      case ActivityType.COMMENT_DELETE:
        return '#9e9e9e';
      default:
        return '#757575';
    }
  };

  // Format thời gian
  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Vừa xong';
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
  };

  // Component hiển thị hoạt động
  const ActivityItem: React.FC<{ activity: ActivityData }> = ({ activity }) => {
    const activityColor = getActivityColor(activity.type);
    const isSelected = selectedActivities.includes(activity.id);

    return (
      <Paper
        elevation={isSelected ? 3 : 1}
        sx={{
          p: 3,
          mb: 2,
          borderLeft: `4px solid ${activityColor}`,
          backgroundColor: isSelected ? '#f5f5f5' : '#ffffff',
          '&:hover': {
            boxShadow: 3,
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Checkbox
            checked={isSelected}
            onChange={(e) =>
              handleSelectActivity(activity.id, e.target.checked)
            }
            size="small"
          />

          <Avatar
            sx={{
              bgcolor: activityColor,
              width: 40,
              height: 40,
            }}>
            {getActivityIcon(activity.type)}
          </Avatar>

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1,
              }}>
              <Typography variant="body2" color="text.secondary">
                {formatTimeAgo(activity.createdAt)}
              </Typography>
              <Chip
                label={ActivityTypeLabels[activity.type]}
                size="small"
                sx={{
                  bgcolor: activityColor + '20',
                  color: activityColor,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Box>

            {/* Render nội dung dựa trên loại hoạt động */}
            {renderActivityContent(activity)}
          </Box>
        </Box>
      </Paper>
    );
  };

  // Render nội dung hoạt động
  const renderActivityContent = (activity: ActivityData) => {
    switch (activity.type) {
      case ActivityType.QUESTION:
        return (
          <>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {activity.title}
              {activity.isSolved && (
                <CheckCircle
                  sx={{ ml: 1, color: 'success.main', fontSize: 18 }}
                />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activity.content?.substring(0, 150)}...
            </Typography>
            {activity.tags && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                {activity.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Box>
            )}
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbUp sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption">{activity.upvotes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbDown sx={{ fontSize: 16, color: 'error.main' }} />
                <Typography variant="caption">{activity.downvotes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Visibility sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="caption">{activity.views}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <QuestionAnswer sx={{ fontSize: 16, color: 'info.main' }} />
                <Typography variant="caption">
                  {activity.answers} câu trả lời
                </Typography>
              </Box>
            </Box>
          </>
        );

      case ActivityType.ANSWER:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Trả lời: <strong>{activity.questionTitle}</strong>
              {activity.isChosen && (
                <CheckCircle
                  sx={{ ml: 1, color: 'success.main', fontSize: 18 }}
                />
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activity.content?.substring(0, 150)}...
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbUp sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption">{activity.upvotes}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbDown sx={{ fontSize: 16, color: 'error.main' }} />
                <Typography variant="caption">{activity.downvotes}</Typography>
              </Box>
            </Box>
          </>
        );

      case ActivityType.COMMENT:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Bình luận trên câu trả lời
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              "{activity.answerContent}"
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
              {activity.content}
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbUp sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption">{activity.upvotes}</Typography>
              </Box>
            </Box>
          </>
        );

      case ActivityType.QUESTION_VOTE:
      case ActivityType.ANSWER_VOTE:
      case ActivityType.COMMENT_VOTE:
        return (
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Đã thích: <strong>{activity.questionTitle}</strong>
          </Typography>
        );

      case ActivityType.QUESTION_DOWNVOTE:
      case ActivityType.ANSWER_DOWNVOTE:
      case ActivityType.COMMENT_DOWNVOTE:
        return (
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Đã không thích: <strong>{activity.questionTitle}</strong>
          </Typography>
        );

      case ActivityType.QUESTION_EDIT:
      case ActivityType.ANSWER_EDIT:
      case ActivityType.COMMENT_EDIT:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Đã chỉnh sửa:{' '}
              <strong>{activity.title || activity.questionTitle}</strong>
            </Typography>
            {activity.previousTitle && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Tiêu đề cũ: "{activity.previousTitle}"
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              {activity.content}
            </Typography>
          </>
        );

      case ActivityType.REPORT:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Báo cáo {ContentTypeLabels[activity.reportedContentType!]}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Lý do: {activity.reason}
            </Typography>
            <Chip
              label={ReportStatusLabels[activity.status!]}
              size="small"
              color={
                activity.status === 'PENDING'
                  ? 'warning'
                  : activity.status === 'REVIEWED'
                    ? 'success'
                    : 'error'
              }
            />
          </>
        );

      case ActivityType.ANSWER_CHOSEN:
        return (
          <>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Câu trả lời được chọn: <strong>{activity.questionTitle}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {activity.content?.substring(0, 150)}...
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <ThumbUp sx={{ fontSize: 16, color: 'success.main' }} />
                <Typography variant="caption">{activity.upvotes}</Typography>
              </Box>
            </Box>
          </>
        );

      case ActivityType.QUESTION_DELETE:
      case ActivityType.ANSWER_DELETE:
      case ActivityType.COMMENT_DELETE:
        return (
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Đã xóa {ContentTypeLabels[activity.deletedContentType!]}:
            <strong> {activity.deletedContentTitle}</strong>
          </Typography>
        );

      default:
        return (
          <Typography variant="body2" color="text.secondary">
            Hoạt động không xác định
          </Typography>
        );
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 700 }}>
            Lịch sử hoạt động
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Quản lý và theo dõi tất cả hoạt động của bạn trên nền tảng
          </Typography>
        </Box>

        {/* Thống kê */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <HelpOutline sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
                <Typography variant="h6">{stats.totalQuestions}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Câu hỏi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <QuestionAnswer
                  sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }}
                />
                <Typography variant="h6">{stats.totalAnswers}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Câu trả lời
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Comment sx={{ fontSize: 40, color: '#f57c00', mb: 1 }} />
                <Typography variant="h6">{stats.totalComments}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Bình luận
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <ThumbUp sx={{ fontSize: 40, color: '#7b1fa2', mb: 1 }} />
                <Typography variant="h6">{stats.totalVotes}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Lượt thích
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Flag sx={{ fontSize: 40, color: '#d32f2f', mb: 1 }} />
                <Typography variant="h6">{stats.totalReports}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Báo cáo
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Toolbar */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            <TextField
              placeholder="Tìm kiếm hoạt động..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'text.secondary' }} />
                ),
                endAdornment: searchQuery && (
                  <IconButton size="small" onClick={() => setSearchQuery('')}>
                    <Clear />
                  </IconButton>
                ),
              }}
              sx={{ minWidth: 300 }}
            />

            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilterDialog(true)}>
              Lọc
            </Button>

            <Divider orientation="vertical" flexItem />

            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    selectedActivities.length === filteredActivities.length &&
                    filteredActivities.length > 0
                  }
                  indeterminate={
                    selectedActivities.length > 0 &&
                    selectedActivities.length < filteredActivities.length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              }
              label="Chọn tất cả"
            />

            {selectedActivities.length > 0 && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteOutline />}
                onClick={() => setShowDeleteDialog(true)}>
                Xóa ({selectedActivities.length})
              </Button>
            )}
          </Box>
        </Paper>

        {/* Danh sách hoạt động */}
        <Box>
          {filteredActivities.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                Không có hoạt động nào
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchQuery ||
                filter.types?.length ||
                filter.dateFrom ||
                filter.dateTo
                  ? 'Thử thay đổi bộ lọc để xem kết quả khác'
                  : 'Bắt đầu bằng cách đặt câu hỏi hoặc trả lời câu hỏi của người khác!'}
              </Typography>
            </Paper>
          ) : (
            filteredActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          )}
        </Box>

        {/* Dialog xóa */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <Typography>
              Bạn có chắc chắn muốn xóa {selectedActivities.length} hoạt động đã
              chọn?
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAll}
                sx={{ mr: 1 }}>
                Xóa tất cả
              </Button>
              <Typography variant="body2" color="text.secondary">
                Hành động này không thể hoàn tác.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteDialog(false)}>Hủy</Button>
            <Button
              onClick={handleDeleteSelected}
              color="error"
              variant="contained">
              Xóa
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog lọc */}
        <Dialog
          open={showFilterDialog}
          onClose={() => setShowFilterDialog(false)}
          maxWidth="sm"
          fullWidth>
          <DialogTitle>Lọc hoạt động</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Loại hoạt động</InputLabel>
                <Select
                  multiple
                  value={filter.types || []}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      types: e.target.value as ActivityType[],
                    }))
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={ActivityTypeLabels[value]}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}>
                  {Object.entries(ActivityTypeLabels).map(([key, label]) => (
                    <MenuItem key={key} value={key}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <DatePicker
                    label="Từ ngày"
                    value={filter.dateFrom}
                    onChange={(date) =>
                      setFilter((prev) => ({ ...prev, dateFrom: date }))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker
                    label="Đến ngày"
                    value={filter.dateTo}
                    onChange={(date) =>
                      setFilter((prev) => ({ ...prev, dateTo: date }))
                    }
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFilter({})}>Xóa bộ lọc</Button>
            <Button onClick={() => setShowFilterDialog(false)}>Đóng</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar thông báo */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default ActivityManager;

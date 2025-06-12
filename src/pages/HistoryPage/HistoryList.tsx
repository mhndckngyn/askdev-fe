import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import FormatTime from './formatTime';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Divider,
  CircularProgress,
  Stack,
  Tooltip,
  IconButton,
  alpha,
} from '@mui/material';
import {
  History as HistoryIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import {
  HistoryItem,
  HistoryType,
  HISTORY_TYPE_LABELS,
  HistoryTypeColor,
  PaginationState,
} from './types';
import { HistoryIcon as HistoryIconComponent } from './HistoryIcons';

interface HistoryListProps {
  items: HistoryItem[];
  selectedIds: string[];
  pagination: PaginationState;
  onItemSelect: (id: string) => void;
  onLoadMore: () => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  items,
  selectedIds,
  pagination,
  onItemSelect,
  onLoadMore,
}) => {
  const { t } = useTranslation('history');
  const { colorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const isDark = colorScheme === 'dark';
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const canViewDetails = (item: HistoryItem): boolean => {
    const deleteTypes = [
      HistoryType.QUESTION_DELETE,
      HistoryType.ANSWER_DELETE,
      HistoryType.COMMENT_DELETE,
    ];
    return !deleteTypes.includes(item.type) && item.questionId != null;
  };

  const handleViewDetails = (item: HistoryItem, event: React.MouseEvent) => {
    event.stopPropagation();
    if (canViewDetails(item) && item.questionId) {
      navigate(`/questions/${item.questionId}`);
    }
  };

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.hasMore &&
          !pagination.loading
        ) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pagination.hasMore, pagination.loading, onLoadMore]);

  const paperBg = isDark
    ? 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
    : 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)';

  const textColor = isDark ? '#ecf0f1' : '#2c3e50';
  const secondaryTextColor = isDark ? '#bdc3c7' : '#7f8c8d';

  if (items.length === 0) {
    return (
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          background: paperBg,
        }}>
        <Box
          sx={{
            textAlign: 'center',
            p: 6,
          }}>
          <HistoryIcon
            sx={{ fontSize: 80, color: isDark ? '#7f8c8d' : '#bdc3c7', mb: 2 }}
          />
          <Typography variant="h5" color={textColor} sx={{ mb: 1 }}>
            {t('history.noData.title')}
          </Typography>
          <Typography variant="body1" color={secondaryTextColor}>
            {t('history.noData.description')}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: 3,
        boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        background: paperBg,
        width: '100%',
        maxWidth: '100%',
      }}>
      <List sx={{ p: 0 }}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <ListItem
              disablePadding
              sx={{
                width: '100%',
                maxWidth: '100%',
                overflow: 'hidden',
                '&:hover': {
                  bgcolor: alpha(
                    HistoryTypeColor(item.type),
                    isDark ? 0.15 : 0.05,
                  ),
                  transform: 'translateX(4px)',
                  transition: 'all 0.3s ease',
                },
              }}
              secondaryAction={
                <Stack direction="row" spacing={1} alignItems="center">
                  {canViewDetails(item) && (
                    <Tooltip title={t('common.viewDetails')}>
                      <IconButton
                        onClick={(event) => handleViewDetails(item, event)}
                        sx={{
                          color: HistoryTypeColor(item.type),
                          '&:hover': {
                            bgcolor: alpha(HistoryTypeColor(item.type), 0.1),
                            transform: 'scale(1.1)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                        size="small">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title={t('history.selectItem')}>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onChange={() => onItemSelect(item.id)}
                      sx={{
                        color: HistoryTypeColor(item.type),
                        '&.Mui-checked': {
                          color: HistoryTypeColor(item.type),
                        },
                      }}
                    />
                  </Tooltip>
                </Stack>
              }>
              <ListItemButton
                onClick={() => onItemSelect(item.id)}
                sx={{
                  py: 2,
                  px: 3,
                  borderRadius: 0,
                  width: '100%',
                  maxWidth: '100%',
                  overflow: 'hidden',
                }}>
                <ListItemAvatar
                  sx={{
                    minWidth: 'auto',
                    mr: 2,
                  }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: HistoryTypeColor(item.type),
                      color: 'white',
                      boxShadow: `0 4px 15px ${alpha(HistoryTypeColor(item.type), 0.4)}`,
                      border: '3px solid white',
                    }}>
                    <HistoryIconComponent type={item.type} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                  }}
                  primary={
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{
                        ml: 0,
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                      <Chip
                        label={t(HISTORY_TYPE_LABELS[item.type] as any)}
                        size="small"
                        sx={{
                          bgcolor: HistoryTypeColor(item.type),
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          boxShadow: `0 2px 8px ${alpha(HistoryTypeColor(item.type), 0.3)}`,
                          maxWidth: '150px',
                          '& .MuiChip-label': {
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          },
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: secondaryTextColor,
                          fontWeight: 500,
                          bgcolor: alpha(isDark ? '#74b9ff' : '#667eea', 0.1),
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          whiteSpace: 'nowrap',
                        }}>
                        <FormatTime createdAt={item.createdAt.toString()} />
                      </Typography>
                    </Stack>
                  }
                  secondary={
                    <Box
                      sx={{
                        minWidth: 0,
                        overflow: 'hidden',
                      }}>
                      <Typography
                        variant="h6"
                        sx={{
                          ml: 0,
                          width:'95%',
                          fontWeight: 600,
                          color: textColor,
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          wordBreak: 'break-word',
                        }}>
                        {item.contentTitle}
                      </Typography>
                    </Box>
                  }
                />
              </ListItemButton>
            </ListItem>
            {index < items.length - 1 && (
              <Divider
                sx={{
                  borderColor: alpha(isDark ? '#7f8c8d' : '#667eea', 0.1),
                  mx: 3,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </List>

      {pagination.hasMore && (
        <Box
          ref={loadMoreRef}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
            gap: 2,
          }}>
          {pagination.loading && (
            <>
              <CircularProgress
                size={24}
                sx={{ color: isDark ? '#74b9ff' : '#667eea' }}
              />
              <Typography variant="body2" color={secondaryTextColor}>
                {t('history.loadingMore')}
              </Typography>
            </>
          )}
        </Box>
      )}

      {!pagination.hasMore && items.length > 0 && (
        <Box
          sx={{
            textAlign: 'center',
            p: 2,
            borderTop: `1px solid ${alpha(isDark ? '#7f8c8d' : '#667eea', 0.1)}`,
          }}>
          <Typography variant="body2" color={secondaryTextColor}>
            {t('history.endOfList')}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

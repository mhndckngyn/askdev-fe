import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  HistoryItem,
  HistoryFilters,
  HistoryType,
  PaginationState,
  ITEMS_PER_PAGE,
} from './types';

import * as historyService from './services';

const initialFilters: HistoryFilters = {
  searchQuery: '',
  types: [],
  dateRange: {
    start: null,
    end: null,
  },
};

const initialPagination: PaginationState = {
  page: 1,
  hasMore: true,
  loading: false,
};

export const useHistory = () => {
  const [allItems, setAllItems] = useState<HistoryItem[]>([]);
  const [filters, setFilters] = useState<HistoryFilters>(initialFilters);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  const fetchHistoryItems = useCallback(
    async (page: number = 1, resetItems: boolean = false) => {
      try {
        setLoading(true);
        setError(null);

        const response = await historyService.getHistory(
          page,
          ITEMS_PER_PAGE,
          filters,
        );

        if (response.success) {
          const { items, pagination: paginationInfo } = response.content;

          if (resetItems) {
            setAllItems(items);
          } else {
            setAllItems((prev) => [...prev, ...items]);
          }

          setTotalCount(paginationInfo.total);
          setPagination((prev) => ({
            ...prev,
            page: paginationInfo.page,
            hasMore: paginationInfo.hasMore,
            loading: false,
          }));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error( err);
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    fetchHistoryItems(1, true);
    setPagination((prev) => ({ ...prev, page: 1 }));
    setSelectedIds([]);
  }, [fetchHistoryItems]);

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !pagination.loading && !loading) {
      const nextPage = pagination.page + 1;
      setPagination((prev) => ({ ...prev, loading: true }));
      fetchHistoryItems(nextPage, false);
    }
  }, [
    pagination.hasMore,
    pagination.loading,
    pagination.page,
    loading,
    fetchHistoryItems,
  ]);

  const updateFilters = useCallback((newFilters: Partial<HistoryFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const deleteHistoryItem = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await historyService.deleteHistoryItem(id);

      setAllItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
      setTotalCount((prev) => prev - 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHistoryItems = useCallback(async (ids: string[]) => {
    try {
      setLoading(true);
      const response = await historyService.deleteMultipleHistoryItems(ids);

      if (response.success) {
        setAllItems((prev) => prev.filter((item) => !ids.includes(item.id)));
        setSelectedIds([]);
        setTotalCount((prev) => prev - response.content.deletedCount);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete items');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAllHistory = useCallback(async () => {
    try {
      setLoading(true);
      const response = await historyService.deleteAllHistory();

      if (response.success) {
        setAllItems([]);
        setSelectedIds([]);
        setTotalCount(0);
        setPagination(initialPagination);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete all history',
      );
      console.error( err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getHistoryTypes = useCallback(async () => {
    try {
      const response = await historyService.getHistoryTypes();
      return response.success ? response.content.types : [];
    } catch (err) {
      console.error( err);
      return Object.values(HistoryType);
    }
  }, []);

  const displayedItems = useMemo(() => {
    return allItems;
  }, [allItems]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    displayedItems,
    filteredItems: displayedItems,
    filters,
    selectedIds,
    pagination,
    loading,
    error,
    totalCount,

    setFilters: updateFilters,
    setSelectedIds,
    deleteHistoryItem,
    deleteHistoryItems,
    deleteAllHistory,
    clearFilters,
    loadMore,
    getHistoryTypes,
    clearError,

    hasSelectedItems: selectedIds.length > 0,
    selectedCount: selectedIds.length,
  };
};

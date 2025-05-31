import { useState, useEffect, useMemo } from 'react';
import { HistoryItem, HistoryFilters, UseHistoryReturn } from './types';
import { mockHistoryData } from './data';

const initialFilters: HistoryFilters = {
  dateRange: { start: null, end: null },
  types: [],
  searchQuery: '',
};

export const useHistory = (): UseHistoryReturn => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [filters, setFiltersState] = useState<HistoryFilters>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Simulate API call to fetch history data
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setHistoryItems(mockHistoryData);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Filter history items based on current filters
  const filteredItems = useMemo(() => {
    let filtered = [...historyItems];

    // Filter by date range
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.createdAt);
        const startDate = filters.dateRange.start;
        const endDate = filters.dateRange.end;

        if (startDate && endDate) {
          return itemDate >= startDate && itemDate <= endDate;
        } else if (startDate) {
          return itemDate >= startDate;
        } else if (endDate) {
          return itemDate <= endDate;
        }
        return true;
      });
    }

    // Filter by history types
    if (filters.types.length > 0) {
      filtered = filtered.filter((item) => filters.types.includes(item.type));
    }

    // Filter by search query
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.contentTitle.toLowerCase().includes(query) ||
          item.user.username.toLowerCase().includes(query),
      );
    }

    // Sort by date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [historyItems, filters]);

  const setFilters = (newFilters: Partial<HistoryFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFiltersState(initialFilters);
    setSelectedIds([]);
  };

  const deleteHistoryItems = async (ids: string[]) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300));

      setHistoryItems((prev) => prev.filter((item) => !ids.includes(item.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting history items:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteAllHistory = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setHistoryItems([]);
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting all history:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    historyItems,
    filteredItems,
    filters,
    loading,
    selectedIds,
    setFilters,
    setSelectedIds,
    deleteHistoryItems,
    deleteAllHistory,
    clearFilters,
  };
};

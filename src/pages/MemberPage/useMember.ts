import { useState, useEffect, useCallback } from 'react';
import { Member, RankingType } from './types';
import { getMembers } from './services';

export const useMember = (
  options: { page?: number; limit?: number; autoLoad?: boolean } = {},
) => {
  const { page = 1, limit = 20 } = options;

  const [members, setMembers] = useState<Member[]>([]);

  const [rankingTypes, setRankingTypes] = useState<RankingType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<RankingType>('reputation');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(page);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  const loadMembers = useCallback(
    async (
      pageNum: number = currentPage,
      ranking: RankingType = selectedTab,
      searchQuery?: string,
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getMembers(pageNum, limit, ranking, searchQuery);

        if (response.success) {
          setMembers(response.content.items);
          setPagination({
            total: response.content.pagination.total,
            totalPages: response.content.pagination.totalPages,
            hasMore: response.content.pagination.hasMore,
          });

          if (response.content.availableRankingTypes) {
            setRankingTypes(response.content.availableRankingTypes);
          }
        } else {
          throw new Error('Failed to load members');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setMembers([]);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, selectedTab, limit],
  );

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      loadMembers(1, selectedTab, searchQuery);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, selectedTab, loadMembers]);

  const handleTabChange = useCallback((newTab: RankingType) => {
    setSelectedTab(newTab);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      loadMembers(newPage, selectedTab, searchQuery);
    },
    [searchQuery, selectedTab, loadMembers],
  );

  return {
    members,
    rankingTypes,

    error,
    selectedTab,
    searchQuery,
    currentPage,
    pagination,
    setSelectedTab: handleTabChange,
    setSearchQuery,
    setCurrentPage: handlePageChange,
    loadMembers,
    hasMembers: members.length > 0,
    isEmpty: !loading && members.length === 0 && !error,
  };
};

import React, { useMemo } from 'react';
import { Box, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMantineColorScheme } from '@mantine/core';
import { useMember } from './useMember';
import { RankingType, Member } from './types';
import { RankingHeader } from './RankingHeader';
import { RankingTabs } from './RankingTabs';
import { SearchBar } from './SearchBar';
import { MemberCard } from './MemberCard';

const MemberRanking: React.FC = () => {
  const { t } = useTranslation('member');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    members,
    selectedTab,
    setSelectedTab,
    searchQuery,
    setSearchQuery,
    loadMembers,
  } = useMember();

  const getStatValue = (member: Member, rankingType: RankingType): number => {
    switch (rankingType) {
      case 'reputation':
        return member.stats.reputation || 0;
      case 'upvotes':
        return member.stats.totalUpvotes || 0;
      case 'chosen':
        return member.stats.chosenAnswers || 0;
      case 'answers':
        return member.stats.totalAnswers || 0;
      default:
        return 0;
    }
  };

  const refreshData = () => {
    loadMembers();
  };

  const sortedMembers = useMemo(() => {
    let filteredMembers = members;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredMembers = members.filter((member) =>
        member.username?.toLowerCase().includes(query),
      );
    }

    return filteredMembers.sort((a, b) => {
      const aValue = getStatValue(a, selectedTab) || 0;
      const bValue = getStatValue(b, selectedTab) || 0;
      return bValue - aValue; // Descending order
    });
  }, [members, searchQuery, selectedTab, getStatValue]);

  const rankingTabs = [
    {
      label: t('tabs.reputation'),
      value: 'reputation' as RankingType,
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    },
    {
      label: t('tabs.upvotes'),
      value: 'upvotes' as RankingType,
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    },
    {
      label: t('tabs.chosen'),
      value: 'chosen' as RankingType,
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)',
    },
    {
      label: t('tabs.answers'),
      value: 'answers' as RankingType,
      color: '#6C5CE7',
      gradient: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)',
    },
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: RankingType) => {
    setSelectedTab(newValue);
  };

  const getActiveTabConfig = () => {
    return (
      rankingTabs.find((tab) => tab.value === selectedTab) || rankingTabs[0]
    );
  };

  const getBackgroundStyle = () => {
    if (isDark) {
      return {
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 100%)',
        position: 'relative' as const,
        overflow: 'hidden' as const,
      };
    }

    return {
      minHeight: '100vh',
      background:
        'linear-gradient(135deg, #3498db 0%, #2980b9 25%, #1abc9c 50%, #16a085 100%)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    };
  };

  return (
    <Box sx={getBackgroundStyle()}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box>
          <RankingHeader memberCount={members.length} onRefresh={refreshData} />

          <RankingTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {sortedMembers.length === 0 ? (
              <Box
                sx={{
                  textAlign: 'center',
                  py: 8,
                  px: 4,
                  borderRadius: 4,
                  background: isDark
                    ? 'rgba(33, 37, 41, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
                }}>
                <Box
                  sx={{
                    fontSize: '4rem',
                    mb: 2,
                  }}>
                  🔍
                </Box>
                <Box
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'text.primary',
                    mb: 1,
                  }}>
                  {t('search.noResults')}
                </Box>
                <Box
                  sx={{
                    color: isDark
                      ? 'rgba(255, 255, 255, 0.5)'
                      : 'text.secondary',
                  }}>
                  {t('search.tryOtherKeywords')}
                </Box>
              </Box>
            ) : (
              sortedMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  index={member.rank - 1}
                  selectedTab={selectedTab}
                  getStatValue={getStatValue}
                  getActiveTabConfig={getActiveTabConfig}
                />
              ))
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MemberRanking;

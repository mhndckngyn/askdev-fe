import React from 'react';
import { Box, Container } from '@mui/material';
import { useMember } from './useMember';
import { RankingType } from './types';
import { LoadingSpinner } from './LoadingSpinner';
import { RankingHeader } from './RankingHeader';
import { StatsOverview } from './StatsOverview';
import { RankingTabs } from './RankingTabs';
import { MemberCard } from './MemberCard';

const MemberRanking: React.FC = () => {
  const {
    members,
    loading,
    selectedTab,
    setSelectedTab,
    sortMembersByType,
    getStatValue,
    getTotalStats,
    refreshData,
  } = useMember();

  const totalStats = getTotalStats();
  const sortedMembers = sortMembersByType(selectedTab);

  const rankingTabs = [
    {
      label: 'Danh tiếng',
      value: 'reputation' as RankingType,
      color: '#FF6B6B',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    },
    {
      label: 'Lượt thích',
      value: 'upvotes' as RankingType,
      color: '#4ECDC4',
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    },
    {
      label: 'Được chọn',
      value: 'chosen' as RankingType,
      color: '#FFD93D',
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)',
    },
    {
      label: 'Trả lời',
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 4 }}>
          <RankingHeader memberCount={members.length} onRefresh={refreshData} />

          <StatsOverview totalStats={totalStats} />

          <RankingTabs
            selectedTab={selectedTab}
            onTabChange={handleTabChange}
          />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {sortedMembers.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                selectedTab={selectedTab}
                getStatValue={getStatValue}
                getActiveTabConfig={getActiveTabConfig}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MemberRanking;

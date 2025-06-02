import { useState, useEffect } from 'react';
import { Member, RankingType } from './types';
import { mockMembers } from './data';

export const useMember = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<RankingType>('reputation');

  useEffect(() => {
    const loadMembers = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setMembers(mockMembers);
      setLoading(false);
    };

    loadMembers();
  }, []);

  const sortMembersByType = (type: RankingType): Member[] => {
    return [...members].sort((a, b) => {
      switch (type) {
        case 'reputation':
          return b.stats.reputation - a.stats.reputation;
        case 'upvotes':
          return b.stats.totalUpvotes - a.stats.totalUpvotes;
        case 'chosen':
          return b.stats.chosenAnswers - a.stats.chosenAnswers;
        case 'answers':
          return b.stats.totalAnswers - a.stats.totalAnswers;
        default:
          return 0;
      }
    });
  };

  const getStatValue = (member: Member, type: RankingType): number => {
    switch (type) {
      case 'reputation':
        return member.stats.reputation;
      case 'upvotes':
        return member.stats.totalUpvotes;
      case 'chosen':
        return member.stats.chosenAnswers;
      case 'answers':
        return member.stats.totalAnswers;
      default:
        return 0;
    }
  };

  const getTotalStats = () => {
    return members.reduce(
      (acc, member) => ({
        totalQuestions: acc.totalQuestions + member.stats.totalQuestions,
        totalAnswers: acc.totalAnswers + member.stats.totalAnswers,
        totalUpvotes: acc.totalUpvotes + member.stats.totalUpvotes,
        chosenAnswers: acc.chosenAnswers + member.stats.chosenAnswers,
        totalViews: acc.totalViews + member.stats.totalViews,
      }),
      {
        totalQuestions: 0,
        totalAnswers: 0,
        totalUpvotes: 0,
        chosenAnswers: 0,
        totalViews: 0,
      },
    );
  };

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setMembers([...mockMembers]);
      setLoading(false);
    }, 800);
  };

  return {
    members,
    loading,
    selectedTab,
    setSelectedTab,
    sortMembersByType,
    getStatValue,
    getTotalStats,
    refreshData,
  };
};

import React, { useState } from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import { Search as SearchIcon, ExpandMore } from '@mui/icons-material';
import QuestionCard from './Card/QuestionCard';
import TagCard from './Card/TagCard';
import UserCard from './Card/UserCard';
import { MockResults } from './types';

interface SearchResultsProps {
  activeTab: number;
  mockResults: MockResults;
  isDark: boolean;
}

export default function SearchResults({
  activeTab,
  mockResults,
  isDark,
}: SearchResultsProps) {
  const [questionsVisible, setQuestionsVisible] = useState(4);
  const [tagsVisible, setTagsVisible] = useState(6);
  const [usersVisible, setUsersVisible] = useState(6);
  const [allQuestionsVisible, setAllQuestionsVisible] = useState(4);
  const [allTagsVisible, setAllTagsVisible] = useState(6);
  const [allUsersVisible, setAllUsersVisible] = useState(6);

  const getResultCount = () => {
    switch (activeTab) {
      case 0:
        return (
          mockResults?.questions.length +
          mockResults?.tags.length +
          mockResults?.users.length
        );
      case 1:
        return mockResults?.questions.length;
      case 2:
        return mockResults?.tags.length;
      case 3:
        return mockResults?.users.length;
      default:
        return 0;
    }
  };

  const QuestionsGrid = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: 2,
        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      }}>
      {children}
    </Box>
  );

  const TagsUsersGrid = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 2,
        '@media (max-width: 900px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        },
        '@media (max-width: 600px)': {
          gridTemplateColumns: '1fr',
        },
      }}>
      {children}
    </Box>
  );

  const LoadMoreButton = ({
    onClick,
    hasMore,
    increment,
  }: {
    onClick: () => void;
    hasMore: boolean;
    increment: number;
  }) => {
    if (!hasMore) return null;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onClick}
          startIcon={<ExpandMore />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            borderColor: isDark ? 'primary.main' : 'primary.light',
            color: isDark ? 'primary.main' : 'primary.dark',
            '&:hover': {
              backgroundColor: isDark ? 'primary.dark' : 'primary.light',
              color: isDark ? 'white' : 'primary.dark',
            },
          }}>
          Load More ({increment} more)
        </Button>
      </Box>
    );
  };

  const renderGroupedSection = (
    title: string,
    items: any[],
    visibleCount: number,
    setVisibleCount: (count: number) => void,
    renderItem: (item: any) => React.ReactNode,
    showDivider: boolean = true,
    isQuestion: boolean = false,
  ) => {
    if (items.length === 0) return null;

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;
    const increment = isQuestion ? 4 : 6;
    const GridComponent = isQuestion ? QuestionsGrid : TagsUsersGrid;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 2,
            color: isDark ? 'primary.main' : 'primary.dark',
          }}>
          {title} ({items.length})
        </Typography>
        <GridComponent>{visibleItems.map(renderItem)}</GridComponent>

        <LoadMoreButton
          onClick={() => setVisibleCount(visibleCount + increment)}
          hasMore={hasMore}
          increment={increment}
        />

        {showDivider && <Divider sx={{ mt: 4, opacity: 0.3 }} />}
      </Box>
    );
  };

  const renderResults = () => {
    switch (activeTab) {
      case 0: // All - Grouped by type
        return (
          <Box>
            {mockResults?.questions?.length > 0 &&
              renderGroupedSection(
                'Questions',
                mockResults.questions,
                allQuestionsVisible,
                setAllQuestionsVisible,
                (question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isDark={isDark}
                  />
                ),
                mockResults?.tags.length > 0 || mockResults?.users.length > 0,
                true,
              )}

            {mockResults?.tags?.length > 0 &&
              renderGroupedSection(
                'Tags',
                mockResults.tags,
                allTagsVisible,
                setAllTagsVisible,
                (tag) => <TagCard key={tag.id} tag={tag} isDark={isDark} />,
                mockResults?.users.length > 0,
                false,
              )}

            {mockResults?.users?.length > 0 &&
              renderGroupedSection(
                'Users',
                mockResults.users,
                allUsersVisible,
                setAllUsersVisible,
                (user) => (
                  <UserCard key={user.id} user={user} isDark={isDark} />
                ),
                false,
                false,
              )}
          </Box>
        );
      case 1: // Questions
        const visibleQuestions =
          mockResults?.questions.slice(0, questionsVisible) ?? [];
        const hasMoreQuestions =
          questionsVisible < mockResults?.questions.length;

        return (
          <Box>
            <QuestionsGrid>
              {visibleQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  isDark={isDark}
                />
              ))}
            </QuestionsGrid>
            <LoadMoreButton
              onClick={() => setQuestionsVisible(questionsVisible + 4)}
              hasMore={hasMoreQuestions}
              increment={4}
            />
          </Box>
        );
      case 2: // Tags
        const visibleTags = mockResults?.tags.slice(0, tagsVisible) ?? [];
        const hasMoreTags = tagsVisible < mockResults?.tags.length;

        return (
          <Box>
            <TagsUsersGrid>
              {visibleTags.map((tag) => (
                <TagCard key={tag.id} tag={tag} isDark={isDark} />
              ))}
            </TagsUsersGrid>
            <LoadMoreButton
              onClick={() => setTagsVisible(tagsVisible + 6)}
              hasMore={hasMoreTags}
              increment={6}
            />
          </Box>
        );
      case 3: // Users
        const visibleUsers = mockResults?.users.slice(0, usersVisible) ?? [];
        const hasMoreUsers = usersVisible < mockResults?.users.length;

        return (
          <Box>
            <TagsUsersGrid>
              {visibleUsers.map((user) => (
                <UserCard key={user.id} user={user} isDark={isDark} />
              ))}
            </TagsUsersGrid>
            <LoadMoreButton
              onClick={() => setUsersVisible(usersVisible + 6)}
              hasMore={hasMoreUsers}
              increment={6}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {getResultCount()} results found
        </Typography>
      </Box>

      {renderResults()}

      {getResultCount() === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <SearchIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No results found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search terms or browse different categories
          </Typography>
        </Box>
      )}
    </Box>
  );
}

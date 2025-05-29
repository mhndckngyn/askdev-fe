import React, { useState } from 'react';
import { Box, Typography, Divider, Button, Chip } from '@mui/material';
import {
  Search,
  ExpandMore,
  HelpOutline,
  LocalOffer,
  People,
} from '@mui/icons-material';
import QuestionCard from './Card/QuestionCard';
import TagCard from './Card/TagCard';
import UserCard from './Card/UserCard';
import { MockResults } from './types';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('search');
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: 3,
        '@media (max-width: 1200px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        },
        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
          gap: 2.5,
        },
      }}>
      {children}
    </Box>
  );

  const TagsUsersGrid = ({ children }: { children: React.ReactNode }) => (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 3,
        '@media (max-width: 1200px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        },
        '@media (max-width: 900px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 2.5,
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
  }: {
    onClick: () => void;
    hasMore: boolean;
    increment: number;
  }) => {
    if (!hasMore) return null;

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          onClick={onClick}
          startIcon={<ExpandMore />}
          sx={{
            borderRadius: 3,
            textTransform: 'none',
            px: 4,
            py: 1.5,
            fontSize: '0.95rem',
            fontWeight: 600,
            background: isDark
              ? 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
              : 'linear-gradient(135deg, #3B82F6, #2563EB)',
            boxShadow: isDark
              ? '0 8px 24px rgba(59, 130, 246, 0.25)'
              : '0 8px 20px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: isDark
                ? 'linear-gradient(135deg, #2563EB, #1E40AF)'
                : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              transform: 'translateY(-2px)',
              boxShadow: isDark
                ? '0 12px 32px rgba(59, 130, 246, 0.35)'
                : '0 12px 28px rgba(59, 130, 246, 0.4)',
            },
          }}>
          {t('viewMoreResults')}
        </Button>
      </Box>
    );
  };

  const SectionHeader = ({
    title,
    count,
    icon,
    gradient,
  }: {
    title: string;
    count: number;
    icon: React.ReactNode;
    gradient: string;
  }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        mb: 4,
        p: 3,
        borderRadius: 4,
        background: isDark
          ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(51, 65, 85, 0.8))'
          : 'linear-gradient(135deg, rgba(248, 250, 252, 0.95), rgba(241, 245, 249, 0.9))',
        backdropFilter: 'blur(12px)',
        border: isDark
          ? '1px solid rgba(255, 255, 255, 0.1)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
          : '0 8px 24px rgba(0, 0, 0, 0.08)',
      }}>
      {/* Icon Container with Background */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: 3,
            background: gradient,
            opacity: 0.8,
            filter: 'blur(8px)',
            zIndex: -1,
          },
        }}>
        {icon}
      </Box>

      {/* Title with Background */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: 'inline-block',
            px: 3,
            py: 1.5,
            borderRadius: 2.5,
            background: isDark
              ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(147, 197, 253, 0.1))'
              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.15))',
            border: isDark
              ? '1px solid rgba(59, 130, 246, 0.2)'
              : '1px solid rgba(59, 130, 246, 0.15)',
          }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: '1.4rem',
              background: isDark
                ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
            {title}
          </Typography>
        </Box>
      </Box>

      {/* Result Count Chip */}
      <Chip
        label={`${count} kết quả`}
        sx={{
          background: gradient,
          color: 'white',
          fontWeight: 600,
          fontSize: '0.9rem',
          borderRadius: 2.5,
          px: 2,
          py: 0.5,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '& .MuiChip-label': {
            px: 1.5,
            py: 0.5,
          },
        }}
      />
    </Box>
  );

  const renderGroupedSection = (
    title: string,
    items: any[],
    visibleCount: number,
    setVisibleCount: (count: number) => void,
    renderItem: (item: any) => React.ReactNode,
    showDivider: boolean = true,
    isQuestion: boolean = false,
    icon: React.ReactNode,
    gradient: string,
  ) => {
    if (items.length === 0) return null;

    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;
    const increment = isQuestion ? 4 : 6;
    const GridComponent = isQuestion ? QuestionsGrid : TagsUsersGrid;

    return (
      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title={title}
          count={items.length}
          icon={icon}
          gradient={gradient}
        />
        <GridComponent>{visibleItems.map(renderItem)}</GridComponent>

        <LoadMoreButton
          onClick={() => setVisibleCount(visibleCount + increment)}
          hasMore={hasMore}
          increment={increment}
        />

        {showDivider && (
          <Divider
            sx={{
              mt: 6,
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)',
              height: '2px',
              border: 'none',
            }}
          />
        )}
      </Box>
    );
  };

  const EmptyState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 12,
        px: 4,
        borderRadius: 4,
        background: isDark
          ? 'linear-gradient(135deg, rgba(25,25,25,0.6) 0%, rgba(40,40,40,0.8) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid rgba(0,0,0,0.04)',
      }}>
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: isDark
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 197, 253, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.12) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 4,
          border: isDark
            ? '2px solid rgba(59, 130, 246, 0.2)'
            : '2px solid rgba(59, 130, 246, 0.15)',
        }}>
        <Search
          sx={{
            fontSize: 48,
            color: isDark ? '#60A5FA' : '#3B82F6',
          }}
        />
      </Box>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: 700,
          background: isDark
            ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
            : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
        {t('noFound')}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
          maxWidth: 400,
          mx: 'auto',
          lineHeight: 1.6,
        }}>
        {t('tryFound')}
      </Typography>
    </Box>
  );

  const renderResults = () => {
    switch (activeTab) {
      case 0: // All - Grouped by type
        return (
          <Box>
            {mockResults?.questions?.length > 0 &&
              renderGroupedSection(
                t('question'),
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
                <HelpOutline style={{ color: 'white', fontSize: 28 }} />,
                'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              )}

            {mockResults?.tags?.length > 0 &&
              renderGroupedSection(
                t('tag'),
                mockResults.tags,
                allTagsVisible,
                setAllTagsVisible,
                (tag) => <TagCard key={tag.id} tag={tag} isDark={isDark} />,
                mockResults?.users.length > 0,
                false,
                <LocalOffer style={{ color: 'white', fontSize: 28 }} />,
                'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              )}

            {mockResults?.users?.length > 0 &&
              renderGroupedSection(
                t('member'),
                mockResults.users,
                allUsersVisible,
                setAllUsersVisible,
                (user) => (
                  <UserCard key={user.id} user={user} isDark={isDark} />
                ),
                false,
                false,
                <People style={{ color: 'white', fontSize: 28 }} />,
                'linear-gradient(135deg, #EC4899, #BE185D)',
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
    <Box
      sx={{
        p: 4,
        minHeight: '60vh',
        '@media (max-width: 900px)': {
          p: 3,
        },
        '@media (max-width: 600px)': {
          p: 2,
        },
      }}>
      {getResultCount() > 0 ? renderResults() : <EmptyState />}
    </Box>
  );
}

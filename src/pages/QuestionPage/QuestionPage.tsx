import { useEffect, useState } from 'react';
import { Paper, Box, Typography, Skeleton, Fade, Button } from '@mui/material';
import { ArrowUp, Search } from 'lucide-react';
import QuestionView from './QuestionTag/Questionview';
import InteractionBar from './QuestionTag/InteractionBar';
import { getQuestions } from './QuestionTag/QuestionServices';
import { ApiResponse } from '@/types';
import { useUserStore } from '../../stores/useUserStore';
import { useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { getQuestionTagThemeStyles } from './themeStyles';

const QUESTIONS_PER_PAGE = 10;

export default function QuestionPage() {
  const { t } = useTranslation('question');
  const { colorScheme } = useMantineColorScheme();
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const isDark = colorScheme === 'dark';
  const { user } = useUserStore();

  const themeStyles = getQuestionTagThemeStyles(isDark);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setAllQuestions([]);
    fetchQuestions(1, searchTerm, true);
  }, [searchTerm]);

  const fetchQuestions = async (
    page: number,
    titleKeyword?: string,
    resetData = false,
  ) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const params = {
        page,
        pageSize: QUESTIONS_PER_PAGE,
        ...(titleKeyword && { titleKeyword }),
      };

      const res: ApiResponse = await getQuestions(params);
      const { questions = [], pagination: paginationData } = res.content;
      if (resetData || page === 1) {
        setAllQuestions(questions);
      } else {
        setAllQuestions((prev) => [...prev, ...questions]);
      }

      setPagination(paginationData);
    } catch (error) {
      console.error('Error fetching questions:', error);
      if (resetData || page === 1) {
        setAllQuestions([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchQuestions(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchQuestions(nextPage, searchTerm);
  };

  const hasMoreQuestions = pagination && currentPage < pagination.totalPages;

  return (
    <Box sx={themeStyles.mainContainer}>
      <Box sx={themeStyles.searchSection}>
        <Box sx={themeStyles.searchContainer}>
          <Box
            component="input"
            type="text"
            placeholder={t('searchQuestions')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={themeStyles.searchInput}
          />
          <Search
            size={20}
            style={themeStyles.searchIcon as React.CSSProperties}
          />
        </Box>
      </Box>

      {loading ? (
        <Box sx={themeStyles.loadingContainer}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={themeStyles.loadingSkeleton}
            />
          ))}
        </Box>
      ) : allQuestions?.length === 0 ? (
        <Box sx={themeStyles.emptyState}>
          <Typography variant="h6">
            {searchTerm ? t('noQuestionsFound') : t('noQuestions')}
          </Typography>
        </Box>
      ) : (
        <>
          <Box sx={themeStyles.contentContainer}>
            {allQuestions?.map((question, index) => (
              <Fade
                in={true}
                timeout={600}
                style={{
                  transitionDelay: `${(index % QUESTIONS_PER_PAGE) * 100}ms`,
                }}
                key={question.id}>
                <Paper sx={themeStyles.questionContainer} elevation={0}>
                  <Box sx={themeStyles.contentWrapper}>
                    <QuestionView data={question} />
                    {user && <InteractionBar question={question} />}
                  </Box>
                </Paper>
              </Fade>
            ))}
          </Box>

          {loadingMore && (
            <Box sx={themeStyles.loadingContainer}>
              <Skeleton
                variant="rectangular"
                sx={themeStyles.loadingSkeleton}
              />
            </Box>
          )}

          {hasMoreQuestions && !loadingMore && (
            <Box sx={themeStyles.loadMoreContainer}>
              <Button
                onClick={handleLoadMore}
                sx={themeStyles.loadMoreButton}
                variant="contained"
                size="large">
                {t('loadMore')}
              </Button>
            </Box>
          )}

          {pagination && (
            <Box sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {/* {t('showingResults', {
                  current: allQuestions.length,
                  total: pagination.total,
                })} */}
              </Typography>
            </Box>
          )}
        </>
      )}

      {showScrollTop && (
        <Box
          component="button"
          onClick={scrollToTop}
          sx={themeStyles.scrollToTop}
          aria-label="Scroll to top">
          <ArrowUp size={24} />
        </Box>
      )}
    </Box>
  );
}

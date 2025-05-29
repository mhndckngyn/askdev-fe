import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Fade,
  Skeleton,
} from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import SearchTabs from './SearchTabs';
import SearchResults from './SearchResults';
import { useLocation } from 'react-router-dom';
import { search } from './services';
import { useTranslation } from 'react-i18next';

export default function SearchPage() {
  const { t } = useTranslation('search');
  const location = useLocation();
  const keyword = location.state?.keyword;
  const { colorScheme } = useMantineColorScheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [results, setResults] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await search(keyword);
        setResults(res.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [keyword]);

  const isDark: boolean = colorScheme === 'dark';

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0c1726 0%, #1a2332 25%, #2c3e50 50%, #34495e 100%)'
          : 'linear-gradient(135deg, #3498db 0%, #2980b9 25%, #1abc9c 50%, #16a085 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isDark
            ? 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
          zIndex: 0,
        },
      }}>
      <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontFamily:
                  '"Inter", "Segoe UI", "Roboto", "Noto Sans", "Helvetica Neue", Arial, sans-serif',
                fontWeight: 800,
                mb: 2,
                background: isDark
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em',
                textShadow: isDark
                  ? '0 4px 20px rgba(102, 126, 234, 0.3)'
                  : '0 4px 20px rgba(0, 0, 0, 0.1)',
              }}>
              {t('searchResults')}
            </Typography>

            {keyword && (
              <Typography
                variant="h6"
                sx={{
                  color: isDark
                    ? 'rgba(255,255,255,0.7)'
                    : 'rgba(255,255,255,0.9)',
                  fontWeight: 500,
                  fontSize: '2.1rem',
                }}>
                "{keyword}"
              </Typography>
            )}
          </Box>
        </Fade>

        <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              background: isDark
                ? 'rgba(25, 25, 25, 0.8)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: isDark
                ? '1px solid rgba(255,255,255,0.1)'
                : '1px solid rgba(255,255,255,0.2)',
              boxShadow: isDark
                ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05)'
                : '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255,255,255,0.2)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background:
                  'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent)',
              },
            }}>
            {loading ? (
              <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Skeleton
                    variant="rectangular"
                    height={56}
                    sx={{
                      borderRadius: 0,
                      bgcolor: isDark
                        ? 'rgba(255,255,255,0.05)'
                        : 'rgba(0,0,0,0.05)',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                  }}>
                  {[...Array(4)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={200}
                      sx={{
                        borderRadius: 3,
                        bgcolor: isDark
                          ? 'rgba(255,255,255,0.05)'
                          : 'rgba(0,0,0,0.05)',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <>
                <SearchTabs
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  mockResults={results}
                  isDark={isDark}
                />

                <SearchResults
                  activeTab={activeTab}
                  mockResults={results}
                  isDark={isDark}
                />
              </>
            )}
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

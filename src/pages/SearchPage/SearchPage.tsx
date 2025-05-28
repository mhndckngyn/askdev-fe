import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import SearchTabs from './SearchTabs';
import SearchResults from './SearchResults';
//import { mockResults } from './mockData';
import { useLocation } from 'react-router-dom';
import { search } from './services';

export default function SearchPage() {
  const location = useLocation();
  const keyword = location.state?.keyword;
  console.error(keyword);
  const { colorScheme } = useMantineColorScheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [results, setResults] = useState<any | null>(null);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      try {
        const res = await search(keyword);
        setResults(res.content);
      } catch (err) {
        console.error(err);
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
          }}>
          Search Results
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: isDark
            ? '1px solid rgba(255,255,255,0.1)'
            : '1px solid rgba(0,0,0,0.1)',
        }}>
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
      </Paper>
    </Container>
  );
}

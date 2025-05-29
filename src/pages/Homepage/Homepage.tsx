import TrendingQuestions from './TrendingQuestions';
import TopContributors from './TopContributors';
import Stats from './Stats';
import Categoriespage from './Categories';
import { Box, Typography, Container } from '@mui/material';
import { HelpOutline, Label, People, Forum } from '@mui/icons-material';
import { useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  getSummary,
  getTrendingQuestions,
  getTopContributors,
  getTopTags,
} from './services';

export default function Homepage() {
  const { t } = useTranslation('home');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const [trendingQuestions, setTrendingQuestions] = useState([]);
  const [topContributors, setTopContributors] = useState([]);
  const [categories, setCategories] = useState([]);

  const [statsData, setStatsData] = useState({
    questions: 0,
    members: 0,
    answers: 0,
    tags: 0,
  });

  useEffect(() => {
    getSummary()
      .then((data) => {
        setStatsData({
          questions: data.content.questionCount ?? 0,
          members: data.content.userCount ?? 0,
          answers: data.content.answerCount ?? 0,
          tags: data.content.tagCount ?? 0,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    getTrendingQuestions()
      .then((data) => {
        setTrendingQuestions(data.content ?? []);
      })
      .catch((err) => {
        console.error(err);
      });

    getTopContributors()
      .then((data) => {
        setTopContributors(data.content ?? []);
      })
      .catch((err) => {
        console.error(err);
      });

    getTopTags()
      .then((data) => {
        const coloredCategories = data.content.map((tag: any, index: any) => {
          const colors = [
            '#2196f3',
            '#9c27b0',
            '#4caf50',
            '#ff5722',
            '#607d8b',
          ];
          return {
            ...tag,
            color: colors[index % colors.length],
          };
        });
        setCategories(coloredCategories ?? []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const stats = [
    {
      icon: <HelpOutline />,
      value: statsData.questions,
      label: t('question'),
      color: '#3f51b5',
    },
    {
      icon: <People />,
      value: statsData.members,
      label: t('user'),
      color: '#4caf50',
    },
    {
      icon: <Forum />,
      value: statsData.answers,
      label: t('answer'),
      color: '#ff9800',
    },
    {
      icon: <Label />,
      value: statsData.tags,
      label: t('tag'),
      color: '#e91e63',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isDark
          ? 'linear-gradient(135deg, #0c1726 0%, #1a2332 25%, #2c3e50 50%, #34495e 100%)'
          : 'linear-gradient(135deg, #3498db 0%, #2980b9 25%, #1abc9c 50%, #16a085 100%)',
        transition: 'all 0.3s ease-in-out',
      }}>
      <Box
        sx={{
          background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}`,
          py: 2,
        }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              {t('title')}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}>
            {t('maincontent')}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
            }}>
            {t('content')}
          </Typography>
        </Box>
        <Stats stats={stats} />
        <Box display="flex" width="100%" gap="1rem">
          <Box sx={{ flex: '2', marginRight: '5px' }}>
            <TrendingQuestions trendingQuestions={trendingQuestions} />
          </Box>
          <Box sx={{ flex: '1' }}>
            <TopContributors topContributors={topContributors} />
            <Categoriespage categories={categories} />
          </Box>
        </Box>
      </Container>

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </Box>
  );
}

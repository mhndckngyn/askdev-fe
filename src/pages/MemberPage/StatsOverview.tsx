import React from 'react';
import { Box, Card, CardContent, Typography, Slide } from '@mui/material';
import {
  QuestionAnswer as QuestionIcon,
  ThumbUp as ThumbUpIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { TotalStats } from './types';

interface StatsOverviewProps {
  totalStats: TotalStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalStats }) => {
  const statsCards = [
    {
      title: 'Câu hỏi',
      value: totalStats.totalQuestions,
      icon: <QuestionIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      title: 'Câu trả lời',
      value: totalStats.totalAnswers,
      icon: (
        <QuestionIcon
          sx={{
            fontSize: 48,
            mb: 2,
            transform: 'rotate(180deg)',
          }}
        />
      ),
      gradient: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
    },
    {
      title: 'Lượt thích',
      value: totalStats.totalUpvotes,
      icon: <ThumbUpIcon sx={{ fontSize: 48, mb: 2 }} />,
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    },
    {
      title: 'Được chọn',
      value: totalStats.chosenAnswers,
      icon: <StarIcon sx={{ fontSize: 48, mb: 2 }} />,
      gradient: 'linear-gradient(135deg, #FFD93D 0%, #FF9800 100%)',
    },
  ];

  return (
    <Slide in direction="up" timeout={1200}>
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center',
          }}>
          {statsCards.map((card) => (
            <Box
              key={card.title}
              sx={{
                flex: {
                  xs: '1 1 calc(50% - 12px)',
                  sm: '1 1 calc(25% - 18px)',
                },
                minWidth: 200,
              }}>
              <Card
                sx={{
                  height: '100%',
                  background: card.gradient,
                  color: 'white',
                  borderRadius: 3,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50% 0 0 50%',
                  },
                }}>
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    position: 'relative',
                    zIndex: 1,
                  }}>
                  {card.icon}
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    {card.value.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontWeight: 500 }}>
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Slide>
  );
};

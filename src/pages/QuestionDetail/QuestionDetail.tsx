import { Paper } from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import QuestionView from './Questionview';
import InteractionBar from './InteractionBar';
import AnswerView from './AnswerView';
import { useUserStore } from '../../stores/useUserStore';
import { useEffect } from 'react';

export default function QuestionDetail() {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const { user } = useUserStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getThemeStyles = () => ({
    container: {
      mt: 2,
      mb: 3,
      mx: 'auto',
      width: '80%',
      background: isDark
        ? 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
      borderRadius: '32px',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: isDark
        ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 25px rgba(0, 0, 0, 0.3)'
        : '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '10px',
        background: isDark
          ? 'linear-gradient(90deg, #bb86fc, #3700b3, #03dac6, #cf6679, #ff7043)'
          : 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7)',
        backgroundSize: '300% 300%',
        animation: 'gradientShift 8s ease infinite',
      },
      '&::after': isDark
        ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 20% 50%, rgba(187, 134, 252, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(3, 218, 198, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 0,
          }
        : {},
      '@keyframes gradientShift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: isDark
          ? '0 25px 80px rgba(0, 0, 0, 0.6), 0 12px 35px rgba(187, 134, 252, 0.2)'
          : '0 25px 80px rgba(0, 0, 0, 0.15), 0 12px 35px rgba(102, 126, 234, 0.1)',
      },
    },
  });

  const themeStyles = getThemeStyles();

  return (
    <Paper sx={themeStyles.container}>
      <QuestionView />
      {user && (
        <>
          <InteractionBar />
          <AnswerView />
        </>
      )}
    </Paper>
  );
}

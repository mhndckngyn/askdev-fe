import { Box, Typography, Paper } from '@mui/material';
import { useMantineColorScheme } from '@mantine/core';
import { Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Category = {
  name: string;
  color: string;
  count: number;
};

type CategoriespageProps = {
  categories: Category[];
};

export default function Categoriespage({ categories }: CategoriespageProps) {
  const { t } = useTranslation('home');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
        backdropFilter: 'blur(15px)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
        borderRadius: 3,
      }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          mb: 2,
          color: isDark ? 'white' : 'text.primary',
        }}>
        {t('popularCategories')}
      </Typography>

      {categories?.map((category, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.05)'
              : 'rgba(255,255,255,0.5)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
          <Box sx={{ color: category.color }}>
            <Tag />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: isDark ? 'white' : 'text.primary',
              }}>
              {category.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
              }}>
              {category.count.toLocaleString()} {t('question')}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

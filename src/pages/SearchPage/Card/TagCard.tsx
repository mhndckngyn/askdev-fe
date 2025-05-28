import { Card, CardContent, Box, Typography } from '@mui/material';
import { Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Tag {
  id: string;
  name: string;
  questionsCount: number;
  descriptionVi: string;
  descriptionEn: string;
}

interface TagCardProps {
  tag: Tag;
  isDark: boolean;
}

export default function TagCard({ tag, isDark }: TagCardProps) {
  const { t, i18n } = useTranslation('tagsPage');
  const currentLang = i18n.language;
  return (
    <Card
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark
            ? '0 8px 25px rgba(255,255,255,0.1)'
            : '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Tag style={{ color: 'white' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 600, mb: 0.5 }}>
              {tag?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {currentLang === 'vi' ? tag?.descriptionVi : tag?.descriptionEn}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {tag?.questionsCount} questions
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

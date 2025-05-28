import { Card, CardContent, Box, Typography } from '@mui/material';
import { Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

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
  const { t, i18n } = useTranslation('search');
  const currentLang = i18n.language;

  const navigate = useNavigate();
  const handleClick = () => {
    if (tag.id) {
      navigate(`/questions/tags/${tag.id}`);
    }
  };

  return (
    <Card
      onClick={() => {
        handleClick();
      }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(25,25,25,0.9) 0%, rgba(40,40,40,0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.98) 100%)',
        backdropFilter: 'blur(10px)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #8B5CF6, #7C3AED)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: isDark
            ? '0 20px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(139, 92, 246, 0.1)',
          '&::before': {
            opacity: 1,
          },
        },
      }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Icon Section */}
          <Box
            sx={{
              position: 'relative',
              width: 56,
              height: 56,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDark
                ? '0 8px 24px rgba(139, 92, 246, 0.25)'
                : '0 8px 24px rgba(139, 92, 246, 0.2)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: 3,
                padding: '2px',
                background: 'linear-gradient(135deg, #A78BFA, #8B5CF6)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'xor',
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
              },
            }}>
            <Tag
              size={24}
              style={{
                color: 'white',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                border: isDark ? '2px solid #1a1a1a' : '2px solid white',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              }}
            />
          </Box>

          {/* Content Section */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                mb: 1,
                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                  : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              #{tag?.name}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 2,
                lineHeight: 1.6,
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              {currentLang === 'vi' ? tag?.descriptionVi : tag?.descriptionEn}
            </Typography>

            {/* Stats Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  background: isDark
                    ? 'rgba(139, 92, 246, 0.1)'
                    : 'rgba(139, 92, 246, 0.08)',
                  border: isDark
                    ? '1px solid rgba(139, 92, 246, 0.2)'
                    : '1px solid rgba(139, 92, 246, 0.15)',
                }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? '#C4B5FD' : '#7C3AED',
                    fontSize: '0.875rem',
                  }}>
                  {tag?.questionsCount} {t('question')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

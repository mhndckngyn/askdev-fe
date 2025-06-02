import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import QuestionContent from '../QuestionContent';

interface User {
  id: string;
  username: string;
  profilePicture: string;
  bio: string;
  questionsCount: number;
  answersCount: number;
  reputation: number;
}

interface UserCardProps {
  user: User;
  isDark: boolean;
}

export default function UserCard({ user, isDark }: UserCardProps) {
  const { t } = useTranslation('search');

  const navigate = useNavigate();
  const handleClick = () => {
    if (user.id) {
      navigate(`/profile/${user.username}`);
    }
  };

  return (
    <Card
      onClick={() => {
        handleClick();
      }}
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
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
          background: 'linear-gradient(90deg, #EC4899, #BE185D)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: isDark
            ? '0 20px 40px rgba(236, 72, 153, 0.15), 0 0 0 1px rgba(255,255,255,0.1)'
            : '0 20px 40px rgba(0,0,0,0.12), 0 0 0 1px rgba(236, 72, 153, 0.1)',
          '&::before': {
            opacity: 1,
          },
        },
      }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* Avatar Section */}
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user?.profilePicture}
              sx={{
                width: 64,
                height: 64,
                background: 'linear-gradient(135deg, #EC4899, #BE185D)',
                fontSize: '1.5rem',
                fontWeight: 700,
                border: isDark
                  ? '3px solid rgba(255,255,255,0.1)'
                  : '3px solid rgba(0,0,0,0.08)',
                boxShadow: isDark
                  ? '0 8px 24px rgba(236, 72, 153, 0.2)'
                  : '0 8px 24px rgba(0,0,0,0.1)',
              }}>
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                border: isDark ? '2px solid #1a1a1a' : '2px solid white',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',

                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                  : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              {user?.username}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.6,
                color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
              {user.bio && <QuestionContent content={user.bio} />}
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? '#60A5FA' : '#2563EB',
                  }}>
                  {user?.questionsCount} {t('question')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: isDark ? '#34D399' : '#059669',
                  }}>
                  {user?.answersCount} {t('answers')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '2px',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Box
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      backgroundColor: 'white',
                    }}
                  />
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                  {user?.reputation} {t('point')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

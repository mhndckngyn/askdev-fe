import { Card, CardContent, Box, Typography, Avatar } from '@mui/material';

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
          <Avatar
            src={user?.profilePicture}
            sx={{
              width: 56,
              height: 56,
              backgroundColor: 'secondary.main',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 600, mb: 0.5 }}>
              {user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {user?.bio}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                {user?.questionsCount} questions
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.answersCount} answers
              </Typography>
              <Typography
                variant="caption"
                color="primary.main"
                sx={{ fontWeight: 600 }}>
                {user?.reputation} reputation
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

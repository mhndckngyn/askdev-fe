import { Card, CardContent, Box, Typography, Chip, Stack } from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  Visibility as ViewIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  views: number;
  upvotes: number;
  answers: number;
  isSolved: boolean;
  tags: string[];
  createdAt: string;
}

interface QuestionCardProps {
  question: Question;
  isDark: boolean;
}

export default function QuestionCard({ question, isDark }: QuestionCardProps) {
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                {question?.title}
              </Typography>
              {question?.isSolved && (
                <CheckCircleIcon sx={{ color: 'success.main', fontSize: 20 }} />
              )}
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.6 }}>
              {question?.content}
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
              {question?.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    '&:hover': { backgroundColor: 'action.hover' },
                  }}
                />
              ))}
            </Stack>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {question?.upvotes}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ViewIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {question?.views}
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {question?.answers} answers
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  by {question?.author} • {question?.createdAt}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

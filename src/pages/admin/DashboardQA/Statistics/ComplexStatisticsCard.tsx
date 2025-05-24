import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha, styled, useTheme, keyframes } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Percentage {
  color?: string;
  amount?: string | number;
  label?: string;
}

interface ComplexStatisticsCardProps {
  title: string;
  count: string | number;
  percentage?: Percentage;
  icon: React.ReactNode;
}

// Keyframe animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 30px rgba(99, 102, 241, 0.6); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  background: `linear-gradient(-45deg, 
    ${alpha(theme.palette.background.paper, 0.95)},
    ${alpha(theme.palette.background.default, 0.98)},
    ${alpha(theme.palette.primary.light, 0.05)},
    ${alpha(theme.palette.secondary.light, 0.05)}
  )`,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 8s ease infinite`,
  borderRadius: '24px',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  backdropFilter: 'blur(20px)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      ${alpha(theme.palette.primary.main, 0.1)} 0%,
      transparent 50%,
      ${alpha(theme.palette.secondary.main, 0.1)} 100%
    )`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) rotateX(5deg)',
    boxShadow: `
      0 25px 50px ${alpha(theme.palette.primary.main, 0.15)},
      0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}
    `,
    '&::before': {
      opacity: 1,
    },
    '& .floating-icon': {
      animation: `${floatAnimation} 2s ease-in-out infinite`,
    },
    '& .progress-bar': {
      transform: 'scaleX(1.02)',
    },
  },
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main} 0%,
    ${theme.palette.secondary.main} 100%
  )`,
  boxShadow: `
    0 8px 32px ${alpha(theme.palette.primary.main, 0.3)},
    inset 0 1px 0 ${alpha('#fff', 0.2)}
  `,
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: '#fff',
  },
}));

const CountTypography = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.text.primary} 0%,
    ${theme.palette.primary.main} 50%,
    ${theme.palette.secondary.main} 100%
  )`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% 200%',
  animation: `${gradientShift} 3s ease infinite`,
  fontWeight: 900,
  fontSize: '2.5rem',
  letterSpacing: '-0.02em',
}));

const ProgressContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  background: alpha(theme.palette.action.hover, 0.1),
  backdropFilter: 'blur(10px)',
}));

function ComplexStatisticsCard({
  title,
  count,
  percentage = { color: '', amount: '', label: '' },
  icon,
}: ComplexStatisticsCardProps) {
  const theme = useTheme();

  const isPositive =
    typeof percentage.amount === 'string'
      ? percentage.amount.includes('+')
      : (percentage.amount as number) > 0;

  const percentageValue =
    typeof percentage.amount === 'string'
      ? parseFloat(percentage.amount.replace(/[+\-%]/g, '')) || 0
      : Math.abs(percentage.amount as number);

  const progressValue = Math.min(Math.abs(percentageValue), 100);

  return (
    <StyledCard elevation={0}>
      <CardContent sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={3}>
          {/* Header with Icon and Title */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between">
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  opacity: 0.8,
                  mb: 1,
                }}>
                {title}
              </Typography>

              <CountTypography variant="h3" className="count-text">
                {count}
              </CountTypography>
            </Box>

            <IconAvatar className="floating-icon">
              <Box sx={{ mt: 1.5 }}>{icon}</Box>
            </IconAvatar>
          </Stack>

          {/* Progress Section */}
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                {isPositive ? (
                  <TrendingUpIcon
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: '1.25rem',
                      animation: `${floatAnimation} 2s ease-in-out infinite`,
                    }}
                  />
                ) : (
                  <TrendingDownIcon
                    sx={{
                      color: theme.palette.error.main,
                      fontSize: '1.25rem',
                      animation: `${floatAnimation} 2s ease-in-out infinite`,
                    }}
                  />
                )}
                <Typography
                  variant="h6"
                  sx={{
                    color: isPositive
                      ? theme.palette.success.main
                      : theme.palette.error.main,
                    fontWeight: 700,
                    fontSize: '1rem',
                  }}>
                  {percentage.amount}
                </Typography>
              </Stack>

              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  opacity: 0.8,
                }}>
                {percentage.label}
              </Typography>
            </Stack>

            <ProgressContainer className="progress-bar">
              <LinearProgress
                variant="determinate"
                value={progressValue}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'transparent',
                  '& .MuiLinearProgress-bar': {
                    background: isPositive
                      ? `linear-gradient(90deg, 
                          ${theme.palette.success.light} 0%,
                          ${theme.palette.success.main} 100%
                        )`
                      : `linear-gradient(90deg, 
                          ${theme.palette.error.light} 0%,
                          ${theme.palette.error.main} 100%
                        )`,
                    borderRadius: 4,
                    boxShadow: `0 2px 8px ${alpha(
                      isPositive
                        ? theme.palette.success.main
                        : theme.palette.error.main,
                      0.3,
                    )}`,
                    transition: 'all 0.3s ease',
                  },
                }}
              />
            </ProgressContainer>
          </Stack>
        </Stack>
      </CardContent>
    </StyledCard>
  );
}

export default ComplexStatisticsCard;

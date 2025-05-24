import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Zoom from '@mui/material/Zoom';
import { useMantineColorScheme } from '@mantine/core';
import { keyframes } from '@mui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Keyframe animations
const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

interface ChartDataset {
  label: string;
  data: number[];
}

interface ChartProps {
  labels: string[];
  datasets: ChartDataset[];
  colors?: string;
}

interface ReportsBarChartProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  title: string;
  description?: string;
  chart: ChartProps;
}

function configs(labels: string[], datasets: ChartDataset[]) {
  const data: ChartData<'bar'> = {
    labels,
    datasets: datasets.map((ds) => ({
      label: ds.label,
      borderWidth: 0,
      borderRadius: 8,
      borderSkipped: false,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      hoverBackgroundColor: 'rgba(255, 255, 255, 1)',
      data: ds.data,
      maxBarThickness: 12,
      barThickness: 'flex',
    })),
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        callbacks: {
          title: function (context) {
            return context[0].label || '';
          },
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ${value}`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
      y: {
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          color: 'rgba(255, 255, 255, 0.15)',
        },
        ticks: {
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
          color: 'rgba(255, 255, 255, 0.9)',
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: true,
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 15,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
            weight: 'bold',
          },
        },
        border: {
          display: false,
        },
      },
    },
    onHover: (event, activeElements) => {
      if (event.native?.target) {
        (event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? 'pointer' : 'default';
      }
    },
  };

  return { data, options };
}

function ReportsBarChart({ title, description, chart }: ReportsBarChartProps) {
  const { colorScheme } = useMantineColorScheme();
  const { data, options } = configs(
    chart.labels || [],
    chart.datasets || [{ label: '', data: [] }],
  );

  const isDark = colorScheme === 'dark';

  return (
    <Fade in timeout={800}>
      <Card
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          background: isDark
            ? 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
            : 'linear-gradient(145deg, #ffffff, #f8fafc)',
          borderRadius: '20px',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.05)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: isDark
              ? '0 20px 40px rgba(0, 0, 0, 0.4)'
              : '0 20px 40px rgba(0, 0, 0, 0.1)',
            '& .chart-container': {
              animation: `${glow} 2s ease-in-out infinite`,
            },
          },
          '&::before': {
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '2px',
            background:
              chart.colors ||
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: `${shimmer} 2s infinite`,
          },
        }}>
        <CardContent sx={{ p: 0, height: '100%' }}>
          <Box
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}>
            <Zoom in timeout={1000}>
              <Box
                className="chart-container"
                sx={{
                  background:
                    chart.colors ||
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '16px',
                 
                  height: '220px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    animation: `${shimmer} 3s infinite`,
                  },
                }}>
                {useMemo(
                  () => (
                    <Bar data={data} options={options} redraw />
                  ),
                  [data, options],
                )}
              </Box>
            </Zoom>

            <Box
              sx={{
                mt: 3,
                animation: `${slideUp} 0.6s ease-out`,
                animationDelay: '0.3s',
                animationFillMode: 'both',
              }}>
              <Divider
                sx={{
                  mb: 2,
                  height: '2px',
                  background: isDark
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(0,0,0,0.2), transparent)',
                  border: 'none',
                }}
              />

              <Typography
                variant="h5"
                sx={{
                  color: isDark ? '#ffffff' : '#1a202c',
                  fontWeight: 700,
                  mb: 1,
                  fontSize: '1.25rem',
                  background: isDark
                    ? 'linear-gradient(135deg, #ffffff, #e2e8f0)'
                    : 'linear-gradient(135deg, #2d3748, #4a5568)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textTransform: 'capitalize',
                  whiteSpace: 'pre-line',
                  lineHeight: 1.3,
                }}>
                {title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: isDark
                    ? 'rgba(255, 255, 255, 0.7)'
                    : 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  textAlign: 'right',
                  background: isDark
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.5))'
                    : 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(0,0,0,0.4))',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                {description}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}

export default ReportsBarChart;

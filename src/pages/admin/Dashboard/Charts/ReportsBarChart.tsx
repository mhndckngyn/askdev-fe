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
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartDataset {
  label: string;
  data: number[];
}

interface ChartProps {
  labels: string[];
  datasets: ChartDataset;
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

function configs(labels: string[], datasets: ChartDataset) {
  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: datasets.label,
        borderWidth: 0,
        borderRadius: 4,
        borderSkipped: false,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        data: datasets.data,
        maxBarThickness: 6,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
          color: 'rgba(255, 255, 255, .2)',
        },
        ticks: {
          padding: 10,
          font: {
            size: 14,

            family: 'Roboto',
            style: 'normal',
            lineHeight: 2,
          },
          color: '#fff',
        },
      },
      x: {
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: false,

          color: 'rgba(255, 255, 255, .2)',
        },
        ticks: {
          display: true,
          color: '#f8f9fa',
          padding: 10,
          font: {
            size: 14,

            family: 'Roboto',
            style: 'normal',
            lineHeight: 2,
          },
        },
      },
    },
  };

  return { data, options };
}

function ReportsBarChart({
  color,
  title,
  description,

  chart,
}: ReportsBarChartProps) {
  const { data, options } = configs(
    chart.labels || [],
    chart.datasets || { label: '', data: [] },
  );

  return (
    <Card sx={{ height: '100%' }}>
      <Box padding="1rem">
        {useMemo(
          () => (
            <Box
              sx={{
                background: chart.colors || '#1e1e2f',
                borderRadius: '1rem',
                boxShadow: 3,
                py: 2,
                pr: 0.5,

                height: '12.5rem',
              }}>
              <Bar data={data} options={options} redraw />
            </Box>
          ),
          [color, chart],
        )}

       
        <Box pt={3} pb={1} px={1}>
        <Divider />
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>
          <Typography
            component="div"
            variant="button"
            color="text.secondary"
            fontWeight="light">
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ReportsBarChart;

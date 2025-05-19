import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useMantineColorScheme } from '@mantine/core';

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

function ComplexStatisticsCard({
  title,
  count,
  percentage = { color: '', amount: '', label: '' },
  icon,
}: ComplexStatisticsCardProps) {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
      }}>
      <Box
        sx={{
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
        }}
        overflow="visible"
        display="flex"
        justifyContent="space-between"
        pt={1}
        px={2}>
        <Box
          sx={{
            background: percentage.color,
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '4rem',
            height: '4rem',
            mb: '24px',
          }}>
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </Box>
        <Box textAlign="right" lineHeight={1.25} mt={2}>
          <Typography
            variant="button"
            fontWeight="light"
            color={colorScheme === 'dark' ? '#fff' : '#000'}>
            {title}
          </Typography>
          <Typography
            sx={{
              color: colorScheme === 'dark' ? '#fff' : '#000',
            }}
            variant="h4">
            {count}
          </Typography>
        </Box>
      </Box>
      <Divider
        sx={{
          borderColor: colorScheme === 'dark' ? '#fff' : '#000',
          backgroundColor: colorScheme === 'dark' ? '#fff' : '#000',
        }}
      />

      <Box
        pb={2}
        px={2}
        sx={{
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f1f3f5',
          paddingTop: '15px',
        }}>
        <Typography
          component="p"
          variant="button"
          color={colorScheme === 'dark' ? '#fff' : '#000'}
          display="flex">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            sx={
              percentage.color?.includes('linear-gradient')
                ? {
                    background: percentage.color,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block',
                  }
                : {
                    color: percentage.color,
                  }
            }>
            {percentage.amount}
          </Typography>
          &nbsp;{percentage.label}
        </Typography>
      </Box>
    </Card>
  );
}

export default ComplexStatisticsCard;

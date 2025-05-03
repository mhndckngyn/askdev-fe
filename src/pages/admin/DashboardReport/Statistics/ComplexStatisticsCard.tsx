import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Icon from '@mui/material/Icon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  return (
    <Card>
      <Box
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
          <Typography variant="button" fontWeight="light" color="text">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box pb={2} px={2} mt={2}>
        <Typography component="p" variant="button" color="text" display="flex">
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

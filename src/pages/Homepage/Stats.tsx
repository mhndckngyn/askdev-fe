import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useMantineColorScheme } from '@mantine/core';
import { SvgIconProps } from '@mui/material';

type Stat = {
  label: string;
  value: string | number;
  color: string;
  icon: React.ReactElement<SvgIconProps>;
};

type StatpageProps = {
  stats: Stat[];
};

export default function Statpage({ stats }: StatpageProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mb: 5,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
      {stats?.slice(0, 4).map((stat, index) => (
        <Grid
          key={index}
          sx={{
            flex: '1 1 calc(25% - 24px)',
            minWidth: '250px',
            maxWidth: '100%',
          }}>
          <Paper
            elevation={8}
            sx={{
              p: 3,
              textAlign: 'center',
              background: isDark
                ? 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.3)'}`,
              borderRadius: 3,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              },
            }}>
            <Box
              sx={{
                color: stat.color,
                mb: 2,
                fontSize: '2.5rem',
                animation: 'pulse 2s infinite',
              }}>
              {React.cloneElement(stat.icon, { sx: { fontSize: '4rem' } })}
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: isDark ? 'white' : 'text.primary',
                mb: 1,
              }}>
              {stat.value}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDark ? 'rgba(255,255,255,0.7)' : 'text.secondary',
              }}>
              {stat.label}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

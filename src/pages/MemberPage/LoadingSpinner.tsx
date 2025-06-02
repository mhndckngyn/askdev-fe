import React from 'react';
import { Box, Typography, CircularProgress, alpha } from '@mui/material';
import { AutoAwesome as AutoAwesomeIcon } from '@mui/icons-material';

export const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          size={80}
          thickness={4}
          sx={{
            color: 'white',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          }}
        />
        <AutoAwesomeIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: 32,
            animation: 'pulse 2s infinite',
          }}
        />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
          Đang tải bảng xếp hạng
        </Typography>
        <Typography variant="body1" sx={{ color: alpha('#fff', 0.8) }}>
          Vui lòng chờ trong giây lát...
        </Typography>
      </Box>
    </Box>
  );
};

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  // No mostrar el Footer en la página de inicio
  if (location.pathname === '/') {
    return null;
  }

  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          Restaurante Ficticio {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;

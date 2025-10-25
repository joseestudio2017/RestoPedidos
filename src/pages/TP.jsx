import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme
} from '@mui/material';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

const TP = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Paper 
        elevation={4}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <BuildCircleIcon color="primary" sx={{ fontSize: { xs: 40, md: 50 }, mr: 2 }} />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2.2rem', sm: '3rem' }
            }}
          >
            Panel de TP
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Esta es una sección exclusiva para administradores.
        </Typography>
        <Typography variant="body1">
          Aquí puedes gestionar configuraciones avanzadas, realizar tareas de mantenimiento o visualizar datos críticos del sistema. 
          Este panel es una herramienta poderosa para la administración de la plataforma.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TP;

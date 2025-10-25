import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', // Altura estricta para viewport
        display: 'flex',
        flexDirection: 'column', // Apilar contenido verticalmente
        alignItems: 'center',   // Centrar horizontalmente
        justifyContent: 'center', // Centrar verticalmente
        position: 'relative',
        backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        // Padding solo horizontal para evitar desbordamiento vertical
        px: 2,

        // Overlay oscuro para legibilidad
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },

        // Contenido por encima del overlay
        '> *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? 'h4' : 'h1'} // Reducido a h4 en móvil
          component="h1"
          sx={{
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
          }}
        >
          RestoPedidos
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h5'}
          component="p"
          sx={{
            mt: 1,      // Margen superior mínimo
            mb: 2,      // Margen inferior mínimo
            maxWidth: '500px',
            mx: 'auto',
            textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
            fontWeight: 400,
          }}
        >
          La forma más rápida y deliciosa de pedir tu comida favorita.
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="secondary"
          size="large" // Botón grande para fácil toque
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem' },
            py: { xs: 1.2, sm: 1.5 },
            px: { xs: 4, sm: 5 },
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        >
          Ver Menú
        </Button>
      </Container>
    </Box>
  );
};

export default Home;

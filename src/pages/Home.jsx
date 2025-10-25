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
        height: 'calc(100vh - 64px)', // Asume que el AppBar tiene 64px de altura
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        // La imagen de fondo se define aquí
        backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundSize: 'cover', // Asegura que la imagen cubra todo el espacio
        backgroundPosition: 'center', // Centra la imagen
        color: 'white',
        textAlign: 'center',

        // Superposición para oscurecer la imagen y mejorar la legibilidad del texto
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro semitransparente
        },

        // Asegura que el contenido (texto, botón) esté por encima de la superposición
        // Usamos '> *' para aplicar esto a todos los hijos directos del Box
        '> *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? 'h2' : 'h1'}
          component="h1"
          sx={{
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '3px 3px 8px rgba(0,0,0,0.7)', // Sombra para el texto
          }}
        >
          RestoPedidos
        </Typography>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="p"
          sx={{
            mt: 2,
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
            textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
          }}
        >
          La forma más rápida y deliciosa de pedir tu comida favorita.
        </Typography>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="secondary"
          size={isMobile ? 'medium' : 'large'}
          sx={{
            fontSize: isMobile ? '1rem' : '1.2rem',
            py: 1.5,
            px: 4,
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)', // Sombra para el botón
          }}
        >
          Ver Menú
        </Button>
      </Container>
    </Box>
  );
};

export default Home;

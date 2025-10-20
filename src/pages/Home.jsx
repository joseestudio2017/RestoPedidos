import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', // Altura total menos la barra de navegación
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.6)',
          zIndex: -1,
        },
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '3px 3px 8px rgba(0,0,0,0.7)',
          }}
        >
          RestoPedidos
        </Typography>
        <Typography
          variant="h5"
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
          size="large"
          sx={{
            fontSize: '1.2rem',
            py: 1.5,
            px: 4,
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

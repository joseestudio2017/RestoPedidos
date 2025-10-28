import React from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import PageLayout from '../components/PageLayout';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <PageLayout fullScreen>
        <Typography
          variant={isMobile ? 'h4' : 'h1'}
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
            mt: 1,
            mb: 2,
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
          size="large"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem' },
            py: { xs: 1.2, sm: 1.5 },
            px: { xs: 4, sm: 5 },
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          }}
        >
          Ver Menú
        </Button>
    </PageLayout>
  );
};

export default Home;

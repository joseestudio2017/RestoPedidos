import React from 'react';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Menu = () => {
  const { menu } = useMenu();
  const { addToCart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 3, md: 5 },
        backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.88)', // Aumenta la opacidad para mejorar contraste
          zIndex: 0,
        },

        '> *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="xl">
        <Typography 
          variant={isMobile ? 'h3' : 'h2'} 
          component="h1" 
          gutterBottom 
          align="center" 
          sx={{ mb: { xs: 4, md: 6 }, fontWeight: 800, color: '#2C3E50' }}
        >
          Nuestro Menú
        </Typography>

        {menu.map((category) => (
          <Box key={category.id} sx={{ mb: { xs: 5, md: 8 } }}>
            <Typography 
              variant={isMobile ? 'h4' : 'h3'} 
              component="h2" 
              gutterBottom 
              sx={{ 
                borderBottom: 3, 
                borderColor: 'secondary.main', 
                pb: 1, 
                mb: { xs: 3, md: 5 }, 
                color: '#34495E',
                display: 'inline-block',
              }}
            >
              {category.name}
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {category.items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    boxShadow: theme.shadows[6],
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: theme.shadows[10],
                    }
                  }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ minHeight: '4.5em' }}>
                        {item.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={`$${item.price.toFixed(2)}`} 
                          color="primary" 
                          sx={{ fontSize: '1.1rem', fontWeight: 'bold', py: 2, px: 1 }} 
                        />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAddToCart(item)}
                        sx={{ width: '90%', py: 1.5, fontSize: '1rem' }}
                      >
                        Añadir al Carrito
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Menu;

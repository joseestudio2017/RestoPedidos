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
        py: isMobile ? 2 : 4,
        backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)',

        // Superposición para aclarar el fondo y mejorar la legibilidad
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // Superposición blanca
          zIndex: 0,
        },

        // Asegura que el contenido esté por encima de la superposición
        '> *': {
          position: 'relative',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom align="center" sx={{ mb: isMobile ? 3 : 6, fontWeight: 800 }}>
          Nuestro Menú
        </Typography>

        {menu.map((category) => (
          <Box key={category.id} sx={{ mb: isMobile ? 4 : 8 }}>
            <Typography variant={isMobile ? 'h5' : 'h4'} component="h2" gutterBottom sx={{ borderBottom: 3, borderColor: 'secondary.main', pb: 1, mb: isMobile ? 2 : 4, color: '#333' }}>
              {category.name}
            </Typography>
            <Grid container spacing={isMobile ? 2 : 4}>
              {category.items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: theme.shadows[4] }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <Chip label={`$${item.price.toFixed(2)}`} color="primary" sx={{ fontSize: '1rem', fontWeight: 'bold' }} />
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', p: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAddToCart(item)}
                        sx={{ width: '100%' }}
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

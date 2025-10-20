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
} from '@mui/material';

const Menu = () => {
  const { menu } = useMenu();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Nuestro Menú
      </Typography>

      {menu.map((category) => (
        <Box key={category.id} sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ borderBottom: 3, borderColor: 'secondary.main', pb: 1, mb: 4 }}>
            {category.name}
          </Typography>
          <Grid container spacing={4}>
            {category.items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
  );
};

export default Menu;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { useRole } from '../contexts/RoleContext';
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
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Menu = () => {
  const { menu } = useMenu();
  const { cartItems, addToCart, decreaseFromCart } = useCart();
  const { role } = useRole();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLoginRedirect = () => {
    navigate('/profile');
  };

  const renderMenuItems = (items) => {
    const cardComponent = (item) => {
      const cartItem = cartItems.find(ci => ci.id === item.id);

      return (
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
            {role ? (
              cartItem ? (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
                  <IconButton color="secondary" onClick={() => decreaseFromCart(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ mx: 2 }}>{cartItem.quantity}</Typography>
                  <IconButton color="secondary" onClick={() => addToCart(item)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addToCart(item)}
                  sx={{ width: '90%', py: 1.5, fontSize: '1rem' }}
                >
                  Añadir al Carrito
                </Button>
              )
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLoginRedirect}
                sx={{ width: '90%', py: 1.5, fontSize: '1rem' }}
              >
                Ingresar como Cliente
              </Button>
            )}
          </CardActions>
        </Card>
      );
    }

    if (isMobile) {
      return (
        <Box sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: '5vw',
          p: '0 2.5vw',
          pb: 2,
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}>
          {items.map((item) => (
            <Box key={item.id} sx={{ 
              width: '90vw',
              maxWidth: '400px',
              flexShrink: 0,
              scrollSnapAlign: 'center',
            }}>
              {cardComponent(item)}
            </Box>
          ))}
        </Box>
      );
    }

    return (
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            {cardComponent(item)}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 3, md: 5 },
        backgroundImage: 'url(https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
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
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
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
            {renderMenuItems(category.items)}
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Menu;

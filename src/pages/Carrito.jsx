
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia,
  Button, IconButton, TextField, Paper, Divider, Chip
} from '@mui/material';
import {
  AddCircleOutline, RemoveCircleOutline, DeleteOutline, CheckCircleOutline
} from '@mui/icons-material';

// Chip para mostrar el estado "En Preparación" en la confirmación
const StatusChip = () => (
  <Chip label="En Preparación" color="warning" sx={{ fontWeight: 'bold', fontSize: '1rem' }} />
);

const Carrito = () => {
  // CORRECT USE OF CONTEXT: Using the exact names from CartContext
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  // CORRECT CALCULATION: Using cartItems to calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    // CORRECT CHECK: Using cartItems
    if (cartItems.length > 0) {
      addOrder({ items: cartItems, total: subtotal });
      clearCart();
      setIsOrderConfirmed(true);
    }
  };

  if (isOrderConfirmed) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
        <CheckCircleOutline sx={{ fontSize: 80, color: 'success.main' }} />
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
          ¡Pago Confirmado!
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          Tu pedido está <StatusChip />
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/orders')}
        >
          Ver Mis Pedidos
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Tu Carrito
      </Typography>
      {/* CORRECT CHECK: Using cartItems to check if cart is empty */ }
      {cartItems.length === 0 ? (
        <Typography variant="h5" align="center" color="text.secondary">Tu carrito está vacío.</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* CORRECT MAPPING: Iterating over cartItems */ }
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: 'cover' }}
                  image={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent>
                    <Typography component="div" variant="h6">{item.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">${item.price.toFixed(2)}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                    {/* CORRECT FUNCTION CALL: Using updateItemQuantity */ }
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                      <RemoveCircleOutline />
                    </IconButton>
                    <TextField size="small" value={item.quantity} sx={{ width: 60, mx: 1, textAlign: 'center' }} InputProps={{ readOnly: true }}/>
                    {/* CORRECT FUNCTION CALL: Using updateItemQuantity */ }
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                      <AddCircleOutline />
                    </IconButton>
                    {/* CORRECT FUNCTION CALL: Using removeFromCart */ }
                    <IconButton onClick={() => removeFromCart(item.id)} sx={{ ml: 'auto', mr: 2 }}>
                      <DeleteOutline color="error" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Resumen del Pedido</Typography>
              <Divider sx={{ my: 2 }}/>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6">${subtotal.toFixed(2)}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }}
                onClick={handleConfirmOrder}
              >
                Confirmar Pedido
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Carrito;

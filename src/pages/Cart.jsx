import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import {
  Container,
  Typography,
  Box,
  IconButton,
  Button,
  TextField,
  MenuItem,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import {
  AddCircleOutline as AddIcon,
  RemoveCircleOutline as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';


export default function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, getTotalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderType, setOrderType] = useState('take_away');
  const [tableNumber, setTableNumber] = useState('');
  const [takeAwayNumber, setTakeAwayNumber] = useState('');

  const handlePlaceOrder = () => {
    const total = getTotalPrice() * 1.10; // Incluyendo el IVA
    const newOrder = {
      items: cartItems,
      total: total,
      paymentMethod: paymentMethod,
      status: 'Pending',
      orderType: orderType,
      tableNumber: orderType === 'table' ? tableNumber : null,
      takeAwayNumber: orderType === 'take_away' ? takeAwayNumber : null,
      timestamp: new Date().toISOString(),
    };
    const orderWithId = addOrder(newOrder);
    
    // Guardar en sessionStorage para persistir tras recarga
    sessionStorage.setItem('lastOrder', JSON.stringify(orderWithId));

    clearCart();
    
    // Redirigir a la página de facturación
    navigate('/facturacion', { state: { order: orderWithId } });
  };

  if (cartItems.length === 0) {
    return (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
                Tu carrito está vacío
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Parece que todavía no has añadido nada. ¡Explora nuestro menú!
            </Typography>
            <Button component={Link} to="/menu" variant="contained" color="secondary" size="large">
                Ir al Menú
            </Button>
        </Container>
    );
}


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Tu Pedido
      </Typography>
      <Grid container spacing={4}>
        {/* Columna de Items */}
        <Grid item xs={12} md={7}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 120 }}
                image={item.image}
                alt={item.name}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent>
                  <Typography component="div" variant="h6">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    ${item.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                  <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                    <AddIcon />
                  </IconButton>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton onClick={() => removeFromCart(item.id)} color="error" sx={{ mr: 1 }}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Card>
          ))}
        </Grid>

        {/* Columna de Resumen y Pago */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Subtotal</Typography>
              <Typography variant="h6">${getTotalPrice().toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">IVA (10%)</Typography>
              <Typography variant="h6">${(getTotalPrice() * 0.10).toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>${(getTotalPrice() * 1.10).toFixed(2)}</Typography>
            </Box>
            
            <TextField
                select
                label="Tipo de Pedido"
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                fullWidth
                variant="outlined"
                sx={{ mb: 2 }}
              >
                <MenuItem value="take_away">Para Llevar</MenuItem>
                <MenuItem value="table">Comer Aquí</MenuItem>
              </TextField>

              {orderType === 'table' ? (
                <TextField label="Número de Mesa" type="number" fullWidth variant="outlined" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} sx={{ mb: 2 }}/>
              ) : (
                <TextField label="Tu Nombre" type="text" fullWidth variant="outlined" value={takeAwayNumber} onChange={(e) => setTakeAwayNumber(e.target.value)} sx={{ mb: 2 }}/>
              )}
              
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0 || (orderType === 'table' && !tableNumber) || (orderType === 'take_away' && !takeAwayNumber)}
              sx={{ py: 1.5, fontSize: '1.2rem' }}
            >
              Finalizar Compra
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

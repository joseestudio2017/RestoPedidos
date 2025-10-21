import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia,
  Button, IconButton, TextField, Paper, Divider, ToggleButtonGroup, ToggleButton, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@mui/material';
import {
  AddCircleOutline, RemoveCircleOutline, DeleteOutline
} from '@mui/icons-material';

const Carrito = () => {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [orderType, setOrderType] = useState('table');
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrderTypeChange = (event, newOrderType) => {
    if (newOrderType !== null) {
      setOrderType(newOrderType);
      setError(''); 
    }
  };

  const validateOrder = () => {
    if (orderType === 'takeaway' && !customerName.trim()) {
      setError('Por favor, ingresa tu nombre y apellido.');
      return false;
    }
    if (orderType === 'table' && !tableNumber) {
      setError('Por favor, selecciona una mesa.');
      return false;
    }
    setError('');
    return true;
  };

  const handleConfirmOrder = () => {
    if (!validateOrder() || cartItems.length === 0) {
      return;
    }

    const orderPayload = {
      items: cartItems,
      total: subtotal,
      orderType: orderType,
      ...(orderType === 'takeaway' && { customerName: customerName.trim(), takeAwayNumber: `#${Math.floor(Math.random() * 1000)}` }),
      ...(orderType === 'table' && { tableNumber: tableNumber }),
    };

    // addOrder now returns the full order with ID
    const newOrder = addOrder(orderPayload);
    
    clearCart();
    
    // Navigate with the complete order object
    navigate('/facturacion', { state: { order: newOrder } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Tu Carrito
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="h5" align="center" color="text.secondary">Tu carrito está vacío.</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
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
                     <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                       <RemoveCircleOutline />
                     </IconButton>
                     <TextField size="small" value={item.quantity} sx={{ width: 60, mx: 1, textAlign: 'center' }} InputProps={{ readOnly: true }}/>
                     <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                       <AddCircleOutline />
                     </IconButton>
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
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Opciones del Pedido</Typography>
              <ToggleButtonGroup
                value={orderType}
                exclusive
                onChange={handleOrderTypeChange}
                fullWidth
                sx={{ mb: 2 }}
              >
                <ToggleButton value="table">Para Mesa</ToggleButton>
                <ToggleButton value="takeaway">Para Llevar</ToggleButton>
              </ToggleButtonGroup>

              {orderType === 'table' ? (
                <FormControl fullWidth variant="outlined" error={!!error && orderType === 'table'}>
                  <InputLabel id="table-select-label">Mesa</InputLabel>
                  <Select
                    labelId="table-select-label"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    label="Mesa"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <MenuItem key={n} value={n}>Mesa {n}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  label="Nombre y Apellido"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  error={!!error && orderType === 'takeaway'}
                />
              )}
              {error && <FormHelperText error sx={{ mt: 1, fontWeight: 'bold' }}>{error}</FormHelperText>}

              <Divider sx={{ my: 2 }}/>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Resumen del Pedido</Typography>
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
                disabled={cartItems.length === 0}
              >
                Confirmar y Pagar
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Carrito;

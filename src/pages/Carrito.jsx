import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Card, CardContent, CardMedia,
  Button, IconButton, TextField, Paper, Divider, ToggleButtonGroup, ToggleButton, 
  Modal, FormHelperText, useTheme 
} from '@mui/material';
import {
  AddCircleOutline, RemoveCircleOutline, DeleteOutline
} from '@mui/icons-material';
import TableSelection from '../components/TableSelection';

const Carrito = () => {
  const { cartItems, selectedTable, numberOfChairs, setTable, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const theme = useTheme();

  const [orderType, setOrderType] = useState('table');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (orderType === 'table' && !selectedTable) {
      setError('Por favor, selecciona una mesa y el número de sillas.');
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
      ...(orderType === 'table' && { tableNumber: selectedTable, chairs: numberOfChairs }),
    };

    const newOrder = addOrder(orderPayload);
    clearCart();
    navigate('/facturacion', { state: { order: newOrder } });
  };
  
  const handleSelectTable = (tableId, chairs) => {
    setTable(tableId, chairs);
    setIsModalOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: { xs: 4, md: 6 }, fontWeight: 800, fontSize: { xs: '2.5rem', sm: '3.75rem' } }}>
        Tu Carrito
      </Typography>
      {cartItems.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography variant="h5" color="text.secondary">Tu carrito está vacío.</Typography>
          <Button component="a" href="/menu" variant="contained" color="primary" sx={{ mt: 3 }}>Ir al Menú</Button>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ display: 'flex', mb: 2.5, alignItems: 'center', flexDirection: { xs: 'column', sm: 'row' }, boxShadow: theme.shadows[2] }}>
                <CardMedia
                  component="img"
                  sx={{ width: { xs: '100%', sm: 140 }, height: { xs: 160, sm: 140 }, objectFit: 'cover' }}
                  image={item.image || 'https://via.placeholder.com/150'}
                  alt={item.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
                  <CardContent sx={{ flex: '1 0 auto', p: { xs: 2, sm: '16px 24px' } }}>
                    <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">${item.price.toFixed(2)}</Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2 } }}>
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} size="small">
                      <RemoveCircleOutline />
                    </IconButton>
                    <Typography sx={{ mx: 2, fontWeight: 'bold', width: 20, textAlign: 'center' }}>{item.quantity}</Typography>
                    <IconButton onClick={() => updateItemQuantity(item.id, item.quantity + 1)} size="small">
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
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, position: { md: 'sticky' }, top: 80, borderRadius: '12px' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Opciones del Pedido</Typography>
              <ToggleButtonGroup
                value={orderType}
                exclusive
                onChange={handleOrderTypeChange}
                fullWidth
                sx={{ mb: 3 }}
              >
                <ToggleButton value="table">Para Mesa</ToggleButton>
                <ToggleButton value="takeaway">Para Llevar</ToggleButton>
              </ToggleButtonGroup>

              {orderType === 'table' ? (
                 <Box>
                    {selectedTable ? (
                      <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>
                        Mesa: <strong>{selectedTable}</strong> | Sillas: <strong>{numberOfChairs}</strong>
                      </Typography>
                    ) : (
                      <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>Mesa: <strong>Ninguna</strong></Typography>
                    )}
                    <Button variant="outlined" onClick={() => setIsModalOpen(true)} fullWidth>
                      {selectedTable ? 'Cambiar Mesa' : 'Seleccionar Mesa'}
                    </Button>
                 </Box>
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

              <Divider sx={{ my: 3 }}/>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Resumen</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1.5 }}>
                <Typography variant="h6">Subtotal</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${subtotal.toFixed(2)}</Typography>
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
       <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="table-selection-modal-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <TableSelection 
          onSelectTable={handleSelectTable} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </Container>
  );
};

export default Carrito;

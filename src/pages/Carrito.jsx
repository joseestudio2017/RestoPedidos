import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useOrders } from '../contexts/OrdersContext';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Box, Grid, Card, CardContent, CardMedia,
  Button, IconButton, TextField, Paper, Divider, ToggleButtonGroup, ToggleButton,
  Modal, FormHelperText, useTheme, useMediaQuery, styled
} from '@mui/material';
import {
  AddCircleOutline, RemoveCircleOutline, DeleteOutline, ShoppingCart
} from '@mui/icons-material';
import TableSelection from '../components/TableSelection';
import PageLayout from '../components/PageLayout';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  boxShadow: theme.shadows[8],
  borderRadius: '16px',
  color: 'white',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

const Carrito = () => {
  const { cartItems, selectedTable, numberOfChairs, setTable, updateItemQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    if (orderType === 'table' && (!selectedTable || !numberOfChairs)) {
      setError('Por favor, selecciona una mesa y número de sillas.');
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
  
  const isConfirmButtonDisabled = 
    cartItems.length === 0 ||
    (orderType === 'table' && (!selectedTable || !numberOfChairs)) ||
    (orderType === 'takeaway' && !customerName.trim());

  const renderOrderOptions = () => (
    <GlassmorphicPaper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>Opciones del Pedido</Typography>
      <ToggleButtonGroup
        value={orderType}
        exclusive
        onChange={handleOrderTypeChange}
        fullWidth
        sx={{ mb: 3 }}
      >
        <ToggleButton value="table" sx={{ color: 'white' }}>Para Mesa</ToggleButton>
        <ToggleButton value="takeaway" sx={{ color: 'white' }}>Para Llevar</ToggleButton>
      </ToggleButtonGroup>

      {orderType === 'table' ? (
         <Box>
            {selectedTable ? (
              <Typography variant="h6" sx={{ mb: 1, textAlign: 'center', color: 'rgba(255, 255, 255, 0.9)' }}>
                Mesa: <strong>{selectedTable}</strong> | Sillas: <strong>{numberOfChairs}</strong>
              </Typography>
            ) : (
              <Typography variant="h6" sx={{ mb: 1, textAlign: 'center', color: 'rgba(255, 255, 255, 0.9)' }}>Mesa: <strong>Ninguna</strong></Typography>
            )}
            <Button variant="outlined" color="secondary" onClick={() => setIsModalOpen(true)} fullWidth>
              {selectedTable ? 'Cambiar Mesa' : 'Seleccionar Mesa'}
            </Button>
         </Box>
      ) : (
        <StyledTextField
          label="Nombre y Apellido"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          fullWidth
          variant="outlined"
          error={!!error && orderType === 'takeaway'}
        />
      )}
      {error && <FormHelperText error sx={{ mt: 1, fontWeight: 'bold' }}>{error}</FormHelperText>}
    </GlassmorphicPaper>
  );

  const renderCartItems = () => (
    <Box>
      {cartItems.map((item) => (
        <Card key={item.id} sx={theme => ({
          display: 'flex', mb: 2.5, alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          color: 'white',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: `0 0 15px 3px ${theme.palette.secondary.main}`,
          }
        })}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', sm: 140 }, height: { xs: 160, sm: 140 }, objectFit: 'cover', borderRadius: { xs: '16px 16px 0 0', sm: '16px 0 0 16px'} }}
            image={item.image || 'https://via.placeholder.com/150'}
            alt={item.name}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%' }}>
            <CardContent sx={{ flex: '1 0 auto', p: { xs: 2, sm: '16px 24px' } }}>
              <Typography component="div" variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
              <Typography variant="subtitle1" sx={{color: 'rgba(255,255,255,0.8)'}} component="div">${item.price.toFixed(2)}</Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 2 } }}>
              <IconButton color="inherit" onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} size="small">
                <RemoveCircleOutline />
              </IconButton>
              <Typography sx={{ mx: 2, fontWeight: 'bold', width: 20, textAlign: 'center' }}>{item.quantity}</Typography>
              <IconButton color="inherit" onClick={() => updateItemQuantity(item.id, item.quantity + 1)} size="small">
                <AddCircleOutline />
              </IconButton>
              <IconButton onClick={() => removeFromCart(item.id)} sx={{ ml: 'auto', mr: 2 }}>
                <DeleteOutline color="error" />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );

  return (
    <PageLayout title="Tu Carrito" icon={ShoppingCart}>
      {cartItems.length === 0 ? (
        <GlassmorphicPaper elevation={3} sx={{ textAlign: 'center', py: 8, px: 3 }}>
          <Typography variant="h5">Tu carrito está vacío.</Typography>
          <Button component="a" href="/menu" variant="contained" color="secondary" sx={{ mt: 3, fontWeight: 'bold' }}>Ir al Menú</Button>
        </GlassmorphicPaper>
      ) : isMobile ? (
        // =========== MOBILE LAYOUT ===========
        <>
          <Box sx={{ pb: '180px' }}>
            {renderOrderOptions()}
            {renderCartItems()}
          </Box>

          <GlassmorphicPaper elevation={8} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 2, zIndex: 1100, borderRadius: '16px 16px 0 0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}>
                <Typography variant="h6">Subtotal:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 1, py: 1.5, fontWeight: 'bold' }}
                onClick={handleConfirmOrder}
                disabled={isConfirmButtonDisabled}
              >
                Confirmar y Pagar
              </Button>
          </GlassmorphicPaper>
        </>
      ) : (
        // =========== DESKTOP LAYOUT ===========
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={8}>
            {renderCartItems()}
          </Grid>
          <Grid item xs={12} md={4}>
            <GlassmorphicPaper elevation={3} sx={{ p: { xs: 2, sm: 3 }, position: 'sticky', top: 90 }}>
              {renderOrderOptions()}
              <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.2)' }}/>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>Resumen</Typography>
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
                disabled={isConfirmButtonDisabled}
              >
                Confirmar y Pagar
              </Button>
            </GlassmorphicPaper>
          </Grid>
        </Grid>
      )}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="table-selection-modal-title"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Box sx={{p: 0.5, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '16px', backdropFilter: 'blur(5px)' }}>
          <TableSelection 
            onSelectTable={handleSelectTable} 
            onCancel={() => setIsModalOpen(false)} 
          />
        </Box>
      </Modal>
    </PageLayout>
  );
};

export default Carrito;

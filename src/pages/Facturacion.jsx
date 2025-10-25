import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrdersContext';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
  useTheme,
  Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QRCode from 'qrcode';
import CreditCardForm from '../components/CreditCardForm';

function Facturacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOrderStatus } = useOrders();
  const qrCanvasRef = useRef(null);
  const theme = useTheme();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    let orderData = location.state?.order;
    if (!orderData) {
      const savedOrder = sessionStorage.getItem('lastOrder');
      try {
        orderData = savedOrder ? JSON.parse(savedOrder) : null;
      } catch (error) {
        console.error("Error parsing saved order:", error);
        orderData = null;
      }
    }
    if (orderData) {
        setOrder(orderData);
        sessionStorage.setItem('lastOrder', JSON.stringify(orderData));
    }
    setLoading(false);
  }, [location.state?.order]);

  useEffect(() => {
    if (order && qrCanvasRef.current && paymentMethod === 'qr') {
      const qrText = `https://example.com/pay?orderId=${order.id}&total=${order.total}`;
      QRCode.toCanvas(qrCanvasRef.current, qrText, { width: 200, margin: 2 }, (error) => {
        if (error) console.error('Error generating QR Code:', error);
      });
    }
  }, [order, paymentMethod]);

  const handlePaymentSuccess = () => {
    if (order) {
      updateOrderStatus(order.id, 'en preparacion');
      setIsPaid(true);
      sessionStorage.removeItem('lastOrder');
    }
  };

  if (loading) {
    return <Container sx={{ py: 8, textAlign: 'center' }}><CircularProgress size={60} /></Container>;
  }

  if (!order) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>No se encontró el pedido</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>Parece que no hay un pedido activo para facturar.</Typography>
        <Button component={Link} to="/menu" variant="contained" color="primary" size="large">Volver al Menú</Button>
      </Container>
    );
  }

  if (isPaid) {
    return (
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 }, textAlign: 'center' }}>
        <Paper sx={{ p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '16px' }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: { xs: 70, sm: 90 }, mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>¡Pago Confirmado!</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Tu pedido está <Chip label="En Preparación" color="warning" sx={{ fontWeight: 'bold' }} />.
          </Typography>
          <Button onClick={() => navigate('/orders')} variant="contained" size="large">Ver Mis Pedidos</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 3, md: 5 }, mb: 4 }}>
      <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 800, mb: { xs: 4, md: 6 }, fontSize: { xs: '2.5rem', sm: '3.75rem' } }}>
        Finaliza tu Pago
      </Typography>
      <Grid container spacing={{ xs: 3, lg: 5 }}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: '16px', boxShadow: theme.shadows[3], position: { md: 'sticky' }, top: 80 }}>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>Resumen</Typography>
            <Chip label={order.orderType === 'table' ? `Mesa ${order.tableNumber}` : `Para Llevar: ${order.takeAwayNumber}` } color="primary" sx={{ mb: 2, fontWeight: 500 }} />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ maxHeight: 220, overflow: 'auto', pr: 1, mb: 2 }}>
              {order.items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography>{item.name} <span style={{ color: theme.palette.text.secondary }}>(x{item.quantity})</span></Typography>
                  <Typography sx={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }} color="primary">${order.total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: '16px', boxShadow: theme.shadows[3] }}>
            <Typography variant='h4' sx={{ fontWeight: 700, mb: 3 }}>Método de Pago</Typography>
            <TextField
              select
              label="Selecciona una opción"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
              variant="outlined"
              sx={{ mb: 3 }}
            >
              <MenuItem value="card">Tarjeta de Crédito / Débito</MenuItem>
              <MenuItem value="qr">Código QR</MenuItem>
              <MenuItem value="transfer">Transferencia Bancaria</MenuItem>
            </TextField>

            <Box sx={{ p: { xs: 2, sm: 3 }, border: `1px solid ${theme.palette.divider}`, borderRadius: '12px', minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {paymentMethod === 'card' && (
                <CreditCardForm onPaymentSuccess={handlePaymentSuccess} orderTotal={order.total} />
              )}
              {paymentMethod === 'qr' && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography>Escanea el código con tu app de pagos preferida:</Typography>
                  <canvas ref={qrCanvasRef} style={{ marginTop: 20, borderRadius: '8px', border: `1px solid ${theme.palette.divider}` }} />
                  <Button variant="contained" color="success" fullWidth size="large" sx={{ mt: 3, py: 1.5 }} onClick={handlePaymentSuccess}>Hecho, confirmar pago</Button>
                </Box>
              )}
              {paymentMethod === 'transfer' && (
                <Box>
                  <Typography variant="h6" gutterBottom>Datos para la transferencia:</Typography>
                  <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography><strong>Banco:</strong> Banco Digital Ficticio</Typography>
                    <Typography><strong>Alias:</strong> hamburguesas.deliciosas</Typography>
                    <Typography><strong>CBU:</strong> 0123456789012345678901</Typography>
                  </Alert>
                  <Typography sx={{ mt: 2 }} color="text.secondary">Recuerda incluir el número de pedido en el concepto de la transferencia.</Typography>
                  <Button variant="contained" color="success" fullWidth size="large" sx={{ mt: 3, py: 1.5 }} onClick={handlePaymentSuccess}>Ya realicé la transferencia</Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Facturacion;

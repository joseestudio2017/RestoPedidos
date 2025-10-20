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
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QRCode from 'qrcode';
import CreditCardForm from '../components/CreditCardForm';

function Facturacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateOrderStatus } = useOrders();
  const qrCanvasRef = useRef(null);
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card'); // Iniciar con tarjeta
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    let orderData = location.state?.order;
    if (!orderData) {
      const savedOrder = sessionStorage.getItem('lastOrder');
      if (savedOrder) {
        try {
          orderData = JSON.parse(savedOrder);
        } catch (error) {
          console.error("Error parsing saved order:", error);
          orderData = null;
        }
      }
    }
    setOrder(orderData);
    setLoading(false);
  }, [location.state?.order]);

  useEffect(() => {
    if (order && qrCanvasRef.current && paymentMethod === 'qr') {
      const qrText = `https://example.com/pay?orderId=${order.id}&total=${order.total}`;
      QRCode.toCanvas(qrCanvasRef.current, qrText, { width: 220 }, (error) => {
        if (error) console.error('Error generating QR Code:', error);
      });
    }
  }, [order, paymentMethod]);

  const handlePaymentSuccess = () => {
    if (order) {
      updateOrderStatus(order.id, 'En Preparación');
      setIsPaid(true);
    }
  };

  if (loading) {
    return <Container sx={{ py: 8, textAlign: 'center' }}><CircularProgress /></Container>;
  }

  if (!order) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>No se encontró información del pedido.</Typography>
        <Button component={Link} to="/menu" variant="contained" color="primary">Volver al Menú</Button>
      </Container>
    );
  }

  if (isPaid) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom>¡Pago Confirmado!</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Tu pedido está <Chip label="En Preparación" color="warning" />.
          </Typography>
          <Button onClick={() => navigate('/orders')} variant="contained" size="large">Ver Mis Pedidos</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 800, mb: 4 }}>
        Finaliza tu Pago
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, position: 'sticky', top: 80 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Resumen</Typography>
            <Chip label={`Pedido: ${order.orderType === 'table' ? `Mesa ${order.tableNumber}` : order.takeAwayNumber}`} color="primary" sx={{ mb: 2 }} />
            <Divider sx={{ my: 2 }} />
            <Box sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
              {order.items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.name} (x{item.quantity})</Typography>
                  <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>Método de Pago</Typography>
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

            <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, minHeight: 320, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {paymentMethod === 'card' && (
                <CreditCardForm onPaymentSuccess={handlePaymentSuccess} orderTotal={order.total} />
              )}
              {paymentMethod === 'qr' && (
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>Escanea el código con tu app de pagos:</Typography>
                  <canvas ref={qrCanvasRef} />
                </Box>
              )}
              {paymentMethod === 'transfer' && (
                <Box>
                  <Typography variant="h6" gutterBottom>Datos para la transferencia:</Typography>
                  <Typography><strong>Banco:</strong> Banco Digital Ficticio</Typography>
                  <Typography><strong>Alias:</strong> hamburguesas.deliciosas</Typography>
                  <Typography><strong>CBU:</strong> 0123456789012345678901</Typography>
                  <Typography sx={{ mt: 2 }}>Recuerda incluir tu número de pedido en el concepto.</Typography>
                </Box>
              )}

              {/* Botón de confirmación para QR y Transferencia */}
              {(paymentMethod === 'qr' || paymentMethod === 'transfer') && (
                <Button 
                    variant="contained" 
                    color="success" 
                    fullWidth 
                    size="large" 
                    sx={{ mt: 3, py: 1.5, fontSize: '1.2rem' }}
                    onClick={handlePaymentSuccess}
                >
                    {paymentMethod === 'qr' ? 'Confirmar Pago' : 'Ya realicé la transferencia'}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Facturacion;

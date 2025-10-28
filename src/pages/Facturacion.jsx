import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useOrders } from '../contexts/OrdersContext';
import {
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
  Alert,
  styled,
  AlertTitle
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import QRCode from 'qrcode';
import CreditCardForm from '../components/CreditCardForm';
import PageLayout from '../components/PageLayout';
import { CreditCard as CreditCardIcon } from '@mui/icons-material';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
    padding: theme.spacing(3, 4),
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
        '& .MuiSelect-icon': {
            color: 'rgba(255, 255, 255, 0.8)',
        },
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

const GlassmorphicAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: 'rgba(0, 100, 255, 0.2)',
    color: '#E0E0E0',
    fontWeight: 'bold',
    '& .MuiAlert-icon': {
        color: theme.palette.info.light,
    }
}));

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
      QRCode.toCanvas(qrCanvasRef.current, qrText, { width: 200, margin: 2, color: { dark: '#FFFFFF', light: '#00000000' } }, (error) => {
        if (error) console.error('Error generating QR Code:', error);
      });
    }
  }, [order, paymentMethod]);

  const handlePaymentSuccess = () => {
    if (order) {
      updateOrderStatus(order.id, 'Pedido');
      setIsPaid(true);
      sessionStorage.removeItem('lastOrder');
    }
  };

  if (loading) {
    return <PageLayout><Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}><CircularProgress size={60} color="secondary" /></Box></PageLayout>;
  }

  if (!order) {
    return (
        <PageLayout title="Error">
            <GlassmorphicPaper sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="h4" gutterBottom>No se encontró el pedido</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>Parece que no hay un pedido activo para facturar.</Typography>
                <Button component={Link} to="/menu" variant="contained" color="primary" size="large">Volver al Menú</Button>
            </GlassmorphicPaper>
        </PageLayout>
    );
  }

  if (isPaid) {
    return (
        <PageLayout title="¡Pago Confirmado!">
            <GlassmorphicPaper sx={{ p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: { xs: 70, sm: 90 }, mb: 2, filter: 'drop-shadow(0 0 10px limegreen)' }} />
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
                    Tu pedido está <Chip label="Pedido" color="error" variant="contained" sx={{ fontWeight: 'bold' }} />.
                </Typography>
                <Button onClick={() => navigate('/orders')} variant="contained" size="large">Ver Mis Pedidos</Button>
            </GlassmorphicPaper>
        </PageLayout>
    );
  }

  return (
    <PageLayout title="Finaliza tu Pago" icon={CreditCardIcon}>
      <Grid container spacing={{ xs: 3, lg: 5 }}>
        <Grid item xs={12} md={5}>
          <GlassmorphicPaper sx={{ position: { md: 'sticky' }, top: 90 }}>
            <Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold' }}>Resumen</Typography>
            <Chip label={order.orderType === 'table' ? `Mesa ${order.tableNumber}` : `Para Llevar: ${order.takeAwayNumber}` } color="primary" sx={{ mb: 2, fontWeight: 500 }} />
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Box sx={{ maxHeight: 220, overflow: 'auto', pr: 1, mb: 2 }}>
              {order.items.map(item => (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography>{item.name} <span style={{ color: 'rgba(255,255,255,0.6)' }}>(x{item.quantity})</span></Typography>
                  <Typography sx={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>Total:</Typography>
              <Typography variant='h4' sx={{ fontWeight: 'bold' }} color="primary">${order.total.toFixed(2)}</Typography>
            </Box>
          </GlassmorphicPaper>
        </Grid>

        <Grid item xs={12} md={7}>
          <GlassmorphicPaper>
            <Typography variant='h4' sx={{ fontWeight: 700, mb: 3 }}>Método de Pago</Typography>
            <StyledTextField
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
            </StyledTextField>

            <Box sx={{ p: { xs: 2, sm: 3 }, border: `1px solid rgba(255,255,255,0.2)`, borderRadius: '12px', minHeight: 350, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {paymentMethod === 'card' && (
                <CreditCardForm onPaymentSuccess={handlePaymentSuccess} orderTotal={order.total} />
              )}
              {paymentMethod === 'qr' && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography sx={{color: 'rgba(255,255,255,0.9)'}}>Escanea el código con tu app de pagos preferida:</Typography>
                  <canvas ref={qrCanvasRef} style={{ marginTop: 20, borderRadius: '8px', border: `1px solid ${theme.palette.divider}` }} />
                  <Button variant="contained" color="success" fullWidth size="large" sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }} onClick={handlePaymentSuccess}>Hecho, confirmar pago</Button>
                </Box>
              )}
              {paymentMethod === 'transfer' && (
                <Box>
                  <Typography variant="h6" gutterBottom>Datos para la transferencia:</Typography>
                  <GlassmorphicAlert severity="info" sx={{ mb: 2 }}>
                    <AlertTitle>Datos Bancarios</AlertTitle>
                    <Typography><strong>Banco:</strong> Banco Digital Ficticio</Typography>
                    <Typography><strong>Alias:</strong> hamburguesas.deliciosas</Typography>
                    <Typography><strong>CBU:</strong> 0123456789012345678901</Typography>
                  </GlassmorphicAlert>
                  <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.7)' }}>Recuerda incluir el número de pedido en el concepto de la transferencia.</Typography>
                  <Button variant="contained" color="success" fullWidth size="large" sx={{ mt: 3, py: 1.5, fontWeight: 'bold' }} onClick={handlePaymentSuccess}>Ya realicé la transferencia</Button>
                </Box>
              )}
            </Box>
          </GlassmorphicPaper>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

export default Facturacion;

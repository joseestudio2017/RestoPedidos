import React, { useState, useMemo } from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  styled
} from '@mui/material';
import {
    Fastfood,
    Restaurant,
    CheckCircle,
    DeliveryDining as DeliveryDiningIcon
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
}));

const Entrega = () => {
  const { orders, updateOrderStatus } = useOrders();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showDelivered, setShowDelivered] = useState(false);

  const filteredOrders = useMemo(() => {
    const sortedOrders = orders.slice().sort((a, b) => a.timestamp - b.timestamp);
    if (showDelivered) {
      return sortedOrders;
    }
    return sortedOrders.filter(order => order.status.toLowerCase() !== 'entregado');
  }, [orders, showDelivered]);

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleShowDeliveredChange = (event) => {
    setShowDelivered(event.target.checked);
  };

  const getOrderStatusChip = (status) => {
    const lowerCaseStatus = status ? status.toLowerCase() : '';
    switch (lowerCaseStatus) {
      case 'pedido':
      case 'pendiente':
        return <Chip label="Pedido" color="error" variant="filled" sx={{fontWeight: 'bold'}}/>;
      case 'en preparacion':
        return <Chip label="En Preparación" color="warning" variant="filled" sx={{fontWeight: 'bold'}}/>;
      case 'entregado':
        return <Chip label="Entregado" color="success" variant="filled" sx={{fontWeight: 'bold'}}/>;
      default:
        return <Chip label={status} />;
    }
  };

  const renderOrderHeader = (order) => {
    if (order.orderType === 'takeaway') {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Fastfood color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Pedido para Llevar
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            Cliente: {order.customerName} ({order.takeAwayNumber})
          </Typography>
        </Box>
      );
    }
    if (order.orderType === 'table') {
      return (
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Restaurant color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Comer en el Lugar
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
            Mesa seleccionada: {order.tableNumber}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <PageLayout title="Panel de Entregas" icon={DeliveryDiningIcon}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <GlassmorphicPaper sx={{p: 1, px: 2}}>
                <FormControlLabel
                    control={<Checkbox checked={showDelivered} onChange={handleShowDeliveredChange} sx={{ color: 'rgba(255,255,255,0.8)', '&.Mui-checked': { color: 'secondary.main' } }} />}
                    label="Mostrar pedidos entregados"
                />
            </GlassmorphicPaper>
        </Box>
        {filteredOrders.length > 0 ? (
            <Grid container spacing={isMobile ? 2 : 3}>
            {filteredOrders.map((order) => {
                const orderStatus = order.status ? order.status.toLowerCase() : '';
                return (
                <Grid item xs={12} sm={6} md={4} key={order.id}>
                    <GlassmorphicPaper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {renderOrderHeader(order)}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                            {getOrderStatusChip(order.status)}
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</Typography>
                        </Box>
                        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <Box sx={{ flexGrow: 1, my: 2, maxHeight: 150, overflowY: 'auto' }}>
                            {order.items.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography>{item.name}</Typography>
                                <Typography>x{item.quantity}</Typography>
                            </Box>
                            ))}
                        </Box>
                        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.2)' }} />
                        <Box sx={{ mt: 'auto', height: 50 }}>
                            {(orderStatus === 'pedido' || orderStatus === 'pendiente') && (
                            <Button
                                variant="contained"
                                color="warning"
                                fullWidth
                                onClick={() => handleUpdateStatus(order.id, 'en preparacion')}
                            >
                                En Preparación
                            </Button>
                            )}
                            {orderStatus === 'en preparacion' && (
                            <Button
                                variant="contained"
                                color="success"
                                fullWidth
                                onClick={() => handleUpdateStatus(order.id, 'entregado')}
                                startIcon={<CheckCircle />}
                            >
                                Entregar
                            </Button>
                            )}
                        </Box>
                    </GlassmorphicPaper>
                </Grid>
                );
            })}
            </Grid>
        ) : (
            <GlassmorphicPaper sx={{textAlign: 'center', py: 6}}>
                <Typography variant="h5" align="center">No hay pedidos para mostrar.</Typography>
            </GlassmorphicPaper>
        )}
    </PageLayout>
  );
};

export default Entrega;

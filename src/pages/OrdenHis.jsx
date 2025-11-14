import React, { useState, useEffect } from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  CircularProgress,
  styled
} from '@mui/material';
import { History } from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

// Styled component for the card to maintain the glassmorphic effect
const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  height: '100%',
}));

const getChipStyle = (status) => {
    const baseStyle = { color: 'white', fontWeight: 'bold' };
    switch (status) {
        case 'Entregado':
            return { ...baseStyle, backgroundColor: '#4caf50' }; // Verde
        case 'Cancelado':
            return { ...baseStyle, backgroundColor: '#9e9e9e' }; // Gris
        default:
            return {};
    }
};

const OrdenHis = () => {
  const { orders } = useOrders();
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders) {
      // Filter orders to show only those with "Entregado" or "Cancelado" status
      const filtered = orders.filter(order => order.status === 'Entregado' || order.status === 'Cancelado');
      // Sort the filtered orders by creation date, newest first
      const sorted = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setHistoryOrders(sorted);
      setLoading(false);
    }
  }, [orders]);

  // Reusable function to render each order card
  const renderOrderCard = (order) => (
    <Grid item xs={12} md={6} lg={4} key={order.id}>
      <GlassmorphicCard elevation={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {order.orderType === 'table' ? `Mesa #${order.tableNumber}` : (order.customerName || `Pedido #${order.id.split('-')[1]}`)}
          </Typography>
          <Chip
            label={order.status}
            size="small"
            sx={getChipStyle(order.status)}
          />
        </Box>
        <Box sx={{ flexGrow: 1, my: 2, pl: 1, borderLeft: '2px solid', borderColor: 'grey.700' }}>
          {order.items.map(item => {
            const itemPrice = (Number(item.price) || 0) * (Number(item.quantity) || 0);
            return (
                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5, pl: 1.5 }}>
                    <Typography>{item.name} <span style={{color: 'rgba(255,255,255,0.7)'}}>(x{item.quantity})</span></Typography>
                    <Typography sx={{ fontWeight: 'medium' }}>${itemPrice.toFixed(2)}</Typography>
                </Box>
            );
        })}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, pt: 1.5, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</Typography>
        </Box>
      </GlassmorphicCard>
    </Grid>
  );

  return (
    <PageLayout title="Historial de Pedidos" icon={History}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="secondary" /></Box>
      ) : historyOrders.length > 0 ? (
        <Grid container spacing={3}>{historyOrders.map(renderOrderCard)}</Grid>
      ) : (
        <GlassmorphicCard sx={{textAlign: 'center', p: 5}}>
          <Typography variant="h5">No tienes pedidos en tu historial.</Typography>
        </GlassmorphicCard>
      )}
    </PageLayout>
  );
};

export default OrdenHis;

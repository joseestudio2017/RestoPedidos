import React, { useState, useEffect } from 'react';
import { useOrders } from '../contexts/OrdersContext';
import { useRole } from '../contexts/RoleContext';
import {
  Typography, Box, Grid, Paper, Select, MenuItem, Chip, CircularProgress, styled
} from '@mui/material';
import { Restore, Kitchen } from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

const GlassmorphicCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '16px',
  backgroundColor: 'rgba(0,0,0,0.4)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const getChipStyle = (status) => {
  const baseStyle = { color: 'white', fontWeight: 'bold' };
  switch (status) {
    case 'Pendiente':
      return { ...baseStyle, backgroundColor: '#f44336' }; // Rojo
    case 'En Preparación':
      return { ...baseStyle, backgroundColor: '#ff9800' }; // Naranja
    case 'Listo':
      return { ...baseStyle, backgroundColor: '#ffeb3b', color: '#000' }; // Amarillo
    case 'Entregado':
      return { ...baseStyle, backgroundColor: '#4caf50' }; // Verde
    case 'Cancelado':
        return { ...baseStyle, backgroundColor: '#9e9e9e' }; // Gris
    default:
      return {};
  }
};

const Orden = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { role } = useRole();
  const [displayOrders, setDisplayOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders) {
      let ordersToDisplay = [...orders];

      // For customers and other roles, filter out delivered and cancelled orders
      ordersToDisplay = ordersToDisplay.filter(
          (order) => order.status !== 'Entregado' && order.status !== 'Cancelado'
        );

      const sortedOrders = ordersToDisplay.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setDisplayOrders(sortedOrders);
      setLoading(false);
    }
  }, [orders, role]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const renderOrderCard = (order) => (
    <Grid item xs={12} md={6} lg={4} key={order.id}>
      <GlassmorphicCard elevation={4}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
             {order.orderType === 'table' ? `Mesa #${order.tableNumber}` : (order.customerName || `Pedido #${order.id.split('-')[1]}`)}
          </Typography>
          <Chip
            label={order.status || 'N/A'}
            size="small"
            sx={getChipStyle(order.status)}
          />
        </Box>
        <Box sx={{ flexGrow: 1, my: 2, pl: 1, borderLeft: '2px solid', borderColor: 'secondary.main' }}>
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
        {(role === 'admin' || role === 'mozo') && (
          <Select
            value={order.status}
            onChange={(e) => handleStatusChange(order.id, e.target.value)}
            fullWidth
            sx={{
              mt: 2,
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
              '& .MuiSvgIcon-root': { color: 'white' },
              borderRadius: '8px',
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="En Preparación">En Preparación</MenuItem>
            <MenuItem value="Listo">Listo</MenuItem>
            <MenuItem value="Entregado">Entregado</MenuItem>
             <MenuItem value="Cancelado">Cancelado</MenuItem>
          </Select>
        )}
      </GlassmorphicCard>
    </Grid>
  );

  return (
    <PageLayout
      title={role === 'admin' || role === 'mozo' ? "Panel de Órdenes" : "Mis Pedidos Activos"}
      icon={role === 'admin' || role === 'mozo' ? Kitchen : Restore}
    >
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="secondary" /></Box>
      ) : displayOrders.length > 0 ? (
        <Grid container spacing={3}>{displayOrders.map(renderOrderCard)}</Grid>
      ) : (
        <GlassmorphicCard sx={{textAlign: 'center', p: 5}}>
           <Typography variant="h5">
            {role === 'cliente'
              ? 'No tienes pedidos activos en este momento.'
              : 'No hay órdenes para mostrar.'}
          </Typography>
          {role === 'cliente' && (
             <Typography sx={{ mt: 2, color: 'rgba(255,255,255,0.7)'}}>
              Revisa la sección "Historial" para ver tus pedidos completados.
            </Typography>
          )}
        </GlassmorphicCard>
      )}
    </PageLayout>
  );
};

export default Orden;

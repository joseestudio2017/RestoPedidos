import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import { Container, Typography, Paper, Grid, Button, Box, Chip, Divider } from '@mui/material';
import { Fastfood, Restaurant, CheckCircle } from '@mui/icons-material';

const Mozo = () => {
  const { orders, updateOrderStatus } = useOrders();

  const activeOrders = orders.filter(order => order.status !== 'Entregado');

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getOrderStatusChip = (status) => {
    switch (status) {
      case 'Pendiente':
        return <Chip label="Pendiente" color="error" />;
      case 'En Preparación':
        return <Chip label="En Preparación" color="warning" />;
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
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
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
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Mesa seleccionada: {order.tableNumber}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Panel de Pedidos
      </Typography>
      {activeOrders.length > 0 ? (
        <Grid container spacing={3}>
          {activeOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2 }}>
                {renderOrderHeader(order)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                  {getOrderStatusChip(order.status)}
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ flexGrow: 1, my: 2, maxHeight: 150, overflowY: 'auto' }}>
                  {order.items.map((item) => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography>{item.name}</Typography>
                      <Typography>x{item.quantity}</Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ mt: 'auto' }}>
                  {order.status === 'Pendiente' && (
                    <Button
                      variant="contained"
                      color="warning"
                      fullWidth
                      onClick={() => handleUpdateStatus(order.id, 'En Preparación')}
                    >
                      Marcar como En Preparación
                    </Button>
                  )}
                  {order.status === 'En Preparación' && (
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleUpdateStatus(order.id, 'Entregado')}
                      startIcon={<CheckCircle />}
                    >
                      Entregar
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" align="center" color="text.secondary">No hay pedidos activos en este momento.</Typography>
      )}
    </Container>
  );
};

export default Mozo;

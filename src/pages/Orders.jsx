import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Fastfood, Done, Restaurant } from '@mui/icons-material';

const getStatusChip = (status) => {
  switch (status) {
    case 'Pending':
      return <Chip icon={<Restaurant />} label="Pending" color="warning" />;
    case 'In Preparation':
      return <Chip icon={<Fastfood />} label="In Preparation" color="info" />;
    case 'Delivered':
      return <Chip icon={<Done />} label="Delivered" color="success" />;
    default:
      return <Chip label="Unknown" />;
  }
};

const Orders = () => {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Pedidos Activos
      </Typography>

      {orders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Restaurant sx={{ fontSize: 80, color: 'text.secondary' }} />
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            No hay pedidos activos
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Cuando los clientes hagan un pedido, aparecerá aquí.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {orders.map((order) => (
            <Grid item key={order.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      {order.orderType === 'table' ? `Mesa ${order.tableNumber}` : `Pedido #${order.takeAwayNumber}`}
                    </Typography>
                    {getStatusChip(order.status)}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <List dense>
                    {order.items.map(item => (
                      <ListItem key={item.id} disablePadding>
                        <ListItemText 
                          primary={`${item.name} x ${item.quantity}`}
                          secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Total:</Typography>
                    <Typography variant="h6" fontWeight="bold">${order.total.toFixed(2)}</Typography>
                  </Box>

                </CardContent>
                <CardActions sx={{ p: 2, justifyContent: 'space-around' }}>
                  {order.status === 'Pending' && (
                    <Button variant="contained" color="info" onClick={() => updateOrderStatus(order.id, 'In Preparation')}>
                      Preparar
                    </Button>
                  )}
                  {order.status === 'In Preparation' && (
                    <Button variant="contained" color="success" onClick={() => updateOrderStatus(order.id, 'Delivered')}>
                      Entregar
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;

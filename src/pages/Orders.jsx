import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Fastfood, Done, Restaurant } from '@mui/icons-material';

// Componente para mostrar un chip de estado visualmente distintivo
const getStatusChip = (status) => {
  switch (status) {
    case 'pendiente':
      // El estado "Pendiente" es ahora más sutil (contorno)
      return <Chip icon={<Restaurant />} label="Pendiente" color="info" variant="outlined" />;
    case 'en preparacion':
      // ¡NUEVO! "En Preparación" ahora es el estado destacado con el color naranja/warning.
      return <Chip icon={<Fastfood />} label="En Preparación" color="warning" variant="contained" />;
    case 'entregado':
      return <Chip icon={<Done />} label="Entregado" color="success" variant="outlined" />;
    default:
      // Un estado por defecto claro para la depuración
      return <Chip label={status ? `Desconocido: ${status}` : 'Sin Estado'} />;
  }
};

// Vista de "Mis Pedidos" para el CLIENTE
const Orders = () => {
  const { orders } = useOrders();

  // Muestra los pedidos más recientes primero
  const customerOrders = orders.slice().sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 800 }}>
        Mis Pedidos
      </Typography>

      {customerOrders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Restaurant sx={{ fontSize: 80, color: 'text.secondary' }} />
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Aún no tienes pedidos
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Cuando hagas un pedido, podrás ver su estado aquí.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {customerOrders.map((order) => (
            <Grid item key={order.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </Typography>
                    {getStatusChip(order.status)}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(order.timestamp).toLocaleString()}
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
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;

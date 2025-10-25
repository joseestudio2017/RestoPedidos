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
  useTheme,
  Button
} from '@mui/material';
import {
  Fastfood,
  DoneAll, // Icono más claro para "Entregado"
  HourglassTop, // Icono para "Pendiente"
  RestaurantMenu, // Icono principal de la página
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const getStatusChip = (status) => {
  const statusStyles = {
    pendiente: {
      icon: <HourglassTop />,
      label: 'Pendiente',
      color: 'info',
      variant: 'outlined',
    },
    'en preparacion': {
      icon: <Fastfood />,
      label: 'En Preparación',
      color: 'warning',
      variant: 'contained',
    },
    entregado: {
      icon: <DoneAll />,
      label: 'Entregado',
      color: 'success',
      variant: 'contained',
    },
    default: {
      label: status ? `Desconocido: ${status}` : 'Sin Estado',
      color: 'default',
      variant: 'outlined',
    },
  };

  const style = statusStyles[status] || statusStyles.default;

  return <Chip icon={style.icon} label={style.label} color={style.color} variant={style.variant} sx={{ fontWeight: 'bold' }} />;
};

const Orders = () => {
  const { orders } = useOrders();
  const theme = useTheme();

  const customerOrders = orders.slice().sort((a, b) => b.timestamp - a.timestamp);

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: { xs: 4, md: 6 }, fontWeight: 800, fontSize: { xs: '2.5rem', sm: '3.75rem' } }}>
        Mis Pedidos
      </Typography>

      {customerOrders.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <RestaurantMenu sx={{ fontSize: { xs: 70, sm: 90 }, color: 'text.secondary', mb: 3 }} />
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Aún no tienes pedidos
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Cuando hagas un pedido, podrás ver su estado aquí.
          </Typography>
          <Button component={Link} to="/menu" variant="contained" size="large">
            Ver Menú
          </Button>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {customerOrders.map((order) => (
            <Grid item key={order.id} xs={12} md={6} lg={4}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: theme.shadows[4],
                transition: 'box-shadow 0.3s',
                '&:hover': {
                  boxShadow: theme.shadows[8],
                }
              }}>
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3} }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                    <Typography variant="h6" component="div" fontWeight="bold">
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </Typography>
                    {getStatusChip(order.status)}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(order.timestamp).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Detalles:</Typography>
                  <Box sx={{ maxHeight: 150, overflow: 'auto', mb: 2 }}>
                    <List dense>
                      {order.items.map(item => (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemText 
                            primary={`${item.name} (x${item.quantity})`}
                            secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                            primaryTypographyProps={{ fontWeight: 500 }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Total:</Typography>
                    <Typography variant="h5" fontWeight="bold" color="primary.main">${order.total.toFixed(2)}</Typography>
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

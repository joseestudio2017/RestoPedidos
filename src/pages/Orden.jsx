import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Button,
  useMediaQuery,
  Paper,
  styled
} from '@mui/material';
import {
  Fastfood,
  DoneAll,
  HourglassTop,
  RestaurantMenu,
  ReceiptLong as ReceiptLongIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
    padding: theme.spacing(4, 5),
}));

const getStatusChip = (status) => {
  const lowerCaseStatus = status ? status.toLowerCase() : '';
  const statusStyles = {
    pedido: {
      icon: <HourglassTop />,
      label: 'Pedido',
      color: 'error',
    },
    'en preparacion': {
      icon: <Fastfood />,
      label: 'En Preparación',
      color: 'warning',
    },
    entregado: {
      icon: <DoneAll />,
      label: 'Entregado',
      color: 'success',
    },
    default: {
      label: status ? `Desconocido: ${status}` : 'Sin Estado',
      color: 'default',
    },
  };

  const style = statusStyles[lowerCaseStatus] || statusStyles.default;

  return <Chip icon={style.icon} label={style.label} color={style.color} variant="filled" sx={{ fontWeight: 'bold' }} />;
};

const Orden = () => {
  const { orders } = useOrders();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const customerOrders = orders.slice().sort((a, b) => b.timestamp - a.timestamp);

  return (
    <PageLayout title="Mis Pedidos" icon={ReceiptLongIcon}>
      {customerOrders.length === 0 ? (
        <GlassmorphicPaper sx={{ textAlign: 'center', py: 8 }}>
          <RestaurantMenu sx={{ fontSize: { xs: 70, sm: 90 }, color: 'rgba(255,255,255,0.7)', mb: 3 }} />
          <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
            Aún no tienes pedidos
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4 }}>
            Cuando hagas un pedido, podrás ver su estado aquí.
          </Typography>
          <Button component={Link} to="/menu" variant="contained" size="large">
            Ver Menú
          </Button>
        </GlassmorphicPaper>
      ) : (
        <Grid container spacing={{ xs: 3, sm: 3, md: 4 }}>
          {customerOrders.map((order) => (
            <Grid item key={order.id} xs={12} md={6} lg={4}>
              <Card sx={theme => ({
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                color: 'white',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 0 20px 4px ${theme.palette.primary.main}`,
                }
              })}>
                {order.items && order.items.length > 0 && (
                  <CardMedia
                    component="img"
                    height={isMobile ? "160" : "180"}
                    image={order.items[0].image}
                    alt={`Imagen de ${order.items[0].name}`}
                    sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px'}}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3} }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                    <Typography variant={isMobile ? 'h6' : 'h5'} component="div" fontWeight="bold" sx={{ mb: isMobile ? 1.5 : 0 }}>
                      Pedido #{order.id.slice(-6).toUpperCase()}
                    </Typography>
                    {getStatusChip(order.status)}
                  </Box>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                    {new Date(order.timestamp).toLocaleString('es-AR', { dateStyle: 'medium', timeStyle: 'short' })}
                  </Typography>

                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Detalles:</Typography>
                  <Box sx={{ maxHeight: isMobile ? 120 : 150, overflow: 'auto', mb: 2, pr: 1 }}>
                    <List dense>
                      {order.items.map(item => (
                        <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemText 
                            primary={`${item.name} (x${item.quantity})`}
                            secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                            primaryTypographyProps={{ fontWeight: 500, fontSize: isMobile ? '0.9rem' : '1rem', color: 'white' }}
                            secondaryTypographyProps={{ fontSize: isMobile ? '0.8rem' : '0.875rem', color: 'rgba(255,255,255,0.6)' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Typography variant="h6" fontWeight="bold">Total:</Typography>
                    <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold" color="primary.main">${order.total.toFixed(2)}</Typography>
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageLayout>
  );
};

export default Orden;

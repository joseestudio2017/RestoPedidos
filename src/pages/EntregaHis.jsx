import React from 'react';
import { useOrders } from '../contexts/OrdersContext';
import {
  Typography,
  Paper,
  Grid,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import {
    Fastfood,
    Restaurant,
    History as HistoryIcon
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
}));

const EntregaHis = () => {
  const { orders } = useOrders();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const deliveredOrders = orders.filter(order => order.status.toLowerCase() === 'entregado');

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
    <PageLayout title="Historial de Entregas" icon={HistoryIcon}>
      {deliveredOrders.length > 0 ? (
        <Grid container spacing={isMobile ? 2 : 3}>
          {deliveredOrders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <GlassmorphicPaper>
                {renderOrderHeader(order)}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                  <Chip label="Entregado" color="success" variant='filled' sx={{fontWeight: 'bold'}}/>
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
              </GlassmorphicPaper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <GlassmorphicPaper sx={{textAlign: 'center', p: 4}}>
            <Typography variant="h5" align="center">No hay pedidos entregados en el historial.</Typography>
        </GlassmorphicPaper>
      )}
    </PageLayout>
  );
};

export default EntregaHis;

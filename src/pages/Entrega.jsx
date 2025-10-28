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
  styled,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
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

const HistoryTable = ({ orders }) => {
    const theme = useTheme();
    const tableCellStyles = {
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        fontWeight: 'bold'
    };

    return (
        <GlassmorphicPaper sx={{ p: 0, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 600 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{...tableCellStyles, backgroundColor: 'rgba(0,0,0,0.6)'}}>Pedido</TableCell>
                            <TableCell sx={{...tableCellStyles, backgroundColor: 'rgba(0,0,0,0.6)'}} align="center">Estado</TableCell>
                            <TableCell sx={{...tableCellStyles, backgroundColor: 'rgba(0,0,0,0.6)'}} align="right">Total</TableCell>
                            <TableCell sx={{...tableCellStyles, backgroundColor: 'rgba(0,0,0,0.6)'}} align="right">Fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(order => (
                            <TableRow key={order.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' } }}>
                                <TableCell sx={tableCellStyles}>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                        {order.orderType === 'table' ? `Mesa #${order.tableNumber}` : (order.customerName || `Pedido #${order.id.split('-')[1]}`)}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={tableCellStyles} align="center"><Chip label={order.status} size="small" sx={getChipStyle(order.status)} /></TableCell>
                                <TableCell sx={tableCellStyles} align="right">${order.total.toFixed(2)}</TableCell>
                                <TableCell sx={tableCellStyles} align="right">
                                    {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </GlassmorphicPaper>
    );
};


const Entrega = () => {
  const { orders, updateOrderStatus } = useOrders();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showDelivered, setShowDelivered] = useState(false);

  const filteredOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];

    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (showDelivered) {
      // Show delivered and cancelled orders
      return sortedOrders.filter(order =>
        order.status === 'Entregado' || order.status === 'Cancelado'
      );
    }
    // Show active orders: Pending, In Preparation, Ready
    return sortedOrders.filter(order =>
      ['Pendiente', 'En Preparación', 'Listo'].includes(order.status)
    );
  }, [orders, showDelivered]);

  const handleUpdateStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleShowDeliveredChange = (event) => {
    setShowDelivered(event.target.checked);
  };

  const renderOrderHeader = (order) => (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {order.orderType === 'takeaway' ? <Fastfood color="primary" /> : <Restaurant color="primary" />}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {order.orderType === 'takeaway' ? 'Pedido para Llevar' : 'Comer en el Lugar'}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
        {order.orderType === 'takeaway' 
          ? `Cliente: ${order.customerName} (${order.takeAwayNumber})`
          : `Mesa seleccionada: ${order.tableNumber}`}
      </Typography>
    </Box>
  );

  return (
    <PageLayout title="Panel de Entregas" icon={DeliveryDiningIcon}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <GlassmorphicPaper sx={{p: 1, px: 2}}>
                <FormControlLabel
                    control={<Checkbox checked={showDelivered} onChange={handleShowDeliveredChange} sx={{ color: 'rgba(255,255,255,0.8)', '&.Mui-checked': { color: 'secondary.main' } }} />}
                    label="Mostrar historial (entregados/cancelados)"
                />
            </GlassmorphicPaper>
        </Box>
        {filteredOrders.length > 0 ? (
            showDelivered ? (
                <HistoryTable orders={filteredOrders} />
            ) : (
                <Grid container spacing={isMobile ? 2 : 3}>
                {filteredOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <GlassmorphicPaper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {renderOrderHeader(order)}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                                <Chip label={order.status} size="small" sx={getChipStyle(order.status)} />
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
                                {order.status === 'Pendiente' && (
                                <Button
                                    variant="contained"
                                    color="warning"
                                    fullWidth
                                    onClick={() => handleUpdateStatus(order.id, 'En Preparación')}
                                >
                                    Marcar como 'En Preparación'
                                </Button>
                                )}
                                {order.status === 'En Preparación' && (
                                <Button
                                    variant="contained"
                                    sx={{backgroundColor: '#ffeb3b', color: '#000', '&:hover': {backgroundColor: '#fbc02d'} }}
                                    fullWidth
                                    onClick={() => handleUpdateStatus(order.id, 'Listo')}
                                >
                                    Marcar como 'Listo'
                                </Button>
                                )}
                                {order.status === 'Listo' && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    fullWidth
                                    onClick={() => handleUpdateStatus(order.id, 'Entregado')}
                                    startIcon={<CheckCircle />}
                                >
                                    Entregar Pedido
                                </Button>
                                )}
                            </Box>
                        </GlassmorphicPaper>
                    </Grid>
                ))}
                </Grid>
            )
        ) : (
            <GlassmorphicPaper sx={{textAlign: 'center', py: 6}}>
                <Typography variant="h5" align="center">No hay pedidos para mostrar en esta vista.</Typography>
            </GlassmorphicPaper>
        )}
    </PageLayout>
  );
};

export default Entrega;

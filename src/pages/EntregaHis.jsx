import React, { useState, useMemo } from 'react';
import { Typography, Paper, Box, TextField, Grid, Chip, styled } from '@mui/material';
import { useOrders } from '../contexts/OrdersContext';
import PageLayout from '../components/PageLayout';
import HistoryIcon from '@mui/icons-material/History';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
    padding: theme.spacing(3),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
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
            return { ...baseStyle, backgroundColor: '#607d8b' }; // Gris azulado
    }
};

function EntregaHistorial() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = useMemo(() => {
    const allOrders = orders || [];
    const sortedOrders = [...allOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (searchTerm.trim() === '') {
      return sortedOrders;
    }
    
    const lowercasedFilter = searchTerm.toLowerCase();
    return sortedOrders.filter(order =>
        (order.id && order.id.toLowerCase().includes(lowercasedFilter)) ||
        (order.customerName && order.customerName.toLowerCase().includes(lowercasedFilter)) ||
        (order.tableNumber && order.tableNumber.toString().includes(lowercasedFilter))
    );
  }, [searchTerm, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <PageLayout title="Historial de Entregas" icon={HistoryIcon}>
        <GlassmorphicPaper sx={{ mb: 4, p: 2.5 }}>
          <StyledTextField
            fullWidth
            label="Buscar por Nº de Orden, Cliente o Mesa"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </GlassmorphicPaper>

        <Grid container spacing={3}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <GlassmorphicPaper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                       {order.orderType === 'table' ? `Mesa ${order.tableNumber}` : (order.customerName || `Llevar ${order.takeAwayNumber}`)}
                    </Typography>
                    <Chip label={order.status} size="small" sx={getChipStyle(order.status)} />
                  </Box>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1, display: 'block' }}>
                    ID: {order.id}
                   </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}>
                    Total: ${order.total.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', mb: 2 }}>
                    {new Date(order.createdAt).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}
                  </Typography>
                  
                  <Box sx={{ mt: 'auto' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: 'rgba(255,255,255,0.9)' }}>Artículos:</Typography>
                    <Box sx={{ pl: 2, maxHeight: '100px', overflowY: 'auto' }}>
                      {order.items.map((item, index) => (
                          <Typography key={index} variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                            {item.name} (x{item.quantity})
                          </Typography>
                      ))}
                    </Box>
                  </Box>
                </GlassmorphicPaper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
                <GlassmorphicPaper sx={{textAlign: 'center', py: 6}}>
                    <Typography variant="h5" align="center">No se encontraron órdenes.</Typography>
                </GlassmorphicPaper>
            </Grid>
          )}
        </Grid>
    </PageLayout>
  );
}

export default EntregaHistorial;

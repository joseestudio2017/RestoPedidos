import React, { useState, useEffect } from 'react';
import { useOrders } from '../contexts/OrdersContext';
import { useRole } from '../contexts/RoleContext';
import {
  Typography, Box, Grid, Paper, Select, MenuItem, Chip, Tabs, Tab, useTheme, CircularProgress, IconButton
} from '@mui/material';
import { CheckCircleOutline, Kitchen, DeliveryDining, Restore } from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

const TABS = ['Pendiente', 'En Preparación', 'Listo', 'Entregado'];

const getChipColor = (status) => {
  switch (status) {
    case 'Pendiente': return 'warning';
    case 'En Preparación': return 'info';
    case 'Listo': return 'success';
    case 'Entregado': return 'default';
    default: return 'default';
  }
};

const getStatusText = (status) => status || 'N/A';

const Orden = () => {
  const { orders, loading, updateOrderStatus } = useOrders();
  const { role } = useRole();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const statusToFilter = TABS[currentTab];
    let filtered = [];
    if (statusToFilter) {
        filtered = orders.filter(order => order.status === statusToFilter);
    }
    
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFilteredOrders(filtered);
}, [orders, currentTab]);


  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderOrderCard = (order) => (
    <Grid item xs={12} sm={6} md={4} key={order.id}>
      <Paper 
        elevation={4} 
        sx={{
          p: 2.5,
          borderRadius: '16px',
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {order.orderType === 'table' ? `Mesa #${order.tableNumber}` : order.customerName}
          </Typography>
          <Chip 
            label={getStatusText(order.status)}
            color={getChipColor(order.status)}
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {order.items.map(item => (
            <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', py: 0.5 }}>
              <Typography>{item.name} (x{item.quantity})</Typography>
              <Typography sx={{ fontWeight: 'medium' }}>${(item.price * item.quantity).toFixed(2)}</Typography>
            </Box>
          ))}
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
            sx={{ mt: 2, color: 'white', 
              '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.5)' },
              '& .MuiSvgIcon-root': { color: 'white' },
              borderRadius: '8px',
            }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="En Preparación">En Preparación</MenuItem>
            <MenuItem value="Listo">Listo</MenuItem>
            <MenuItem value="Entregado">Entregado</MenuItem>
          </Select>
        )}
      </Paper>
    </Grid>
  );

  return (
    <PageLayout title="Panel de Órdenes" icon={Kitchen}>
        <Paper sx={{
            width: '100%',
            mb: { xs: 3, md: 4 },
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="tabs de estado de órdenes"
                indicatorColor="secondary"
                textColor="inherit"
                sx={theme => ({
                    "& .MuiTab-root": {
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: 'bold',
                        fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    },
                    "& .Mui-selected": {
                        color: `${theme.palette.secondary.main} !important`,
                    },
                })}
            >
            {TABS.map((tab, index) => (
                <Tab label={tab} key={index} />
            ))}
            </Tabs>
        </Paper>

        {loading ? 
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress color="secondary" /></Box> : 
            <Grid container spacing={3}>{filteredOrders.map(renderOrderCard)}</Grid>
        }
    </PageLayout>
  );
};

export default Orden;

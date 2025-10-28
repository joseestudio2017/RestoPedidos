import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, TextField, Card, CardContent, Grid } from '@mui/material';
import { useOrders } from '../contexts/OrdersContext';

function EntregaHistorial() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOrders(orders); // Mostrar todos si la búsqueda está vacía
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = orders.filter(order =>
        order.id.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary' }}>
          Historial de Entregas
        </Typography>
        <Paper sx={{ p: 2, mb: 4, backgroundColor: 'background.paper' }}>
          <TextField
            fullWidth
            label="Buscar por Número de Orden"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ fieldset: { borderColor: 'primary.main' } }}
          />
        </Paper>

        <Grid container spacing={3}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Grid item xs={12} sm={6} md={4} key={order.id}>
                <Card sx={{ height: '100%', backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Orden: {order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Estado:</strong> {order.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Total:</strong> ${order.total.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>Artículos:</Typography>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>
                            <Typography variant="body2" color="text.secondary">
                              {item.name} (x{item.quantity})
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mt: 4 }}>
                No se encontraron órdenes que coincidan con la búsqueda.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default EntregaHistorial;

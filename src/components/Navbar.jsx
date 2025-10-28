import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';

function Navbar() {
  const { role, setRole } = useRole();
  const location = useLocation();

  const handleLogout = () => {
    setRole('customer'); // Regresa al rol de cliente/invitado
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/menu" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontWeight: 'bold' }}>
          Restaurante
        </Typography>
        <Box>
          {role === 'admin' ? (
            <>
              <Button color="inherit" component={Link} to="/menu-abm">Admin Menú</Button>
              <Button color="inherit" component={Link} to="/entrega-historial">Historial</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/menu">Menú</Button>
              <Button color="inherit" component={Link} to="/carrito">Carrito</Button>
              <Button color="inherit" component={Link} to="/orden">Mi Orden</Button>
              <Button color="inherit" component={Link} to="/ingreso">Login</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

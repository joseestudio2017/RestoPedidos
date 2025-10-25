import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRole } from '../contexts/RoleContext';
import {
  Box,
  CircularProgress,
  Typography
} from '@mui/material';

const AdminRoute = ({ children }) => {
  const { role, loading } = useRole();
  const location = useLocation();

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 'calc(100vh - 128px)'
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Verificando acceso...</Typography>
      </Box>
    );
  }

  if (role !== 'admin') {
    // Si el usuario no es admin, lo redirigimos a la página de perfil
    // Guardamos la ubicación actual para poder redirigirlo de vuelta si inicia sesión como admin
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  // Si el usuario es admin, renderizamos el componente hijo que se le pasó
  return children;
};

export default AdminRoute;

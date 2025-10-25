import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box,
  Container,
} from '@mui/material';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Carrito from './pages/Carrito'; // Cambiado
import Orders from './pages/Orders';
import AdminAuth from './pages/AdminAuth';
import Profile from './pages/Profile';
import Clientes from './pages/Clientes';
import Mozo from './pages/Mozo';
import Facturacion from './pages/Facturacion';

// NOTA: El OrdersProvider se gestiona en main.jsx, no aquí.

// Paleta de colores moderna inspirada en McDonald's
const modernTheme = createTheme({
  palette: {
    primary: {
      main: '#D7231D', // Rojo McDonald's
    },
    secondary: {
      main: '#FFC72C', // Amarillo McDonald's
    },
    background: {
      default: '#F5F5F5', // Un gris muy claro para el fondo
      paper: '#FFFFFF',   // Blanco para los componentes de "papel"
    },
    text: {
      primary: '#212121', // Negro/gris oscuro para el texto principal
      secondary: '#757575', // Gris para el texto secundario
    },
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    button: {
      textTransform: 'none', // Evita que los botones estén en mayúsculas
      fontWeight: 'bold',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={modernTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Container component="main" maxWidth={false} disableGutters sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/carrito" element={<Carrito />} /> {/* Cambiado */}
              <Route path="/orders" element={<Orders />} />
              <Route path="/admin" element={<AdminAuth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/mozo" element={<Mozo />} />
              <Route path="/facturacion" element={<Facturacion />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

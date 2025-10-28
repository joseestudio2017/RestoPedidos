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
import AdminRoute from './components/AdminRoute'; // Importado

import Home from './pages/Home';
import Menu from './pages/Menu';
import Carrito from './pages/Carrito';
import Orden from './pages/Orden';
import AdminAuth from './pages/AdminAuth';
import Profile from './pages/Profile';
import Clientes from './pages/Clientes';
import Entrega from './pages/Entrega';
import EntregaHistorial from './pages/EntregaHistorial';
import Facturacion from './pages/Facturacion';
import TP from './pages/TP'; // Importado

const modernTheme = createTheme({
  palette: {
    primary: {
      main: '#D7231D',
    },
    secondary: {
      main: '#FFC72C',
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
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
      textTransform: 'none',
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
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/orders" element={<Orden />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/facturacion" element={<Facturacion />} />
              <Route path="/entrega" element={<Entrega />} />

              {/* Rutas de Admin */}
              <Route path="/admin" element={<AdminAuth />} />
              <Route path="/clientes" element={<AdminRoute><Clientes /></AdminRoute>} />
              <Route path="/tp" element={<AdminRoute><TP /></AdminRoute>} />
              <Route path="/entrega-historial" element={<AdminRoute><EntregaHistorial /></AdminRoute>} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

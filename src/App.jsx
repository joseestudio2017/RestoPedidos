import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Box
} from '@mui/material';

import Navbar from './components/Navbar';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Carrito from './pages/Carrito';
import Orden from './pages/Orden';
import Admin from './pages/Admin.jsx';
import Ingreso from './pages/Ingreso.jsx';
import Clientes from './pages/Clientes';
import Entrega from './pages/Entrega';
import EntregaHis from './pages/EntregaHis';
import Facturacion from './pages/Facturacion';
import TP from './pages/TP';

const darkGlassmorphismTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#E91E63', // Vibrante rosa
      },
      secondary: {
        main: '#00BFFF', // Azul brillante
      },
      background: {
        default: '#1a1a1a',
        paper: 'rgba(255, 255, 255, 0.05)',
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      button: {
        textTransform: 'none',
        fontWeight: 'bold',
      },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                contained: {
                    boxShadow: '0 0 12px 2px rgba(233, 30, 99, 0.4)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 0 20px 5px rgba(233, 30, 99, 0.6)',
                    }
                },
            },
        },
    },
});

function App() {
  return (
    <ThemeProvider theme={darkGlassmorphismTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          background: 'url(https://images.unsplash.com/photo-1541167760496-162885647544) no-repeat center center fixed',
          backgroundSize: 'cover',
        }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 3, md: 4 } }}>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/orders" element={<Orden />} />
              <Route path="/ingreso" element={<Ingreso />} />
              <Route path="/facturacion" element={<Facturacion />} />
              <Route path="/entrega" element={<Entrega />} />

              {/* Rutas de Admin */}
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path="/clientes" element={<AdminRoute><Clientes /></AdminRoute>} />
              <Route path="/tp" element={<AdminRoute><TP /></AdminRoute>} />
              <Route path="/entrega-his" element={<AdminRoute><EntregaHis /></AdminRoute>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { RoleProvider } from './contexts/RoleContext';
import { MenuProvider } from './contexts/MenuContext';
import { CartProvider } from './contexts/CartContext';
import { OrdersProvider } from './contexts/OrdersContext';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Carrito from './pages/Carrito';
import Ingreso from './pages/Ingreso';
import Orden from './pages/Orden';
import Facturacion from './pages/Facturacion';
import MenuABM from './pages/MenuABM';
import Entrega from './pages/Entrega';
import EntregaHis from './pages/EntregaHis';
import AdminRoute from './components/AdminRoute';
import './App.css';

function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }); 
          console.log('FCM Token:', token);
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('An error occurred while requesting notification permission. ', error);
      }
    };

    // requestNotificationPermission();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RoleProvider>
        <MenuProvider>
          <CartProvider>
            <OrdersProvider>
              <AppContent />
            </OrdersProvider>
          </CartProvider>
        </MenuProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          py: isHomePage ? 0 : { xs: 4, md: 6 }, 
          px: isHomePage ? 0 : { xs: 2, sm: 3, md: 4 },
          mt: isHomePage ? '' : '64px'
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/ingreso" element={<Ingreso />} />
          <Route path="/orden" element={<Orden />} />
          <Route path="/facturacion" element={<Facturacion />} />
          <Route path="/entrega" element={<Entrega />} />
          <Route path="/menu-abm" element={<AdminRoute><MenuABM /></AdminRoute>} />
          <Route path="/entrega-historial" element={<AdminRoute><EntregaHis /></AdminRoute>} />
        </Routes>
      </Box>
      {!isHomePage && <Footer />}
    </Box>
  );
}

export default App;

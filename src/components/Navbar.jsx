import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import HistoryIcon from '@mui/icons-material/History';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useRole } from '../contexts/RoleContext';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, logout } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/ingreso');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const allNavItems = {
    cliente: [
      { name: 'Menu', icon: <FastfoodIcon />, path: '/menu' },
      { name: 'Carrito', icon: <ShoppingCartIcon />, path: '/carrito' },
      { name: 'Mis Pedidos', icon: <ListAltIcon />, path: '/orders' },
    ],
    mozo: [
      { name: 'Menu', icon: <FastfoodIcon />, path: '/menu' },
      { name: 'Entregas', icon: <DeliveryDiningIcon />, path: '/entrega' },
    ],
    admin: [
      { name: 'Menu', icon: <FastfoodIcon />, path: '/menu' },
      { name: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
      { name: 'Historial', icon: <HistoryIcon />, path: '/entrega-his' },
    ],
    default: [
      { name: 'Menu', icon: <FastfoodIcon />, path: '/menu' },
      { name: 'Ingreso', icon: <AccountCircleIcon />, path: '/ingreso' },
    ]
  };

  const navItems = role ? allNavItems[role] : allNavItems.default;

  const drawerList = () => (
    <Box
      sx={{
        width: 270,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(15px)',
        color: 'white'
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>RestoPedidos</Typography>
        </Box>
        <List sx={{ flexGrow: 1 }}>
            {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} to={item.path} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <ListItemIcon sx={{color: 'white'}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        {role && (
            <>
            <Divider sx={{borderColor: 'rgba(255,255,255,0.1)'}}/>
            <List>
                <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                    <ListItemIcon sx={{color: 'white'}}><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Cerrar Sesión" />
                </ListItemButton>
                </ListItem>
            </List>
            </>
        )}
    </Box>
  );

  const navButtonSx = {
    mx: 1,
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'white',
    borderRadius: '8px',
    transition: theme.transitions.create(['background-color', 'transform', 'box-shadow'], { 
        duration: theme.transitions.duration.short 
    }),
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.05)',
        boxShadow: `0 0 15px 2px ${theme.palette.secondary.main}77`
    },
  };

  return (
    <AppBar position="sticky" sx={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)' 
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Button 
          color="inherit" 
          component={Link} 
          to="/"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            textTransform: 'none',
            transition: theme.transitions.create('transform', { duration: theme.transitions.duration.short }),
            '&:hover': { 
              backgroundColor: 'transparent',
              transform: 'scale(1.05)'
            }
          }}
        >
          <FastfoodIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Box component="span" sx={{ color: 'white' }}>Resto</Box>
          <Box component="span" sx={{ color: 'primary.main' }}>Pedidos</Box>
        </Button>

        {isMobile ? (
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={navButtonSx}
              >
                {item.name}
              </Button>
            ))}
            {role && (
              <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} sx={navButtonSx}>
                Cerrar Sesión
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { background: 'transparent' } }}
      >
        {drawerList()}
      </Drawer>
    </AppBar>
  );
}

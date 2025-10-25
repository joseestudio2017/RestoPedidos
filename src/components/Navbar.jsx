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
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRole } from '../contexts/RoleContext';

export default function Navbar() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { role, logout } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/profile');
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
      { name: 'Home', icon: <HomeIcon />, path: '/' },
      { name: 'Pedidos para Entregar', icon: <FastfoodIcon />, path: '/mozo' },
    ],
    admin: [
      { name: 'Home', icon: <HomeIcon />, path: '/' },
      { name: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
    ],
    default: [
      { name: 'Home', icon: <HomeIcon />, path: '/' },
      { name: 'Perfil', icon: <AccountCircleIcon />, path: '/profile' },
    ]
  };

  const navItems = role ? allNavItems[role] : allNavItems.default;

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
        <Toolbar>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Navegación</Typography>
        </Toolbar>
        <Divider />
        <List>
            {navItems.map((item) => (
            <ListItem key={item.name} disablePadding>
                <ListItemButton component={Link} to={item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
        {role && (
            <>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><LogoutIcon /></ListItemIcon>
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
    transition: theme.transitions.create(['background-color', 'transform'], { 
        duration: theme.transitions.duration.short 
    }),
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.05)'
    },
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'primary.main', boxShadow: theme.shadows[2] }}>
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
          <FastfoodIcon sx={{ mr: 1, color: 'secondary.main' }} />
          <Box component="span" sx={{ color: 'secondary.main' }}>Resto</Box>Pedidos
        </Button>

        {/* Mobile Menu Icon */}
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { md: 'none' } }}
        >
            <MenuIcon />
        </IconButton>
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
      </Toolbar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </AppBar>
  );
}

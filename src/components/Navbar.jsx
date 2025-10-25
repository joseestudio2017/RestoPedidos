import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRole } from '../contexts/RoleContext';

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
        { name: 'Menu', icon: <FastfoodIcon />, path: '/menu' },
        { name: 'Carrito', icon: <ShoppingCartIcon />, path: '/carrito' },
        { name: 'Mis Pedidos', icon: <ListAltIcon />, path: '/orders' },
        { name: 'Admin', icon: <AdminPanelSettingsIcon />, path: '/admin' },
        { name: 'Mozo', icon: <FastfoodIcon />, path: '/mozo' },
    ],
    default: [
      { name: 'Home', icon: <HomeIcon />, path: '/' },
      { name: 'Profile', icon: <AccountCircleIcon />, path: '/profile' },
    ]
  };

  const navItems = role ? allNavItems[role] || allNavItems.default : allNavItems.default;

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
        {role && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main, boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          <Button color="inherit" component={Link} to="/" sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
            <FastfoodIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
            <Box component="span" sx={{ color: theme.palette.secondary.main }}>Resto</Box>Pedidos
          </Button>
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                color="inherit"
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  mx: 1,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.name}
              </Button>
            ))}
            {role && (
              <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
                <LogoutIcon sx={{ mr: 1 }}/>
                Logout
              </Button>
            )}
          </Box>
        )}
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { useRole } from '../contexts/RoleContext';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  RestaurantMenu as RestaurantMenuIcon,
  Fastfood as FastfoodIcon,
  LocalBar as LocalBarIcon,
  Cake as CakeIcon,
  Tapas as TapasIcon,
} from '@mui/icons-material';
import PageLayout from '../components/PageLayout';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: { xs: 3, md: 4 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('hamburguesa')) return <FastfoodIcon />;
    if (name.includes('bebida')) return <LocalBarIcon />;
    if (name.includes('postre')) return <CakeIcon />;
    if (name.includes('entrada')) return <TapasIcon />;
    return <RestaurantMenuIcon />;
};

const Menu = () => {
  const { menu, loading } = useMenu();
  const { cartItems, addToCart, decreaseFromCart } = useCart();
  const { role } = useRole();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleLoginRedirect = () => {
    navigate('/ingreso');
  };

  const renderMenuItems = (items) => {
    const cardComponent = (item) => {
      const cartItem = cartItems.find(ci => ci.id === item.id);

      return (
        <Card sx={theme => ({
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderRadius: '16px',
          color: 'white',
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, background-color 0.4s ease',
          '&:hover': {
            transform: 'scale(1.05) translateY(-5px)',
            boxShadow: `0 0 25px 5px ${theme.palette.secondary.main}`,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          }
        })}>
          <CardMedia
            component="img"
            height={isMobile ? "180" : "220"}
            image={item.image}
            alt={item.name}
          />
          <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
            <Typography gutterBottom variant={isMobile ? 'h6' : 'h5'} component="h2" sx={{ fontWeight: 'bold' }}>
              {item.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
              {item.description}
            </Typography>
            <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
              <Chip
                label={`$${item.price.toFixed(2)}`}
                color="primary"
                sx={{ fontSize: isMobile ? '1rem' : '1.1rem', fontWeight: 'bold', py: isMobile ? 1.5 : 2, px: 1 }}
              />
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', p: { xs: 1, sm: 2 }, pt: 0, minHeight: 68 }}>
            {role !== 'mozo' && (
              role ? (
                cartItem ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <IconButton color="secondary" onClick={() => decreaseFromCart(item.id)} sx={{ p: 1.5 }}>
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ mx: 1, color: 'white' }}>{cartItem.quantity}</Typography>
                    <IconButton color="secondary" onClick={() => addToCart(item)} sx={{ p: 1.5 }}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => addToCart(item)}
                    sx={{ width: '95%', py: 1.2, fontSize: '0.9rem' }}
                  >
                    Añadir al Carrito
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoginRedirect}
                  sx={{ width: '95%', py: 1.2, fontSize: '0.9rem' }}
                >
                  Ingresar para Pedir
                </Button>
              )
            )}
          </CardActions>
        </Card>
      );
    }

    if (isMobile) {
      return (
        <Box sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: '4vw',
          p: '0 2vw 16px 2vw',
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}>
          {items.map((item) => (
            <Box key={item.id} sx={{
              width: '85vw',
              maxWidth: '380px',
              flexShrink: 0,
              scrollSnapAlign: 'center',
            }}>
              {cardComponent(item)}
            </Box>
          ))}
        </Box>
      );
    }

    return (
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            {cardComponent(item)}
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <PageLayout title="Nuestro Menú" icon={RestaurantMenuIcon}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
          <CircularProgress color="secondary" size={80} />
        </Box>
      ) : (
        <>
            <Paper sx={{
                width: '100%',
                mb: { xs: 3, md: 4 },
                borderRadius: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="tabs de categorías del menú"
                    indicatorColor="secondary"
                    textColor="inherit"
                    sx={theme => ({
                        "& .MuiTab-root": {
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '0.9rem' },
                            transition: 'color 0.3s ease, text-shadow 0.3s ease',
                        },
                        "& .Mui-selected": {
                            color: `${theme.palette.secondary.main} !important`,
                            textShadow: `0 0 10px ${theme.palette.secondary.main}`
                        },
                        "& .MuiTabs-indicator": {
                            height: '3px',
                            borderRadius: '3px',
                            boxShadow: `0 0 8px ${theme.palette.secondary.main}`
                        }
                    })}
                >
                {menu.map((category) => (
                    <Tab icon={getCategoryIcon(category.name)} iconPosition="start" label={category.name} key={category.id} />
                ))}
                </Tabs>
            </Paper>

            {menu.map((category, index) => (
                <TabPanel value={currentTab} index={index} key={category.id}>
                    {renderMenuItems(category.items)}
                </TabPanel>
            ))}
        </>
      )}
    </PageLayout>
  );
};

export default Menu;

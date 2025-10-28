
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Container,
  Box,
  useTheme,
} from '@mui/material';
import { People as PeopleIcon, Person as PersonIcon, AdminPanelSettings as AdminPanelSettingsIcon } from '@mui/icons-material';
import { useRole } from '../contexts/RoleContext';

function Profile() {
  const { setRole } = useRole();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleOptionClick = (role, path) => {
    setRole(role);
    navigate(path);
  };

  const options = [
    { name: "Clientes", role: "cliente", path: "/menu", icon: <PeopleIcon /> },
    { name: "Mozo", role: "mozo", path: "/menu", icon: <PersonIcon /> },
    { name: "Admin", role: "admin", path: "/admin", icon: <AdminPanelSettingsIcon /> },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 128px)', // Adjust based on Navbar height
        py: { xs: 4, md: 6 },
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: { xs: 4, sm: 6 }, 
            fontWeight: 800, 
            fontSize: { xs: '2.5rem', sm: '3.75rem' }
          }}
        >
          Selecciona tu Perfil
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 4 }}>
          {options.map((option) => (
            <Grid item xs={12} sm={4} key={option.name}>
                <Card sx={{
                    borderRadius: '16px',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[10],
                    }
                }}>
                    <CardActionArea 
                        onClick={() => handleOptionClick(option.role, option.path)}
                        sx={{ p: { xs: 3, sm: 4 } }}
                    >
                        <Box sx={{ color: 'primary.main', mb: 2 }}>
                            {React.cloneElement(option.icon, { sx: { fontSize: { xs: 45, sm: 60 } } })}
                        </Box>
                        <CardContent sx={{ p: '0 !important' }}>
                            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                {option.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Profile;

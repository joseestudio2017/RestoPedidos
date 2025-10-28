import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  styled,
  Paper,
  IconButton
} from '@mui/material';
import {
  People as PeopleIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  AccountCircle as AccountCircleIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useRole } from '../contexts/RoleContext';
import PageLayout from '../components/PageLayout';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: theme.shadows[8],
    borderRadius: '16px',
    color: 'white',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: theme.palette.secondary.main,
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.3)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.6)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

function Ingreso() {
  const { setRole, loginAdmin } = useRole();
  const navigate = useNavigate();
  const theme = useTheme();

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleOptionClick = (role, path) => {
    if (role === 'admin') {
      setAdminModalOpen(true);
    } else {
      setRole(role);
      navigate(path);
    }
  };

  const handleAdminLogin = () => {
    if (loginAdmin(password)) {
      setError('');
      setPassword('');
      setAdminModalOpen(false);
      navigate('/menu');
    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setPassword('');
    }
  };

  const handleModalClose = () => {
    setAdminModalOpen(false);
    setError('');
    setPassword('');
  };

  const options = [
    { name: "Cliente", role: "cliente", path: "/menu", icon: <PeopleIcon /> },
    { name: "Mozo", role: "mozo", path: "/entrega", icon: <PersonIcon /> },
    { name: "Admin", role: "admin", path: "/menu-abm", icon: <AdminPanelSettingsIcon /> },
  ];

  return (
    <>
      <PageLayout title="Selecciona tu Perfil" icon={AccountCircleIcon}>
        <Grid container spacing={{ xs: 3, sm: 5 }} justifyContent="center">
          {options.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={option.name}>
                <Card sx={theme => ({
                    borderRadius: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    color: 'white',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 0 20px 4px ${theme.palette.secondary.main}`,
                    }
                })}>
                    <CardActionArea
                        onClick={() => handleOptionClick(option.role, option.path)}
                        sx={{ p: { xs: 3, sm: 4 } }}
                    >
                        <Box sx={{ color: 'white', mb: 2 }}>
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
      </PageLayout>

      <Dialog open={adminModalOpen} onClose={handleModalClose} PaperComponent={GlassmorphicPaper}>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          Acceso de Administrador
          <IconButton onClick={handleModalClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pt: '20px !important' }}>
          <StyledTextField
            autoFocus
            margin="dense"
            id="password"
            label="Clave de Acceso"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
          />
          {error && <Alert severity="error" sx={{ mt: 2, backgroundColor: 'rgba(255, 0, 0, 0.2)', color: '#ffcdd2' }}>{error}</Alert>}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={handleModalClose} color="secondary">Cancelar</Button>
          <Button onClick={handleAdminLogin} variant="contained" color="primary">Ingresar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Ingreso;
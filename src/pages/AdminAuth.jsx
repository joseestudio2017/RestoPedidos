import React, { useState } from 'react';
import Admin from './Admin';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert,
  Avatar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // IMPORTANT: This is a mock password. In a real application, 
    // this should be handled securely on a server.
    if (password === '1234') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Clave incorrecta. Inténtalo de nuevo.');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <Admin />;
  }

  return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Paper 
                elevation={8}
                sx={{
                    p: { xs: 3, sm: 4 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
                    Acceso de Administrador
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Clave de Acceso"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!error}
                        autoFocus
                    />
                    {error && <Alert severity="error" sx={{ width: '100%', mt: 1 }}>{error}</Alert>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Paper>
        </Box>
    </Container>
  );
};

export default AdminAuth;

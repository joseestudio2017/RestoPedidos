import React, { useState } from 'react';
import Admin from './Admin';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const AdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
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
      <Paper elevation={6} sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 4,
        backgroundColor: 'background.paper'
      }}>
        <LockOutlinedIcon sx={{ fontSize: 40, mb: 1, color: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          Acceso de Administrador
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clave"
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
    </Container>
  );
};

export default AdminAuth;

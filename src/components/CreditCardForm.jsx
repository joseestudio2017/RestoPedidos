import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';

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
            borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
            boxShadow: `0 0 5px ${theme.palette.secondary.main}`
        },
    },
    '& .MuiFormHelperText-root': {
        color: theme.palette.error.light,
    }
}));

function CreditCardForm({ onPaymentSuccess, orderTotal }) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'number' || name === 'cvc') {
        value = value.replace(/[^0-9]/g, '');
    } else if (name === 'expiry') {
        value = value.replace(/[^0-9/]/g, '');
        if (value.length === 2 && cardData.expiry.length === 1 && value.includes('/') === false) {
            value = value + '/';
        }
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
    }
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
      const newErrors = {};
      if (!cardData.name) newErrors.name = 'El nombre es obligatorio';
      if (!cardData.number.match(/^[0-9]{16}$/)) newErrors.number = 'Debe tener 16 dígitos';
      if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/([2-9]{1}[0-9]{1})$/)) newErrors.expiry = 'Formato MM/AA inválido';
      if (!cardData.cvc.match(/^[0-9]{3,4}$/)) newErrors.cvc = 'Debe tener 3 o 4 dígitos';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ px: isMobile ? 1 : 0 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'white', fontWeight: 'bold'}}>Datos de la Tarjeta</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledTextField
            required
            fullWidth
            label="Número de la Tarjeta"
            name="number"
            value={cardData.number}
            onChange={handleChange}
            error={!!errors.number}
            helperText={errors.number}
            inputProps={{ maxLength: 16 }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField
            required
            fullWidth
            label="Nombre en la Tarjeta"
            name="name"
            value={cardData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            required
            fullWidth
            label="Vencimiento"
            name="expiry"
            value={cardData.expiry}
            onChange={handleChange}
            error={!!errors.expiry}
            helperText={errors.expiry}
            inputProps={{ placeholder: 'MM/AA' }}
          />
        </Grid>
        <Grid item xs={6}>
          <StyledTextField
            required
            fullWidth
            type="password"
            label="CVC"
            name="cvc"
            value={cardData.cvc}
            onChange={handleChange}
            error={!!errors.cvc}
            helperText={errors.cvc}
            inputProps={{ maxLength: 4 }}
          />
        </Grid>
        <Grid item xs={12}>
           <Button 
                type="submit"
                variant="contained" 
                color="success" 
                fullWidth 
                size="large" 
                sx={{ 
                    mt: 2, py: 1.5, 
                    fontSize: isMobile ? '1rem' : '1.2rem', 
                    fontWeight: 'bold',
                    boxShadow: `0 0 15px 2px ${theme.palette.success.main}`
                }}
                disabled={isProcessing}
             >
                {isProcessing ? <CircularProgress size={26} color="inherit" /> : `Pagar $${orderTotal.toFixed(2)}`}
             </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreditCardForm;

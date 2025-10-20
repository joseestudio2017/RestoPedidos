import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress
} from '@mui/material';

function CreditCardForm({ onPaymentSuccess, orderTotal }) {
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
      const newErrors = {};
      if (!cardData.name) newErrors.name = 'El nombre es obligatorio';
      if (!cardData.number.match(/^[0-9]{16}$/)) newErrors.number = 'Debe tener 16 dígitos';
      if (!cardData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) newErrors.expiry = 'Formato MM/AA incorrecto';
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
    // Simula la llamada a una pasarela de pago (ej. Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      // Si la llamada es exitosa, se ejecuta la función del padre
      onPaymentSuccess();
    }, 2500); // Simula un retraso de 2.5 segundos
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>Datos de la Tarjeta</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
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
          <TextField
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
          <TextField
            required
            fullWidth
            label="Vencimiento (MM/AA)"
            name="expiry"
            value={cardData.expiry}
            onChange={handleChange}
            error={!!errors.expiry}
            helperText={errors.expiry}
            inputProps={{ placeholder: 'MM/AA' }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
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
                sx={{ mt: 2, py: 1.5, fontSize: '1.2rem' }}
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

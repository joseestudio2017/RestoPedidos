import React, { useState } from 'react';
import { Box, Grid, Typography, Button, Paper, useTheme, TextField, Collapse } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const tables = [
  // A simple layout for demonstration
  { id: 'T1', status: 'available' }, { id: 'T2', status: 'available' }, { id: 'T3', status: 'occupied' }, { id: 'T4', status: 'available' },
  { id: 'T5', status: 'available' }, { id: 'T6', status: 'available' }, { id: 'T7', status: 'available' }, { id: 'T8', status: 'occupied' },
  { id: 'T9', status: 'available' }, { id: 'T10', status: 'occupied' }, { id: 'T11', status: 'available' }, { id: 'T12', status: 'available' },
  { id: 'T13', status: 'available' }, { id: 'T14', status: 'available' }, { id: 'T15', status: 'available' }, { id: 'T16', status: 'available' },
];

const TableSelection = ({ onSelectTable, onCancel }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [numberOfChairs, setNumberOfChairs] = useState('');
  const [chairError, setChairError] = useState('');
  const theme = useTheme();

  const handleTableClick = (table) => {
    if (table.status === 'available') {
      const newSelectedTable = table.id === selectedTable ? null : table.id;
      setSelectedTable(newSelectedTable);
      // Reset chairs and error if table is deselected
      if (!newSelectedTable) {
        setNumberOfChairs('');
        setChairError('');
      }
    }
  };

  const handleChairsChange = (event) => {
    const value = event.target.value;
    // Allow only integers
    if (value === '' || /^[0-9]+$/.test(value)) {
        setNumberOfChairs(value);
        const num = parseInt(value, 10);
        if (value !== '' && (num < 1 || num > 4)) {
            setChairError('Debe ser entre 1 y 4');
        } else {
            setChairError('');
        }
    }
  };

  const handleConfirm = () => {
    if (selectedTable && numberOfChairs > 0 && !chairError) {
      onSelectTable(selectedTable, parseInt(numberOfChairs, 10));
    }
  };

  const getTableStyle = (table) => {
    const isSelected = selectedTable === table.id;
    const isOccupied = table.status === 'occupied';

    let backgroundColor = theme.palette.grey[300];
    let color = theme.palette.text.primary;
    let borderColor = theme.palette.grey[400];

    if (isOccupied) {
      backgroundColor = theme.palette.grey[500];
      color = theme.palette.getContrastText(backgroundColor);
      borderColor = theme.palette.grey[600];
    } else if (isSelected) {
      backgroundColor = theme.palette.secondary.main;
      color = theme.palette.secondary.contrastText;
      borderColor = theme.palette.secondary.dark;
    } else {
       backgroundColor = '#4CAF50'; // Green for available
       color = 'white';
       borderColor = '#388E3C';
    }

    return {
      minWidth: '60px',
      height: '60px',
      flexDirection: 'column',
      backgroundColor,
      color,
      border: `2px solid ${borderColor}`,
      transition: 'transform 0.1s, background-color 0.2s',
      '&:hover': {
        backgroundColor: !isOccupied && (isSelected ? theme.palette.secondary.dark : '#66BB6A'),
        transform: !isOccupied ? 'scale(1.05)' : 'none',
      },
      '&.Mui-disabled': {
          backgroundColor: theme.palette.grey[500],
          color: theme.palette.getContrastText(theme.palette.grey[500]),
          border: `2px solid ${theme.palette.grey[600]}`
      }
    };
  };

  const Legend = () => (
     <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}><TableRestaurantIcon sx={{ color: '#4CAF50', mr: 1 }} /> Disponible</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}><TableRestaurantIcon sx={{ color: 'secondary.main', mr: 1 }} /> Seleccionada</Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}><TableRestaurantIcon sx={{ color: 'grey.500', mr: 1 }} /> Ocupada</Box>
    </Box>
  );

  return (
    <Paper sx={{ p: { xs: 2, sm: 4 }, textAlign: 'center', boxShadow: 24, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>Seleccione su Mesa</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Haga clic en una mesa disponible para seleccionarla.</Typography>

      <Box sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        mb: 3,
        maxWidth: '500px',
        mx: 'auto'
      }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {tables.map(table => (
            <Grid item key={table.id}>
              <Button
                variant="contained"
                onClick={() => handleTableClick(table)}
                disabled={table.status === 'occupied'}
                sx={getTableStyle(table)}
              >
                <TableRestaurantIcon />
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>{table.id}</Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Collapse in={!!selectedTable}>
          <Box sx={{ mt: 3, mb: 2, maxWidth: '300px', mx: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>¿Cuántas personas son?</Typography>
            <TextField
              id="number-of-chairs"
              label="Número de Sillas"
              type="number"
              variant="outlined"
              fullWidth
              value={numberOfChairs}
              onChange={handleChairsChange}
              error={!!chairError}
              helperText={chairError}
              InputProps={{
                  inputProps: {
                      min: 1,
                      max: 4,
                      step: 1
                  }
              }}
              autoFocus
            />
          </Box>
      </Collapse>

      <Legend />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="primary" onClick={onCancel}>Cancelar</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!selectedTable || !numberOfChairs || !!chairError}
        >
          Confirmar Mesa
        </Button>
      </Box>
    </Paper>
  );
};

export default TableSelection;

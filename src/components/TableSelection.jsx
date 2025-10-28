import React, { useState } from 'react';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardActionArea,
    TextField,
    Button,
    IconButton,
    styled,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const locations = [
    { id: 'Terraza', tables: 10 },
    { id: 'Salón Principal', tables: 20 },
    { id: 'Patio', tables: 8 },
    { id: 'Barra', tables: 12 },
    { id: 'Salón VIP', tables: 5 },
];

const GlassmorphicCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    color: 'white',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    '&.selected': {
        backgroundColor: 'rgba(233, 30, 99, 0.5)', // Secondary color with alpha
        boxShadow: `0 0 15px 2px ${theme.palette.secondary.main}`,
        transform: 'scale(1.05)'
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        transform: 'scale(1.02)'
    }
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
            borderColor: 'rgba(255, 255, 255, 0.4)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.7)',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.secondary.main,
        },
    },
}));

const TableSelection = ({ onSelectTable, onCancel }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);
    const [numberOfChairs, setNumberOfChairs] = useState('');

    const handleSelectLocation = (locationId) => {
        setSelectedLocation(locationId);
        setSelectedTable(null); // Reset table when location changes
    };

    const handleSelectTable = (tableNumber) => {
        setSelectedTable(tableNumber);
    };

    const handleConfirm = () => {
        if (selectedTable !== null && numberOfChairs > 0) {
            onSelectTable(selectedTable, numberOfChairs);
        }
    };

    const renderTableSelector = () => {
        if (!selectedLocation) return null;
        const location = locations.find(l => l.id === selectedLocation);
        if (!location) return null;

        return (
            <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom align="center">Selecciona una mesa en {selectedLocation}</Typography>
                <Grid container spacing={2} sx={{ maxHeight: '200px', overflowY: 'auto', p: 1 }}>
                    {Array.from({ length: location.tables }, (_, i) => i + 1).map((tableNumber) => (
                        <Grid item xs={4} sm={3} key={tableNumber}>
                            <GlassmorphicCard
                                className={selectedTable === `${selectedLocation} - ${tableNumber}` ? 'selected' : ''}
                                sx={{ height: 80 }}
                            >
                                <CardActionArea onClick={() => handleSelectTable(`${selectedLocation} - ${tableNumber}`)} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{tableNumber}</Typography>
                                </CardActionArea>
                            </GlassmorphicCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    return (
        <Box sx={{ maxWidth: 600, width: '90vw', p: { xs: 2, sm: 4 }, backgroundColor: 'rgba(30, 30, 30, 0.9)', borderRadius: '16px', color: 'white', position: 'relative' }}>
            <IconButton onClick={onCancel} sx={{ position: 'absolute', top: 8, right: 8, color: 'white' }}>
                <Close />
            </IconButton>
            <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Selección de Lugar
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}>
                Elige dónde disfrutarás tu comida.
            </Typography>
            <Grid container spacing={2}>
                {locations.map((loc) => (
                    <Grid item xs={6} sm={4} key={loc.id}>
                        <GlassmorphicCard className={selectedLocation === loc.id ? 'selected' : ''}>
                            <CardActionArea onClick={() => handleSelectLocation(loc.id)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 1 }}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>{loc.id}</Typography>
                                <Typography variant="caption">{loc.tables} mesas</Typography>
                            </CardActionArea>
                        </GlassmorphicCard>
                    </Grid>
                ))}
            </Grid>

            {renderTableSelector()}

            {selectedTable && (
                <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <StyledTextField
                        label="Número de Sillas"
                        type="number"
                        value={numberOfChairs}
                        onChange={(e) => setNumberOfChairs(parseInt(e.target.value, 10) || '')}
                        variant="outlined"
                        fullWidth
                        inputProps={{ min: 1 }}
                    />
                </Box>
            )}
             {(selectedTable && numberOfChairs) && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleConfirm} 
                        disabled={!selectedTable || !numberOfChairs || numberOfChairs < 1}
                    >
                        Confirmar Selección
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default TableSelection;

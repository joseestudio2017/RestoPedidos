import React, { useState, useEffect } from 'react';
import { useMenu } from '../contexts/MenuContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Input,
  Divider,
  CardActions,
  useTheme,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const Admin = () => {
  const { menu, addCategory, updateCategory, deleteCategory, addItem, updateItem, deleteItem } = useMenu();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ type: '', data: null, categoryId: null });
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, data = null, categoryId = null) => {
    setDialogData({ type, data, categoryId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = (formData) => {
    const { type, categoryId, data } = dialogData;
    const price = parseFloat(formData.price);
    const safePrice = isNaN(price) ? 0 : price;

    if (type === 'addCategory') {
      addCategory(formData.name);
    } else if (type === 'editCategory') {
      updateCategory(data.id, formData.name);
    } else if (type === 'addItem') {
      addItem(categoryId, { ...formData, price: safePrice });
    } else if (type === 'editItem') {
      updateItem(categoryId, data.id, { ...formData, price: safePrice });
    }
    handleCloseDialog();
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: { xs: 4, md: 6 }, fontWeight: 800, fontSize: { xs: '2.5rem', sm: '3.75rem' } }}>
        Panel de Administración
      </Typography>
      <Paper sx={{ width: '100%', mb: { xs: 3, md: 4 }, borderRadius: '12px' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered 
          indicatorColor="secondary" 
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab icon={<CategoryIcon />} label='Gestionar Categorías' iconPosition="start" sx={{ p: { xs: 2, sm: 3 } }}/>
          <Tab icon={<FastfoodIcon />} label='Gestionar Artículos' iconPosition="start" sx={{ p: { xs: 2, sm: 3 } }}/>
        </Tabs>
      </Paper>
      
      <TabPanel value={tabValue} index={0}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addCategory')}>
            Nueva Categoría
          </Button>
        </Box>
        <List component={Paper} elevation={2} sx={{ borderRadius: '12px' }}>
          {menu.map((category, index) => (
            <React.Fragment key={category.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog('editCategory', category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteCategory(category.id)} sx={{ ml: 1 }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                }
                sx={{ p: { xs: 1.5, sm: 2 } }}
              >
                <ListItemText primary={category.name} primaryTypographyProps={{ variant: 'h6', fontWeight: 500 }} />
              </ListItem>
              {index < menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {menu.map(category => (
          <Box key={category.id} sx={{ mb: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Typography variant='h4' sx={{ fontWeight: 'bold', alignSelf: { xs: 'flex-start', sm: 'center' } }}>{category.name}</Typography>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addItem', null, category.id)}>
                Añadir Artículo
              </Button>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {(category.items || []).map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card sx={{ height: '100%', borderRadius: '12px', boxShadow: theme.shadows[3] }}>
                    <CardMedia component="img" height="160" image={item.image || 'https://via.placeholder.com/300'} alt={item.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1.5 }}>{item.description}</Typography>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {`$${(typeof item.price === 'number' && !isNaN(item.price)) ? item.price.toFixed(2) : '0.00'}`}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog('editItem', item, category.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => deleteItem(category.id, item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </TabPanel>

      <AdminFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
        dialogData={dialogData}
      />
    </Container>
  );
};

const AdminFormDialog = ({ open, onClose, onSubmit, dialogData }) => {
  const { type, data } = dialogData || {};
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (open && type) {
      const initialData = data || {};
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        image: initialData.image || null,
      });
      setImagePreview(initialData.image || null);
    } else {
        // Delay reset to allow closing animation
        setTimeout(() => {
            setFormData({ name: '', description: '', price: '', image: null });
            setImagePreview(null);
        }, 150);
    }
  }, [data, type, open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setFormData({ ...formData, image: result });
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const getTitle = () => {
    if (type === 'addCategory') return 'Añadir Nueva Categoría';
    if (type === 'editCategory') return `Editar Categoría`;
    if (type === 'addItem') return 'Añadir Nuevo Artículo';
    if (type === 'editItem') return `Editar Artículo`;
    return '';
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {getTitle()}
        <IconButton onClick={onClose} sx={{ ml: 2 }}><CloseIcon /></IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
          {(type === 'addCategory' || type === 'editCategory') && (
            <TextField autoFocus margin="dense" name="name" label="Nombre de la Categoría" type="text" fullWidth variant="outlined" value={formData.name || ''} onChange={handleChange} required />
          )}
          {(type === 'addItem' || type === 'editItem') && (
            <>
              <TextField name="name" label="Nombre" fullWidth margin="dense" value={formData.name || ''} onChange={handleChange} required />
              <TextField name="description" label="Descripción" fullWidth margin="dense" multiline rows={4} value={formData.description || ''} onChange={handleChange} />
              <TextField name="price" label="Precio" type="number" fullWidth margin="dense" value={formData.price || ''} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} required />
              <Box sx={{ mt: 3, mb: 1 }}>
                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                  Subir Imagen
                  <Input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Box>
              {imagePreview && (
                <Box sx={{ my: 2, p: 1, border: '1px dashed grey', borderRadius: '8px', textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Vista Previa:</Typography>
                  <CardMedia component="img" sx={{ height: 160, objectFit: 'contain' }} image={imagePreview} alt="Vista previa" />
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Admin;

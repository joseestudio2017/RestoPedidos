import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  CloudUpload as CloudUploadIcon
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
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const Admin = () => {
  const { menu, addCategory, updateCategory, deleteCategory, addItem, updateItem, deleteItem } = useMenu();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({ type: '', data: null, categoryId: null });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (type, data = null, categoryId = null) => {
    setDialogData({ type, data, categoryId });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => setDialogData({ type: '', data: null, categoryId: null }), 150);
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
    <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 4 }}>
      <Typography variant={isMobile ? 'h3' : 'h2'} component="h1" gutterBottom align="center" sx={{ mb: isMobile ? 2 : 4, fontWeight: 800 }}>
        Panel de Administración
      </Typography>
      <Paper sx={{ width: '100%' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered 
          indicatorColor="secondary" 
          textColor="inherit"
          variant={isMobile ? 'fullWidth' : 'standard'}
        >
          <Tab icon={<CategoryIcon />} label={isMobile ? '' : 'Gestionar Categorías'} aria-label="categorías" />
          <Tab icon={<FastfoodIcon />} label={isMobile ? '' : 'Gestionar Artículos'} aria-label="artículos" />
        </Tabs>
      </Paper>
      
      <TabPanel value={tabValue} index={0}>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addCategory')}>
            Añadir Categoría
          </Button>
        </Box>
        <List>
          {menu.map(category => (
            <Paper key={category.id} sx={{ mb: 2 }}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton edge="end" onClick={() => handleOpenDialog('editCategory', category)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => deleteCategory(category.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={category.name} primaryTypographyProps={{ variant: 'h6' }} />
              </ListItem>
            </Paper>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {menu.map(category => (
          <Box key={category.id} sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
              <Typography variant={isMobile ? 'h5' : 'h4'}>{category.name}</Typography>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addItem', null, category.id)}>
                Añadir Artículo
              </Button>
            </Box>
            <Grid container spacing={isMobile ? 2 : 3}>
              {(category.items || []).map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card>
                    <CardMedia component="img" height="140" image={item.image || 'https://via.placeholder.com/300'} alt={item.name} />
                    <CardContent>
                      <Typography gutterBottom variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>{item.description}</Typography>
                      <Typography variant="h6" color="primary.main" sx={{ mt: 1 }}>
                        {`$${(typeof item.price === 'number' && !isNaN(item.price)) ? item.price.toFixed(2) : '0.00'}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton onClick={() => handleOpenDialog('editItem', item, category.id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => deleteItem(category.id, item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ my: 4 }} />
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
  const { type, data } = dialogData;
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  React.useEffect(() => {
    if (open) {
      const initialData = data || {};
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        price: initialData.price || '',
        image: initialData.image || null,
      });
      setImagePreview(initialData.image || null);
    } else {
      setFormData({ name: '', description: '', price: '', image: null });
      setImagePreview(null);
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
    if (type === 'editCategory') return `Editar Categoría: ${data?.name || ''}`;
    if (type === 'addItem') return 'Añadir Nuevo Artículo';
    if (type === 'editItem') return `Editar Artículo: ${data?.name || ''}`;
    return '';
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{getTitle()}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {(type === 'addCategory' || type === 'editCategory') && (
            <TextField autoFocus margin="dense" name="name" label="Nombre de la Categoría" type="text" fullWidth variant="outlined" value={formData.name || ''} onChange={handleChange} required />
          )}
          {(type === 'addItem' || type === 'editItem') && (
            <>
              <TextField name="name" label="Nombre" fullWidth margin="dense" value={formData.name || ''} onChange={handleChange} required />
              <TextField name="description" label="Descripción" fullWidth margin="dense" multiline rows={3} value={formData.description || ''} onChange={handleChange} />
              <TextField name="price" label="Precio" type="number" fullWidth margin="dense" value={formData.price || ''} onChange={handleChange} InputProps={{ startAdornment: <Typography>$</Typography> }} required />
              <Box sx={{ mt: 2, mb: 1 }}>
                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
                  Subir Imagen
                  <Input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Box>
              {imagePreview && (
                <Box sx={{ my: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2">Vista Previa:</Typography>
                  <CardMedia component="img" sx={{ height: 140, objectFit: 'contain', mt: 1, borderRadius: 1 }} image={imagePreview} alt="Vista previa" />
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 24px' }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Admin;

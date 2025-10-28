import React, { useState, useEffect } from 'react';
import { useMenu } from '../contexts/MenuContext';
import {
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
  InputAdornment,
  styled
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Category as CategoryIcon,
  Fastfood as FastfoodIcon,
  CloudUpload as CloudUploadIcon,
  Close as CloseIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
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
        '& .MuiInputAdornment-root .MuiTypography-root': {
            color: 'rgba(255, 255, 255, 0.8)',
        },
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
      updateItem(data.id, { ...formData, price: safePrice });
    }
    handleCloseDialog();
  };

  return (
    <PageLayout title="Panel de Administración" icon={SettingsIcon}>
      <GlassmorphicPaper sx={{ width: '100%', mb: { xs: 3, md: 4 }, p: 0 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered 
          indicatorColor="secondary" 
          textColor="inherit"
          variant="fullWidth"
          sx={theme => ({
            "& .MuiTab-root": {
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 'bold',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                transition: 'color 0.3s ease, text-shadow 0.3s ease',
            },
            "& .Mui-selected": {
                color: `${theme.palette.secondary.main} !important`,
                textShadow: `0 0 10px ${theme.palette.secondary.main}`
            },
            "& .MuiTabs-indicator": {
                height: '3px',
                borderRadius: '3px',
                boxShadow: `0 0 8px ${theme.palette.secondary.main}`
            }
        })}
        >
          <Tab icon={<CategoryIcon />} label='Gestionar Categorías' iconPosition="start" sx={{ p: { xs: 2, sm: 3 } }}/>
          <Tab icon={<FastfoodIcon />} label='Gestionar Artículos' iconPosition="start" sx={{ p: { xs: 2, sm: 3 } }}/>
        </Tabs>
      </GlassmorphicPaper>
      
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
            <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addCategory')}>
                Nueva Categoría
            </Button>
        </Box>
        <List component={GlassmorphicPaper} elevation={2} sx={{p: 0}}>
          {menu.map((category, index) => (
            <React.Fragment key={category.id}>
              <ListItem
                secondaryAction={
                  <Box>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog('editCategory', category)} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteCategory(category.id)} sx={{ ml: 1 }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                }
                sx={{ p: { xs: 1.5, sm: 2 } }}
              >
                <ListItemText primary={category.name} primaryTypographyProps={{ variant: 'h6', fontWeight: 500, color: 'white' }} />
              </ListItem>
              {index < menu.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />}
            </React.Fragment>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {menu.map(category => (
          <Box key={category.id} sx={{ mb: { xs: 4, md: 6 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <GlassmorphicPaper sx={{p: 2, width: {xs: '100%', sm: 'auto'}, textAlign: 'center'}}><Typography variant='h4' sx={{ fontWeight: 'bold' }}>{category.name}</Typography></GlassmorphicPaper>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => handleOpenDialog('addItem', null, category.id)}>
                Añadir Artículo
              </Button>
            </Box>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              {(category.items || []).map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card sx={theme => ({
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'rgba(0, 0, 0, 0.35)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.18)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                        borderRadius: '16px',
                        color: 'white',
                    })}>
                    <CardMedia component="img" height="160" image={item.image || 'https://via.placeholder.com/300'} alt={item.name} />
                    <CardContent sx={{flexGrow: 1}}>
                      <Typography gutterBottom variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                      <Typography variant="body2" noWrap sx={{ mb: 1.5, color: 'rgba(255,255,255,0.7)' }}>{item.description}</Typography>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {`$${(typeof item.price === 'number' && !isNaN(item.price)) ? item.price.toFixed(2) : '0.00'}`}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                      <IconButton aria-label="edit" onClick={() => handleOpenDialog('editItem', item, category.id)} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => deleteItem(item.id)}>
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
    </PageLayout>
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperComponent={GlassmorphicPaper}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontWeight: 'bold'}}>
        {getTitle()}
        <IconButton onClick={onClose} sx={{ color: 'white' }}><CloseIcon /></IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, borderColor: 'rgba(255,255,255,0.2)' }}>
          {(type === 'addCategory' || type === 'editCategory') && (
            <StyledTextField autoFocus margin="dense" name="name" label="Nombre de la Categoría" type="text" fullWidth variant="outlined" value={formData.name || ''} onChange={handleChange} required />
          )}
          {(type === 'addItem' || type === 'editItem') && (
            <>
              <StyledTextField name="name" label="Nombre" fullWidth margin="dense" value={formData.name || ''} onChange={handleChange} required />
              <StyledTextField name="description" label="Descripción" fullWidth margin="dense" multiline rows={4} value={formData.description || ''} onChange={handleChange} />
              <StyledTextField name="price" label="Precio" type="number" fullWidth margin="dense" value={formData.price || ''} onChange={handleChange} InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} required />
              <Box sx={{ mt: 3, mb: 1 }}>
                <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                  Subir Imagen
                  <Input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
              </Box>
              {imagePreview && (
                <Box sx={{ my: 2, p: 1, border: '1px dashed rgba(255,255,255,0.4)', borderRadius: '8px', textAlign: 'center' }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, color: 'rgba(255,255,255,0.8)' }}>Vista Previa:</Typography>
                  <CardMedia component="img" sx={{ height: 160, objectFit: 'contain' }} image={imagePreview} alt="Vista previa" />
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 2, sm: 3 } }}>
          <Button onClick={onClose} sx={{ color: 'rgba(255,255,255,0.8)' }}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">Guardar Cambios</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Admin;

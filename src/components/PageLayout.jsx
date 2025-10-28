import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const PageLayout = ({ children, title, icon: IconComponent, fullScreen = false }) => {
  const layoutSx = {
    position: 'relative',
    backgroundImage: 'url(https://images.pexels.com/photos/3220616/pexels-photo-3220616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    minHeight: '100vh', // Ensure layout takes at least full viewport height
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 0
    },
    '> *': {
        position: 'relative',
        zIndex: 1
    }
  };

  if (fullScreen) {
    return (
      <Box
        sx={{
          ...layoutSx,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          p: 3,
          boxSizing: 'border-box'
        }}
      >
        <Container maxWidth="md">
            {children}
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        ...layoutSx,
        pt: `calc(64px + 32px)`, // AppBar height + padding
        pb: { xs: 4, md: 6 },
        boxSizing: 'border-box'
      }}
    >
      <Container maxWidth="lg">
        {title && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: { xs: 4, md: 6 } }}>
              {IconComponent && <IconComponent sx={{ color: 'white', fontSize: { xs: '2.8rem', sm: '3.75rem' }, mr: 2 }}/>}
              <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', sm: '3.75rem' }, color: 'white', m: 0 }}>
                {title}
              </Typography>
            </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default PageLayout;

import React from 'react';
import Admin from './Admin';

const MenuABM = () => {
  // La autenticación ahora se maneja en la página de Ingreso y se protege a través de AdminRoute.
  // Este componente simplemente renderiza el panel de administración.
  return <Admin />;
};

export default MenuABM;

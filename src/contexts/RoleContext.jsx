import React, { createContext, useState, useContext, useEffect } from 'react';

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // La clave se almacena aquí por simplicidad. En una app real, debería estar en una variable de entorno segura.
  const ADMIN_PASSWORD = '1234';

  const loginAdmin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setRole('admin');
      setIsAdminAuthenticated(true);
      return true; // Éxito
    } 
    return false; // Fallo
  };

  const logout = () => {
    setRole(null);
    setIsAdminAuthenticated(false);
  };

  useEffect(() => {
    if (role) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [role]);

  const value = {
    role,
    setRole, // Se mantiene para roles que no requieren autenticación (cliente, mozo)
    isAdminAuthenticated,
    isUserLoggedIn,
    loginAdmin,
    logout
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}

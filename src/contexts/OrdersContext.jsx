import React, { createContext, useState, useContext } from 'react';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

const mockOrders = [
  { 
    id: 'ORDER-001', 
    items: [{ name: 'Hamburguesa Clásica', quantity: 1 }, { name: 'Papas Fritas', quantity: 1 }], 
    status: 'Entregado', 
    total: 15.50 
  },
  { 
    id: 'ORDER-002', 
    items: [{ name: 'Pizza Margarita', quantity: 2 }], 
    status: 'Entregado', 
    total: 25.00 
  },
  { 
    id: 'ORDER-003', 
    items: [{ name: 'Ensalada César', quantity: 1 }, { name: 'Refresco', quantity: 1 }], 
    status: 'Cancelado', 
    total: 12.00 
  },
    { 
    id: 'ORDER-004', 
    items: [{ name: 'Hamburguesa Clásica', quantity: 10 }, { name: 'Papas Fritas', quantity: 10 }], 
    status: 'Entregado', 
    total: 150.50 
  },
];

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(mockOrders);

  const addOrder = (newOrder) => {
    // Lógica para añadir un nuevo pedido, incluyendo un ID único
    const orderWithId = { ...newOrder, id: `ORDER-${String(Date.now()).slice(-5)}` };
    setOrders(prevOrders => [...prevOrders, orderWithId]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

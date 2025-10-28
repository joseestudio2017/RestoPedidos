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

  const addOrder = (orderPayload) => {
    const newOrder = { 
      ...orderPayload, 
      id: `ORDER-${String(Date.now()).slice(-5)}`,
      status: 'Procesando Pago',
      createdAt: new Date().toISOString(),
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrder; // ¡Devolver el nuevo pedido!
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};

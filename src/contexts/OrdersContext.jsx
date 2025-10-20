import React, { createContext, useState, useContext } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    // 1. Crear el nuevo objeto de pedido con un ID único y un estado inicial.
    const orderWithId = { 
      ...newOrder, 
      id: `order${Date.now()}`,
      status: 'Pendiente' // ¡Añadido estado inicial!
    };
    
    // 2. Actualizar el estado de los pedidos.
    setOrders((prevOrders) => [...prevOrders, orderWithId]);
    
    // 3. Devolver el nuevo pedido con su ID.
    return orderWithId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);

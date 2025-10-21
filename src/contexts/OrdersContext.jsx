import React, { createContext, useState, useContext } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    // ¡CAMBIO IMPORTANTE! El estado inicial ahora es "en preparacion"
    const orderWithDetails = {
      ...newOrder,
      id: `order_${Date.now()}`,
      timestamp: new Date(),
      status: 'en preparacion', // Directo a la cocina
    };

    setOrders((prevOrders) => [...prevOrders, orderWithDetails]);
    return orderWithDetails;
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

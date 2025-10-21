import React, { createContext, useState, useContext, useEffect } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    const orderWithDetails = {
      ...newOrder,
      id: `order_${Date.now()}`,
      timestamp: new Date(),
      status: 'Pendiente', // Initial status is Pendiente
    };
    setOrders((prevOrders) => [...prevOrders, orderWithDetails]);
    // Return the newly created order so we can use it right away
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

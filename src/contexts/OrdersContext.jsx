import React, { createContext, useState, useContext } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, { ...newOrder, id: `order${Date.now()}` }]);
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

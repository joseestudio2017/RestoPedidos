import React from 'react';
import { useOrders } from '../contexts/OrdersContext';

function Mozo() {
  const { orders, updateOrderStatus } = useOrders();

  const activeOrders = orders.filter(order => order.status === 'en preparacion');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos Activos</h1>
      {activeOrders.length > 0 ? (
        <ul className="space-y-4">
          {activeOrders.map(order => (
            <li key={order.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Pedido #{order.id}</h2>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>{item.name} - {item.quantity}</li>
                    ))}
                  </ul>
                  <p className="text-gray-500">Total: ${order.total.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => updateOrderStatus(order.id, 'entregado')}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Marcar como Entregado
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay pedidos activos en este momento.</p>
      )}
    </div>
  );
}

export default Mozo;

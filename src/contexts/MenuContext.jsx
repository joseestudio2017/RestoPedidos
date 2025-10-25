import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

const initialMenu = [
  {
    id: 'cat1',
    name: 'Entrantes',
    items: [
      { id: 'item1', name: 'Bruschetta de Tomate', description: 'Pan tostado con tomate fresco, ajo, albahaca y aceite de oliva virgen extra.', price: 7.50, image: 'https://images.pexels.com/photos/5639433/pexels-photo-5639433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item2', name: 'Calamares a la Romana', description: 'Anillas de calamar rebozadas y fritas, servidas con alioli de limón.', price: 9.99, image: 'https://images.pexels.com/photos/10899299/pexels-photo-10899299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item3', name: 'Tabla de Quesos', description: 'Selección de quesos locales e importados con frutos secos y mermelada.', price: 12.00, image: 'https://images.pexels.com/photos/13194593/pexels-photo-13194593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
  {
    id: 'cat2',
    name: 'Platos Principales',
    items: [
      { id: 'item4', name: 'Salmón a la Plancha', description: 'Filete de salmón fresco a la plancha con espárragos y salsa de eneldo.', price: 18.50, image: 'https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item5', name: 'Lasaña de Carne', description: 'Capas de pasta con salsa boloñesa, bechamel y queso gratinado.', price: 14.99, image: 'https://images.pexels.com/photos/6046467/pexels-photo-6046467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item6', name: 'Risotto de Champiñones', description: 'Arroz cremoso con champiñones Portobello, parmesano y aceite de trufa.', price: 16.00, image: 'https://images.pexels.com/photos/5946636/pexels-photo-5946636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
  {
    id: 'cat3',
    name: 'Hamburguesas',
    items: [
      { id: 'item7', name: 'Clásica con Queso', description: 'Carne de ternera, queso cheddar, lechuga, tomate y nuestra salsa especial.', price: 12.99, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item8', name: 'BBQ con Bacon', description: 'Carne de ternera, bacon crujiente, aros de cebolla y salsa barbacoa casera.', price: 14.50, image: 'https://images.pexels.com/photos/2271107/pexels-photo-2271107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
  {
    id: 'cat4',
    name: 'Pizzas',
    items: [
      { id: 'item9', name: 'Margarita', description: 'Salsa de tomate, mozzarella fresca y albahaca. La clásica, pero mejor.', price: 11.99, image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item10', name: 'Pepperoni', description: 'Generosa cantidad de pepperoni picante y mozzarella fundida.', price: 13.50, image: 'https://images.pexels.com/photos/8254729/pexels-photo-8254729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
  {
    id: 'cat5',
    name: 'Postres',
    items: [
      { id: 'item11', name: 'Tiramisú', description: 'Capas de bizcocho de soletilla empapado en café, con crema de mascarpone.', price: 6.99, image: 'https://images.pexels.com/photos/574111/pexels-photo-574111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 'item12', name: 'Cheesecake de Frutos Rojos', description: 'Tarta de queso cremosa sobre una base de galleta, cubierta con frutos rojos.', price: 7.50, image: 'https://images.pexels.com/photos/267951/pexels-photo-267951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
  {
    id: 'cat6',
    name: 'Bebidas',
    items: [
        { id: 'item13', name: 'Limonada Casera', description: 'Refrescante y natural, hecha en casa.', price: 3.50, image: 'https://images.pexels.com/photos/1200348/pexels-photo-1200348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 'item14', name: 'Refresco', description: 'Variedad de refrescos de primeras marcas.', price: 2.50, image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
        { id: 'item15', name: 'Cerveza Artesanal', description: 'Consulta nuestra selección de cervezas locales.', price: 4.50, image: 'https://images.pexels.com/photos/1552635/pexels-photo-1552635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ],
  },
];

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(initialMenu);

  const addCategory = (categoryName) => {
    setMenu((prevMenu) => [
      ...prevMenu,
      { id: `cat${Date.now()}`, name: categoryName, items: [] },
    ]);
  };

  const updateCategory = (categoryId, newName) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      )
    );
  };

  const deleteCategory = (categoryId) => {
    setMenu((prevMenu) => prevMenu.filter((cat) => cat.id !== categoryId));
  };

  const addItem = (categoryId, item) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: [...(cat.items || []), { id: `item${Date.now()}`, ...item }] }
          : cat
      )
    );
  };

  const updateItem = (categoryId, itemId, updatedItem) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: (cat.items || []).map((item) =>
              item.id === itemId ? { ...item, ...updatedItem } : item
            ) }
          : cat
      )
    );
  };

  const deleteItem = (categoryId, itemId) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: (cat.items || []).filter((item) => item.id !== itemId) }
          : cat
      )
    );
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        addCategory,
        updateCategory,
        deleteCategory,
        addItem,
        updateItem,
        deleteItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);

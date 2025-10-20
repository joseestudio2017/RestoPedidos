import React, { createContext, useState, useContext } from 'react';

const MenuContext = createContext();

const initialMenu = [
  {
    id: 'cat1',
    name: 'Entrantes',
    items: [
      { id: 'item1', name: 'Rollitos de Primavera', description: 'Rollitos de primavera fritos y crujientes', price: 5.99, image: 'https://via.placeholder.com/300' },
      { id: 'item2', name: 'Pan de Ajo', description: 'Pan tostado con mantequilla de ajo', price: 4.50, image: 'https://via.placeholder.com/300' },
    ],
  },
  {
    id: 'cat2',
    name: 'Platos Principales',
    items: [
      { id: 'item3', name: 'Pollo al Curry', description: 'Pollo picante al curry con arroz', price: 12.99, image: 'https://via.placeholder.com/300' },
      { id: 'item4', name: 'Bistec de Ternera', description: 'Bistec de ternera a la parrilla con verduras', price: 18.99, image: 'https://via.placeholder.com/300' },
    ],
  },
  {
    id: 'cat3',
    name: 'Postres',
    items: [
      { id: 'item5', name: 'Tarta de Chocolate', description: 'Rica tarta de chocolate', price: 6.99, image: 'https://via.placeholder.com/300' },
      { id: 'item6', name: 'Helado', description: 'Helado de vainilla con toppings', price: 4.00, image: 'https://via.placeholder.com/300' },
    ],
  },
];

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState(initialMenu);

  const addCategory = (categoryName) => {
    setMenu((prevMenu) => [
      ...prevMenu,
      { id: `cat${Date.now()}`, name: categoryName, items: [] }, // Se asegura que siempre tenga un array de items
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
          ? { ...cat, items: [...(cat.items || []), { id: `item${Date.now()}`, ...item }] } // SOLUCIÓN: USA cat.items || []
          : cat
      )
    );
  };

  const updateItem = (categoryId, itemId, updatedItem) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) =>
        cat.id === categoryId
          ? { ...cat, items: (cat.items || []).map((item) => // SOLUCIÓN: USA cat.items || []
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
          ? { ...cat, items: (cat.items || []).filter((item) => item.id !== itemId) } // SOLUCIÓN: USA cat.items || []
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

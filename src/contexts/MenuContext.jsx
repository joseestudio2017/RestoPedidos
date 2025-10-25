
import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { 
    collection, 
    getDocs, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    writeBatch, 
    query, 
    where 
} from 'firebase/firestore';

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
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    const seedDatabase = async () => {
        console.log("Seeding database...");
        const batch = writeBatch(db);
        
        initialMenu.forEach(category => {
            const categoryRef = doc(db, 'categories', category.id);
            batch.set(categoryRef, { name: category.name });
            
            category.items.forEach(item => {
                const itemRef = doc(db, 'items', item.id);
                const { id, ...itemData } = item; // Don't store id in the doc body
                batch.set(itemRef, { ...itemData, categoryId: category.id });
            });
        });

        await batch.commit();
        console.log("Database seeded.");
    };

    const fetchMenu = async () => {
        setLoading(true);
        try {
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            if (categoriesSnapshot.empty) {
                await seedDatabase();
            }

            const categoriesCol = collection(db, 'categories');
            const itemsCol = collection(db, 'items');

            const [categorySnapshot, itemSnapshot] = await Promise.all([
                getDocs(categoriesCol),
                getDocs(itemsCol)
            ]);

            const categories = categorySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
            const items = itemSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));

            const combinedMenu = categories.map(category => ({
                ...category,
                items: items.filter(item => item.categoryId === category.id).sort((a, b) => a.name.localeCompare(b.name))
            })).sort((a, b) => a.name.localeCompare(b.name));

            setMenu(combinedMenu);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    const addCategory = async (categoryName) => {
        if (!categoryName) return;
        await addDoc(collection(db, "categories"), { name: categoryName });
        await fetchMenu();
    };

    const updateCategory = async (categoryId, newName) => {
        const categoryDoc = doc(db, "categories", categoryId);
        await updateDoc(categoryDoc, { name: newName });
        await fetchMenu();
    };

    const deleteCategory = async (categoryId) => {
        const batch = writeBatch(db);
        const categoryDoc = doc(db, "categories", categoryId);
        batch.delete(categoryDoc);

        const q = query(collection(db, "items"), where("categoryId", "==", categoryId));
        const itemsSnapshot = await getDocs(q);
        itemsSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        await fetchMenu();
    };

    const addItem = async (categoryId, item) => {
        await addDoc(collection(db, "items"), { ...item, categoryId });
        await fetchMenu();
    };

    const updateItem = async (itemId, updatedItem) => {
        const itemDoc = doc(db, "items", itemId);
        await updateDoc(itemDoc, updatedItem);
        await fetchMenu();
    };

    const deleteItem = async (itemId) => {
        const itemDoc = doc(db, "items", itemId);
        await deleteDoc(itemDoc);
        await fetchMenu();
    };

    return (
        <MenuContext.Provider
            value={{
                menu,
                loading,
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

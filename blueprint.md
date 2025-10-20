# Blueprint del Sistema de Pedidos para Restaurantes

## Visión General

Este documento describe la estructura, características y plan de desarrollo para la aplicación del Sistema de Pedidos para Restaurantes. El objetivo es crear una experiencia de usuario moderna, intuitiva y eficiente tanto para clientes como para el personal del restaurante.

## Esquema del Proyecto

### Estilo y Diseño (Rediseño Moderno)

*   **Inspiración:** Diseño moderno, limpio y vibrante, inspirado en cadenas de comida rápida como McDonald's, utilizando colores llamativos y un diseño espacioso.
*   **Paleta de Colores:**
    *   Primario: Rojo (`#D7231D`)
    *   Secundario/Acento: Amarillo (`#FFC72C`)
    *   Fondo: Gris claro (`#F5F5F5`)
    *   Papel/Tarjetas: Blanco (`#FFFFFF`)
*   **Tipografía:** Roboto, una fuente sans-serif moderna y legible.
*   **Componentes:** Basado en Material-UI (MUI), con estilos personalizados para lograr un aspecto único (bordes redondeados, sombras suaves, efectos de hover).
*   **Layout General:** Diseño a pantalla completa (`full-width`) y totalmente responsivo para una experiencia consistente en dispositivos móviles y de escritorio.
*   **Página de Inicio:** Presenta un banner hero a pantalla completa con una imagen de fondo de alta calidad, el título "RestoPedidos" superpuesto con una tipografía impactante y un botón de llamada a la acción claro para "Ver Menú".
*   **Página de Menú:** Diseño de cuadrícula (grid) que muestra los artículos en tarjetas modernas. Cada tarjeta incluye imagen, nombre, descripción, precio y un botón prominente para "Añadir al Carrito".
*   **Página del Carrito:** Diseño de dos columnas en pantallas grandes, con la lista de artículos a la izquierda y un resumen del pedido fijo a la derecha. La interfaz está optimizada para ajustar cantidades y finalizar la compra de forma sencilla.
*   **Página de Pedidos:** Los pedidos se muestran en tarjetas individuales en una cuadrícula. El estado de cada pedido (`Pendiente`, `En Preparación`, `Entregado`) se indica visualmente con "Chips" de colores y se avanza con botones de acción claros.
*   **Panel de Administración:** Interfaz organizada con pestañas para separar la gestión de "Categorías" y "Artículos". El alta y la edición se realizan a través de formularios en ventanas de diálogo (`Dialog`) para no sobrecargar la pantalla principal.

### Características Implementadas

*   **Gestión Completa del Menú:** Los administradores pueden crear, leer, actualizar y eliminar categorías y artículos del menú a través de una interfaz amigable.
*   **Carrito de Compras Interactivo:** Los clientes pueden añadir/eliminar artículos, ajustar cantidades y ver el subtotal actualizado en tiempo real.
*   **Proceso de Pedido Simplificado:** Flujo de pedido claro donde el cliente puede especificar si es para llevar o para comer en el local, y finalizar la compra.
*   **Seguimiento de Pedidos en Tiempo Real:** El personal puede ver los pedidos entrantes y actualizar su estado a medida que avanzan en la cocina, desde "Pendiente" hasta "Entregado".
*   **Contexto Global:** La aplicación utiliza React Context para gestionar el estado del menú, el carrito y los pedidos de forma centralizada y eficiente.

## Plan de Desarrollo

### Fase 1: Configuración y Estructura ✅

*   **HECHO:** Instalar dependencias (`react-router-dom`, `@mui/material`, etc.).
*   **HECHO:** Crear estructura de carpetas (pages, components, contexts).
*   **HECHO:** Configurar el enrutamiento y el layout principal en `App.jsx`.

### Fase 2: Lógica de Negocio (Contextos) ✅

*   **HECHO:** Crear `MenuContext` para la gestión del menú (CRUD).
*   **HECHO:** Crear `CartContext` para la funcionalidad del carrito de compras.
*   **HECHO:** Crear `OrdersContext` para la gestión de pedidos.

### Fase 3: Rediseño Moderno de la UI/UX ✅

1.  **HECHO:** Definir y aplicar un nuevo tema moderno en `App.jsx` (colores, tipografía, estilos de componentes).
2.  **HECHO:** Rediseñar `Home.jsx` con un banner a pantalla completa y una llamada a la acción clara.
3.  **HECHO:** Rediseñar `Menu.jsx` con un diseño de cuadrícula y tarjetas de producto mejoradas.
4.  **HECHO:** Rediseñar `Cart.jsx` con un diseño de dos columnas, resumen de pedido y flujo de pago simplificado.
5.  **HECHO:** Rediseñar `Orders.jsx` con tarjetas de pedido, chips de estado visuales y botones de acción.
6.  **HECHO:** Rediseñar `Admin.jsx` con una interfaz de pestañas y formularios en diálogos para una mejor organización.

## Próximos Pasos

*   **Autenticación y Roles:** Implementar un sistema de inicio de sesión para diferenciar entre Clientes, Personal y Administradores.
*   **Persistencia de Datos:** Integrar la aplicación con un backend como Firebase (Firestore) para que los datos (menú, pedidos, usuarios) sean persistentes.
*   **Funcionalidades Avanzadas:** Añadir características como búsqueda de productos, filtrado de menú, historial de pedidos para clientes, y notificaciones.

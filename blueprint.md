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
*   **Página de Ingreso/Selección de Perfil:** Rediseñada con una imagen de fondo temática de restaurante y una superposición oscura para mejorar la legibilidad. El título se ha cambiado a "Selecciona tu Perfil", acompañado de un icono, para una bienvenida más clara y atractiva.
*   **Página de Menú:** Diseño de cuadrícula (grid) en escritorio. Cada tarjeta incluye imagen, nombre, descripción, precio y un **controlador de cantidad interactivo**: el botón 'Añadir al Carrito' se transforma en un selector (+/-) una vez que el producto está en el carrito. **En dispositivos móviles, las categorías se presentan como carruseles horizontales con efecto *scroll-snapping*, mostrando una tarjeta a la vez para una navegación enfocada y táctil.**
*   **Página del Carrito:** Se ha implementado un fondo visualmente atractivo con una superposición oscura, en línea con el diseño de la página de ingreso. Los elementos de contenido, como las tarjetas de los productos y el resumen del pedido, utilizan un efecto de "cristal esmerilado" para garantizar una legibilidad y estética superiores.
*   **Página de Pedidos:** Los pedidos se muestran en tarjetas individuales en una cuadrícula. El estado de cada pedido (`Pendiente`, `En Preparación`, `Entregado`) se indica visualmente con "Chips" de colores y se avanza con botones de acción claros.
*   **Gestión de Menú (ABM):** La sección de gestión, accesible en `/menu-abm` y protegida por contraseña, presenta una interfaz organizada con pestañas para "Categorías" y "Artículos". El alta y la edición se realizan a través de formularios en ventanas de diálogo (`Dialog`).

### Características Implementadas

*   **Flujo de Autenticación Centralizado:** La autenticación del administrador se realiza una única vez en la página de "Ingreso" a través de un diálogo modal. Una vez autenticado, el administrador tiene acceso a todas las rutas protegidas sin necesidad de volver a ingresar la contraseña.
*   **Gestión Completa del Menú:** Los administradores pueden crear, leer, actualizar y eliminar categorías y artículos del menú a través de la sección "Menu ABM".
*   **Carrito de Compras Interactivo:** Los clientes pueden añadir/eliminar artículos, ajustar cantidades y ver el subtotal actualizado en tiempo real.
*   **Selector Visual de Mesas:** Cuando un cliente elige "Comer en el Local", se presenta un plano interactivo del restaurante en una ventana modal para seleccionar su mesa.
*   **Controlador de Cantidad Dinámico:** El botón 'Añadir al Carrito' se convierte en un controlador de cantidad (+/-) al añadir un producto, permitiendo un ajuste rápido desde la misma página del menú.
*   **Proceso de Pedido Simplificado:** Flujo de pedido claro donde el cliente puede especificar si es para llevar o para comer en el local.
*   **Seguimiento de Pedidos en Tiempo Real:** El personal puede ver y actualizar el estado de los pedidos a medida que avanzan en la cocina.
*   **Contexto Global:** La aplicación utiliza React Context para gestionar el estado del menú, el carrito, los pedidos y los roles (incluyendo el estado de autenticación del administrador) de forma centralizada.
*   **Navegación Simplificada para Visitantes:** Para los usuarios que no han seleccionado un rol, la barra de navegación muestra únicamente las opciones esenciales: "Menú" e "Ingreso", mejorando la claridad y guiando al usuario.
*   **Navegación Personalizada por Rol:** La barra de navegación se adapta al rol del usuario. Para el **Administrador**, se muestran las opciones: **"Menu"**, **"Menu ABM"**, **"TP"** (Terminal de Pedidos) y **"Historial de Entregas"**.

## Plan de Desarrollo

### Fase 1: Configuración y Estructura ✅

*   **HECHO:** Instalar dependencias y configurar el enrutamiento y el layout principal.

### Fase 2: Lógica de Negocio (Contextos) ✅

*   **HECHO:** Crear contextos de React para gestionar el estado del menú, carrito, pedidos y roles.

### Fase 3: Rediseño Moderno de la UI/UX ✅

*   **HECHO:** Aplicar un nuevo tema de diseño moderno y rediseñar todas las páginas principales para mejorar la experiencia de usuario, la interactividad y la responsividad.

### Fase 4: Refactorización del Flujo de Autenticación ✅

*   **HECHO:** Centralizar la lógica de autenticación del administrador en el `RoleContext`.
*   **HECHO:** Implementar un diálogo modal en la página de `Ingreso` para la validación de la contraseña del administrador.
*   **HECHO:** Simplificar el componente `MenuABM` eliminando la lógica de autenticación duplicada.
*   **HECHO:** Proteger la ruta `/menu-abm` usando el componente `AdminRoute`.

### Fase 5: Mejoras de Usabilidad ✅

*   **HECHO:** Simplificar la barra de navegación para los usuarios no autenticados, mostrando solo los enlaces "Menú" e "Ingreso".

### Fase 6: Corrección de Errores ✅

*   **HECHO:** Corregir el enlace roto en la página de `Menu`. El botón "Ingresar para Pedir" ahora redirige correctamente a la página `/ingreso`.

### Fase 7: Rediseño de la Página de Ingreso ✅

*   **HECHO:** Se ha rediseñado la página de selección de perfil (`Ingreso.jsx`) con una imagen de fondo, un título más claro ("Selecciona tu Perfil") y un estilo visual mejorado para las tarjetas de selección.

### Fase 8: Rediseño de la Página del Carrito ✅

*   **HECHO:** Se ha actualizado el diseño de la página del carrito (`Carrito.jsx`) para incluir una imagen de fondo y un efecto de "cristal esmerilado" en los elementos de la interfaz, manteniendo una coherencia visual con el resto de la aplicación.

## Próximos Pasos

*   **Persistencia de Datos:** Integrar con un backend como Firebase para que los datos (menú, pedidos, usuarios) sean persistentes.
*   **Funcionalidades Avanzadas:** Añadir historial de pedidos para clientes, notificaciones en tiempo real, y búsqueda/filtrado en el menú.

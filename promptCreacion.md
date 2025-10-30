# Guía de Prompts para la Creación de un Sistema de Pedidos (API-First)

Este documento contiene una secuencia de prompts detallados para guiar a una IA de desarrollo en la creación de una aplicación de sistema de pedidos para restaurantes. Cada sección distingue entre la **explicación para el desarrollador** y el **prompt para la IA**.

---

## Visión General y Stack Tecnológico

*   **Para el Desarrollador (Explicación):** Esta sección define el objetivo de diseño (UI/UX) y las tecnologías clave (Stack) que se utilizarán. Sirve como una referencia rápida de la visión del producto y las herramientas seleccionadas. No es un prompt para la IA.

### **Visión del Diseño (UI/UX)**
*   **Inspiración:** Diseño vibrante y espacioso.
*   **Paleta de Colores:** Primario rojo (`#D7231D`), acento amarillo (`#FFC72C`), fondos claros.
*   **Tipografía:** `Roboto`.
*   **Componentes Visuales:** Tarjetas con bordes redondeados, Hero Banner, cuadrículas responsivas, carruseles móviles, efecto "cristal esmerilado", y Chips de MUI para estados.

### **Librerías Principales (Stack Tecnológico)**
*   **Framework Base:** React con Vite.
*   **Componentes de UI:** Material-UI (MUI).
*   **Estilos:** Emotion.
*   **Enrutamiento:** React Router DOM.
*   **Manejo de Estado:** Redux Toolkit y React-Redux.
*   **Cliente HTTP:** Axios.

---

## Fase 1: Configuración del Proyecto y Arquitectura

### **Prompt 1.1: Inicialización y Dependencias Clave**

*   **Para el Desarrollador (Explicación):** El siguiente prompt inicializa el entorno y añade todas las librerías fundamentales. Es el punto de partida que asegura que todas las herramientas necesarias estén disponibles.

*   **Para la IA (Prompt):**
    > "Inicializa un nuevo proyecto de React utilizando Vite y JavaScript. Una vez creado, detén el servidor de desarrollo e instala las siguientes dependencias esenciales para una arquitectura moderna y escalable:
    > *   `react-router-dom`
    > *   `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`
    > *   `@reduxjs/toolkit`, `react-redux`
    > *   `axios`"

### **Prompt 1.2: Estructura de Carpetas Profesional**

*   **Para el Desarrollador (Explicación):** Este prompt establece la arquitectura de carpetas del proyecto. Una estructura bien definida es fundamental para la mantenibilidad y escalabilidad del código.

*   **Para la IA (Prompt):**
    > "Ahora, crea una estructura de carpetas profesional en `src` que separe claramente las responsabilidades:
    > *   `api`
    > *   `app`
    > *   `components`
    > *   `features`
    > *   `hooks`
    > *   `pages`
    > *   `routes`
    > *   `theme`"

---

## Fase 2: Capa de API y Manejo de Estado Centralizado

### **Prompt 2.1: Creación de la Capa de Servicios de API**

*   **Para el Desarrollador (Explicación):** Este prompt crea una capa de servicio centralizada para las comunicaciones con la API, desacoplando la lógica de la interfaz de los detalles de implementación del backend.

*   **Para la IA (Prompt):**
    > "Dentro de `src/api`, crea un archivo `apiService.js`. En él, configura una instancia de `axios` con una URL base de marcador de posición (`http://localhost:5000/api`). Luego, exporta un objeto que contenga funciones asíncronas para cada interacción futura con el backend: `login`, `getMenu`, `getCategories`, `createMenuItem`, `updateMenuItem`, `deleteMenuItem`, `postOrder`, `getOrders`, y `updateOrderStatus`."

### **Prompt 2.2: Configuración de la Store de Redux**

*   **Para el Desarrollador (Explicación):** El siguiente prompt configura la store de Redux, el "corazón" donde vivirá todo el estado global de la aplicación.

*   **Para la IA (Prompt):**
    > "En `src/app`, crea el archivo `store.js`. Configura la store de Redux Toolkit utilizando `configureStore`. Prepara la estructura para importar y combinar los futuros reductores de los 'slices'."

### **Prompt 2.3: Creación de Slices con Thunks Asíncronos**

*   **Para el Desarrollador (Explicación):** Este prompt define cómo se gestionará el estado para cada funcionalidad (autenticación, menú, etc.) y cómo se manejarán las llamadas a la API (estados de carga, éxito, error).

*   **Para la IA (Prompt):**
    > "Crea los siguientes 'slices' de Redux en la carpeta `src/features`:
    > 1.  **`authSlice.js`**: Usa `createSlice` y `createAsyncThunk`. El thunk `loginAdmin` debe llamar a `apiService.login` y manejar los estados para almacenar el token.
    > 2.  **`menuSlice.js`**: Crea un thunk `fetchMenu` que llame a `apiService.getMenu` y `apiService.getCategories`.
    > 3.  **`cartSlice.js`**: Este slice debe tener reductores síncronos para `addItem`, `removeItem`, `updateQuantity`, y `clearCart`.
    > 4.  **`ordersSlice.js`**: Crea los thunks `submitOrder`, `fetchOrders` y `updateOrder`, que llamarán a las funciones correspondientes del `apiService`."

---

## Fase 3: UI, Enrutamiento y Diseño Visual

### **Prompt 3.1: Tema Global y Layout Principal**

*   **Para el Desarrollador (Explicación):** Este prompt establece la identidad visual de la app aplicando el tema de diseño y crea la estructura de página (`PageLayout`) que compartirán todas las vistas.

*   **Para la IA (Prompt):**
    > "En `src/theme`, crea `theme.js` y define un tema de MUI basado en la visión de diseño (color primario rojo, acento amarillo). En `App.jsx`, envuelve la aplicación con el `ThemeProvider` de MUI y el `Provider` de `react-redux`. Finalmente, crea un componente `PageLayout.jsx` en `src/components` que renderice una `Navbar`, un `Footer` y un `<Outlet />` de React Router."

### **Prompt 3.2: Configuración Centralizada de Rutas**

*   **Para el Desarrollador (Explicación):** Centralizar las rutas en un solo archivo mejora la organización y facilita la comprensión de la navegación de la aplicación.

*   **Para la IA (Prompt):**
    > "Dentro de `src/routes`, crea un archivo `AppRouter.jsx`. Define todas las rutas de la aplicación aquí, utilizando `createBrowserRouter`. Establece el `PageLayout` como el layout base y crea componentes de página vacíos en `src/pages` para cada ruta: `Home`, `Menu`, `Carrito`, `Ingreso`, `AdminMenu`, `Cocina`, `Reparto`."

### **Prompt 3.3: Componente de Ruta Protegida**

*   **Para el Desarrollador (Explicación):** Este prompt crea un mecanismo de seguridad para proteger rutas sensibles, como los paneles de administración, y restringir el acceso solo a usuarios autenticados.

*   **Para la IA (Prompt):**
    > "Crea un componente `AdminRoute.jsx` en `src/routes`. Este componente debe usar el hook `useSelector` para verificar si existe un token de administrador en el `authSlice`. Si existe, debe renderizar un `<Outlet />`; de lo contrario, debe redirigir a la página `/ingreso`."

---

## Fase 4: Desarrollo de Flujos de Usuario

### **Prompt 4.1: Página de Menú (Consumo de Redux)**

*   **Para el Desarrollador (Explicación):** Este prompt conecta por primera vez la UI con Redux, mostrando cómo solicitar datos de la API y presentar dinámicamente el contenido, estados de carga o errores.

*   **Para la IA (Prompt):**
    > "Desarrolla la página `Menu.jsx`. Usa `useEffect` para despachar la acción `fetchMenu` en el primer renderizado. Usa `useSelector` para obtener el estado del menú desde `menuSlice`. Muestra un `CircularProgress` de MUI si el estado es 'loading' y un `Alert` si es 'failed'. Renderiza los ítems del menú en `Card`s de MUI, cada una con un botón para despachar la acción `addItem` del `cartSlice`."

### **Prompt 4.2: Flujo de Autenticación de Administrador**

*   **Para el Desarrollador (Explicación):** Se implementa el flujo de inicio de sesión, conectando el formulario con la lógica de autenticación en Redux.

*   **Para la IA (Prompt):**
    > "En `Ingreso.jsx`, crea un `Dialog` modal para el login del administrador. Al enviar la contraseña, debe despachar el thunk `loginAdmin`. Muestra un feedback de carga o error basado en el estado del `authSlice`. Si el login es exitoso, redirige al administrador a `/admin/menu`."

### **Prompt 4.3: ABM de Menú (Ruta Protegida)**

*   **Para el Desarrollador (Explicación):** Se construye la funcionalidad principal del administrador (gestión del menú). Demuestra cómo realizar operaciones de escritura a la API desde una ruta protegida.

*   **Para la IA (Prompt):**
    > "Configura la ruta `/admin/menu` para que use `AdminRoute`. Dentro de `AdminMenu.jsx`, muestra los ítems del menú de Redux. Añade formularios en `Dialog`s para crear y editar ítems. Los envíos deben despachar los thunks correspondientes (`createMenuItem`, `updateMenuItem`, `deleteMenuItem`), pasando el token de autenticación desde el `authSlice`."

### **Prompt 4.4: Carrito y Creación de Pedido**

*   **Para el Desarrollador (Explicación):** Se desarrolla el flujo principal del cliente: gestionar su carrito y enviar el pedido final a la API.

*   **Para la IA (Prompt):**
    > "Desarrolla `Carrito.jsx`. Usa `useSelector` para mostrar los ítems del `cartSlice`. Permite modificar cantidades y eliminar ítems despachando las acciones correspondientes. El botón 'Realizar Pedido' debe despachar el thunk `submitOrder` del `ordersSlice`."

### **Prompt 4.5: Terminal de Cocina y Reparto**

*   **Para el Desarrollador (Explicación):** Se construyen las interfaces para el personal, permitiéndoles gestionar el flujo de trabajo de los pedidos en tiempo real.

*   **Para la IA (Prompt):**
    > "Crea las páginas `Cocina.jsx` y `Reparto.jsx` y protégelas con `AdminRoute`. Estas páginas deben despachar `fetchOrders` para obtener los pedidos. Implementa botones que permitan al personal actualizar el estado de un pedido despachando el thunk `updateOrder`."

---

## Fase 5: Pulido Final

### **Prompt 5.1: Manejo Global de Carga y Errores**

*   **Para el Desarrollador (Explicación):** Se realiza una revisión general para asegurar que la aplicación comunique claramente al usuario los estados de carga y error durante las interacciones con la red.

*   **Para la IA (Prompt):**
    > "Revisa todos los componentes que interactúan con la API. Asegúrate de que cada uno maneje visualmente los estados de carga con `CircularProgress` de MUI y los estados de error con `Alert` de MUI, basándose en la información de estado de cada slice de Redux."

### **Prompt 5.2: Diseño Responsivo**

*   **Para el Desarrollador (Explicación):** El último paso de pulido consiste en asegurar que la aplicación sea accesible y funcional en cualquier tamaño de pantalla.

*   **Para la IA (Prompt):**
    > "Aplica técnicas de diseño responsivo utilizando el sistema de `Grid` y los helpers de breakpoint de MUI (ej. `sx={{ display: { xs: 'block', md: 'flex' } }}`) para asegurar que la aplicación se vea y funcione bien en dispositivos móviles y de escritorio."

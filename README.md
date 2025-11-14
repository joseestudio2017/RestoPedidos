# **Documentación Técnica Exhaustiva: Proyecto Restó-Pedido v2.0**

Este documento presenta la visión técnica, arquitectura y planificación detallada para el desarrollo del sistema **Restó-Pedido**, un kiosko de autogestión para la industria gastronómica.

---

### **Tabla de Contenidos**

1.  [**Visión General y Arquitectura**](#1-visión-general-y-arquitectura)
    *   [1.1. Contexto de Negocio y Problemática](#11-contexto-de-negocio-y-problemática)
    *   [1.2. Solución Propuesta: Kiosko de Autogestión](#12-solución-propuesta-kiosko-de-autogestión)
    *   [1.3. Arquitectura Planificada y Principios de Diseño](#13-arquitectura-planificada-y-principios-de-diseño)
2.  [**Roles de Usuario y Matriz de Permisos**](#2-roles-de-usuario-y-matriz-de-permisos)
    *   [2.1. Cliente](#21-cliente)
    *   [2.2. Mozo](#22-mozo)
    *   [2.3. Administrador](#23-administrador)
3.  [**Componente Frontend (React)**](#3-componente-frontend-react)
    *   [3.1. Rol y Responsabilidades](#31-rol-y-responsabilidades)
    *   [3.2. Ecosistema de Desarrollo y Justificación](#32-ecosistema-de-desarrollo-y-justificación)
    *   [3.3. Flujo de Interacción del Cliente](#33-flujo-de-interacción-del-cliente)
4.  [**Componente Backend (API Laravel)**](#4-componente-backend-api-laravel)
    *   [4.1. Rol y Responsabilidades](#41-rol-y-responsabilidades)
    *   [4.2. Lógica de Negocio y Flujos Críticos](#42-lógica-de-negocio-y-flujos-críticos)
    *   [4.3. Contrato de la API: Endpoints Detallados](#43-contrato-de-la-api-endpoints-detallados)
5.  [**Persistencia de Datos (MySQL y Redis)**](#5-persistencia-de-datos-mysql-y-redis)
    *   [5.1. Base de Datos Relacional: MySQL](#51-base-de-datos-relacional-mysql)
    *   [5.2. Caché y Colas: Redis](#52-caché-y-colas-redis)
6.  [**Estrategia de Calidad y Testing**](#6-estrategia-de-calidad-y-testing)
    *   [6.1. Enfoque de Pirámide de Pruebas](#61-enfoque-de-pirámide-de-pruebas)
    *   [6.2. Tipos de Pruebas y Herramientas](#62-tipos-de-pruebas-y-herramientas)
7.  [**Despliegue (CI/CD) y Arquitectura de Hosting**](#7-despliegue-cicd-y-arquitectura-de-hosting)
    *   [7.1. Entorno de Hosting On-Premise](#71-entorno-de-hosting-on-premise)
    *   [7.2. Pipeline de Integración y Despliegue Continuo (GitLab CI/CD)](#72-pipeline-de-integración-y-despliegue-continuo-gitlab-cicd)
8.  [**Estrategia de Seguridad en Profundidad**](#8-estrategia-de-seguridad-en-profundidad)
    *   [8.1. Autenticación y Gestión de Sesiones](#81-autenticación-y-gestión-de-sesiones)
    *   [8.2. Autorización y Control de Acceso (RBAC)](#82-autorización-y-control-de-acceso-rbac)
    *   [8.3. Validación de Entradas y Prevención de Ataques](#83-validación-de-entradas-y-prevención-de-ataques)
    *   [8.4. Seguridad a Nivel de Infraestructura](#84-seguridad-a-nivel-de-infraestructura)

---

## **1. Visión General y Arquitectura**

### **1.1. Contexto de Negocio y Problemática**

En la industria gastronómica de comida rápida, la eficiencia en la toma de pedidos es un factor crítico que impacta directamente en la satisfacción del cliente y la rentabilidad del negocio. El modelo tradicional, dependiente de personal en caja, genera cuellos de botella en horas pico, resultando en largas filas, posibles errores humanos en la toma de comandas y una experiencia de usuario deficiente.

### **1.2. Solución Propuesta: Kiosko de Autogestión**

**Restó-Pedido** nace como una solución a esta problemática, proponiendo un **sistema de punto de venta (POS) basado en un kiosko de autogestión**. Este sistema permite a los clientes explorar el menú, personalizar sus productos y realizar el pago de forma autónoma, optimizando el flujo operativo del restaurante y liberando al personal para que se enfoque en tareas de mayor valor, como la preparación de alimentos y la atención de calidad.

### **1.3. Arquitectura Planificada y Principios de Diseño**

Para cumplir con los objetivos de rendimiento, escalabilidad y mantenibilidad, se ha optado por una **arquitectura desacoplada de tres capas**. Este enfoque es fundamental para permitir que el sistema evolucione y se adapte a futuras necesidades.

```
+-----------------+      +------------------------+      +----------------+
|  Frontend       |      |  Backend (API REST)    |      |  Base de Datos |
|  (React SPA)    |<---->|  (Laravel)             |<---->|  (MySQL)       |
+-----------------+      +------------------------+      +----------------+
       ^                         |                         ^
       |                         |                         | (Cache/Colas)
       |                         v                         v
       +-------------------------+                       +----------------+
       |  Usuario (Cliente, Mozo, Admin)                  |  Redis         |
       +--------------------------------------------------+----------------+
```

Esta arquitectura se fundamenta en los siguientes **principios de diseño**:

*   **Desacoplamiento:** El frontend (React) y el backend (Laravel) son aplicaciones independientes que se comunican a través de una API REST bien definida. Esto permite que los equipos de desarrollo trabajen en paralelo y que cada componente escale de forma independiente según la demanda.

*   **Separación de Responsabilidades (SoC):** Cada componente tiene un propósito claro. React maneja la vista y la interacción; Laravel, la lógica de negocio y el acceso a datos; MySQL, la persistencia transaccional; y Redis, el cache y las tareas asíncronas.

*   **Escalabilidad Horizontal:** La arquitectura está diseñada para escalar añadiendo más instancias (contenedores) de cada servicio, especialmente del backend, para soportar picos de demanda sin degradar el rendimiento.

*   **Observabilidad:** El sistema se construirá con logging estructurado y métricas de rendimiento desde el inicio, permitiendo un monitoreo proactivo y una rápida depuración de problemas.

---

## **2. Roles de Usuario y Matriz de Permisos**

El sistema define tres roles principales, cada uno con un conjunto específico de permisos para garantizar la seguridad y la correcta separación de funciones.

### **2.1. Cliente**

*   **Objetivo Principal:** Realizar un pedido de forma autónoma y eficiente.
*   **Funcionalidades Clave:** Navegar el menú, gestionar el carrito, realizar el pago, ver el estado de sus pedidos en tiempo real y consultar su historial. Puede operar como invitado o usuario registrado.
*   **Restricciones Notables:** Solo puede ver y gestionar sus propias órdenes. No tiene acceso a paneles de gestión.

### **2.2. Mozo**

*   **Objetivo Principal:** Entregar los pedidos listos a los clientes, asegurando un flujo operativo rápido.
*   **Funcionalidades Clave:** Visualizar la cola de órdenes activas (estados "en preparación" y "listo") y actualizar el estado de una orden a "entregado".
*   **Restricciones Notables:** No puede modificar el contenido de un pedido, precios, ni el catálogo.

### **2.3. Administrador**

*   **Objetivo Principal:** Mantener el catálogo de productos y la configuración del sistema actualizados.
*   **Funcionalidades Clave:** Gestión completa (Crear, Leer, Actualizar, Eliminar) de categorías y artículos del menú.
*   **Restricciones Notables:** No puede realizar pedidos o pagos en nombre de un cliente, garantizando la separación de deberes.

---

## **3. Componente Frontend (React)**

### **3.1. Rol y Responsabilidades**

El frontend será una **Aplicación de Página Única (SPA)** construida con React. Su principal responsabilidad es ofrecer una experiencia de usuario fluida, interactiva y en tiempo real, actuando como el centro interactivo del restaurante.

### **3.2. Ecosistema de Desarrollo y Justificación**

La selección de tecnologías para el frontend se ha realizado buscando un equilibrio entre modernidad, rendimiento y productividad del desarrollador.

*   **Framework/UI:** **React 18+**. Elegido por su vasto ecosistema, su modelo de componentes reutilizables y su alto rendimiento.
*   **Enrutamiento:** **`react-router-dom`**. Es el estándar de la industria para gestionar las rutas en aplicaciones React, permitiendo proteger el acceso a ciertas vistas según el rol del usuario.
*   **Gestión de Estado del Servidor:** **`React Query`** (TanStack Query). Se utilizará para manejar el fetching, cacheo, e invalidación de datos de la API. Su uso reduce drásticamente la cantidad de código manual necesario para la gestión de datos asíncronos y mejora la UX al presentar datos cacheados mientras se actualizan en segundo plano.
*   **Gestión de Estado Global:** **`Zustand`**. Para estados globales ligeros como la sesión del usuario o el contenido del carrito, Zustand ofrece una API simple y un rendimiento excelente sin el boilerplate de otras soluciones.
*   **Peticiones HTTP:** **`axios`**. Se configurará con interceptores para adjuntar tokens de autenticación y gestionar errores de forma centralizada, manteniendo el código de los componentes limpio.
*   **Formularios y Validación:** **`React Hook Form`** con **`Zod`**. Esta combinación permite construir formularios de alto rendimiento con validación de esquemas tanto en el cliente como en el servidor, garantizando la integridad de los datos.
*   **Estilos:** **`Tailwind CSS`** y **`shadcn/ui`**. Proporcionan un sistema de diseño basado en utilidades que acelera el desarrollo de interfaces modernas, personalizables y responsivas.
*   **Tiempo Real:** **`Socket.IO`** o **`Server-Sent Events (SSE)`**. Para recibir actualizaciones instantáneas del backend, asegurando que la información (como el estado de un pedido) esté siempre actualizada.

### **3.3. Flujo de Interacción del Cliente**

1.  El cliente accede al kiosko y visualiza el **menú interactivo**.
2.  Navega por las categorías, selecciona productos y los añade al **carrito**.
3.  Procede al checkout, donde confirma su pedido y es redirigido a la pasarela de pago.
4.  Una vez completado el pago, es devuelto a la aplicación y puede ver su orden en la sección **"Mis Pedidos"** con el estado "en preparación".
5.  El estado de su pedido se actualizará en tiempo real en su pantalla sin necesidad de recargar la página.

---

## **4. Componente Backend (API Laravel)**

### **4.1. Rol y Responsabilidades**

El backend, construido en Laravel, es el núcleo lógico y de seguridad del sistema. Su función es servir como una API RESTful que centraliza toda la inteligencia de negocio.

### **4.2. Lógica de Negocio y Flujos Críticos**

*   **Máquina de Estados de Pedidos:** La API impondrá transiciones de estado estrictas para las órdenes (`recibido` -> `en_preparación` -> `listo` -> `entregado`). Cualquier intento de transición inválida será rechazado. Cada cambio de estado generará un evento que se emitirá al frontend.
*   **Procesamiento de Pagos Idempotente:** La creación de pagos y la confirmación a través de webhooks se diseñarán para ser idempotentes. Utilizando un `Idempotency-Key` en las cabeceras, se evitará la duplicación de pagos incluso si la pasarela de pago reintenta una notificación.
*   **Cacheo de Catálogo:** El menú y las categorías se cachearán en Redis para acelerar los tiempos de respuesta. Cualquier modificación en el catálogo por parte de un administrador invalidará automáticamente el caché correspondiente.

### **4.3. Contrato de la API: Endpoints Detallados**

| Método | URL                               | Descripción                                               | Rol Requerido |
| :----- | :-------------------------------- | :-------------------------------------------------------- | :------------ |
| POST   | `/api/auth/login`                 | Iniciar sesión de usuario.                                | Todos         |
| GET    | `/api/categories`                 | Listar todas las categorías del menú (cacheado).          | Todos         |
| GET    | `/api/items?category_id={id}`     | Listar artículos de una categoría (cacheado).             | Todos         |
| POST   | `/api/orders`                     | Crear una nueva orden a partir del carrito.               | Cliente       |
| GET    | `/api/orders/mine`                | Obtener las órdenes activas del cliente actual.           | Cliente       |
| GET    | `/api/orders/active`              | Obtener todas las órdenes activas para la operativa.      | Mozo          |
| POST   | `/api/orders/{id}/status`         | Actualizar el estado de una orden.                        | Mozo          |
| POST   | `/api/payments/intents`           | Crear un intento de pago para una orden.                  | Cliente       |
| POST   | `/api/payments/webhook`           | Webhook para recibir confirmaciones de la pasarela de pago. | Sistema       |
| POST   | `/api/admin/categories`           | Crear una nueva categoría (invalida caché).               | Admin         |
| PUT    | `/api/admin/items/{id}`           | Actualizar un artículo existente (invalida caché).        | Admin         |

---

## **5. Persistencia de Datos (MySQL y Redis)**

### **5.1. Base de Datos Relacional: MySQL**

Se utilizará MySQL para todos los datos que requieran consistencia transaccional (ACID), como órdenes y pagos. El uso del ORM Eloquent facilitará las interacciones y la definición de relaciones.

*   **Relaciones Notables:**
    *   `users` (1) -> (N) `orders`
    *   `orders` (1) -> (N) `order_items`
    *   `categories` (1) -> (N) `items`

### **5.2. Caché y Colas: Redis**

Redis cumplirá dos funciones clave para el rendimiento y la escalabilidad del sistema:

1.  **Caché:** Almacenará datos de lectura frecuente, como el catálogo de productos, para reducir la carga sobre MySQL y acelerar las respuestas de la API.
2.  **Colas (Queues):** Procesará trabajos en segundo plano (ej. enviar notificaciones por correo o push) sin bloquear la respuesta al usuario, mejorando la percepción de velocidad.

---

## **6. Estrategia de Calidad y Testing**

### **6.1. Enfoque de Pirámide de Pruebas**

Se adoptará un enfoque de pirámide de pruebas para maximizar la confianza y minimizar los costos de mantenimiento. Este enfoque distribuye el esfuerzo de testing de manera eficiente.

```
      / \
     /E2E\
    /-----\
   / Integr\
  /---------\
 / Unitarias \
/-------------\
```

### **6.2. Tipos de Pruebas y Herramientas**

*   **Pruebas Unitarias (Base de la pirámide):**
    *   **Backend (Pest/PHPUnit):** Probarán clases de servicio, reglas de validación y lógica de negocio pura de forma aislada. Son rápidas y baratas de ejecutar.
    *   **Frontend (Vitest & RTL):** Validarán componentes de UI en aislamiento, hooks personalizados y funciones de formato.

*   **Pruebas de Integración (Capa media):**
    *   **Backend:** Probarán que los controladores interactúan correctamente con los servicios y la base de datos (usando una BD de pruebas). Son cruciales para validar la lógica de los endpoints, la idempotencia de los pagos y las políticas de autorización.

*   **Pruebas End-to-End (E2E) (Cima de la pirámide):**
    *   **Playwright:** Se escribirán pocas pruebas E2E, pero de alto valor, que simulen los flujos de usuario más críticos de punta a punta en un navegador real.
    *   **Flujos Críticos a Cubrir:**
        1.  Un cliente crea un pedido, paga y ve su estado actualizarse en tiempo real.
        2.  Un mozo marca un pedido como "entregado".
        3.  Un administrador añade un nuevo producto y este aparece en el menú del cliente.

---

## **7. Despliegue (CI/CD) y Arquitectura de Hosting**

### **7.1. Entorno de Hosting On-Premise**

La aplicación se desplegará en un entorno **on-premise** sobre una infraestructura de virtualización (ej. Proxmox), utilizando **Docker** para la contenerización de servicios y **Docker Compose** para la orquestación.

*   **Componentes Dockerizados:**
    1.  **Reverse Proxy (Nginx):** Punto de entrada único que gestiona SSL/TLS y enruta el tráfico a los servicios de frontend y backend.
    2.  **Servicios de Aplicación:** Contenedores separados para el frontend (sirviendo archivos estáticos) y el backend (PHP-FPM).
    3.  **Servicios de Datos:** Contenedores para MySQL y Redis.

### **7.2. Pipeline de Integración y Despliegue Continuo (GitLab CI/CD)**

Se configurará un pipeline automatizado que, en cada `push` a las ramas `develop` (para staging) o `main` (para producción), ejecutará los siguientes pasos:

1.  **Trigger:** `git push` a la rama correspondiente.
2.  **Jobs:**
    *   `lint & test`: Ejecuta linters y todas las pruebas automatizadas.
    *   `build`: Compila el frontend y construye las imágenes de Docker.
    *   `publish`: Sube las imágenes a un registro de contenedores privado.
    *   `deploy`: Se conecta por SSH al servidor de destino y ejecuta `docker-compose up -d` para desplegar la nueva versión sin tiempo de inactividad.

---

## **8. Estrategia de Seguridad en Profundidad**

### **8.1. Autenticación y Gestión de Sesiones**

Se usará **Laravel Sanctum** con **cookies HttpOnly y protección CSRF**, el estándar de oro para la seguridad de sesiones en SPAs, ya que previene el acceso a los tokens de sesión mediante JavaScript (ataques XSS).

### **8.2. Autorización y Control de Acceso (RBAC)**

El backend validará estrictamente el rol del usuario en cada endpoint protegido mediante **Policies y Gates de Laravel**, asegurando que un usuario solo pueda realizar las acciones permitidas para su rol.

### **8.3. Validación de Entradas y Prevención de Ataques**

Todos los datos provenientes del cliente serán validados en el backend usando **Form Requests**. Esto previene ataques de inyección (SQLi, XSS). Es crítico que el backend siempre recalcule los totales de los pedidos y nunca confíe en los montos enviados por el cliente.

### **8.4. Seguridad a Nivel de Infraestructura**

*   **Imágenes de Docker Mínimas:** Se construirán sobre bases mínimas (ej. Alpine) y se ejecutarán con usuarios no-root para reducir la superficie de ataque.
*   **Gestión de Secretos:** Las credenciales y claves se gestionarán a través de **Docker Secrets** o variables de entorno seguras, nunca se incluirán en el código fuente.
*   **Aislamiento de Red:** La base de datos no será accesible desde el exterior de la red privada de Docker, solo el backend podrá comunicarse con ella.
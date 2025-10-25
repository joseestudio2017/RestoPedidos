import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Stack,
  Avatar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import PeopleIcon from '@mui/icons-material/People';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import WebIcon from '@mui/icons-material/Web';
import ApiIcon from '@mui/icons-material/Api';
import ScienceIcon from '@mui/icons-material/Science';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StorageIcon from '@mui/icons-material/Storage';
import DnsIcon from '@mui/icons-material/Dns';
import DevicesIcon from '@mui/icons-material/Devices';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

// --- Reusable Components for Diagrams ---
const Section = ({ icon, title, children, defaultExpanded = false }) => (
  <Accordion sx={{ mb: 2, '&.Mui-expanded': { mb: 2 }, boxShadow: 3, '&:before': { display: 'none' } }} defaultExpanded={defaultExpanded}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: 'grey.100', '&:hover': { bgcolor: 'grey.200' } }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {icon}
        <Typography variant="h5" component="h2" sx={{ ml: 2, fontWeight: 600 }}>{title}</Typography>
      </Box>
    </AccordionSummary>
    <AccordionDetails sx={{ bgcolor: 'white', p: { xs: 2, md: 4 } }}>{children}</AccordionDetails>
  </Accordion>
);

const CodeBlock = ({ children }) => (
    <Paper elevation={0} variant="outlined" sx={{ p: 2, my: 2, backgroundColor: '#2d2d2d', color: '#f5f5f5', overflowX: 'auto', fontFamily: "'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace" }}>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}><code>{children}</code></pre>
    </Paper>
  );

const DiagramBox = ({ children, title }) => (
  <Paper variant="outlined" sx={{ p: 3, my: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
    <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{title}</Typography>
    <Divider sx={{ mb: 3 }} />
    {children}
  </Paper>
);

const DiagramNode = ({ icon, title, subtitle, color = 'primary', variant = 'filled' }) => (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', bgcolor: variant === 'filled' ? `${color}.light` : 'transparent', border: variant === 'outlined' ? `2px solid` : 'none', borderColor: `${color}.main` }}>
        {icon}
        <Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="caption" display="block">{subtitle}</Typography>
    </Paper>
);

const Arrow = ({ direction = 'down', label = '' }) => (
    <Stack alignItems="center" my={1}>
        {label && <Chip label={label} size="small" sx={{mb: 1, bgcolor: '#e0e0e0'}}/>}
        {direction === 'down' ? <ArrowDownwardIcon color="action" /> : <ArrowForwardIcon color="action" />}
    </Stack>
);


// --- Specific Diagrams ---
const ArchitectureDiagram = () => (
    <DiagramBox title="Diagrama de Arquitectura C4 (Nivel 2: Contenedores)">
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={5}>
                <DiagramNode icon={<DevicesIcon fontSize="large"/>} title="Cliente Web (SPA)" subtitle="Contenedor Docker (Nginx)" color="secondary"/>
            </Grid>
            <Grid item xs={12} md={2}><Arrow label="HTTPS/REST & WebSocket"/></Grid>
            <Grid item xs={12} md={5}>
                <DiagramNode icon={<DnsIcon fontSize="large"/>} title="API Gateway" subtitle="Contenedor Docker (Node.js)" color="primary"/>
            </Grid>
            <Grid item xs={12}><Arrow label="Enruta a Microservicios"/></Grid>
            <Grid item xs={12}>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default'}}>
                    <Typography align="center" variant="overline">Microservices Layer</Typography>
                    <Grid container spacing={2} justifyContent="center" sx={{mt: 1}}>
                        <Grid item xs={4}><DiagramNode title="Auth" subtitle="Node.js" color="success" variant="outlined"/></Grid>
                        <Grid item xs={4}><DiagramNode title="Orders" subtitle="Node.js" color="success" variant="outlined"/></Grid>
                        <Grid item xs={4}><DiagramNode title="Menu" subtitle="Node.js" color="success" variant="outlined"/></Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}><Arrow label="Acceso a Datos" /></Grid>
            <Grid item xs={12}>
                 <Grid container spacing={2}>
                    <Grid item xs={6}><DiagramNode icon={<StorageIcon/>} title="Base de Datos Principal" subtitle="PostgreSQL" color="warning"/></Grid>
                    <Grid item xs={6}><DiagramNode icon={<StorageIcon/>} title="Caché de Sesiones" subtitle="Redis" color="warning"/></Grid>
                 </Grid>
            </Grid>
        </Grid>
    </DiagramBox>
);

const CiCdDiagram = () => (
    <DiagramBox title="Diagrama de Pipeline CI/CD (GitHub Actions)">
        <Stack direction={{xs: 'column', md: 'row'}} spacing={2} justifyContent="space-between" alignItems="center">
            <DiagramNode icon={<CodeIcon/>} title="1. Git Push" subtitle="Desarrollador empuja código a GitHub" color="info"/>
            <Arrow direction="right"/>
            <DiagramNode icon={<BuildIcon/>} title="2. Build & Test" subtitle="Workflow se activa: instala, linta, testea" color="warning"/>
            <Arrow direction="right"/>
            <DiagramNode icon={<DnsIcon/>} title="3. Build & Push Image" subtitle="Crea imagen Docker y la sube a un Registry" color="secondary"/>
            <Arrow direction="right"/>
            <DiagramNode icon={<RocketLaunchIcon/>} title="4. Deploy" subtitle="Actualiza el servicio en Kubernetes (K8s)" color="success"/>
        </Stack>
    </DiagramBox>
);

const AuthFlowDiagram = () => (
    <DiagramBox title="Diagrama de Flujo de Autenticación JWT">
        <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={4} sx={{textAlign: 'center'}}><Typography variant="button">Cliente</Typography></Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}><Typography variant="button">API Gateway</Typography></Grid>
            <Grid item xs={4} sx={{textAlign: 'center'}}><Typography variant="button">Auth Service</Typography></Grid>

            <Grid item xs={12}><Arrow label="1. POST /login (user, pass)" direction="right"/></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}><Arrow label="2. Valida credenciales" direction="right"/></Grid>
            <Grid item xs={8}></Grid>
            <Grid item xs={4}><Chip label="3. Crea JWT" color="success" sx={{width: '100%'}}/></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}><Arrow label="4. Retorna JWT al cliente" direction="left"/></Grid>
            
            <Grid item xs={12}><Divider sx={{my:2}}>Peticiones posteriores</Divider></Grid>

            <Grid item xs={12}><Arrow label="5. GET /orders (Header: Bearer JWT)" direction="right"/></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}><Chip label="6. Valida JWT" color="secondary" sx={{width: '100%'}}/></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={8}><Arrow label="7. Proxy a Order Service" direction="right"/></Grid>
        </Grid>
    </DiagramBox>
)

// --- Main Component ---
const TP = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 800 }}>Documento Técnico: RestoPedidos</Typography>
        <Typography variant="h5" color="text.secondary">Visión Profunda de la Arquitectura, Diseño y Estrategia del Proyecto.</Typography>
      </Box>

      <Section icon={<ArticleIcon color="primary" />} title="1. Problema y Solución" defaultExpanded>
          <Typography variant="h6">El Escenario: La Fricción en la Restauración Tradicional</Typography>
          <Typography paragraph>En un restaurante convencional, el flujo de operaciones es inherentemente propenso a errores y demoras. Un cliente que espera para ser atendido, un mozo que anota mal un pedido complejo bajo presión, una cocina que recibe comandas en papel con letra ilegible y un gerente que intenta hacer cuentas al final del día con un fajo de tickets, son postales de una ineficiencia sistémica. Este modelo no solo degrada la experiencia del cliente, sino que genera estrés en el personal y pérdidas económicas por errores y lentitud.</Typography>
          <Typography variant="h6">La Solución Estratégica: RestoPedidos</Typography>
          <Typography paragraph>RestoPedidos no es solo una app, es un ecosistema digital que reimagina el flujo de trabajo de un restaurante. Atacamos la raíz del problema digitalizando cada interacción y centralizando la información en una única fuente de verdad, accesible en tiempo real por todos los actores involucrados. Para el cliente, es la autonomía de pedir sin esperas. Para el mozo, es la certeza de un pedido sin errores. Para la cocina, es la claridad de una comanda digital. Y para el gerente, es el poder de la data para tomar decisiones inteligentes.</Typography>
      </Section>

      <Section icon={<PeopleIcon color="primary" />} title="2. Perfiles de Usuario y Objetivos">
          <Typography paragraph>Cada perfil de usuario ha sido diseñado para resolver necesidades específicas dentro del ecosistema del restaurante.</Typography>
          <List>
              <ListItem><ListItemText primary="El Cliente Moderno" secondary="Busca eficiencia y control. Su objetivo es explorar el menú visualmente, personalizar su pedido y pagar sin tener que esperar por un mozo. Valora la rapidez y la ausencia de errores." /></ListItem>
              <ListItem><ListItemText primary="El Mozo Eficiente" secondary="Es el director de orquesta de sus mesas. Su objetivo es maximizar la rotación y la satisfacción del cliente. Usa RestoPedidos para tomar pedidos complejos rápidamente, enviar notas a cocina (ej. 'sin cebolla') y gestionar el estado de múltiples mesas desde su tablet, liberándolo de la carga de la transcripción manual." /></ListItem>
              <ListItem><ListItemText primary="El Chef Organizado" secondary="Necesita claridad y orden en el caos de la cocina. Su objetivo es ver un flujo constante y priorizado de pedidos en una pantalla, marcar los platos como 'En preparación' o 'Listo para servir' con un toque, y asegurar que nada se pierda o retrase. La comunicación con los mozos se vuelve asíncrona y sin ambigüedades." /></ListItem>
              <ListItem><ListItemText primary="El Administrador Estratega" secondary="Tiene la visión global del negocio. Su objetivo es ir más allá de la operación diaria. Utiliza el panel de administración para actualizar el menú y los precios al instante, gestionar los roles del personal y, lo más importante, analizar reportes de ventas: ¿cuál es el plato más vendido? ¿cuáles son las horas pico? Estos datos son cruciales para la toma de decisiones estratégicas." /></ListItem>
          </List>
      </Section>
      
      <Section icon={<ArchitectureIcon color="primary" />} title="3. Arquitectura del Sistema">
        <Typography paragraph>Hemos optado por una arquitectura de microservicios contenerizados y orquestados con Kubernetes. Esta decisión, aunque implica una mayor complejidad inicial, nos brinda una escalabilidad, resiliencia y flexibilidad inmensas a largo plazo. Cada parte del sistema puede crecer, fallar y ser actualizada de forma independiente.</Typography>
        <ArchitectureDiagram/>
        <Typography variant="h6">Justificación Tecnológica</Typography>
        <Typography paragraph><strong>React con Vite:</strong> Para el frontend, la velocidad de desarrollo es clave. El HMR (Hot Module Replacement) de Vite es casi instantáneo, lo que permite un ciclo de feedback rapidísimo. React, por su parte, ofrece un ecosistema maduro y un modelo de componentización que facilita la creación de UIs complejas y reutilizables.</Typography>
        <Typography paragraph><strong>Node.js para Microservicios:</strong> La naturaleza asíncrona y no bloqueante de Node.js es ideal para los servicios de backend, que son en su mayoría operaciones de I/O (Input/Output) intensivas (peticiones a la base de datos, llamadas a otras APIs). Esto nos permite manejar un gran número de conexiones concurrentes con un bajo consumo de recursos.</Typography>
        <Typography paragraph><strong>Kubernetes (K8s) como Orquestador:</strong> Mientras que Docker nos permite 'empaquetar' nuestros servicios, Kubernetes nos permite 'gestionarlos' a escala. K8s se encarga del auto-escalado (creando más instancias de un servicio si la demanda sube), del self-healing (reemplazando automáticamente contenedores que fallan) y de los despliegues sin tiempo de inactividad (blue-green deployments, canary releases).</Typography>
        <Typography paragraph><strong>PostgreSQL como Base de Datos:</strong> La naturaleza de nuestros datos (usuarios, pedidos, productos, menús) es inherentemente relacional. Un pedido pertenece a un usuario, contiene productos, etc. PostgreSQL es una base de datos relacional open-source extremadamente robusta, potente y con soporte para funcionalidades avanzadas como JSONB, lo que nos da flexibilidad si la necesitamos.</Typography>
        <CiCdDiagram/>
      </Section>

      <Section icon={<WebIcon color="primary" />} title="4. Diseño del Frontend">
        <Typography paragraph>La interfaz de usuario es una Single-Page Application (SPA) para ofrecer una experiencia fluida y similar a la de una aplicación nativa. No hay recargas de página completas; solo se actualizan los componentes necesarios.</Typography>
        <DiagramBox title="Diagrama de Componentes Principales">
           <Typography sx={{textAlign: 'center'}}><code>App.jsx</code> (Router, Providers)</Typography>
           <Stack direction="row" justifyContent="center"><Arrow/></Stack>
           <Paper sx={{p:2}}><Typography sx={{textAlign: 'center'}}><code>Header.jsx</code> (Navegación, Botón Carrito)</Typography></Paper>
           <Stack direction="row" justifyContent="center"><Arrow/></Stack>
           <Grid container spacing={2}>
                <Grid item xs={4}><Paper variant="outlined" sx={{p:1, textAlign:'center'}}><code>/menu</code><br/>(Menu.jsx)</Paper></Grid>
                <Grid item xs={4}><Paper variant="outlined" sx={{p:1, textAlign:'center'}}><code>/cart</code><br/>(Cart.jsx)</Paper></Grid>
                <Grid item xs={4}><Paper variant="outlined" sx={{p:1, textAlign:'center'}}><code>/profile</code><br/>(Profile.jsx)</Paper></Grid>
           </Grid>
        </DiagramBox>
        <Typography variant="h6">Estrategia de Manejo de Estado</Typography>
        <Typography paragraph>Utilizamos el Context API de React como solución principal. Se crean 'Proveedores' de contexto para gestionar estados globales pero acotados, como `MenuContext` (para la lista de productos), `CartContext` (para el carrito de compras) y `RoleContext` (para el perfil del usuario). Este enfoque evita el 'prop-drilling' sin introducir la complejidad de una librería externa para el estado actual de la aplicación. Si la complejidad creciera, el siguiente paso sería migrar a una librería como Zustand, por su simplicidad y mínima sobrecarga.</Typography>
      </Section>

      <Section icon={<ApiIcon color="primary" />} title="5. Diseño del Backend">
        <Typography paragraph>La API es el corazón de nuestro sistema. Se ha diseñado siguiendo los principios RESTful para que sea predecible, estándar y fácil de consumir tanto por nuestro frontend como por posibles clientes futuros (ej. una app nativa).</Typography>
        <CodeBlock>{`// Ejemplo de estructura de un endpoint de pedidos
// GET /api/v1/orders/:id

// --- Capa de Ruta (Express) ---
// routes/orders.js
router.get('/:id', authMiddleware, OrdersController.getById);

// --- Capa de Controlador ---
// controllers/OrdersController.js
async getById(req, res) {
  const order = await OrdersService.find(req.params.id);
  res.json(order);
}

// --- Capa de Servicio ---
// services/OrdersService.js
async find(orderId) {
  // Lógica de negocio (ej. verificar permisos)
  return OrdersRepository.getById(orderId);
}

// --- Capa de Repositorio ---
// repositories/OrdersRepository.js
async getById(id) {
  // Lógica de acceso a datos (ej. consulta SQL)
  return db.query('SELECT * FROM orders WHERE id = $1', [id]);
}`}</CodeBlock>
        <Typography variant="h6">Principios de Diseño</Typography>
        <Typography paragraph><strong>Patrón Controller-Service-Repository:</strong> Como se ve en el ejemplo, separamos estrictamente las responsabilidades. El Controlador maneja la petición y respuesta HTTP. El Servicio orquesta la lógica de negocio. El Repositorio se encarga exclusivamente de la comunicación con la base de datos. Esto hace el código más testeable, mantenible y fácil de razonar.</Typography>
        <Typography paragraph><strong>API Gateway:</strong> Ningún cliente externo habla directamente con los microservicios. Todas las peticiones pasan a través de un API Gateway, que actúa como un portero. Es responsable de la autenticación, el enrutamiento de la petición al microservicio correcto, y puede manejar otras tareas transversales como el rate limiting y el logging centralizado.</Typography>
      </Section>

       <Section icon={<ScienceIcon color="primary" />} title="6. Estrategia de Testing">
        <Typography paragraph>Nuestra filosofía es: "Testea el código que escribes, no el framework que usas". Aplicamos la pirámide de testing para obtener el máximo retorno de inversión en nuestros esfuerzos de calidad.</Typography>
        <DiagramBox title="Pirámide de Testing">
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
            <svg width="300" height="200" viewBox="0 0 100 80">
                <polygon points="50,0 100,80 0,80" style={{fill: '#ffcdd2'}} />
                <polygon points="50,40 80,80 20,80" style={{fill: '#a5d6a7'}} />
                <polygon points="50,60 65,80 35,80" style={{fill: '#90caf9'}} />
                <text x="50" y="25" textAnchor="middle" fontSize="8">E2E (Cypress)</text>
                <text x="50" y="55" textAnchor="middle" fontSize="7">Integración (Vitest)</text>
                <text x="50" y="75" textAnchor="middle" fontSize="6">Unitarios (Vitest)</text>
            </svg>
            </Box>
        </DiagramBox>
        <Typography variant="h6">Detalle de Capas</Typography>
        <Typography paragraph><strong>Tests Unitarios (~70%):</strong> Son rápidos y baratos. Verifican que una única función o componente de React se comporte como se espera en aislamiento. Usamos Vitest por su velocidad y compatibilidad con el ecosistema de Vite. Ejemplo: `const result = sum(2, 3); expect(result).toBe(5);`.</Typography>
        <Typography paragraph><strong>Tests de Integración (~20%):</strong> Verifican que varias unidades trabajen juntas correctamente. Ejemplo: testear que un controlador de backend, al ser llamado, interactúa correctamente con la capa de servicio y devuelve el código de estado esperado. Usamos Vitest con `supertest` para simular peticiones HTTP.</Typography>
        <Typography paragraph><strong>Tests End-to-End (E2E) (~10%):</strong> Son los más lentos y costosos, pero los más valiosos. Simulan un flujo de usuario real en un navegador. Usamos Cypress para esto. Ejemplo: un script que abre la página, se loguea, añade un producto al carrito y verifica que el total sea correcto. Estos tests nos dan la máxima confianza de que la aplicación funciona como un todo.</Typography>
      </Section>

      <Section icon={<SecurityIcon color="primary" />} title="7. Seguridad">
        <Typography paragraph>La seguridad no es una característica, sino un requisito fundamental integrado en cada capa de la aplicación.</Typography>
        <AuthFlowDiagram/>
        <Typography variant="h6">Defensa en Profundidad</Typography>
        <List dense>
            <ListItem><ListItemText primary="Autenticación y Autorización con JWT" secondary="El flujo JWT (detallado en el diagrama) nos permite tener un sistema de autenticación sin estado (stateless). El backend no necesita almacenar información de la sesión. Además, el payload del JWT contiene el rol del usuario, permitiendo al API Gateway y a los microservicios tomar decisiones de autorización (ej. solo un 'admin' puede acceder a /admin/users)." /></ListItem>
            <ListItem><ListItemText primary="Prevención de SQL Injection" secondary="Nunca construimos consultas SQL concatenando strings. Utilizamos un ORM (como Prisma) o un query builder (como Knex.js) que utiliza consultas parametrizadas. Esto asegura que cualquier input del usuario es tratado como un valor y no como parte ejecutable de la consulta." /></ListItem>
            <ListItem><ListItemText primary="Prevención de Cross-Site Scripting (XSS)" secondary="React, por defecto, escapa todo el contenido renderizado en JSX, lo que nos protege en gran medida. Adicionalmente, cualquier contenido generado por el usuario que se almacene y se vaya a mostrar se sanitiza en el backend antes de guardarlo en la base de datos." /></ListItem>
            <ListItem><ListItemText primary="Configuración de CORS" secondary="El backend está configurado con una política de CORS (Cross-Origin Resource Sharing) estricta, que solo permite peticiones desde el dominio de nuestro frontend. Esto previene que otras páginas web maliciosas puedan hacer peticiones a nuestra API en nombre de nuestros usuarios." /></ListItem>
        </List>
      </Section>

    </Container>
  );
};

export default TP;

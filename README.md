# TicketPro

TicketPro es una plataforma web para la gestión y venta de entradas para eventos.

El sistema permite a los usuarios registrarse, iniciar sesión, consultar eventos disponibles, comprar entradas y consultar sus tickets.

Además, cuenta con un panel administrativo protegido que permite gestionar eventos, usuarios, roles y visualizar estadísticas de ventas.

## Funcionalidades

### Usuarios

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Consulta del perfil autenticado.
- Visualización de tickets adquiridos.
- Gestión de sesiones.

### Eventos

- Visualización de eventos.
- Creación de eventos desde el panel administrativo.
- Administración de eventos.
- Consulta de información del evento.
- Gestión de disponibilidad de entradas.

### Tickets

- Compra de entradas.
- Registro de compras.
- Consulta de tickets del usuario.
- Visualización de información relacionada con las compras.

### Panel administrativo

El sistema cuenta con un área administrativa protegida mediante autenticación y autorización por roles.

El administrador puede:

- Consultar estadísticas generales.
- Visualizar cantidad de usuarios.
- Visualizar cantidad de eventos.
- Consultar tickets vendidos.
- Consultar ingresos.
- Visualizar el mejor cliente.
- Visualizar el evento más vendido.
- Consultar próximos eventos.
- Consultar últimas compras.
- Gestionar usuarios.
- Cambiar el rol de un usuario.
- Eliminar usuarios.
- Administrar eventos.

### Estadísticas

El panel de estadísticas permite visualizar información relacionada con el comportamiento del sistema mediante gráficos y tablas.

Incluye:

- Eventos creados por mes.
- Ingresos por mes.
- Eventos con mayor cantidad de tickets vendidos.
- Eventos con mayores ingresos.
- Resumen de eventos.

## Seguridad

El backend utiliza autenticación mediante JWT.

Las rutas administrativas están protegidas mediante middleware de autenticación y autorización por rol.

Los administradores no pueden:

- Cambiar su propio rol.
- Eliminar su propia cuenta.

Las contraseñas de los usuarios son almacenadas utilizando hashing mediante bcrypt.

## Arquitectura

El proyecto está dividido en frontend y backend.

### Backend

El backend está desarrollado con:

- Node.js
- Express
- TypeScript
- MongoDB
- JWT
- bcrypt

La estructura del backend utiliza una separación por responsabilidades:

```text
controllers/
services/
repositories/
routes/
middlewares/
interfaces/
config/

Frontend

El frontend está desarrollado con:

Vue 3
TypeScript
Vite
Vue Router
Pinia
Tailwind CSS
Chart.js
vue-chartjs
Axios

El frontend utiliza componentes y vistas separadas para las diferentes funcionalidades del sistema.

Autenticación y autorización

El sistema utiliza JWT para autenticar a los usuarios.

Los usuarios cuentan con roles:

USER
ADMIN

Las funcionalidades administrativas solamente están disponibles para usuarios con rol ADMIN.

Base de datos

El sistema utiliza MongoDB para almacenar información relacionada con:

Usuarios.
Eventos.
Tickets.
Compras.
Variables de entorno

El backend requiere variables de entorno para configurar la conexión a la base de datos y la clave utilizada para JWT.

Ejemplo:

PORT=3000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=tu_clave_secreta

No se deben subir archivos .env reales al repositorio.

Ejecución del proyecto
Backend

Instalar dependencias:

npm install

Configurar las variables de entorno y ejecutar:

npm run dev
Frontend

Instalar dependencias:

npm install

Ejecutar:

npm run dev
Objetivo del proyecto

TicketPro fue desarrollado como una aplicación web completa para practicar e implementar conceptos de desarrollo full-stack, incluyendo autenticación, autorización por roles, gestión de datos, operaciones CRUD, integración con MongoDB, consumo de APIs REST y visualización de estadísticas.

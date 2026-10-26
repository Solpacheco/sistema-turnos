# Sistema de Gestión de Turnos

## Descripción del proyecto

Este proyecto consiste en una API REST para gestionar usuarios y turnos. Permite registrar usuarios, iniciar sesión, consultar y actualizar información, y administrar turnos.

La aplicación está desarrollada con Node.js y Express, utiliza MySQL para almacenar los datos y Sequelize para trabajar con la base de datos. También incluye autenticación mediante JWT y medidas de validación y seguridad.

El proyecto está desplegado en Render y utiliza una base de datos MySQL alojada en Aiven.

## Enlaces

- **Repositorio de GitHub:** https://github.com/Solpacheco/sistema-turnos
- **API desplegada en Render:** https://sistema-turnos-5ti6.onrender.com
- - **Documentación y pruebas de la API (Postman):** [Abrir](https://github.com/Solpacheco/sistema-turnos/blob/main/Sistema%20de%20Gesti%C3%B3n%20de%20Turnos.postman_collection.json)

## Tecnologías utilizadas

- Node.js
- Express
- MySQL
- Sequelize
- bcrypt
- JSON Web Token (JWT)
- dotenv
- CORS
- express-rate-limit
- express-validator

## Requisitos

Para ejecutar el proyecto localmente, es necesario tener instalado Node.js, npm y disponer de una base de datos MySQL.

## Instalación y ejecución

1. Clonar o descargar el repositorio.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Crear un archivo `.env` en la carpeta principal y configurar las variables de entorno necesarias.
5. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   También se puede iniciar con:

   ```bash
   npm start
   ```

La API estará disponible localmente en `http://localhost:3000`.

## Rutas de la API

Todas las rutas principales están organizadas bajo el prefijo `/api`.

### Usuarios y autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/usuarios` | Registrar un usuario con contraseña protegida mediante bcrypt. |
| POST | `/api/usuarios/login` | Iniciar sesión y obtener un token JWT. |
| GET | `/api/usuarios` | Listar usuarios. |
| GET | `/api/usuarios/:id` | Buscar un usuario por su ID. |
| GET | `/api/usuarios/perfil` | Consultar el perfil del usuario autenticado. Requiere token. |
| PUT | `/api/usuarios/:id` | Actualizar los datos de un usuario. |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario. |

### Turnos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/turnos` | Listar turnos. |
| GET | `/api/turnos/:id` | Buscar un turno por su ID. |
| POST | `/api/turnos` | Registrar un turno. |
| PUT | `/api/turnos/:id` | Actualizar los datos o el estado de un turno. |
| DELETE | `/api/turnos/:id` | Eliminar un turno. |

Los turnos incluyen una fecha, un motivo, un estado y la referencia al usuario asociado.

## Ejemplos de uso

### Registrar un usuario

Enviar una solicitud `POST` a `/api/usuarios` con un cuerpo JSON como el siguiente:

```json
{
  "nombre": "Usuario de prueba",
  "email": "usuario@example.com",
  "password": "ClavePrueba123"
}
```

### Iniciar sesión

Enviar una solicitud `POST` a `/api/usuarios/login`:

```json
{
  "email": "usuario@example.com",
  "password": "ClavePrueba123"
}
```

Si las credenciales son correctas, la API devuelve un token JWT.

### Consultar el perfil protegido

Enviar una solicitud `GET` a `/api/usuarios/perfil` incluyendo el token obtenido al iniciar sesión en el encabezado:

```text
Authorization: Bearer TU_TOKEN_JWT
```

El texto `TU_TOKEN_JWT` debe reemplazarse por el token recibido. No se debe publicar ni compartir el token real.

## Validaciones y seguridad

- Las contraseñas se almacenan utilizando bcrypt.
- La autenticación utiliza tokens JWT.
- El perfil protegido requiere un token válido.
- Se validan los datos recibidos y el formato del correo electrónico.
- Se utiliza limitación de solicitudes mediante express-rate-limit.
- Se manejan las rutas inexistentes y los errores de solicitudes con JSON mal formado.
- Las credenciales y otros datos sensibles se configuran mediante variables de entorno.

## Base de datos

El sistema utiliza MySQL y Sequelize para administrar dos entidades principales: usuarios y turnos.

Un usuario puede tener varios turnos asociados y cada turno corresponde a un usuario.

En el entorno local se puede utilizar una base de datos llamada `sistema_turnos`. En producción se utiliza MySQL alojado en Aiven.

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias para la conexión a la base de datos y la autenticación:

- `DB_NAME`: nombre de la base de datos.
- `DB_USER`: usuario de MySQL.
- `DB_PASSWORD`: contraseña de MySQL.
- `DB_HOST`: dirección del servidor de base de datos.
- `DB_PORT`: puerto de MySQL.
- `PORT`: puerto de ejecución de la API.
- `JWT_SECRET`: clave secreta utilizada para firmar y verificar los tokens JWT.

No se publica el contenido del archivo `.env` ni se sube a GitHub. En producción, las variables se configuran desde el entorno de Render.

## Pruebas con Postman

Se realizaron pruebas de las operaciones de usuarios y turnos, incluyendo creación, consulta, actualización y eliminación.

También se probaron el inicio de sesión, la generación del token JWT, el acceso al perfil protegido, las solicitudes sin token y las rutas inexistentes.

La colección de Postman está incluida en el repositorio:

`Sistema de Gestión de Turnos.postman_collection.json`

Se puede importar en Postman para ejecutar las solicitudes de prueba contra la API desplegada.

## Estado del proyecto

La API se encuentra desplegada en Render y conectada a una base de datos MySQL alojada en Aiven. Se realizaron pruebas de las funcionalidades principales y de autenticación.

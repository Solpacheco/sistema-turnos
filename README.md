# Sistema de Gestión de Turnos

## Descripción

Este proyecto consiste en el desarrollo de una API REST para administrar usuarios y turnos. Está realizado con Node.js y Express, y utiliza MySQL para guardar la información, con Sequelize para trabajar con la base de datos.

La API permite realizar las operaciones principales de gestión: registrar información, consultar los datos existentes, modificarlos y eliminarlos.

## Herramientas y tecnologías

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

## Requisitos para ejecutar el proyecto

Para utilizar la aplicación es necesario tener instalado Node.js, npm y MySQL.

## Cómo iniciar el proyecto

1. Descargar o clonar el repositorio.

2. Abrir una terminal en la carpeta del proyecto.

3. Instalar las dependencias con el comando:

   `npm install`

4. Crear un archivo `.env` en la carpeta principal y configurar los datos necesarios para la conexión con MySQL.

5. Iniciar el servidor en modo desarrollo:

   `npm run dev`

   También se puede iniciar con `npm start`.

## Endpoints disponibles

### Gestión de usuarios

La API cuenta con las siguientes rutas para trabajar con usuarios:

- `GET /api/usuarios`: obtener todos los usuarios.
- `GET /api/usuarios/:id`: buscar un usuario por su identificador.
- `POST /api/usuarios`: registrar un usuario.
- `PUT /api/usuarios/:id`: modificar los datos de un usuario.
- `DELETE /api/usuarios/:id`: eliminar un usuario.

### Gestión de turnos

Las rutas destinadas a la administración de turnos son:

- `GET /api/turnos`: consultar todos los turnos.
- `GET /api/turnos/:id`: consultar un turno específico.
- `POST /api/turnos`: crear un nuevo turno.
- `PUT /api/turnos/:id`: actualizar los datos o el estado de un turno.
- `DELETE /api/turnos/:id`: eliminar un turno.

## Ejecución

Una vez iniciado el servidor, se puede acceder a la API desde:

`http://localhost:3000`

La ruta principal permite comprobar que el servicio se encuentra en funcionamiento.

## Base de datos

La aplicación utiliza una base de datos MySQL llamada `sistema_turnos`, en la que se almacena la información correspondiente a los usuarios y sus turnos.






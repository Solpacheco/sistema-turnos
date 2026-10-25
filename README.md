# Sistema de Gestión de Turnos

## Descripción del proyecto

El objetivo de este proyecto es desarrollar una API REST que permita gestionar usuarios y turnos de manera organizada. Para su desarrollo se utilizaron Node.js y Express, junto con MySQL y Sequelize para almacenar y administrar datos.

La API permite realizar distintas operaciones: registrar usuarios, consultar información, actualizar datos y gestionar turnos. El proyecto se encuentra publicado en Render y utiliza una base de datos MySQL alojada en Aiven.

## Tecnologías utilizadas

Para desarrollar la aplicación se utilizaron las siguientes herramientas y tecnologías:

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

## Enlaces

- **Repositorio de GitHub:** https://github.com/Solpacheco/sistema-turnos
- **API desplegada en Render:** https://sistema-turnos-5ti6.onrender.com

## Requisitos

Para ejecutar el proyecto de manera local, es necesario tener Node.js, npm y una base de datos MySQL.

## Instalación y ejecución

Para poner en funcionamiento la aplicación, se deben seguir estos pasos:

1. Descargar o clonar el repositorio.
2. Abrir una terminal dentro de la carpeta del proyecto.
3. Instalar las dependencias ejecutando el comando:

   `npm install`

4. Crear un archivo `.env` en la carpeta principal y configurar las variables necesarias para la conexión con la base de datos y la autenticación.
5. Iniciar el servidor en modo desarrollo con:

   `npm run dev`

   También se puede iniciar mediante el comando `npm start`.

## Rutas de la API

### Usuarios

La API permite realizar las siguientes operaciones sobre los usuarios:

- `GET /api/usuarios`: muestra el listado de usuarios.
- `GET /api/usuarios/:id`: permite consultar un usuario por su ID.
- `POST /api/usuarios`: registra un nuevo usuario.
- `PUT /api/usuarios/:id`: actualiza los datos de un usuario.
- `DELETE /api/usuarios/:id`: elimina un usuario.

### Turnos

Para administrar los turnos, se encuentran disponibles las siguientes rutas:

- `GET /api/turnos`: muestra todos los turnos registrados.
- `GET /api/turnos/:id`: permite consultar un turno específico.
- `POST /api/turnos`: registra un nuevo turno.
- `PUT /api/turnos/:id`: permite modificar los datos o el estado de un turno.
- `DELETE /api/turnos/:id`: elimina un turno.

## Acceso a la aplicación

Cuando el servidor se ejecuta localmente, se puede acceder a la API desde:

`http://localhost:3000`

La ruta principal permite verificar que el servicio se encuentra activo.

También se puede acceder a la versión publicada en Render mediante el siguiente enlace:

https://sistema-turnos-5ti6.onrender.com

## Base de datos

Para almacenar la información, el proyecto utiliza MySQL y Sequelize. La base de datos permite trabajar con dos entidades principales: usuarios y turnos.

Durante el desarrollo local se puede utilizar una base de datos llamada `sistema_turnos`, mientras que en producción se utiliza MySQL alojado en Aiven.

Los datos de conexión y las credenciales se configuran mediante variables de entorno, evitando incluir información sensible en el repositorio.

## Pruebas con Postman

Se realizaron pruebas de las operaciones CRUD de usuarios y turnos: listar, buscar por ID, crear, actualizar y eliminar registros para comprobar el funcionamiento de la API

También se verificó que la API responda correctamente cuando se busca un usuario o turno que no existe.

La colección de Postman está incluida en el repositorio y nos permite ejecutar las solicitudes de prueba.

**Archivo:** `Sistema de Gestión de Turnos.postman_collection.json`

## Variables de entorno

El proyecto utiliza un archivo `.env` para configurar la conexión con la base de datos y el puerto del servidor.

Las variables necesarias son:

- `DB_NAME`: nombre de la base de datos.
- `DB_USER`: usuario de MySQL.
- `DB_PASSWORD`: contraseña de MySQL.
- `DB_HOST`: dirección del servidor de base de datos.
- `DB_PORT`: puerto de MySQL.
- `PORT`: puerto en el que se ejecuta la API.


## Relación entre las entidades

El sistema trabaja con dos entidades principales: usuarios y turnos. Un usuario puede tener varios turnos asociados, y cada turno corresponde a un usuario. Esta relación permite organizar y consultar los turnos registrados para cada usuario




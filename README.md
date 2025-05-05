# API Blossom - Personajes de Rick y Morty

Esta es una API GraphQL para buscar información sobre personajes de la popular serie Rick y Morty. Permite filtrar personajes por nombre, estado, especie, género y el nombre de su origen. Además, incluye una funcionalidad para vaciar la caché de Redis.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js:** (Se recomienda la versión LTS) - [https://nodejs.org/](https://nodejs.org/)
* **npm** (o **yarn**): Generalmente se instala con Node.js.
* **PostgreSQL:** (Asegúrate de que el servidor esté en ejecución) - [https://www.postgresql.org/](https://www.postgresql.org/)
* **Redis:** (Asegúrate de que el servidor esté en ejecución) - [https://redis.io/](https://redis.io/)

## Instalación

Sigue estos pasos para configurar la API en tu entorno local:

1.  **Clona el repositorio (si aún no lo has hecho):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_REPOSITORIO>
    ```

2.  **Instala las dependencias de Node.js:**
    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configuración de la Base de Datos:**

    Para configurar la conexión a la base de datos PostgreSQL, necesitas modificar el archivo `config.json`.

    1.  Abre el archivo [config.json](./config/config.json) ubicado en el directorio `config/`.
    2.  Encuentra la sección correspondiente al entorno en el que deseas ejecutar la aplicación (por ejemplo, `development` para el desarrollo local).
    3.  Modifica los siguientes valores dentro de esa sección con la configuración de tu base de datos PostgreSQL:

        ```json
          {
            "development": {
              "username": "tu_usuario_desarrollo",
              "password": "tu_contraseña_aqui",
              "database": "nombre_base_de_datos_desarrollo",
              "host": "tu_host_desarrollo/ip_dev",
              "dialect": "postgres"
            },
            "test": {
              "username": "tu_usuario_test",
              "password": "tu_contraseña_test",
              "database": "nombre_base_de_datos_test",
              "host": "tu_host_test/ip_test",
              "dialect": "postgres"
            },
            "production": {
              "username": "tu_usuario_prod",
              "password": "tu_contraseña_prod",
              "database": "nombre_base_de_datos_prod",
              "host": "tu_host_prod/ip_prod",
              "dialect": "postgres"
            }
          }
        ```
      * ***Reemplaza los valores `"tu_usuario_postgres"`, `"tu_contraseña_postgres"`, `"nombre_de_tu_base_de_datos"` con tus credenciales reales, donde corresponda.***
      * ***Puedes configurar la base de datos que necesites `"development"`, `"test"` o `"production"`, y/o eliminar las que novayas a usar.***
      * ***El proyecto por defecto usara `"development"`, si necesitas otra baase de datos debes modificarlo en [index.js](./models/index.js) linea de código #8, y en [sequelize.js](sequelize.js) linea de código #6.***

    4.  Guarda los cambios en el archivo `config/config.json`.

Una vez que hayas configurado correctamente este archivo, tu aplicación debería poder conectarse a la base de datos.

4.  **Ejecuta las migraciones de Sequelize (para crear la base de datos y las tablas):**
    ```bash
    npx sequelize-cli db:migrate
    # o
    npm run db:migrate
    # o
    yarn sequelize db:migrate
    ```

5.  **Ejecuta los seeders de Sequelize (para poblar la base de datos con datos iniciales):**
    ```bash
    npx sequelize-cli db:seed:all
    # o
    npm run db:seed:all
    # o
    yarn sequelize db:seed:all
    ```

## Ejecución de la API

Para iniciar el servidor de la API, ejecuta el siguiente comando en la raíz del proyecto:

```bash
npm start
# o
yarn start
```

Una vez que el servidor se inicie, verás un mensaje en la consola indicando la URL donde se está ejecutando la API (por defecto, http://localhost:1981/graphql). Además, la API intentará abrir automáticamente esta URL en tu navegador web predeterminado.


## Utilización de la API GraphQL

Puedes interactuar con la API GraphQL a través de la interfaz GraphiQL, que está habilitada en la ruta /graphql de tu servidor. Abre tu navegador (si no abre automaticamente) en la siguiente URL:
```bash
http://localhost:1981/graphql
```
En la interfaz de GraphiQL, puedes escribir y ejecutar consultas GraphQL para obtener la información de los personajes.

### Ejemplos de Consultas
* **Obtener todos los personajes:**

```json
GraphQL

query {
  personajes {
    id
    nombre
    status
  }
}
```

* **Filtrar personajes por nombre (insensible a mayúsculas/minúsculas, contiene el texto):**
```json
GraphQL

query {
  personajes(nombre: "rick") {
    id
    nombre
  }
}
```

* **Filtrar personajes por estado:**
```json
GraphQL

query {
  personajes(status: "Alive") {
    id
    nombre
    status
  }
}
```

* **Filtrar personajes por nombre de origen (insensible a mayúsculas/minúsculas, contiene el texto):**
```json
GraphQL

query {
  personajes(origenNombre: "earth") {
    nombre
    origen {
      name
    }
  }
}
```

### Mutaciones
La API también incluye una mutación para gestionar la caché de Redis:
* **Vaciar la caché de Redis:**
```json
GraphQL

mutation {
  vaciarCache
}
```
Esta mutación eliminará todos los datos almacenados en la caché de Redis.


## Documentación de Swagger UI

La documentación de la API también está disponible a través de Swagger UI en la siguiente URL:
```bash
http://localhost:1981/api-docs
```
Aquí podrás explorar el endpoint GraphQL y ver el esquema de la solicitud.


## Middleware de Registro de Requests

La API incluye un middleware básico para registrar las solicitudes entrantes en la consola del servidor.


## Cron Jobs (Opcional)

La funcionalidad de cron jobs está incluida y actualmente está activa, pude ser comentada o requerir configuración adicional en el archivo [cronJobs](./utils/cronJobs.js).


## Tecnologías Utilizadas

* **•	Node.js**
* **•	Express**
* **•	express-graphql**
* **•	graphql**
* **•	Sequelize** (ORM para PostgreSQL)
* **•	pg** (Driver de PostgreSQL para Node.js)
* **•	ioredis** (Cliente de Redis para Node.js)
* **•	dotenv** (Para la gestión de variables de entorno)
* **•	node-cron** (Para la programación de tareas - opcional)
* **•	swagger-ui-express** (Para servir la documentación de Swagger UI)
* **•	open** (Para abrir la URL en el navegador automáticamente)


## Contribución

Si deseas contribuir a este proyecto, por favor, sigue las siguientes pautas:

1.  Crea un fork del repositorio.
2.  Crea una rama para tu contribución (git checkout -b feature/nueva-funcionalidad).
3.  Realiza tus cambios 1 y commitea (git commit -am 'Añade nueva funcionalidad').
4.  Haz push a la rama (git push origin feature/nueva-funcionalidad).
5.  Crea un Pull Request.


## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE.txt](LICENSE.txt) para más detalles.


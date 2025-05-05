const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { sequelize } = require('./models');
const schema = require('./schemas/personajeSchema');
const requestLogger = require('./middlewares/requestLogger');
const cronJobs = require('./utils/cronJobs');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.json'); 

const app = express();
const PORT = process.env.PORT || 1981;

// Middleware de registro de requests
app.use(requestLogger);

// Endpoint GraphQL
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Habilita la interfaz GraphiQL para pruebas en desarrollo
  context: { sequelize }, // Pasar la instancia de Sequelize al contexto de GraphQL
}));

// Servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar los cron jobs (opcional)
cronJobs.startAll();

// Sincronizar la base de datos e iniciar el servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, async () => {
      const serverUrl = `http://localhost:${PORT}/graphql`;
      console.log(`Servidor corriendo en ${serverUrl}`);
      // Abre la URL en el navegador predeterminado
      try {
        const open = await import('open'); // Importar 'open' dinámicamente
        open.default(serverUrl); // Usar open.default para la función
      } catch (error) {
        console.error('Error al abrir el navegador:', error);
      }
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
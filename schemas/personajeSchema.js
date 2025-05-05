const {
    GraphQLObjectType,
    GraphQLString,      // tipo de datos
    GraphQLInt,         // tipo de datos
    GraphQLList,        // para listas
    GraphQLSchema,
    GraphQLNonNull,
  } = require('graphql');
  const { GraphQLJSON } = require('graphql-type-json'); // Importa GraphQLJSON
  const { Personaje, Sequelize } = require('../models');
  const { getCache, setCache, clearCache } = require('../services/redisService');
  const executionTimeDecorator = require('../decorators/executionTime');
  
  const OrigenType = new GraphQLObjectType({
    name: 'Origen',
    fields: () => ({
      name: { type: GraphQLString },
      url: { type: GraphQLString },
    }),
  });

  const PersonajeType = new GraphQLObjectType({
    name: 'Personaje',
    fields: () => ({
      id: { type: GraphQLInt },
      nombre: { type: GraphQLString },
      status: { type: GraphQLString },
      especie: { type: GraphQLString },
      genero: { type: GraphQLString },
      origen: {
        type: OrigenType,
        resolve: (personaje) => personaje.origen, 
      },
      imagen: { type: GraphQLString },
      url: { type: GraphQLString },
      creado: { type: GraphQLString },
    }),
  });
  
  const RootQuery = new GraphQLObjectType({
    name: 'RaizTipoConsulta',
    description: 'Estructura como debe estar compuesta la consulta.',
    fields: {
        personajes: {
            type: new GraphQLList(PersonajeType),
            args: {
              nombre: { type: GraphQLString },
              status: { type: GraphQLString },
              especie: { type: GraphQLString },
              genero: { type: GraphQLString },
              origenNombre: { type: GraphQLString }, // Filtrar por nombre del origen
            },
            resolve: executionTimeDecorator()(async (parent, args) => { // Aplicamos el decorador como una función
              const cacheKey = `personajes:${JSON.stringify(args)}`;
              const cachedData = await getCache(cacheKey);
      
              if (cachedData) {
                console.log('Consulta desde caché Redis (antes de devolver):');
                return cachedData;
              }
      
              const where = {};
              if (args.nombre) where.nombre = { [Sequelize.Op.iLike]: `%${args.nombre}%` };
              if (args.status) where.status = args.status;
              if (args.especie) where.especie = args.especie;
              if (args.genero) where.genero = args.genero;
              if (args.origenNombre) where.origen = { name: { [Sequelize.Op.iLike]: `%${args.origenNombre}%` }, };
      
              const personajes = await Personaje.findAll({ where });
              console.log('Resultados de Sequelize (antes de caché):', personajes);
              await setCache(cacheKey, personajes);
              return personajes;
            }),
        },
    },
  });
  
  const RootMutationType = new GraphQLObjectType({ // Define RootMutationType
    name: 'RootMutationType',
    description: 'Mutación para vaciar cache de Redis. Para ejecutar enviar "mutation { vaciarCache }", sin comillas.',
    fields: {
      vaciarCache: {
        type: GraphQLString, // La mutación devolverá un string indicando el resultado
        resolve: async () => {
          try {
            await clearCache(); // Llama a la función para vaciar la caché
            console.log('Caché de Redis vaciada por el usuario.');
            return 'Caché de Redis vaciada exitosamente.';
          } catch (error) {
            console.error('Error al vaciar la caché de Redis:', error);
            return 'Error al vaciar la caché de Redis.';
          }
        },
      },
    },
  });

  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutationType,
  });
const Redis = require('ioredis');
const redisClient = new Redis();

redisClient.on('connect', () => {
  console.log('Conectado a Redis');
});

redisClient.on('error', (err) => {
  console.error('Error de conexión a Redis:', err);
});

const getCache = async (key) => {           // Para obtener detos de cache.
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error al obtener del caché:', error);
    return null;
  }
};

const setCache = async (key, data, expirySeconds = 3600) => {       // Para guardar datos en cache.
  try {
    await redisClient.set(key, JSON.stringify(data), 'EX', expirySeconds);
  } catch (error) {
    console.error('Error al guardar en el caché:', error);
  }
};

const clearCache = async () => {          // Para vaciar la cache
  try {
    await redisClient.flushall();
    console.log('Caché de Redis vaciada.');
  } catch (error) {
    console.error('Error al vaciar la caché de Redis:', error);
    throw error; // Re-lanza el error para que GraphQL lo capture
  }
};

module.exports = { redisClient, getCache, setCache, clearCache };
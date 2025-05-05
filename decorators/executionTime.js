const executionTimeDecorator = () => (resolve) => async (...args) => {
  const startTime = Date.now();
  const result = await resolve(...args);
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  console.log(`Tiempo de ejecución de la consulta: ${executionTime}ms`);
  return result;
};

module.exports = executionTimeDecorator;
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
  
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    // Aqui se puede agregar más información relevante, como el cuerpo de la solicitud para ciertos métodos
    next();
  };
  
  module.exports = requestLogger;
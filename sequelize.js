// sequelize.js
require('node-fetch'); // Importa node-fetch, haciéndolo disponible globalmente
const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'development';  // base de datos por defecto 
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
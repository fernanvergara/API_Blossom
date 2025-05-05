'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Personaje = sequelize.define('Personaje', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    especie: {
      type: DataTypes.STRING,
    },
    genero: {
      type: DataTypes.STRING,
    },
    origen: {
      type: DataTypes.JSONB,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    creado: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'Personajes', // Nombre de la tabla en la base de datos
    timestamps: true, // Sequelize gestionará createdAt y updatedAt
  });

  return Personaje;
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {         // Para definir la tabla
    await queryInterface.createTable('Personajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING
      },
      especie: {
        type: Sequelize.STRING
      },
      genero: {
        type: Sequelize.STRING
      },
      origen: {
        type: Sequelize.JSONB
      },
      imagen: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      creado: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {       // Para revertir la migracion
    await queryInterface.dropTable('Personajes');
  }
};
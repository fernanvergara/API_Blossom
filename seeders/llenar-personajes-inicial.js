'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {         // Formateo de datos para la inserción masiva.
    const personajesIniciales = [];
    const apiUrl = 'https://rickandmortyapi.com/api/character?page=1';

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.results) {
        data.results.slice(0, 15).forEach(personaje => {
          personajesIniciales.push({
            nombre: personaje.name,
            status: personaje.status,
            especie: personaje.species,
            genero: personaje.gender,
            origen: JSON.stringify(personaje.origin),
            imagen: personaje.image,
            url: personaje.url,
            creado: personaje.created,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });

        await queryInterface.bulkInsert('Personajes', personajesIniciales, {});
      }
    } catch (error) {
      console.error('Error al obtener o insertar personajes:', error);
    }
  },

  async down(queryInterface, Sequelize) {         // Para eliminar los datos insertados.
    await queryInterface.bulkDelete('Personajes', null, {});
  }
};